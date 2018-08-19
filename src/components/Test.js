import React, { Component } from 'react'
import AuthUserContext from './AuthUserContext'
import withAuthorization from './withAuthorization'
import { base } from '../configuration/firebase'


class Test extends Component {
  render() {
    return (
      <div>
        <AuthUserContext.Consumer>
          {authUser => {


            //If you need to use the user Id for your CRUD write it here and use authUser.uid
            //Please use Re-Base, examples on Github, Home.js and SignUp.js


            {console.log(authUser.uid)}
            return null
          }}
        </AuthUserContext.Consumer>

        <h1>Test page</h1>
      </div>

    )
  }
}

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition, Test)
