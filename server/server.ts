import express from "express";
import connect from "./src/db";
import User from "./src/models/User";
import socketio from "socket.io";
import http from "http";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";
import multer from "multer";

const PORT = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const users = new Set<any>();
const upload = multer();

(async () => {
    await connect();

    //socketIo
    io.on("connection", (socket) => {
        console.log("connected");
        fs.readFile(
            "../new-chat/src/components/Messages/Messages.json",
            "utf-8",
            (error, data) => {
                const allMessages = JSON.parse(
                    `[${data.replace(/\n(?!$)/gm, ",")}]`
                );
                socket.emit("allMessages", allMessages);
            }
        );

        socket.on("init", async (name, callback) => {
            users.add(socket);
            console.log(socket.id, name);
            callback(true);

            socket.on("sendMessage", (msg, callback) => {
                fs.appendFile(
                    "../new-chat/src/components/Messages/Messages.json",
                    `${JSON.stringify(msg)}\n`,
                    "utf-8",
                    (error) => {
                        console.error(error);
                    }
                );

                users.forEach((user) => {
                    console.log(socket.id, user.id);
                    if (user.id !== socket.id) {
                        user.emit("message", msg);
                    }
                    callback();
                });
            });

            socket.on("disconnect", () => {
                users.delete(socket);
                console.log("user desconected");
            });
        });
    });

    app.get("/", (req, res) => {
        res.send("server is up and running");
    });

    const avatarUploader = upload.fields([
        { name: "file", maxCount: 1 },
        { name: "userName", maxCount: 1 },
    ]);

    app.post("/api/avatar", avatarUploader, async (req, res) => {
        try {
            await fs.promises.writeFile(
                path.resolve(__dirname, "avatars", `${req.body.userName}.png`),
                req.body.file.replace(/^data:image\/png;base64,/, ""),
                "base64"
            );
            res.send(JSON.stringify({ result: "ok" }));
        } catch (error) {
            console.log(error);
            res.send(JSON.stringify({ result: "error" }));
        }
    });

    app.post("/api/join", (req, res) => {
        req.on("data", async (data: Buffer) => {
            const { name } = JSON.parse(data.toString());
            if (name) {
                const user = await User.findOne({ name });
                console.log(user);
                if (user) {
                    res.send(true);
                    return;
                } else
                    try {
                        {
                            const newUser = new User({
                                _id: new mongoose.Types.ObjectId(),
                                name: name,
                            });
                            newUser.save((err) => {
                                if (err) throw err;
                                console.log("save new user");
                                res.send(true);
                            });
                        }
                    } catch (e) {
                        console.log(e);
                    }
            } else {
                res.send(false);
            }
        });
    });

    app.post("/api/userId", (req, res) => {
        req.on("data", async (data: Buffer) => {
            const name = JSON.parse(data.toString());
            if (name) {
                const user = await User.findOne({ name });
                if (user) {
                    res.send({ status: "success", userId: user._id, avatar:user.avatar });
                    return;
                } else console.log("error");
            } else {
                res.send(false);
            }
        });
    });

    app.use("/avatars", express.static(path.join(__dirname, "avatars")));

    server.listen(PORT, () => {
        console.log(`server has started on PORT ${PORT}`);
    });
})();
