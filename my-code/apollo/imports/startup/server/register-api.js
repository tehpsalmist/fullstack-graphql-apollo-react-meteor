import { createApolloServer } from 'meteor/apollo'
import { makeExecutableSchema } from 'graphql-tools'
// soy
import merge from 'lodash/merge'

import ResolutionsSchema from '../../api/resolutions/Resolutions.graphql'
import ResolutionResolvers from '../../api/resolutions/resolvers'
import UsersSchema from '../../api/users/User.graphql'
import UserResolvers from '../../api/users/resolvers'
import GoalsSchema from '../../api/goals/Goal.graphql'
import GoalResolvers from '../../api/goals/resolvers'

const typeDefs = [
  ResolutionsSchema,
  UsersSchema,
  GoalsSchema
]

const resolvers = merge(ResolutionResolvers, UserResolvers, GoalResolvers)

const schema = makeExecutableSchema({ typeDefs, resolvers })

createApolloServer({ schema })
