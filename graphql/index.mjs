import { ApolloServer } from 'apollo-server-express'
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core'
import express from 'express'
import http from 'http'
import config from 'config'
import { typeDefs, resolvers } from './src/schema.mjs'
import PaddleDB from './src/paddle-db.mjs'

async function startApolloServer() {
  const app = express()
  const httpServer = http.createServer(app)
  const apollpServer = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    dataSources: () => ({
      paddleDB: new PaddleDB({
        client: 'pg',
        connection: {
          host: config.get('postgres.host'),
          user: config.get('postgres.username'),
          password: config.get('postgres.password'),
          database: config.get('postgres.database'),
        },
      }),
    }),
  })

  await apollpServer.start()
  apollpServer.applyMiddleware({ app })
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${apollpServer.graphqlPath}`)
}

startApolloServer()
