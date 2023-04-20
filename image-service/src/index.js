const express = require("express");
app = express();

const { MongoClient } = require("mongodb")
const dbURL = process.env.DB_URL;
const dbName = process.env.DB_NAME;
const mongoClient = new MongoClient(dbURL);

const connect = async () => {
    try {
        await mongoClient.connect();
        console.log("Successfully connected to MongoDB server");
        const db = mongoClient.db(dbName);
        app.set("db", db);
    } catch (err) {
        console.log("Error connecting to MongoDB server");
        console.log(err.message);
    }
}
await connect();

const port = 8080;
const server = app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

process.on("SIGTERM", () => {
    console.log("SIGTERM received");
    console.log("Closing HTTP server...");
    server.close(() => {
        console.log("HTTP server closed");
    });
});
