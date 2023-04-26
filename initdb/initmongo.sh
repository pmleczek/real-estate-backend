#! /bin/bash
echo "Initializing location-service database"
mongoimport --host locationdb --db location --collection locations --type json /initdb/locations.json --jsonArray --username node\
 --password node --authenticationDatabase admin
mongosh --host locationdb --db location --username node --password node --authenticationDatabase admin --file /initdb/createIndex.js
