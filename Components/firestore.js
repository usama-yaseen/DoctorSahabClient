import { StyleSheet, Text, SafeAreaView, Button } from "react-native";
import * as firebase from "firebase/app";
import { deleteUser, EmailAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SaveLogin } from "./AsyncStorage";

import { doc, getDoc, addDoc, setDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
  updateProfile,
} from "firebase/auth";

//Configurations For FireBase
const firebaseConfig = initializeApp({
  apiKey: "AIzaSyCn5nCGoZKzc9TpCRA0qUqcOdqqJ6zhw1E",
  authDomain: "test-1e0fe.firebaseapp.com",
  projectId: "test-1e0fe",
  storageBucket: "test-1e0fe.appspot.com",
  messagingSenderId: "471857485313",
  appId: "1:471857485313:web:a5909a2d1a5ece9d579200",
});
const auth = getAuth();
export const db = getFirestore();

export const initialize = () => {
  console.log(auth.currentUser);
  return auth.currentUser;
};

export const Create_Account = (
  userEmail,
  userPass,
  Name,
  setResponse,
  setModalVisible
) => {
  console.log("here");
  createUserWithEmailAndPassword(auth, userEmail, userPass)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(user, { displayName: Name });
      setDoc(doc(collection(db, "Clients"), userEmail), {
        Name: Name,
      });
      sendEmailVerification(user).then(() => {
        setModalVisible(true);
        console.log("Verification Link Send");
        console.log(user);
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == "auth/email-already-in-use")
        setResponse("Account already exists");
      console.log(errorCode);
      // ..
    });
};

export const SignIn = async (userEmail, userPass, setResponse, navigation) => {
  const docSnap = await getDoc(doc(db, "Clients", userEmail));

  if (docSnap.exists()) {
    console.log("Signing In");
    signInWithEmailAndPassword(auth, userEmail, userPass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        SaveLogin(user);
        if (user.emailVerified)
          navigation.replace("Home", { Email: userEmail,MyDetails:user });
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
  } else {
    setResponse("Account doesn't exist");
  }
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

export const SearchGigs = async (SearchName, setServicesList) => {
  const q = query(collection(db, "Gigs"));
  const querySnapshot = await getDocs(q);

  let gigs_array = [];
  querySnapshot.forEach((data) => {
    if (data.data().Description.includes(SearchName)) {
      gigs_array.push({ data: data.data(), id: data.id });
    }
  });
  setServicesList(gigs_array);
};

export const SaveAppointment = async (Des, DocDes, profileurl, DocName, DocId, Prob, id, navigation) => {

  console.log(auth.currentUser.displayName)
  try {
    addDoc(collection(db, "Appointments"), {
      Client_Name: auth.currentUser.displayName,
      Client_id: auth.currentUser.email,
      Description: Des,
      Doctor_Designation: DocDes,
      Doctor_Img: profileurl,
      Doctor_Name: DocName,
      Doctor_id: DocId,
      Gig_id: id,
      Problem: Prob,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  try {
    addDoc(collection(db, "Messages"), {
      Active: true,
      Client_Name: auth.currentUser.displayName,
      Client_id: auth.currentUser.email,
      Doctor_Name: DocName,
      Doctor_id: DocId,
      Last_Msg: "",
      Msgs: [],
    });
  } catch (e) {
    console.error("Error adding Message document: ", e);
  }
  navigation.replace("Appointments");
};

export const getAppointments = async (setAppointmentsList, setLoading) => {
  const q = query(
    collection(db, "Appointments"),
    where("Client_id", "==", auth.currentUser.email)
  );
  const querySnapshot = await getDocs(q);

  let Appointments_array = [];
  querySnapshot.forEach((data) => {
    Appointments_array.push(data.data());
  });
  setAppointmentsList(Appointments_array);
  setLoading(false);
};

export const getDoctorDetails = async (Doctor_id, setDocData, setLoading) => {
  const docSnap = await getDoc(doc(db, "Doctors", Doctor_id));
  setDocData(docSnap.data())
  setLoading(false)
}

export const getAppointmentDetails = async (Doctor_id, Gig_id, setDocData, setgigData, setLoading) => {
  const docSnap = await getDoc(doc(db, "Doctors", Doctor_id));
  setDocData(docSnap.data())
  const gigSnap = await getDoc(doc(db, "Gigs", Gig_id));
  setgigData(gigSnap.data())
  setLoading(false)
}

export const updateClientProfile = () => {
  let user = auth.currentUser;
  updateProfile(user, {
    displayName: Name,
  });

}