const typeDefs = `#graphql
    enum PropertyType {
        house,
        townhouse,
        apartment,
        condo
    }

    enum ListingType {
        buy,
        rent
    }

    type Location {
        type: String!
        coordinates: [Float]!
    }

    type Listing {
        _id: String!
        address: String!
        location: Location!
        description: String!
        area: Float!
        lotArea: Float!
        floors: Int!
        listingType: ListingType!
        type: PropertyType!
        bedrooms: Int!
        bathrooms: Int!
        price: Int!
    }

    input SearchInput {
        lat: Float!
        lon: Float!
        range: Float!
        listingType: ListingType
        type: PropertyType
        offset: Int!
        limit: Int!
    }
    
    type Query {
        listings(searchInput: SearchInput!): [Listing]
        listing(_id: String!): Listing
        listingCount(searchInput: SearchInput!): Int!
    }
`

export default typeDefs;