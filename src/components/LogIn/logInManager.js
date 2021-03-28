import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const fbProvider = new firebase.auth.FacebookAuthProvider();

export const gitProvider = new firebase.auth.GithubAuthProvider();

const setUser = res => {
    const {email, displayName, photoURL} = res.user;
    const newUser = {
        email,
        name: displayName,
        photo: photoURL
    };
    return newUser;
};

export const handleSignIn = (provider) => {
    return firebase.auth()
    .signInWithPopup(provider)
    .then(res => {
        return setUser(res);
    })
    .catch(err => {
        return err;
    });
};

export const handleSignOut = () => {
    return firebase.auth()
    .signOut()
    .then(() => {
      return {};
    })
    .catch(err => {
      console.log(err.message);
    });
};

const UpdateUserInfo = (name) => {
    firebase.auth().currentUser
    .updateProfile({
    displayName: name
    })
    .then(() => {
    
    })
    .catch(err => {
        console.log(err.message);
    });
};

export const createUser = user => {
    const { email, password, name} = user;
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
        UpdateUserInfo(name);
        return setUser(res);
    })
    .catch(err => {
        return err;
    });
};

export const signInUserWithEmailAndPassword = user => {
    const {email, password} = user;
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
        return setUser(res);
    })
    .catch(err => {
        return err;
    });
};

export const DeleteUserAccount = ()=> {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
        return currentUser.delete()
        .then(()=> {
            return {};
        })
        .catch(err=> {
            console.log(err)
        });
    };
};