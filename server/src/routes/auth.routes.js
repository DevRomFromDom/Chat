const { Router } = require("express");
const User = require("../models/User");
const router = Router();


router.post("/join", async (req, res) => {
    try {
        const name = req.body;

        const userName = await User.findOne({ name });
        if (userName) {
            return res
                .status(400)
                .json({
                    message:
                        "Такой пользователь существует! Придумайте другоe имя",
                });
        }
    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так!!!" });
    }
});
