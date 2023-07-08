import { GarphSchema, InferResolvers, buildSchema } from "garph"
import { snippetType } from "./types/snippet"
import { getSnippets } from "./resolvers/snippets"
import { g } from "./g"

export const queryType = g.type('Query', {
  snippets: g.ref(() => snippetType).list()
    .args({
      ids: g.string().list().optional(),
      search: g.string().optional(),
    })
})

export const mutationType = g.type('Mutation', {
})

export const subscriptionType = g.type('Subscription', {
})

const resolvers: InferResolvers<{ Query: typeof queryType, Mutation: typeof mutationType, Subscription: typeof subscriptionType }, {}> = {
  Query: {
    snippets: getSnippets,
  },
  Mutation: {
  },
  Subscription: {
  },
}

const schema = buildSchema({ g, resolvers })

export { schema as gqlSchema }
