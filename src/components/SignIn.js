import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { SignUpLink } from './SignUp'
import { PasswordForgetLink } from './PasswordForget'
import { auth } from '../configuration/firebase'
import * as routes from '../constants/routes'

const SignInPage = ({ history }) =>  //all components here render between the divs.
  <div>
    <h1>Log In</h1>
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
// not 100% on what the history does above
const byPropKey = (propertyName, value) => () => ({  //don't know what this is
  [propertyName]: value,
})
// initialize the state with empty email, password string and set error to null so that it doesn't register an error
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
}

class SignInForm extends Component {
  constructor(props) {//why are there props here?
    super(props)

    this.state = { ...INITIAL_STATE } //changes the initial state here
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state  //When the submit button is pushed, it is changed here

    const {
      history,
    } = this.props //not sure how this history thing is working. see line 47 too.

    auth.doSignInWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({ ...INITIAL_STATE }) //this will set the state and route you to home after Google has handled authentication
          history.push(routes.HOME)//this is where the history thing is again
        })
        .catch(error => {
          this.setState(byPropKey('error', error)) //this catches any kind of error with the signing in. Not sure what byPropKey is.
        })

    event.preventDefault()
  }

  render() {
    const {
      email,
      password,//not sure what's going on here. Is it just passing up these? Are they props?
      error,
    } = this.state

    const isInvalid =
      password === '' ||//does not allow password or email to be empty
      email === ''
//below is the form with the inputs.
    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={password}
          onChange={event => this.setState(byPropKey('password', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

//if signin is invalid, the button will be disabled because invalid will be set to true
//What is byPropKey again on line 71 and 77
export default withRouter(SignInPage)

export {
  SignInForm,
}
//what's this export SignInForm?
