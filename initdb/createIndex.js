db = connect('mongodb://node:node@locationdb:27017/location?authSource=admin');
db.locations.createIndex({ name: "text" })

db = connect('mongodb://node:node@listingdb:27017/listing?authSource=admin');
db.listings.createIndex({ location: "2dsphere" })