import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import Navigation from './Navigation'
import LandingPage from './Landing'
import SignUpPage from './SignUp'
import SignInPage from './SignIn'
import PasswordForgetPage from './PasswordForget'
import HomePage from './Home'
import AccountPage from './Account'
import ProfilePage from './Profile'
import CommentPage from './CommentPage'
import Test from './Test'

import * as routes from '../constants/routes'
import withAuthentication from './withAuthentication'

const App = () =>
  <Router>
    <div>
      <Navigation />
      <Route exact path={ routes.LANDING } component={ () => <LandingPage /> } />
      <Route exact path={ routes.SIGN_UP } component={ () => <SignUpPage /> } />
      <Route exact path={ routes.SIGN_IN } component={ () => <SignInPage /> } />
      <Route exact path={ routes.PASSWORD_FORGET } component={ () => <PasswordForgetPage /> } />
      <Route exact path={ routes.HOME } component={ () => <HomePage /> } />
      <Route exact path={ routes.ACCOUNT } component={ () => <AccountPage /> } />
      <Route exact path={ routes.TEST } component={ () => <Test /> } />
      <Route exact path={ routes.PROFILE } component={ProfilePage} />
      <Route exact path={ routes.COMMENT } component={CommentPage} />
    </div>
  </Router>

export default withAuthentication(App)
