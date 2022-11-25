import React from "react";
import { useRouter } from "next/navigation";
import { auth } from "../firebase/clientApp";
import { updateUserWatchList } from "../utils/firestoreClient";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";

const Hit = ({ hit, userWatchList }) => {
  const router = useRouter();

  const {mutate, isLoading: mutationIsLoading, isError: mutationIsError, isSuccess: mutationIsSuccess} = useMutation({
    mutationFn: updateUserWatchList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userWatchList'] })
    }
  })

  if(!auth.currentUser) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <p>Please sign in and try again.</p>
        <Link href="/" className="underline">Go to sign in page</Link>
      </div>
    )
  }

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
      <p className="font-bold text-explore-blue">{hit.symbol}</p>
      {userWatchList.includes(hit.symbol) ? (
        <button
          className="bg-white text-explore-blue font-bold border border-explore-blue self-center w-10/12 p-2 rounded-lg h-content"
          onClick={(e) =>  {
            e.stopPropagation();
            mutate("remove", hit.symbol)
          }}
        >
          Followed
        </button>
      ) : (
        <button
          className="bg-explore-blue text-white font-bold self-center w-10/12 p-2 rounded-lg h-content"
          onClick={(e) => {
            e.stopPropagation();
            mutate("add", hit.symbol)
          }}
        >
          Follow
        </button>
      )}
    </div>
  );
};

export default Hit;
