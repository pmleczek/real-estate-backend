import { MongoClient } from "mongodb";

const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;
const client = new MongoClient(url);

export let connection;
try {
    connection = await client.connect();
} catch (error) {
    console.log("Error establishing connection to MongoDB server");
    console.error(error);
}

let db = connection.db(dbName);
export default db;
