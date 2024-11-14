import { app } from './config'
import { onAuthStateChanged, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, sendPasswordResetEmail } from "firebase/auth";

import { getData, writeUserData, removeData, } from "./database";


const auth = getAuth();

function onAuth(setUserProfile, setUserData) {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserProfile(user)
      // getSpecificData(`/users/${user.uid}`, setUserData)
      // getData(setUserData)
    } else {
      setUserProfile(null)
      setUserData(null)
      // getData(setUserData)
    }
  });
}

// ---------------------------Login, Sign Up and Sign In------------------------------------


async function signUpWithEmail(email, password, setUserProfile, setUserSuccess, callback) {
  try {

    const res = await createUserWithEmailAndPassword(auth, email, password)

    const user = res.user;
    setUserProfile(user)
    callback()
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    errorCode ==='auth/email-already-in-use' && setUserSuccess('La cuenta ya esta en uso')
  }

}

async function signInWithEmail(email, password, setUserProfile, setUserSuccess) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    setUserProfile(res.user)
    return res.user
  } catch (error) {
    setUserProfile(null)
    setUserSuccess('Datos Incorrectos')
    return null
  }
}
function sendPasswordReset(email, callback) {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      callback()
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}


function handleSignOut() {
  signOut(auth).then(() => {

    console.log('logout')
  }).catch((error) => {
    // An error happened.
  });

}


export { onAuth, signUpWithEmail, signInWithEmail, handleSignOut, sendPasswordReset }








// .then((userCredential) => {
//   // Signed in
//   const user = userCredential.user;

//   setUserProfile(user)
//   //  userProfile = user
//   // ...
// })
// .catch((error) => {
//   const errorCode = error.code;
//   const errorMessage = error.message;
//   console.log(error)

//   // setUserSuccess(false)
// });

// return console.log(userProfile)