import React from "react";
import { useRouter } from "next/navigation";
import { updateUserWatchList } from "../utils/firestoreClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

const Hit = ({ hit, userWatchList }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { name, symbol } = hit;

  const {
    mutate,
    isLoading: mutationIsLoading,
    isError: mutationIsError,
    isSuccess: mutationIsSuccess,
  } = useMutation({
    mutationFn: ({ method, symbol }) => updateUserWatchList(method, symbol),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userWatchList"] });
    },
  });

  if (mutationIsError) {
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-col w-full h-full justify-between rounded-lg bg-white p-2">
      <Link
        href={`instruments/${name}/${symbol}`}
        className="flex flex-col w-full h-full justofy-between cursor-pointer"
      >
        <p className="font-extrabold text-lg text-explore-blue flex-1">
          {name.length > 25 ? `${name.slice(0, 25)}...` : name}
        </p>
        <p className="font-bold text-explore-blue">{symbol}</p>
      </Link>
      {userWatchList && (
        <>
          {userWatchList.includes(symbol) ? (
            <button
              className="bg-white text-explore-blue font-bold border border-explore-blue self-center w-10/12 p-2 rounded-lg h-content"
              onClick={() => {
                mutate({ method: "remove", symbol: symbol });
              }}
            >
              Followed
            </button>
          ) : (
            <button
              className="bg-explore-blue text-white font-bold self-center w-10/12 p-2 rounded-lg h-content"
              onClick={() => {
                mutate({ method: "add", symbol: symbol });
              }}
            >
              Follow
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Hit;
