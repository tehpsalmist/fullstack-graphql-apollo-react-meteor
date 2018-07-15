import React, { Component } from 'react'
import { Accounts } from 'meteor/accounts-base'

export default class RegisterForm extends Component {
  regiserUser = () => {
    Accounts.createUser(
      { email: this.email.value, password: this.password.value },
      err => err ? console.log(err) : this.props.client.resetStore()
    )
  }

  render () {
    return (
      <form onSubmit={this.regiserUser}>
        <input type='email' placeholder='email' ref={input => (this.email = input)} />
        <input type='password' placeholder='password' ref={input => (this.password = input)} />
        <button type='submit'>Register</button>
      </form>
    )
  }
}
