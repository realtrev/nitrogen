import { RiGoogleFill } from "react-icons/ri";
import { useRouter } from "next/router";
import { useSession, getSession, signIn, getCsrfToken, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

function Login({ providers, csrfToken }) {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("USERNAME");
  const [allowUsername, setAllowUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("PASSWORD");
  const [allowPassword, setAllowPassword] = useState(false);
  const [clear, setClear] = useState(false);

  useEffect(() => {
    console.log(providers);
  }, [providers]);

  function logInWithGoogle() {
    signIn("google", {
      callbackUrl: "https://dev.paridax.xyz/register/google",
    });
  }

  function logIn() {
    console.log({
      username: username,
      password: password,
    })
    signIn("credentials", {
      username,
      password,
      redirect: false,
      callbackUrl: "https://dev.paridax.xyz/app",
    })
    .then((res) => {
      console.log(res);
      if (res.ok) {
        router.push("/app");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleUsernameChange(e) {
    setUsername(e.target.value.trim());
    e.target.value = e.target.value.trim();
    if (e.target.value.length > 0) {
      setAllowUsername(true);
    } else {
      setAllowUsername(false);
    }
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      logIn();
    }
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value.trim());
    e.target.value = e.target.value.trim();
    if (e.target.value.length > 0) {
      setAllowPassword(true);
    } else {
      setAllowPassword(false);
    }
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-tl from-primary-1 to-red flex items-center justify-center select-none">
        <div className="w-[32rem] h-auto bg-gradient-to-tl from-mid to-message rounded-2xl px-6 shadow-2xl">
          <div className="pt-10 text-white font-bold text-2xl text-center">
            Welcome back!
          </div>
          <div className="gap-1 py-8 flex flex-col">
            <h1 className="text-xs text-sub3 font-extrabold">USERNAME OR EMAIL</h1>
            <input onKeyDown={handleKeyPress} onChange={handleUsernameChange} type="email" className="px-4 w-full py-3 rounded-lg bg-black outline-none text-white" />
            <h1 className="text-xs text-sub3 font-extrabold pt-5">PASSWORD</h1>
            <input onKeyDown={handleKeyPress} onChange={handlePasswordChange} type="password" className="px-4 w-full py-3 rounded-lg bg-black outline-none text-white" />
            <div>
              <button onClick={() => {}} className="text-xs hover:underline text-primary-1">Forgot your password?</button>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <button onClick={() => logIn()} className="hover:shadow-2xl shadow-primary-1 group duration-200 w-full h-14 bg-primary-2 rounded-lg font-bold text-primary-1 hover:bg-primary-1 hover:text-white disabled:bg-high disabled:text-sub3">
              Log in
            </button>
            <div>
              <p className="text-xs text-sub3">Need an account? <button onClick={(e) => router.push('/register')} className="text-xs hover:underline text-primary-1">Register</button></p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sub py-5">
            <div className="border-b border-b-high flex-grow" />
            <div className="flex-shrink-0">OR</div>
            <div className="border-b border-b-high flex-grow" />
          </div>
          <div className="pb-10">
            <button onClick={() => logInWithGoogle()} className="flex items-center justify-center gap-2 duration-200 w-full h-14 bg-white rounded-lg font-bold text-mid hover:bg-primary-1 hover:text-white disabled:bg-high disabled:text-sub3">
              <RiGoogleFill className="text-2xl" />
              Log in with Google
            </button>
          </div>
        </div>
    </div>
  );
}

export default Login;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/app',
        permanent: false,
      },
    }
  }

  const csrf = await getCsrfToken(context)
  console.log(csrf);

  return {
    props: {
      providers: await getProviders(),
      csrfToken: csrf,
    },
  }
}