import React from 'react'

import AuthUserContext from './AuthUserContext'
import { auth } from '../configuration/firebase'

const withAuthentication = (Component) =>
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        authUser: null
      }
      this.setAuthentication = this.setAuthentication.bind(this);
    }

    setAuthentication(authUser){
      if(authUser){
        this.setState({ authUser: authUser })
      }
      else{
        this.setState({ authUser: null })
      }
    }

    componentDidMount() {
      auth.onAuthStateChanged(authUser => {
        this.setAuthentication(authUser);
      })
    }

    render() {
      const { authUser } = this.state

      return (
        <AuthUserContext.Provider value={ authUser }>
          <Component/>
        </AuthUserContext.Provider>
      )
    }
  }

export default withAuthentication
