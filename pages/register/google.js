import { RiGoogleFill } from "react-icons/ri";
import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";

function Login({ session }) {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("USERNAME");
  const [allowUsername, setAllowUsername] = useState(false);
  const [clear, setClear] = useState(false);
  const usernameField = useRef(null);

  function setToDefaults() {
    setEmail("");
    setUsername("");
    setPassword("");
    setAllowEmail(false);
    setAllowUsername(false);
    setAllowPassword(false);
    setEmailErrorMessage("EMAIL");
    setUsernameErrorMessage("USERNAME");
    setPasswordErrorMessage("PASSWORD");
    setWaitingForVerification(false);
  }

  // after the DOM updates, if we need to clear the elements, clear them
  useEffect(() => {
    if (clear) {
      setToDefaults();
      setClear(false);
    }
  });

  function handleLogin(e) {
    e.preventDefault();
    // emailError();
    // usernameError();
    // passwordError();
    if (!username.length) {
      usernameField.current.focus();
      return;
    }
    console.log("login");
    const data = {
      username: username,
    };
    // send to /api/auth/register as POST
    axios.post("/api/accounts/google", data).then((res) => {
      console.log(res.data);
      if (!res) {
        console.log("Connection error");
        return;
      }
      const data = res.data;
      if (!data.validUsername) {
        setUsernameErrorMessage(`USERNAME - ${data.usernameMessage.toUpperCase()}`);
      } else {
        setUsernameErrorMessage('USERNAME');
      }
      if (data.verified) {
        router.push("/app");
      }
    }).catch((err) => {
      setUsernameErrorMessage(`USERNAME - CANNOT CONNECT TO SERVER`);
    });
  }

  function handleUsernameKeyPress(e) {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  }

  function handleUsernameChange(e) {
    // username must be at least 3 characters long and only contain letters and numbers and underscores
    const usernameRegex = /^[a-zA-Z0-9_]+$/g;
    const usernameIsValid = usernameRegex.test(e.target.value);
    // remove the not allowed characters
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9_]/g, "");
    if (usernameIsValid && e.target.value.length >= 1) {
      setAllowUsername(true);
    } else {
      setAllowUsername(false);
    }
    setUsername(e.target.value.trim());
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-tl from-primary-1 to-red flex items-center justify-center select-none">
      <div className="w-[32rem] h-auto bg-gradient-to-tl from-mid to-message rounded-2xl px-6 shadow-2xl">
        <div className="pt-10 text-white font-bold text-2xl text-center">
          Almost done!
        </div>
        <div className="text-sub3 text-sm text-center w-3/4 mx-auto pt-2">To continue, create a username for your Google account. Don't worry, you can change this later.</div>
        <div className="gap-1 pb-8 pt-3 flex flex-col">
          <h1 className={`text-xs font-extrabold pt-5 ${usernameErrorMessage === 'USERNAME' ? 'text-sub3' : 'text-red'}`}>{usernameErrorMessage}</h1>
          <input ref={usernameField} onKeyDown={handleUsernameKeyPress} onChange={handleUsernameChange} type="text" className="px-4 w-full py-3 rounded-lg bg-black outline-none text-white" />
        </div>
        <div className="flex flex-col gap-1 pb-5">
            <button  onClick={(e) => handleLogin(e)} className="flex items-center justify-center gap-2 duration-200 w-full h-14 bg-primary-2 rounded-lg font-bold text-primary-1 hover:bg-primary-1 hover:text-white disabled:bg-high disabled:text-sub3">
              <RiGoogleFill className="text-2xl" />
              Create my Nitrogen account with Google
            </button>
          <p className="text-xs text-sub3">Already have an account? <button onClick={(e) => router.push('/login')} className="text-xs text-primary-1 hover:underline">Log in</button></p>
        </div>
        <div className="text-2xs text-sub2 py-5">
          By registering, you agree to Nitrogen's <button onClick={(e) => router.push('/legal/terms')} className="text-2xs text-primary-1 hover:underline">Terms of Service</button> and <button onClick={(e) => router.push('/legal/privacy')} className="text-2xs text-primary-1 hover:underline">Privacy Policy</button>
        </div>
      </div>
    </div>
  );
}

export default Login;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session);
  if (session?.user?.nitrogen) {
    return {
      redirect: {
        destination: "/app",
        permanent: false,
      },
    };
  }
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      user: session?.user || null,
    },
  };
}