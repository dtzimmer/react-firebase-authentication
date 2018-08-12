import React, { Component } from 'react';
import AuthUserContext from './AuthUserContext';
import { db } from '../firebase';
import * as routes from '../constants/routes';
import withAuthorization from "./withAuthorization";
import { Link } from 'react-router-dom';

//This is what will ultimately be exported, a header, form and div containing the current profile.
//The last part is broken and not displaying the current profile

const ProfilePage = ({history}) =>
    <div>
        <h1>Profile</h1>
        <ProfileForm history={history} />
        <div>{curProfile}</div>
    </div>

//Our initial state

const INITIAL_STATE = {
    error: null,
    showAuth: false,
    profile: ''
};

//Our versatile handler to put profile into state as it's typed into the input

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

//Yep, this isn't working

const curProfile = db.onceGetProfile;

//This class contains our profile input form

class ProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    //There's a little magic going on here. As David explained any <tag> has to live in a return. We need
    // <AuthUserContext.Consumer> to get user ID so that we can write to db. So we put that code in the return
    //and have it only execute when showAuth == true

    onSubmit = (event) => {
        this.setState({showAuth: true});
        event.preventDefault();
    }

    render() {

        //create a boolean as to whether a profile has been entered to validate whether writing it is a good idea
        const isInvalid =
            this.state.profile === '';

        return (
            <div>
            <form onSubmit={this.onSubmit}>
                <input
                    value={this.state.profile}
                    onChange={event => this.setState(byPropKey('profile', event.target.value))}
                    type="text"
                    placeholder="Profile goes here"
                />

                <button disabled={isInvalid} type="submit">
                    Submit
                </button>
            </form>

                {/*Here's the magic mentioned above, we use <AuthUserContext.Consumer> to get the authUser token
                and call db.doUpdateProfile. After that setState to initial state to clear the form*/}

                {this.state.showAuth && (
                    <AuthUserContext.Consumer>
                        {authUser =>{
                            db.doUpdateProfile(authUser.uid, this.state.profile)
                                .then(() => {
                            this.setState({ ...INITIAL_STATE });
                                })
                                .catch(error => {
                                    this.setState(byPropKey('error', error));
                                })
                            return null
                        }}
                    </AuthUserContext.Consumer>
                )}
            </div>
        );
    }
}

//a link to this page to be exported

const ProfileLink = () =>
    <p>
        <Link to={routes.PROFILE}>Profile</Link>
    </p>

//Yeah, no idea what this does

const authCondition = (authUser) => !!authUser;

//Wrap with our higher order component so that we can access authuser

export default withAuthorization(authCondition)(ProfilePage);

//exports for this page and link

export {
    ProfilePage,
    ProfileLink,
};