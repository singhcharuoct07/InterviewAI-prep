require("dotenv").config();

const app = require("../src/app");
const connectToDb = require("../src/config/database");

module.exports = async function handler(req, res) {
    const isConnected = await connectToDb();

    if (!isConnected) {
        res.statusCode = 503;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({
            status: "error",
            message: "Database connection unavailable."
        }));
        return;
    }

    return app(req, res);
};
