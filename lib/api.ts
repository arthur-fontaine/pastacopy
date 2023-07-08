import { createClient, InferClient } from '@garph/gqty'
import { createClient as createSubscriptionsClient } from 'graphql-sse'
import { createGeneratedSchema, createScalarsEnumsHash } from '@garph/gqty/dist/utils'
import { schema, queryType, mutationType, subscriptionType } from '../app/api/[...graphql]/schema'

type ClientTypes = InferClient<{ query: typeof queryType, mutation: typeof mutationType, subscription: typeof subscriptionType }>

const graphqlEndpoint = process.env.NODE_ENV === 'production' ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/graphql` : 'http://localhost:3000/api/graphql'

export const { useQuery, useMutation, useTransactionQuery, useSubscription, resolved, query, mutation, subscription } = createClient<ClientTypes>({
  generatedSchema: createGeneratedSchema(schema),
  scalarsEnumsHash: createScalarsEnumsHash(schema),
  url: graphqlEndpoint,
  defaults: {
    suspense: false
  },
  subscriptionClient: createSubscriptionsClient({
    url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/graphql/stream`
  })
})

// Needed for the babel plugin to work
export { schema as compiledSchema }
