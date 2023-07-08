import { GarphSchema, InferResolvers, buildSchema } from "garph"

const g = new GarphSchema()

export const queryType = g.type('Query', {
  hello: g.string()
})

export const mutationType = g.type('Mutation', {
})

export const subscriptionType = g.type('Subscription', {
})

const resolvers: InferResolvers<{ Query: typeof queryType, Mutation: typeof mutationType, Subscription: typeof subscriptionType }, {}> = {
  Query: {
    hello: () => 'Hello World!'
  },
  Mutation: {
  },
  Subscription: {
  },
}

export const schema = buildSchema({ g, resolvers })
