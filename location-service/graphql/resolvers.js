import { ObjectId } from "mongodb";
import db from "../database/db.js";

const resolvers = {
    Query: {
        locations: async (parent, args, contextValue, info) => {
            return db.collection("locations").find({ $text: { $search: args.search } })
                .limit(args.limit ? args.limit : 5)
                .toArray();
        },
        location: async (parent, args, contextValue, info) => {
            return db.collection("locations").findOne({ _id: new ObjectId(args.id) });
        }
    }
}

export default resolvers;
