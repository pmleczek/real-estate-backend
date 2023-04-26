import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";

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