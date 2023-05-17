import db from "../database/db.js";

const resolvers = {
    Query: {
        listings: async (parent, args, contextValue, info) => {
            const query = {
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [args.searchInput.lon, args.searchInput.lat],
                        },
                        $maxDistance: args.searchInput.range,
                        $minDistance: 0,
                    }
                }
            }
            if (args.searchInput.type) {
                query.type = args.searchInput.type;
            }
            if (args.searchInput.listingType) {
                query.listingType = args.searchInput.listingType;
            }
            return db.collection("listings").find(query)
                .skip(args.searchInput.offset)
                .limit(args.searchInput.limit)
                .toArray();
        },
        listing: async (parent, args, contextValue, info) => {
            return db.collection("listings").findOne({ _id: args._id });
        },
        listingCount: async (parent, args, contextValue, info) => {
            const query = {
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [args.searchInput.lon, args.searchInput.lat],
                        },
                        $maxDistance: args.searchInput.range,
                        $minDistance: 0,
                    }
                }
            }
            if (args.searchInput.type) {
                query.type = args.searchInput.type;
            }
            if (args.searchInput.listingType) {
                query.listingType = args.searchInput.listingType;
            }
            return db.collection("listings").find(query).count();
        },
    },
}

export default resolvers;
