db = connect( 'mongodb://node:node@locationdb:27017/location?authSource=admin' );
db.locations.createIndex({ name: "text" })