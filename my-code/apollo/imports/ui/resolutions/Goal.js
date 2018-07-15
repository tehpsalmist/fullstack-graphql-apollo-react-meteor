import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const toggleMutation = gql`
  mutation toggleGoal($_id: String!) {
    toggleGoal(_id: $_id) {
      completed
    }
  }
`

class Goal extends Component {
  render () {
    const { goal } = this.props
    return (
      <li>
        <input
          type='checkbox'
          onChange={() => this.props.toggleGoal({
            variables: {
              _id: goal._id
            }
          })}
          checked={goal.completed}
        />
        <span style={{ textDecoration: goal.completed ? 'line-through' : 'none' }}>
          {goal.name}
        </span>
      </li>
    )
  }
}

export default graphql(toggleMutation, {
  name: 'toggleGoal',
  options: {
    refetchQueries: ['getResolutions']
  }
})(Goal)
