import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const fbProvider = new firebase.auth.FacebookAuthProvider();

export const gitProvider = new firebase.auth.GithubAuthProvider();

export const handleSignIn = (provider) => {
    return firebase.auth()
    .signInWithPopup(provider)
    .then(res => {
        const signInUser = res.user;
        signInUser.isSignIn = true;
        signInUser.error = '';
        signInUser.success = true;
        return signInUser;
    })
    .catch(err => {
        const signInUser = {};
        signInUser.error = err.message;
        signInUser.success = false;
        return signInUser;
    })
}

export const handleSignOut = () => {
    return firebase.auth()
    .signOut()
    .then(() => {
      const signOutUser = {
        isSignIn: false,
        name: "",
        email: "",
        photo: ""
      }
      return signOutUser;
    })
    .catch(err => {
      console.log(err.message);
    });
}

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
}

export const createUser = user => {
    const { email, password, name} = user;
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
        const signInUser = res.user;
        signInUser.error = '';
        signInUser.success = true;
        UpdateUserInfo(name);
        return signInUser;
    })
    .catch(err => {
        const signInUser = {};
        signInUser.error = err.message;
        signInUser.success = false;
        return signInUser;
    });
}

export const signInUserWithEmailAndPassword = user => {
    const {email, password} = user;
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
        const signInUser = res.user;
        signInUser.isSignIn = true;
        signInUser.error = '';
        signInUser.success = true;
        return signInUser;
    })
    .catch(err => {
        const signInUser = {};
        signInUser.error = err.message;
        signInUser.success = false;
        return signInUser;
    });
}

export const DeleteUserAccount = ()=> {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
        return currentUser.delete()
        .then(()=> {
            
        })
        .catch(err=> {
            console.log(err)
        });
    }
}