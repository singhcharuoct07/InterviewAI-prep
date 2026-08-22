const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

async function connectToDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Database");
        return true;
    } catch (error) {
        console.log("Name:", error.name);
        console.log("Message:", error.message);
        console.log("Code:", error.code);
        return false;
    }
}

module.exports = connectToDb;