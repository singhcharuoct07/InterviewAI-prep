const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

let connectionPromise;

async function connectToDb() {
    if (mongoose.connection.readyState === 1) {
        return true;
    }

    if (!process.env.MONGO_URI) {
        console.error("MONGO_URI is not configured");
        return false;
    }

    if (connectionPromise) {
        return connectionPromise;
    }

    connectionPromise = mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to Database");
            return true;
        })
        .catch((error) => {
            console.log("Name:", error.name);
            console.log("Message:", error.message);
            console.log("Code:", error.code);
            return false;
        })
        .finally(() => {
            connectionPromise = undefined;
        });

    return connectionPromise;
}

module.exports = connectToDb;