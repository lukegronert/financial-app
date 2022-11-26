import { getDoc, setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/clientApp";

const getUserWatchList = async () => {
  const user = auth.currentUser;
  return getDoc(doc(db, "users", user.phoneNumber))
    .then(async (response) => {
      return response.data().watchList
    })
    .catch((error) => {
      return Promise.reject("response was empty");
    })
};

const addDataToUserWatchList = async (symbol) => {
  const user = auth.currentUser;
  console.log("user", user);
  const docRef = doc(db, "users", user.phoneNumber);
  const docSnap = await getDoc(docRef);
  const userWatchList = docSnap.data().watchList;
  if (userWatchList.includes(symbol)) {
    return;
  }
  // doc(database, collection, id of user document)
  await setDoc(doc(db, "users", user.phoneNumber), {
    watchList: [...userWatchList, symbol],
  });
};

const removeDataFromUserWatchList = async (symbol) => {
  const user = auth.currentUser;
  const docRef = doc(db, "users", user.phoneNumber);
  const docSnap = await getDoc(docRef);
  const userWatchList = docSnap.data().watchList;
  if (!userWatchList.includes(symbol)) {
    return;
  }
  const currentWatchList = userWatchList;
  currentWatchList.splice(
    docSnap.data().watchList.indexOf(symbol),
    1
  );
  // doc(database, collection, id of user document)
  await setDoc(doc(db, "users", user.phoneNumber), {
    watchList: [...currentWatchList],
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
