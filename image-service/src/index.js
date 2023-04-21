import express from "express";
const app = express();

import fileRouter from "./router/fileRouter.js";
import {connection} from "./database/db.js";
app.use("/api/v1/image", fileRouter);

const port = 8080;
const server = app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

process.on("SIGTERM", () => {
    console.log("SIGTERM received");
    console.log("Closing HTTP server...");
    server.close(() => {
        connection.close();
        console.log("HTTP server closed");
    });
});
