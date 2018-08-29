import React, { Component } from 'react'

import withAuthorization from './withAuthorization'
import { base } from '../configuration/firebase'

class HomePage extends Component {

  state = {
    users: []
  }

  async componentDidMount() {

   await base.bindToState('users', {
      context: this,
      state: 'users',
      withRefs: true,
      asArray: true
    })

  }

  render() {
    const { users } = this.state

    return (
      <div className="background">
        <h1>Home</h1>
        { !!users && <UserList users={ users } /> }
      </div>
    )
  }
}

const UserList = ({ users }) =>
  <div>
    <h2>Welcome to Smile At My Profile!</h2>
    <p>This is a place to have fun, share ideas, and to laugh! Be nice, ok?</p>

    { Object.keys(users).map(key =>
      <div key={ key }>{ users[key].username }</div>
    ) }
  </div>

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition, HomePage)
