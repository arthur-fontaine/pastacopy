import { createYoga } from 'graphql-yoga'
import { useGraphQLSSE } from '@graphql-yoga/plugin-graphql-sse'
import { gqlSchema } from '@/api'

const { handleRequest } = createYoga({
  schema: gqlSchema,
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
