import { getDoc, setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/clientApp";

const getUserWatchList = async () => {
  const user = auth.currentUser;
  console.log(user.phoneNumber);
  return getDoc(doc(db, "users", user.phoneNumber))
    .then(async (response) => {
      console.log('WATCHLIST', response.data().watchList)
      return response.data().watchList
    })
    .catch((error) => {
      return Promise.reject("response was empty");
    })
};

const addDataToUserWatchList = async (instrumentSymbol) => {
  const user = auth.currentUser;
  console.log("user", user);
  const docRef = doc(db, "users", user.phoneNumber);
  const docSnap = await getDoc(docRef);
  const userWatchList = docSnap.data().watchList;
  if (userWatchList.includes(instrumentSymbol)) {
    return;
  }
  console.log('CURRENT',userWatchList)
  // doc(database, collection, id of user document)
  await setDoc(doc(db, "users", user.phoneNumber), {
    watchList: [...userWatchList, instrumentSymbol],
  });
};

const removeDataFromUserWatchList = async (instrumentSymbol) => {
  const user = auth.currentUser;
  const docRef = doc(db, "cities", user.phoneNumber);
  const docSnap = await getDoc(docRef);
  const userWatchList = docSnap.data().watchList;
  if (!userWatchList.includes(instrumentSymbol)) {
    return;
  }
  const currentWatchList = userWatchList;
  currentWatchList.splice(
    userDoc.data().watchList.indexOf(instrumentSymbol),
    1
  );
  // doc(database, collection, id of user document)
  await setDoc(doc(db, "users", user.phoneNumber), {
    watchList: [...currentWatchList],
  });
};

const updateUserWatchList = (method, symbol) => {
  method === "add"
    ? addDataToUserWatchList(symbol)
    : method === "remove"
    ? removeDataFromUserWatchList(symbol)
    : Promise.reject(`unknown method passed to updateUserWatchList ${method}`);
};

export { getUserWatchList, updateUserWatchList };
