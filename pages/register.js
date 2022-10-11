import { RiGoogleFill } from "react-icons/ri";
import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

export default function Login({ Component, pageProps }) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [allowEmail, setAllowEmail] = useState(false);
  const [allowUsername, setAllowUsername] = useState(false);
  const [allowPassword, setAllowPassword] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("EMAIL");
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("USERNAME");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("PASSWORD");
  const [waitingForVerification, setWaitingForVerification] = useState(false);
  const [clear, setClear] = useState(false);
  const emailField = useRef(null);
  const usernameField = useRef(null);
  const passwordField = useRef(null);

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
    console.log("login");
    const data = {
      email: email,
      username: username,
      password: password,
    };
    // send to /api/auth/register as POST
    axios.post("/api/auth/register", data).then((res) => {
      console.log(res.data);
      if (!res) {
        console.log("Connection error");
        return;
      }
      const data = res.data;
      if (!data.validEmail) {
        setEmailErrorMessage(`EMAIL - ${data.emailMessage.toUpperCase()}`);
      } else {
        setEmailErrorMessage('EMAIL');
      }
      if (!data.validPassword) {
        setPasswordErrorMessage(`PASSWORD - ${data.passwordMessage.toUpperCase()}`);
      } else {
        setPasswordErrorMessage('PASSWORD');
      }
      if (!data.validUsername) {
        setUsernameErrorMessage(`USERNAME - ${data.usernameMessage.toUpperCase()}`);
      } else {
        setUsernameErrorMessage('USERNAME');
      }
      if (data.verifyEmail) {
        setWaitingForVerification(true);
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleEmailKeyPress(e) {
    if (e.key === "Enter") {
      usernameField.current.focus();
    }
  }

  function handleEmailChange(e) {
    // use regex to check if email is valid
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const emailIsValid = emailRegex.test(e.target.value);
    if (emailIsValid) {
      setAllowEmail(true);
    } else {
      setAllowEmail(false);
    }
    setEmail(e.target.value);
  }

  function handlePasswordKeyPress(e) {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  }

  function handlePasswordChange(e) {
    // password must be at least 8 characters long
    if (e.target.value.length >= 8) {
      setAllowPassword(true);
    } else {
      setAllowPassword(false);
    }
    // remove all spaces
    setPassword(e.target.value.replace(/\s/g, ""));
    e.target.value = e.target.value.replace(/\s/g, "");
  }

  function handleUsernameKeyPress(e) {
    if (e.key === "Enter") {
      passwordField.current.focus();
    }
  }

  function handleUsernameChange(e) {
    // username must be at least 3 characters long and only contain letters and numbers and underscores
    const usernameRegex = /^[a-zA-Z0-9_]+$/g;
    const usernameIsValid = usernameRegex.test(e.target.value);
    if (usernameIsValid && e.target.value.length >= 1) {
      setAllowUsername(true);
    } else {
      setAllowUsername(false);
    }
    setUsername(e.target.value.trim());
  }

  if (waitingForVerification) {
    return (
      <div className="w-screen h-screen bg-gradient-to-tl from-primary-1 to-red flex items-center justify-center select-none">
      <div className="w-[40rem] h-auto bg-gradient-to-tl from-mid to-message rounded-2xl px-6 shadow-2xl">
        <div className="pt-10 text-white font-bold text-2xl text-center">
          Create an account
        </div>
        <div className="gap-1 pb-8 pt-10 flex flex-col">
          <div className="w-full bg-darker rounded-lg py-20">
            <h1 className="text-white font-bold animate-pulse text-center text-xl w-full">Check your inbox...</h1>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <button onClick={handleLogin} className="hover:shadow-2xl group duration-200 w-full h-14 bg-primary-2 rounded-lg font-bold text-primary-1 hover:bg-primary-1 hover:text-white disabled:bg-high disabled:text-sub3">
            I have verified my email
          </button>
          <button onClick={(e) => {
            setWaitingForVerification(false);
            setClear(true);
          }} className="hover:shadow-2xl mt-2 group duration-200 w-full h-14 bg-red rounded-lg font-bold text-white hover:bg-white hover:text-mid disabled:bg-high disabled:text-sub3">
            Back to registration
          </button>
          <p className="text-xs text-sub3">Already have an account? <button onClick={(e) => router.push('/login')} className="text-xs text-primary-1 hover:underline">Log in</button></p>
        </div>

        <div className="text-2xs text-sub2 py-5">
          By registering, you agree to Nitrogen's <button onClick={(e) => router.push('/legal/terms')} className="text-2xs text-primary-1 hover:underline">Terms of Service</button> and <button onClick={(e) => router.push('/legal/privacy')} className="text-2xs text-primary-1 hover:underline">Privacy Policy</button>
        </div>
      </div>
    </div>
    )
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-tl from-primary-1 to-red flex items-center justify-center select-none">
      <div className="w-[40rem] h-auto bg-gradient-to-tl from-mid to-message rounded-2xl px-6 shadow-2xl">
        <div className="pt-10 text-white font-bold text-2xl text-center">
          Create an account
        </div>
        <div className="gap-1 pb-8 pt-10 flex flex-col">
          <h1 className={`text-xs font-extrabold pt-5 ${emailErrorMessage === 'EMAIL' ? 'text-sub3' : 'text-red'}`}>{emailErrorMessage}</h1>
          <input ref={emailField} onKeyDown={handleEmailKeyPress} onChange={handleEmailChange} type="email" className="px-4 w-full py-3 rounded-lg bg-black outline-none text-white" />
          <h1 className={`text-xs font-extrabold pt-5 ${usernameErrorMessage === 'USERNAME' ? 'text-sub3' : 'text-red'}`}>{usernameErrorMessage}</h1>
          <input ref={usernameField} onKeyDown={handleUsernameKeyPress} onChange={handleUsernameChange} type="text" className="px-4 w-full py-3 rounded-lg bg-black outline-none text-white" />
          <h1 className={`text-xs font-extrabold pt-5 ${passwordErrorMessage === 'PASSWORD' ? 'text-sub3' : 'text-red'}`}>{passwordErrorMessage}</h1>
          <input ref={passwordField} onKeyDown={handlePasswordKeyPress} onChange={handlePasswordChange} type="password" className="px-4 w-full py-3 rounded-lg bg-black outline-none text-white" />
        </div>
        <div className="flex flex-col gap-1">
          <button onClick={handleLogin} className="hover:shadow-2xl shadow-primary-1 group duration-200 w-full h-14 bg-primary-2 rounded-lg font-bold text-primary-1 hover:bg-primary-1 hover:text-white disabled:bg-high disabled:text-sub3">
            {waitingForVerification ? 'I have verified my email' : 'Register'}
          </button>
          <p className="text-xs text-sub3">Already have an account? <button onClick={(e) => router.push('/login')} className="text-xs text-primary-1 hover:underline">Log in</button></p>
        </div>
        <div className="flex items-center gap-3 text-sub py-5">
          <div className="border-b border-b-high flex-grow" />
          <div className="flex-shrink-0">OR</div>
          <div className="border-b border-b-high flex-grow" />
        </div>
        <div>
          <button className="flex items-center justify-center gap-2 duration-200 w-full h-14 bg-white rounded-lg font-bold text-mid hover:bg-primary-1 hover:text-white disabled:bg-high disabled:text-sub3">
            <RiGoogleFill className="text-2xl" />
            Log in with Google
          </button>
        </div>
        <div className="text-2xs text-sub2 py-5">
          By registering, you agree to Nitrogen's <button onClick={(e) => router.push('/legal/terms')} className="text-2xs text-primary-1 hover:underline">Terms of Service</button> and <button onClick={(e) => router.push('/legal/privacy')} className="text-2xs text-primary-1 hover:underline">Privacy Policy</button>
        </div>
      </div>
    </div>
  );
}