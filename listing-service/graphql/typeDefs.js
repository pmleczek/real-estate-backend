const typeDefs = `#graphql
    enum PropertyType {
        house,
        townhouse,
        apartment,
        condo
    }

    enum ListingType {
        sale,
        rent
    }

    type Listing {
        _id: String!
        address: String!
        coordinates: [Float]!
        description: String!
        area: Float!
        lotArea: Float!
        floors: Int!
        listingType: ListingType!
        type: PropertyType!
        bedrooms: Int!
        bathrooms: Int!
    }

    input SearchCriteria {
        lat: Float!
        lon: Float!
        range: Float!
        listingType: ListingType
        type: PropertyType
    }
    
    type Query {
        listings(searchInput: SearchCriteria!): [Listing]
        listing(_id: String!): Listing
    }
`

export default typeDefs;