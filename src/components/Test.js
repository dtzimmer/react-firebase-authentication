import React, { Component } from 'react'
import AuthUserContext from './AuthUserContext'
import withAuthorization from './withAuthorization'
import { base, getOldestProfile } from '../configuration/firebase'


class Test extends Component {

async getOldest() { await getOldestProfile() };

  render() {
    return (
      <div>
        <h1>Test page</h1>

        {console.log(this.getOldest())}
        {console.log(getOldestProfile())}


      </div>

    )
  }
}

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition, Test)
