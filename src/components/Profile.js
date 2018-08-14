import React, { Component } from 'react'
import AuthUserContext from './AuthUserContext'
import { db } from '../configuration/firebase'
import * as routes from '../constants/routes'
import withAuthorization from './withAuthorization'
import { Link } from 'react-router-dom'

//This is what will ultimately be exported, a header, form and div containing the current profile.
//The last part is broken and not displaying the current profile

const ProfilePage = ({ history }) =>
  <div>
    <h1>Profile</h1>
    <ProfileForm history={ history } />
    { /*<p>{curProfile}</p>*/ }
  </div>

//Our initial state

const INITIAL_STATE = {
  error: null,
  showAuth: false,
  profile: '',
  userId: null
}

//Our versatile handler to put profile into state as it's typed into the input

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
})

const currentProfile = async (id) => (
  await db.onceGetProfileKey(id))

//This class contains our profile input form

class ProfileForm extends Component {
  onSubmit = (event) => {
    db.doUpdateProfile(this.state.userId, this.state.profile)
      .then(() => {
        // this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState(byPropKey('error', error))
      })
    event.preventDefault()
  }

  //This is our form's onSubmit. It calls db.doUpdateProfile which actually handles updates and creates.
  //Then we setState back to initial state to clear the form. Errors are caught and we preventDefault.

  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  async componentDidMount() {
    const value = await db.onceGetProfileKey(this.state.userId)
    this.state.currentProfile = value
  }

  render() {

    //create a boolean as to whether a profile has been entered to validate whether writing it is a good idea
    const isInvalid =
      this.state.profile === ''

    return (
      <div>
        <form onSubmit={ this.onSubmit }>
          <input
            value={ this.state.profile }
            onChange={ event => this.setState(byPropKey('profile', event.target.value)) }
            type="text"
            placeholder="Profile goes here"
          />

          <button disabled={ isInvalid } type="submit">
            Submit
          </button>
        </form>
        <p>{ this.state.currentProfile }</p>
        { /*This code pulls in the authUser from our higher order component AuthUserContext and puts the userId
                in state because we want to use it in our onSubmit*/ }

        <AuthUserContext.Consumer>
          { authUser => {
            this.state.userId = authUser.uid
            return null
          } }
        </AuthUserContext.Consumer>

      </div>
    )
  }
}

//a link to this page to be exported

const ProfileLink = () =>
  <p>
    <Link to={ routes.PROFILE }>Profile</Link>
  </p>

//Yeah, no idea what this does

const authCondition = (authUser) => !!authUser

//Wrap with our higher order component so that we can access authuser

export default withAuthorization(authCondition)(ProfilePage)

//exports for this page and link

export {
  ProfilePage,
  ProfileLink,
}
