const typeDefs = `#graphql
    type Location {
        _id: String!
        name: String!
        state: String!
        stateName: String!
        coordinates: [Float]!
        population: Int
    }
    
    type Query {
        locations(search: String!, limit: Int): [Location]
        location(id: String!): Location!
}
`

export default typeDefs;