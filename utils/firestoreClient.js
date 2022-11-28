import {
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { auth, db } from "../firebase/clientApp";

const getUserWatchList = async () => {
  const user = auth.currentUser;
  return getDoc(doc(db, "users", user.phoneNumber))
    .then(async (response) => {
      return response.data().watchList;
    })
    .catch((error) => {
      return Promise.reject("response was empty");
    });
};

const addDataToUserWatchList = async (symbol) => {
  const user = auth.currentUser;
  const docRef = doc(db, "users", user.phoneNumber);
  await updateDoc(docRef, {
    watchList: arrayUnion(symbol),
  });
};

const removeDataFromUserWatchList = async (symbol) => {
  const user = auth.currentUser;
  const docRef = doc(db, "users", user.phoneNumber);
  await updateDoc(docRef, {
    watchList: arrayRemove(symbol),
  });
};

const updateUserWatchList = (method, symbol) => {
  return method === "add"
    ? addDataToUserWatchList(symbol)
    : method === "remove"
    ? removeDataFromUserWatchList(symbol)
    : Promise.reject(`unknown method passed to updateUserWatchList ${method}`);
};

export { getUserWatchList, updateUserWatchList };
