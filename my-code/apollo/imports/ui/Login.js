/* global Meteor */
import React, { Component } from 'react'

export default class LoginForm extends Component {
  login = e => {
    e.preventDefault()
    Meteor.loginWithPassword(
      this.email.value,
      this.password.value,
      err => err ? console.log(err) : this.props.client.resetStore()
    )
  }

  render () {
    return this.props.user._id
      ? <button type='button'
        onClick={() => {
          Meteor.logout()
          this.props.client.resetStore()
        }}
      >Logout</button>
      : <form onSubmit={this.login}>
        <input type='email' placeholder='email' ref={input => (this.email = input)} />
        <input type='password' placeholder='password' ref={input => (this.password = input)} />
        <button type='submit'>Login</button>
      </form>
  }
}
