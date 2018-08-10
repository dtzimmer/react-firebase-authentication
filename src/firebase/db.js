import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) => {
    const attributes = [];
    const profile = '';
    db.ref(`users/${id}`).set({
        username,
        email,
        attributes,
        profile
    });
}

export const doUpdateProfile = (id, profile) =>
    db.ref(`users/${id}`).update({
        profile
    });


export const onceGetUsers = () =>
    db.ref('users').once('value');

export const onceGetProfile = (id) =>
    db.ref(`users/${id}/profile`).once('value');
