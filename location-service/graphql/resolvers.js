import db from "../database/db.js";

const resolvers = {
    Query: {
        locations: async (parent, args, contextValue, info) => {
            return db.collection("locations").find({$text: { $search: args.search } })
                .limit(args.limit ? args.limit : 5)
                .toArray();
        },
    }
}

export default resolvers;
