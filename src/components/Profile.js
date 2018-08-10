import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import AuthUserContext from './AuthUserContext';

import { auth, db } from '../firebase';

import * as routes from '../constants/routes';
import withAuthorization from "./withAuthorization";

const curProfile = db.onceGetProfile

const ProfilePage = ({history}) =>
    <div>
        <h1>Profile</h1>
        <ProfileForm history={history} />
        <div>{curProfile}</div>
    </div>

const INITIAL_STATE = {
    username: '',
    error: null,
    showAuth: false
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class ProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        const {profile}
         = this.state;
        console.log(profile)


        this.setState({showAuth: true});
        event.preventDefault();
    }

    render() {
        const {
            history,
        } = this.props;

        const {
            profile
        } = this.state;

        const isInvalid =
            profile === '';

        return (
            <div>
            <form onSubmit={this.onSubmit}>
                <input
                    value={profile}
                    onChange={event => this.setState(byPropKey('profile', event.target.value))}
                    type="text"
                    placeholder="Profile goes here"
                />
                <button disabled={isInvalid} type="submit">
                    Submit
                </button>
            </form>
                {this.state.showAuth && (
                    <AuthUserContext.Consumer>
                        {authUser =>{
                            console.log(authUser)
                            db.doUpdateProfile(authUser.uid, profile)
                                .then(() => {
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

const ProfileLink = () =>
    <p>
        <Link to={routes.PROFILE}>Profile</Link>
    </p>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(ProfilePage);

export {
    ProfilePage,
    ProfileLink,
};