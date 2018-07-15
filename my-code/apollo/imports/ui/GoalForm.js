import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const createGoal = gql`
  mutation createGoal($name: String!, $resolutionId: String!) {
    createGoal(name: $name, resolutionId: $resolutionId) {
      _id
    }
  }
`

class GoalsForm extends Component {
  submitForm = () => {
    this.props.createGoal({
      variables: {
        name: this.name.value,
        resolutionId: this.props.resolutionId
      }
    })
      .catch(err => console.error(err))
    this.name.value = ''
  }

  render () {
    return <div style={{ marginTop: '10px' }}>
      <input type='text' ref={input => (this.name = input)} />
      <button type='submit' onClick={this.submitForm}>Submit</button>
    </div>
  }
}

export default graphql(createGoal, {
  name: 'createGoal',
  options: {
    refetchQueries: ['getResolutions']
  }
})(GoalsForm)
