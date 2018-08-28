import React, { Component } from 'react'
import AuthUserContext from './AuthUserContext'
import withAuthorization from './withAuthorization'
import { base, getOldestProfile } from '../configuration/firebase'


class Test extends Component {

//   componentDidMount() {
//     this.state = {profile: ""}
//     this.getProfile()
//     console.log(this.state.profile)
//   }
//
//
//
//   getProfile() {
//     base.fetch(`/profiles`, {
//       context: this,
//       queries: {
//         orderByChild: 'timestamp',
//         limitToLast: 1
//       },
//       then: (profile) => {
//         this.setState(profile)
//       }
//     })
//   }
//
// render() {
//   return (
//       <div>
//         <h1>Test page</h1>
//       </div>
//   )
// }
//
// }

  async getOldest() { return await getOldestProfile() };


  render() {
    // const temp = this.getOldest().then(value => {return value})
    // console.log(this.getOldest().then(value => {return value}))
    // console.log(getOldestProfile())
    // console.log(temp.then(value => {return value}))

    this.getOldest().then(value => console.log(value))
    return (
      <div>
        <h1>Test page</h1>
      </div>

    )
  }
}
const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition, Test)
