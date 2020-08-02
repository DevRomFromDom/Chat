import mongoose, { Schema, model, Document } from "mongoose";

interface User extends Document {
    _id: any;
    name: string;
    created: any;
    avatar: string;
}

const schema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true },
    created: {
        type: Date,
        default: Date.now,
    },
    avatar: {
        type: String,
        required: false,
        unique: false,
        default: "/avatars/default.png",
    },
});

export default model<User>("User", schema);
