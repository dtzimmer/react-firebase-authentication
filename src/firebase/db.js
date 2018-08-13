import {db} from './firebase';

// This is where we write our API, exporting endpoints as consts so that we can keep them all in one place

//Create a new user. We don't need to write an empty attribues [] or profile = '' because firebase won't save
//that anyway

export const doCreateUser = (id, username, email) => {
    db.ref(`users/${id}`).set({
        username,
        email,
    });
}

/*This is called by the component Profile.js to write a profile object
First test if there is an existing profile for the parentUser
If the parentUser's profile is null we need to write a new profile object in the DB
Write that new profile object, and make sure the profile and parentUser both point to each other's keys
Else, we know they already have a profile so take that profile key and update the corresponding profile*/

//params: parentUser is the db key of the user writing a profile
//        profile is a string from the Profile.js input form containing profile content

export const doUpdateProfile = async (parentUser, profile) => {

    /*Here we query the db for the profileKey associated with the ParentUser
    Without async/await the const currentProfile will end up holding a promise. We want the value of that promise
    and async/await gives us that behavior. There are two options: We get back the db key of the profile if one already
    exists for this user or null if they haven't made one yet*/

    const currentProfile = await db.ref(`users/${parentUser}/profileKey`).once('value')
        .then(snapshot => {
                return (
                    snapshot.val()
                )
            }
        )

    //If currentProfile is null we know that the parentUser hasn't created a profile yet

    if (currentProfile == null) {

        //This line serves two purposes. It pushes a new profile to the DB. Pushing creates a key for us
        //to reference the new profile by so we store that in const profileKey

        const profileKey = db.ref().child('profiles').push().key;

        //update the parentUser to contain the profileKey so that given a user we can pull its profile from db

        db.ref(`users/${parentUser}`).update({
            profileKey
        });

        //Lastly we update the newly made profile with the profile contents and the parentUser so that given a profile
        //we can access its parentUser from the DB. This will be useful later to pull parentUser attributes for a profile

        db.ref(`profiles/${profileKey}`).update({
            profile,
            parentUser,
        });
    }

    //currentProfile had a db key in it so update the old profile at that location

    else {
        console.log('profile update')
        db.ref(`profiles/${currentProfile}`).update({
            profile
        });
    }

}


export const onceGetUsers = () =>
    db.ref('users').once('value');

//Yeah... this isn't working. It's the same damn code as above and I can't even get the profileKey let alone the profile
//AAAAAAAAAAAAAAAAAAAA

export const onceGetProfileKey = async (parentUser) => {
    await db.ref(`users/${parentUser}/profileKey`).once('value')
        .then(snapshot => {
            console.log(snapshot.val())
                return (
                    snapshot.val()
                )
            }
        )
}

export const onceGetProfileByKey = async (profileKey) => {

    await db.ref(`profiles/${profileKey}/profile`).once('value')
        .then(snapshot => {
                console.log(snapshot.val())
                return (
                    snapshot.val()
                )
            }
        )
}