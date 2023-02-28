import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import fetch from "../utils/fetch"

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR("/api/userAPI",fetch);
//   console.log("hello ",user)

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) || (redirectIfFound && user?.isLoggedIn)
                                                  // If redirectIfFound is also set, redirect if the user was found 
    ) {
        console.log("hello redirectTo",redirectTo)
      Router.push(redirectTo );
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser };
}