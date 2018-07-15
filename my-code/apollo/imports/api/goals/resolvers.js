import Goals from './goals'

export default {
  Mutation: {
    createGoal (obj, { name, resolutionId }) {
      const goalId = Goals.insert({ name, resolutionId, completed: false })
      return Goals.findOne(goalId)
    },
    deleteResolution (obj, { _id }) {
      Goals.remove(_id)
      return { _id }
    },
    toggleGoal (obj, { _id }) {
      const goal = Goals.findOne(_id)
      Goals.update(_id, {
        $set: {
          completed: !goal.completed
        }
      })
      return Goals.findOne(_id)
    }
  }
}
