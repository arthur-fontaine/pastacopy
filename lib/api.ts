import { createClient, InferClient } from '@garph/gqty'
import { createClient as createSubscriptionsClient } from 'graphql-sse'
import { createGeneratedSchema, createScalarsEnumsHash } from '@garph/gqty/dist/utils'
import { gqlSchema, mutationType, queryType, subscriptionType } from '@/api'

type ClientTypes = InferClient<{ query: typeof queryType, mutation: typeof mutationType, subscription: typeof subscriptionType }>

const graphqlEndpoint = process.env.NODE_ENV === 'production' ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/graphql` : 'http://localhost:3000/api/graphql'

export const { useQuery, useMutation, useTransactionQuery, useSubscription, resolve, query, mutation, subscription } = createClient<ClientTypes>({
  generatedSchema: createGeneratedSchema(gqlSchema),
  scalarsEnumsHash: createScalarsEnumsHash(gqlSchema),
  url: graphqlEndpoint,
  defaults: {
    suspense: false
  },
  subscriptionClient: createSubscriptionsClient({
    url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/graphql/stream`
  }),
})

// Needed for the babel plugin to work
export { gqlSchema as compiledSchema }
