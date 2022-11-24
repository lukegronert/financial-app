import React from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../firebase/clientApp";
import {
  getDocs,
  collection,
  setDoc,
  doc,
  updateDoc,
  deleteField,
} from "firebase/firestore";

const Hit = ({ hit, userWatchList, setUserWatchList }) => {
  const router = useRouter();

  const user = auth.currentUser;

  if(!auth.currentUser) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <p>Please sign in and try again.</p>
        <a href="/" className="underline">Go to sign in page</a>
      </div>
    )
  }

  const addDataToUserWatchList = async (e) => {
    e.stopPropagation();
    const querySnapshot = await getDocs(collection(db, "users"));
    const userDoc = querySnapshot.docs.find(
      (doc) => doc.data().phoneNumber === user.phoneNumber
    );
    console.log(userDoc);
    // doc(database, collection, id of user document)
    await setDoc(doc(db, "users", userDoc._document.key.path.segments[6]), {
      phoneNumber: userDoc.data().phoneNumber,
      watchList: [...userDoc.data().watchList, hit.symbol],
    });
    setUserWatchList([...userDoc.data().watchList, hit.symbol]);
  };

  const removeDataFromUserWatchList = async (e) => {
    e.stopPropagation();
    const querySnapshot = await getDocs(collection(db, "users"));
    const userDoc = querySnapshot.docs.find(
      (doc) => doc.data().phoneNumber === user.phoneNumber
    );
    console.log(userDoc);
    const currentWatchList = userDoc.data().watchList;
    currentWatchList.splice(
      userDoc.data().watchList.indexOf(hit.symbol),
      1
    );
    // doc(database, collection, id of user document)
    await updateDoc(doc(db, "users", userDoc._document.key.path.segments[6]), {
      watchList: deleteField(),
    });
    await setDoc(doc(db, "users", userDoc._document.key.path.segments[6]), {
      phoneNumber: userDoc.data().phoneNumber,
      watchList: [...currentWatchList],
    });
    setUserWatchList(...currentWatchList);
  };

  return (
    <div
      className="flex flex-col w-full h-full justify-between gap-3 cursor-pointer rounded-lg bg-white p-2"
      onClick={() => router.push(`/instruments/${hit.name}/${hit.symbol}`)}
    >
      {/* Adds logo centered in circle border as shown in challenge pictures */}
      {/* <div className="flex justify-center items-center self-center rounded-full border h-16 w-16 p-3 mb-2">
            <div className="h-10 w-10 flex justify-center items-center">
                <img src={logo.src} alt={`${name} logo`} className="max-h-10 w-10" />
          </div>
      </div> */}
      <p className="font-extrabold text-lg text-explore-blue flex-1">
        {hit.name.length > 25 ? `${hit.name.slice(0, 25)}...` : hit.name}
      </p>
      <p>{hit.symbol}</p>
      {userWatchList.includes(hit.symbol) ? (
        <button
          className="bg-white text-explore-blue font-bold border border-explore-blue self-center w-10/12 p-2 rounded-lg h-content"
          onClick={removeDataFromUserWatchList}
        >
          Followed
        </button>
      ) : (
        <button
          className="bg-explore-blue text-white font-bold self-center w-10/12 p-2 rounded-lg h-content"
          onClick={addDataToUserWatchList}
        >
          Follow
        </button>
      )}
    </div>
  );
};

export default Hit;
