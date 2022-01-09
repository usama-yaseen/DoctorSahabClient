
import { db } from "./firestore";
import {
  collection,
  addDoc,
  query,
  where,
  setDoc,
  getDocs,
  arrayUnion,
  arrayRemove,
  getDoc, updateDoc, doc
} from "firebase/firestore";


export const Send_Message = async (Doctor, new_msg, time) => {
  const q = query(collection(db, "Messages"), where("Client_id", "==", auth.currentUser.email), where("Doctor_id", "==", Doctor));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((data) => {
    console.log(data.id, " => ", data.data());
    updateDoc(doc(db, "Messages", data.id), {
      Msgs: arrayUnion(new_msg),
      timestamp: time,
      Last_Msg: new_msg.text
    });
  })
};

export const get_Chats = async (setChats, setLoading,Email) => {
  let q = query(collection(db, "Messages"), where("Client_id", "==", Email));
  const querySnapshot = await getDocs(q);

  let arr = []
  querySnapshot.forEach((doc) => {
    arr.push(doc.data())
  })
  setChats(arr);
  setLoading(false)
};
