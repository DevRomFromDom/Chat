import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connect = () => {
    return mongoose.connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@devilrcluster-phtkd.mongodb.net/<dbname>?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (err) => {
            if (err) {
                console.log(err);
            } else console.log("Successfully connected to DB");
        }
    );
};

export default connect;