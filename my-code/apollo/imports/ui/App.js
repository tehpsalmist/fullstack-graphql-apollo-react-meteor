import React from 'react'
import gql from 'graphql-tag'
import { graphql, compose, withApollo } from 'react-apollo'
import ResolutionForm from './ResolutionForm'
import RegisterForm from './RegisterForm'
import LoginForm from './Login'
import GoalForm from './GoalForm'
import Goal from './resolutions/Goal'

const App = ({ resolutionStuff, deleteResolution, client }) => resolutionStuff.loading ? null : (
  <div>
    <h1>Resolutions</h1>
    {resolutionStuff.user._id ? null : <RegisterForm client={client} />}
    <LoginForm user={resolutionStuff.user} client={client} />
    {resolutionStuff.user._id && <ResolutionForm />}
    {resolutionStuff.user._id && <ul style={{
      listStyle: 'none',
      width: '500px'
    }}>
      {resolutionStuff.resolutions && resolutionStuff.resolutions.map(res => (
        <li key={res._id}>
          <p
            style={{
              display: 'flex',
              margin: 0
            }}
          >
            <span style={{ textDecoration: res.completed ? 'line-through' : 'none' }}>
              {res.name}
            </span>
            <span
              style={{
                padding: '0 8px',
                marginLeft: 'auto',
                cursor: 'pointer'
              }}
              onClick={() => deleteResolution({
                variables: {
                  _id: res._id
                }
              })}
            >&#x274C;</span>
          </p>
          <GoalForm resolutionId={res._id} />
          <ul style={{ listStyle: 'none' }}>
            {res.goals.map(goal => <Goal goal={goal} key={goal._id} />)}
          </ul>
        </li>
      ))}
    </ul>}
  </div>
)

const resolutionsQuery = gql`
  query getResolutions {
    resolutions {
      _id
      name
      completed
      goals {
        _id
        name
        completed
      }
    }
    user {
      _id
    }
  }
`

const deleteMutation = gql`
  mutation deleteResolution($_id: String!) {
    deleteResolution(_id: $_id) {
      _id
    }
  }
`

export default compose(
  withApollo,
  graphql(resolutionsQuery, {
    name: 'resolutionStuff'
  }),
  graphql(deleteMutation, {
    name: 'deleteResolution',
    options: {
      refetchQueries: ['getResolutions']
    }
  })
)(App)
