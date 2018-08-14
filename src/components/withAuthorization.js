import React from 'react'
import { withRouter } from 'react-router-dom'

import AuthUserContext from './AuthUserContext'
import { auth } from '../configuration/firebase'
import * as routes from '../constants/routes'

const withAuthorization = (authCondition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      auth.onAuthStateChanged(authUser => {
        if (!authCondition(authUser)) {
          this.props.history.push(routes.SIGN_IN)
        }
      })
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          { authUser => authUser ? <Component /> : null }
        </AuthUserContext.Consumer>
      )
    }
  }

  return withRouter(WithAuthorization)
}

export default withAuthorization
