import React from 'react'
import AuthUserContext from './AuthUserContext'
import { db, updateProfile, getProfiles } from '../configuration/firebase'
import * as routes from '../constants/routes'
import withAuthorization from './withAuthorization'
import { Link } from 'react-router-dom'

//This is what will ultimately be exported, a header, form and div containing the current profile.
//The last part is broken and not displaying the current profile


// const ProfilePage = (props) => (
//   <ProfileForm {...props}/>
// );

const INITIAL_STATE = {
  error: null,
  showAuth: false,
  profile: '',
  currentProfile: ''
}

class ProfilePage extends React.Component {
  //This is our form's onSubmit. It calls db.doUpdateProfile which actually handles updates and creates.
  //Then we setState back to initial state to clear the form. Errors are caught and we preventDefault.

  constructor(props) {
    super(props)
    console.log('profile props', props);
    this.state = { ...INITIAL_STATE };
  }

  async componentDidMount() {
    await this.getProfile(this.props.authUser.uid);

    // Binding is optional, we may not always want to listen to the server???
    // await base.bindToState('users', {
    //   context: this,
    //   state: 'users',
    //   withRefs: true,
    //   asArray: true
    // });

    //We don't want to load a profile on page load. We need the auth context to load
    // const value = await db.onceGetProfileKey(this.state.userId)
    // this.state.currentProfile = value
  }

  onSubmit = (event, userId, profile) => {
    //This should be on top in case of error, it wouldn't be hit
    event.preventDefault()
    console.log('testing submit', db);
    updateProfile(userId, profile)
      .then(() => {
        this.getProfile(userId);
      })
      .catch(error => {
        this.setState({error: error})
      })
  }

  async getProfile(userId){
    const profile = await getProfiles(userId);
    console.log('profile', profile);
    this.setState({
      profile: '',
      currentProfile: profile.profile
    });
  }

  refrest(userId){
    this.getProfile(userId);
  }

  render() {
    const { authUser } = this.props;
    //create a boolean as to whether a profile has been entered to validate whether writing it is a good idea
    const isInvalid =
      this.state.profile === ''

    return (
      <div>
        <form onSubmit={ (e) => this.onSubmit(e, this.props.authUser.uid, this.state.profile) }>
          <input
            value={ this.state.profile }
            // Only need this if inputs are dynamic and need to be placed in state by id or something.
            // onChange={ event => this.setState(byPropKey('profile', event.target.value)) }
            onChange={ event => this.setState({profile: event.target.value}) }
            type="text"
            placeholder="Profile goes here"
          />

          <button disabled={ isInvalid } type="submit">
            Submit
          </button>
        </form>
        <p>{this.state.currentProfile}</p>
        { /*This code pulls in the authUser from our higher order component AuthUserContext and puts the userId
                in state because we want to use it in our onSubmit*/ }

        {/* https://reactjs.org/docs/context.html#consumer will explain how a consumer works */}
        {/* The with auth already does this, STOP DUPLICATING
          <AuthUserContext.Consumer>
          { async (authUser) => {
            this.state.userId = authUser.uid
            return await this.getProfile();
          } }
        </AuthUserContext.Consumer> */}



      </div>
    )
  }
}

//a link to this page to be exported

const ProfileLink = <Link to={ routes.PROFILE }>Profile</Link>

//Yeah, no idea what this does

const authCondition = (authUser) => !!authUser

//Wrap with our higher order component so that we can access authuser

export default withAuthorization(authCondition, ProfilePage)

//exports for this page and link

export {
  ProfilePage,
  ProfileLink,
}
