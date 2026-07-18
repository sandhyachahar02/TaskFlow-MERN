import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/db/db.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT ;

app.listen(PORT, () => {
    console.log(`Listening To port ${PORT}`);
});