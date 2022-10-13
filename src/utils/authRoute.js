import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Auth({children, forceLogin, blockContent}) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const {data: session, status} = useSession();

  useEffect(() => {
    console.log(status);
    // if the user must login, and they are not logged in, redirect to login
    if (status && status === "unauthenticated") {
      console.log(session);
      if (forceLogin) {
        signIn();
      } else {
        setLoading(false);
      }
    } else if (status === "authenticated") {
      console.log(session);
      // if the user has never logged in before, redirect to register
      if (session.user.registerGoogle) {
        router.push("/register/google");
      } else if (session.forceLogout) {
        // if the user must logout, redirect to logout
        signOut();
      } else {
        // allow the page to be viewed
        setLoading(false);
      }
    }
  }, [status]);

  if (blockContent && loading) {
    return <div className="w-screen h-screen flex items-center justify-center bg-mid"></div>;
  }

  return (
    <>
      {children}
    </>
  );
}