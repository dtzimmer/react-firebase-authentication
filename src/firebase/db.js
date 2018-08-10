import {db} from './firebase';

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

export const doUpdateProfile = async (parentUser, profile) => {
    const currentProfile = await db.ref(`users/${parentUser}/profileKey`).once('value')
        .then(snapshot =>
    {return( snapshot.val() )})

    if (currentProfile == null) {
        {
            console.log('profile create')
        }
        let profileKey = db.ref().child('profiles').push().key;
        db.ref(`users/${parentUser}`).update({
            profileKey
        });
        db.ref(`profiles/${profileKey}`).update({
            profile,
            parentUser
        });
    }
    else {
        console.log('profile update')
        db.ref(`profiles/${currentProfile}`).update({
            profile,
            parentUser
        });
    }

}


export const onceGetUsers = () =>
    db.ref('users').once('value');

export const onceGetProfile = (id) =>
    db.ref(`profiles/${id}/profile`).once('value');
