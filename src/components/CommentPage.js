import React, { Component } from 'react'
import withAuthorization from './withAuthorization'
import {
  base,
  db,
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
      this.setState({parentProfileId: value});
          })
    console.log(this.state.parentProfileId)
    this.setState({parentProfile: await getProfileById(this.state.parentProfileId)})
    console.log(this.state.parentProfile)
    this.setState({previousComment: await getCommentById(this.state.parentProfileId)})
    updateProfileTimeStamp(this.state.parentProfileId)
  }

  onSubmit(){
    createComment(this.state.comment, this.state.parentProfileId)
  }


  render() {
    const isInvalid =
      this.state.comment === ''

    return (
      <div>
        <h1>Comment Page</h1>
        <h2>{this.state.parentProfile}</h2>
        <p>{this.state.previousComment}</p>
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
