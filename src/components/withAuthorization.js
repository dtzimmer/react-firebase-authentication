import React from 'react'
import { withRouter } from 'react-router-dom'

import AuthUserContext from './AuthUserContext'
import { auth } from '../configuration/firebase'
import * as routes from '../constants/routes'

const withAuthorization = (authCondition, Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      auth.onAuthStateChanged((authUser) => {
        if (!authCondition(authUser)) {
          this.props.history.push(routes.SIGN_IN)
        }
      })
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          { authUser => {
              if(authUser){
                console.log('returning component from auth')
                return <Component authUser={authUser} />
              }
              console.log('returning null from auth')
              return null;
            }
          }
        </AuthUserContext.Consumer>
      )
    }
  }

  return withRouter(WithAuthorization)
}

export default withAuthorization
