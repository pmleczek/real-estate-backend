const express = require("express")
const app = express();

const cors = require("cors");
app.use(cors());

const helmet = require("helmet");
app.use(helmet());

const { createProxyMiddleware } = require("http-proxy-middleware");
app.use("/api/v1/image", createProxyMiddleware({
    target: "http://image-service:8080",
    changeOrigin: true,
    timeout: 5000,
    retries: 3,
}));
app.use("/api/v1/auth", createProxyMiddleware({
    target: "http://auth-service:8080",
    changeOrigin: true,
    timeout: 5000,
    retries: 3,
}));
app.use("/api/v1/listing", createProxyMiddleware({
    target: "http://listing-service:8080",
    changeOrigin: true,
    timeout: 5000,
    retries: 3,
    pathRewrite: {
        "^/api/v1/listing/": "/",
    },
}));
app.use("/api/v1/profile", createProxyMiddleware({
    target: "http://profile-service:8080",
    changeOrigin: true,
    timeout: 5000,
    retries: 3,
}));
app.use("/api/v1/location", createProxyMiddleware({
    target: "http://location-service:8080",
    changeOrigin: true,
    timeout: 5000,
    retries: 3,
    pathRewrite: {
        "^/api/v1/location/": "/",
    },
}));

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
