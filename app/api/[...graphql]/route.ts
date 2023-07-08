import { schema } from './schema'
import { createYoga } from 'graphql-yoga'
import { useGraphQLSSE } from '@graphql-yoga/plugin-graphql-sse'

export const runtime = 'edge'

const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response },
  graphiql: {
    subscriptionsProtocol: 'GRAPHQL_SSE'
  },
  plugins: [
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useGraphQLSSE()
  ]
})

export { handleRequest as GET, handleRequest as POST }
