import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
// Reload for About content seed

dotenv.config();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

// Listen on configured port
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
});