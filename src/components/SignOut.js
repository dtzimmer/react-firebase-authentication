import React from 'react'

import { auth } from '../configuration/firebase'

const SignOutButton = () =>
  <button type="button" onClick= {e => auth.signOut() } >Sign Out</button>

export default SignOutButton
