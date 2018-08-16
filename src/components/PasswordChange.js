import React, { Component } from 'react'
import {doPasswordUpdate} from '../configuration/firebase/index'

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
})

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
}

class PasswordChangeForm extends Component {
  onSubmit = (event) => {
    const { passwordOne } = this.state

    doPasswordUpdate(passwordOne)
        .then(() => {
          this.setState({ ...INITIAL_STATE })
        })
        .catch(error => {
          this.setState(byPropKey('error', error))
        })

    event.preventDefault()
  }

  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  render() {
    const {
      passwordOne,
      passwordTwo,
      error,
    } = this.state

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === ''

    return (
      <form onSubmit={ this.onSubmit }>
        <input
          value={ passwordOne }
          onChange={ event => this.setState(byPropKey('passwordOne', event.target.value)) }
          type="password"
          placeholder="New Password"
        />
        <input
          value={ passwordTwo }
          onChange={ event => this.setState(byPropKey('passwordTwo', event.target.value)) }
          type="password"
          placeholder="Confirm New Password"
        />
        <button disabled={ isInvalid } type="submit">
          Reset My Password
        </button>

        { error && <p>{ error.message }</p> }
      </form>
    )
  }
}

export default PasswordChangeForm
