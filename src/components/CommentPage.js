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
    await getOldestProfile(this.props.authUser.uid).then(value => {
      this.setState({ parentProfileId: value })
    })
    this.setState({ parentProfile: await getProfileById(this.state.parentProfileId) })
    this.setState({ previousComment: await getCommentById(this.state.parentProfileId) })
    updateProfileTimeStamp(this.state.parentProfileId)
  }

  onSubmit() {
    createComment(this.state.comment, this.state.parentProfileId)
  }

  makeAPH() {
    const placeHolders = ['Can you do better than the last comment?', 'That last comment was pretty funny, right?',
      'Help them out!', 'What are you gonna say to that?!?!', 'Ai.js not found: 26 stack frames collapsed.',
      'Thank you very much, I don\'t want any', 'Well? Say something.', 'Yeah, how do you counter that?',
      'What do we do? Turtle up?', 'You got this!', 'Ai.js error: not enough fish', 'if(this.isFood() === false){...}',
      './src/components/CommentPage.js\nSyntax error: Unexpected token (43:83)']
    return placeHolders[Math.floor(Math.random() * placeHolders.length)]
  }

  render() {
    const isInvalid =
      this.state.comment === ''

    return (
      <div>
        <h1>Comment Page</h1>
        <h3>Please leave a comment for this profile:</h3>
        <p className="Box">{this.state.parentProfile}</p>
        <h3>Previous comment:</h3>
        <p className="Box">{this.state.previousComment}</p>
        <h3>Your comment:</h3>
        <form onSubmit={(e) => this.onSubmit(e)}>
          <input
            value={this.state.comment}
            onChange={event => this.setState({ comment: event.target.value })}
            type="text"
            placeholder={this.makeAPH()}
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
