import { gql } from 'apollo-server-core'

export const typeDefs = gql`
  type Coordinate {
    lat: Float,
    lng: Float
  }

  type Marker {
    id: Int,
    title: String,
    infoContent: String
    position: Coordinate,
  }

  type Query {
    markers: [Marker]
  }
`

export const resolvers = {
  Query: {
    markers: async (parent, args, { dataSources }) => (
      dataSources.paddleDB.getMarkers()
    ),
  },
  Marker: {
    position: (parent) => ({
      lat: parent.lat,
      lng: parent.lng,
    }),
  },
}
