import express from "express";
import {ApolloServer} from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4";
import typeDefs from "../graphql/typeDefs.js";
import resolvers from "../graphql/resolvers.js";

const app = express();

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
});
await apolloServer.start();

app.use(
    "/graphql",
    express.json(),
    expressMiddleware(apolloServer),
);

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