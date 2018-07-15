import Resolutions from './resolutions'
import Goals from '../goals/goals'

export default {
  Query: {
    resolutions (obj, args, { userId }) {
      return Resolutions.find({ userId }).fetch()
    }
  },
  Resolution: {
    goals: resolution => Goals.find({ resolutionId: resolution._id }).fetch(),
    completed: resolution => {
      const goals = Goals
        .find({ resolutionId: resolution._id })
        .fetch()
      return goals.length > 0 ? goals.every(goal => goal.completed) : false
    }
  },
  Mutation: {
    createResolution (obj, { name }, { userId }) {
      const resId = Resolutions.insert({ name, userId })
      return Resolutions.findOne(resId)
    },
    deleteResolution (obj, { _id }, { userId }) {
      Resolutions.remove(_id)
      return { _id }
    }
  }
}
