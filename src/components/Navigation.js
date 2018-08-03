import React from 'react';
import { Link } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

const Navigation = () =>
    <AuthUserContext.Consumer>
        {authUser => authUser
            ? <NavigationAuth />
            : <NavigationNonAuth />
        }
    </AuthUserContext.Consumer>

const NavigationAuth = () =>
    <nav>
        <button><Link to={routes.LANDING}>Landing</Link></button>
        <button><Link to={routes.HOME}>Home</Link></button>
        <button><Link to={routes.ACCOUNT}>Account</Link></button>
        <SignOutButton />
    </nav>

const NavigationNonAuth = () =>
    <nav>
        <button><Link to={routes.LANDING}>Landing</Link></button>
        <button><Link to={routes.SIGN_IN}>Log In</Link></button>
    </nav>

export default Navigation;