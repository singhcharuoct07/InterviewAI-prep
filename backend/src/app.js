const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const allowedOrigins = (process.env.FRONTEND_URLS || "http://localhost:5173,http://127.0.0.1:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Origin is not allowed by CORS"));
    },
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./route/auth.route");
app.use("/api/auth", authRouter);

const interviewRouter=require("./route/interview.route")
app.use("/api/interview",interviewRouter)

app.use((error, _req, res, next) => {
    if (error?.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "Resume PDF must be smaller than 3MB." })
    }

    if (error?.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({ message: "Only PDF resume files are supported." })
    }

    next(error)
})

module.exports = app;
