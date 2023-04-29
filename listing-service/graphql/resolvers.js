import db from "../database/db";

const resolvers = {
    Query: {
        listings: async (parent, args, contextValue, info) => {
            const query = {
                location: {
                    $nearSphere: {
                        $geometry: {
                            type: "Point",
                            coordinates: [args.lat, args.lon],
                        },
                        $maxDistance: args.range,
                    }
                }
            }
            if (args.type) {
                query.type = args.type;
            }
            if (args.listingType) {
                query.listingType = args.listingType;
            }
            return db.collection("listings").find(query)
                .skip(args.offset)
                .limit(args.limit);
        },
        listing: async (parent, args, contextValue, info) => {
            return db.collection("listings").findOne({ _id: args._id });
        },
    },
}

export default resolvers;
