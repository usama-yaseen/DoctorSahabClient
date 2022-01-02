import { StyleSheet, Text, SafeAreaView, Button } from "react-native";
import * as firebase from "firebase/app";
import { deleteUser, EmailAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SaveLogin } from "./AsyncStorage";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  reauthenticateWithCredential, updateProfile
} from "firebase/auth";

const firebaseConfig = initializeApp({
  apiKey: "AIzaSyBhjN_mAVV4cM-BYOGoVZASewRYs2SHCRM",
  authDomain: "fir-test-42b4e.firebaseapp.com",
  projectId: "fir-test-42b4e",
  storageBucket: "fir-test-42b4e.appspot.com",
  messagingSenderId: "24649484321",
  appId: "1:24649484321:web:7c5b526c8064b293977b60",
});
const auth = getAuth();
export const db = getFirestore();

export const initialize = () => {
  console.log(auth.currentUser)
  return auth.currentUser;
}

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // console.log(uid);
//     // console.log(user.displayName);
//     // const uid = user.uid;
//     // console.log(user.email);
//     // ...
//   } else {
//     console.log("You've been Signed Out Dude!");
//     // User is signed out
//     // ...
//   }
// });

export const Create_Account = (userEmail, userPass, Name, setResponse, setModalVisible) => {
  console.log("here");
  createUserWithEmailAndPassword(auth, userEmail, userPass)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(user, { displayName: Name })
      sendEmailVerification(user).then(() => {
        setModalVisible(true);
        console.log("Verification Link Send")
        console.log(user);
      })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == "auth/email-already-in-use")
        setResponse("Account already exists")
      console.log(errorCode);
      // ..
    });
};

export const SignIn = (userEmail, userPass, setResponse, navigation) => {
  console.log("Signing In");
  signInWithEmailAndPassword(auth, userEmail, userPass)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      SaveLogin(user);
      if (user.emailVerified)
        navigation.replace("Home");
      else {
        navigation.navigate("Verification", { tempuser: user });
      }
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      setResponse("Invalid Credidentials");
    });
};
export const SignOut = () => {
  console.log("Signing Out");
  auth.signOut().then(
    function () {
      AsyncStorage.removeItem("@Doctor-Sahab:Current-User");
      console.log("Signed Out");
    },
    function (error) {
      console.error("Sign Out Error", error);
    }
  );
  auth;
};
export const verifyUser = (user) => {
  sendEmailVerification(user).then(() => {
    console.log("Verification Link Sent..");
  });
};
const reAuthenticate = () => {
  var cred = EmailAuthProvider.credential(
    "usamayak1@outlook.com",
    "testpassword"
  );
  reauthenticateWithCredential(auth.currentUser, cred)
    .then(() => {
      console.log("User ReAuthenticated");
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};
export const deleteAccount = () => {
  var cred = EmailAuthProvider.credential(
    "usamayak1@outlook.com",
    "testpassword"
  );
  if (auth.currentUser !== null) {
    reauthenticateWithCredential(auth.currentUser, cred)
      .then(() => {
        console.log("User ReAuthenticated");
        deleteUser(auth.currentUser)
          .then(() => {
            console.log("User Deleted..");
          })
          .catch((error) => { });
      })
      .catch((error) => {
        console.log(error.message);
      });
  } else {
    alert("User Not Signed In..");
  }
};
export const resetPassword = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("Password Reset Link Sent..");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

