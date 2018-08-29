import React, { Component } from 'react'
import withAuthorization from './withAuthorization'
import {
  getOldestProfile,
  updateProfileTimeStamp,
  createComment,
  getProfileById,
  getCommentById
} from '../configuration/firebase'

const INITIAL_STATE = {
  error: null,
  comment: '',
  parentProfile: '',
  parentProfileId: '',
  previousComment: ''
}

class CommentPage extends Component {

  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  async componentDidMount() {
    await getOldestProfile().then(value => {
      this.setState({ parentProfileId: value })
    })
    this.setState({ parentProfile: await getProfileById(this.state.parentProfileId) })
    this.setState({ previousComment: await getCommentById(this.state.parentProfileId) })
    updateProfileTimeStamp(this.state.parentProfileId)
  }

  onSubmit() {
    createComment(this.state.comment, this.state.parentProfileId)
  }


  render() {
    const isInvalid =
      this.state.comment === ''

    return (
      <div>
        <h1>Comment Page</h1>
        <h3>Please leave a comment for this profile:</h3>
        <p className="Box" >{this.state.parentProfile}</p>
        <h3>Make it better than the last comment!</h3>
        <p className="Box" >{this.state.previousComment}</p>
        <form onSubmit={(e) => this.onSubmit(e)}>
          <input
            value={this.state.comment}
            onChange={event => this.setState({ comment: event.target.value })}
            type="text"
            placeholder="Comment goes here"
          />
          <button disabled={isInvalid} type="submit">
            Submit
          </button>
        </form>


      </div>

    )
  }
}

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition, CommentPage)
