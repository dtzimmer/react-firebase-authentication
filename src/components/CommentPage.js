import React, { Component } from 'react'
import withAuthorization from './withAuthorization'
import { base, db, getOldestProfile, updateProfile } from '../configuration/firebase'

const INITIAL_STATE = {
  error: null,
  comment: ''
}

class CommentPage extends Component {

  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE };
  }
//We need to retrieve the oldest profile from the queue
  onSubmit = (event, profileId, comment) => {
    event.preventDefault()
    console.log('testing comment submit', db);
    createComment(comment, profileId)
      .then(() => {
        this.updateProfileTimeStamp(profileId);
      })
      .catch(error => {
        this.setState({error: error})
      })
  }

  render() {
    const isInvalid =
      this.state.comment === ''

    return (
      <div>
        <h1>Comment Page</h1>
        <form onSubmit={ (e) => this.onSubmit(e, this.state.profileId, this.state.comment) }>
        <input
          value={ this.state.comment }
          onChange={ event => this.setState({comment: event.target.value}) }
          type="text"
          placeholder="Comment goes here"
        />
          <button disabled={ isInvalid } type="submit">
            Submit
          </button>
        </form>



      </div>

    )
  }
}

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition, CommentPage)
