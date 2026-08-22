require("dotenv").config();
const app = require("./src/app");
const connectToDb = require("./src/config/database");

connectToDb().then((isConnected) => {
    if (!isConnected) {
        process.exitCode = 1;
        return;
    }

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`server is running on port ${port}`);
    });
});
