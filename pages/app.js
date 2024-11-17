import { signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Protected({ user }) {


  return (
    <div className="bg-mid text-white w-screen h-screen flex flex-col justify-center items-center text-xl gap-2">
      <h1>Protected Page</h1>
      <h1>You are signed in and can view this page.</h1>
      <h1>Welcome, {user?.name} ({user?.username})</h1>
      <h1>Account created: {user?.userCreatedAt}</h1>
      <button onClick={() => window.location.href = "/messages/direct"} className="select-none duration-200 font-bold h-10 px-5 text-primary-1 outline-2 focus-visible:outline-primary-1 hover:text-white hover:bg-primary-1 rounded-lg bg-primary-2 outline-none">
        Enter Chat
      </button>
      
      <button onClick={() => signOut()} className="select-none duration-200 font-bold h-10 px-5 text-primary-1 outline-2 focus-visible:outline-primary-1 hover:text-white hover:bg-primary-1 rounded-lg bg-primary-2 outline-none">
        Log out
      </button>
    </div>
  );
}


export async function getServerSideProps(context) {
  const session = await getSession(context);
  // console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  if (session.user.registerGoogle) {
    return {
      redirect: {
        destination: "/register/google",
        permanent: false,
      },
    }
  }

  return {
    props: {
      user: session.user,
    },
  };
}

export default Protected;