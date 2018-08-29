import React from 'react'
import {
  db,
  updateProfile,
  getProfiles,
  getCommentById,
  updateProfileTimeStamp,
  deleteComment
} from '../configuration/firebase'
import * as routes from '../constants/routes'
import withAuthorization from './withAuthorization'
import { Link } from 'react-router-dom'

//This is what will ultimately be exported, a header, form and div containing the current profile.
//The last part is broken and not displaying the current profile

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
    console.log('profile props', props)
    this.state = { ...INITIAL_STATE }
  }

  async componentDidMount() {
    await this.getProfile(this.props.authUser.uid)
    await this.getComment(this.props.authUser.uid)
    this.makeAPH()
  }

  onSubmit = (event, userId, profile) => {
    event.preventDefault()
    updateProfile(userId, profile)
    updateProfileTimeStamp(userId)
    deleteComment(userId)
      .then(() => {
        this.getProfile(userId)
        this.getComment(userId)
      })
      .catch(error => {
        this.setState({ error: error })
      })
  }

  async getComment(userId) {
    this.setState({ comment: await getCommentById(userId) })
  }

  makeAPH() {
    const placeHolders = [
      'Make a joke or something!', 'Be wicked serious.', 'Bring your best!', 'Uhm.. Do I know you?',
      'This town ain\'t small enough for one of us \'pardner?', 'C\'mon what yo momma got?', 'You\'re a total scrub!!',
      '12 pool = (opponent) => {return earlyPressuredOpponent}', 'cannons = (opponent) => {return earlyPressuredOpponent}',
      'The graphics are actually ok in this game.', 'Choose what makes you happy!', 'Is there such a thing as a good critic?',
      '63 |       \'Use an extra } to break this line!\', }]']
    return placeHolders[Math.floor(Math.random() * placeHolders.length)]
  }

  async getProfile(userId) {
    const profile = await getProfiles(userId)
    this.setState({
      profile: '',
      currentProfile: profile.profile
    })
  }

  render() {
    const isInvalid =
      this.state.profile === ''

    return (

      <div>
        <h1>Profile:</h1>
        <form onSubmit={(e) => this.onSubmit(e, this.props.authUser.uid, this.state.profile)}>
          <p>The more you update your profile, the more fun SAMP is!</p>
          <input
            value={this.state.profile}
            onChange={event => this.setState({ profile: event.target.value })}
            type="text"
            placeholder={this.makeAPH()}
          />

          <button disabled={isInvalid} type="submit">
            Submit
          </button>
        </form>
        <h3>Your current profile:</h3>
        <p className="Box">{this.state.currentProfile}</p>
        <h3>Comment left on your profile:</h3>
        <p className="Box">{this.state.comment}</p>
      </div>
    )
  }
}

//a link to this page to be exported

const ProfileLink = <Link to={routes.PROFILE}>Profile</Link>

const authCondition = (authUser) => !!authUser

//Wrap with our higher order component so that we can access authuser

export default withAuthorization(authCondition, ProfilePage)

//exports for this page and link

export {
  ProfilePage,
  ProfileLink,
}
