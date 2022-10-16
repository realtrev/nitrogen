import { RiGoogleFill } from "react-icons/ri";
import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";
import HCaptcha from "@hcaptcha/react-hcaptcha";

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
  const [verificationError, setVerificationError] = useState("");

  const [proveHuman, setProveHuman] = useState(0);
  const [resendEmail, setResendEmail] = useState(0);

  const [clear, setClear] = useState(false);
  const emailField = useRef(null);
  const usernameField = useRef(null);
  const passwordField = useRef(null);
  const captchaRef = useRef(null);

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
  }

  // after the DOM updates, if we need to clear the elements, clear them
  useEffect(() => {
    if (clear) {
      setToDefaults();
      setClear(false);
    }
  });

  function registerWithCaptcha(captchaToken) {
    axios.post("/api/accounts/registerCaptcha", {
      email: email,
      username: username,
      password: password,
      captcha: captchaToken,
    }).then((res) => {
      console.log(res.data);
      const data = res.data;
      if (data.verifyEmail) {
        setWaitingForVerification(true);
        return;
      }
    }).catch((err) => {
      setProveHuman(false);
      console.log(err);
    });
  }

  function handleRegisterFields() {
    if (!email.length) {
      emailField.current.focus();
      return;
    }
    if (!username.length) {
      usernameField.current.focus();
      return;
    }
    if (!password.length) {
      passwordField.current.focus();
      return;
    }
    // emailError();
    // usernameError();
    // passwordError();
    console.log("login");
    const data = {
      email: email,
      username: username,
      password: password
    };
    // send to /api/auth/register as POST
    axios.post("/api/accounts/register", data).then((res) => {
      console.log(res.data);
      if (!res) {
        console.log("Connection error");
        return;
      }
      const data = res.data;
      if (data.captcha) {
        setProveHuman(true);
        return;
      }
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
    }).catch((err) => {
      console.log(err);
      setEmailErrorMessage(`EMAIL -  ${err.message.toUpperCase()}`);
      setUsernameErrorMessage(`USERNAME -  ${err.message.toUpperCase()}`);
      setPasswordErrorMessage(`PASSWORD -  ${err.message.toUpperCase()}`);
    });
  }

  function handleResendEmail(captchaToken) {
    axios.post("/api/accounts/resendEmail", {
      email: email,
      captcha: captchaToken,
    }).then((res) => {
      console.log(res.data);
      if (!res) {
        console.log("Connection error");
        return;
      }
      const data = res.data;
      if (data.verifyEmail) {
        setWaitingForVerification(true);
        return;
      }
    }).catch((err) => {
      console.log(err);
    });
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

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      setProveHuman(true);
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

  function logInWithGoogle() {
    signIn("google", {
      callbackUrl: "https://dev.paridax.xyz/register/google",
    });
  }

  function handleLogin(captchaToken) {
    console.log({
      email: email,
      username: username,
      password: password,
      captcha: captchaToken,
    })
    signIn("credentials", {
      username: username.toLowerCase(),
      password,
      captcha: captchaToken,
      redirect: false,
      callbackUrl: "https://dev.paridax.xyz/app",
    })
    .then((res) => {
      console.log(res);
      if (res.ok) {
        router.push("/app");
      } else if (res.ok === false) {
        setVerificationError("You have not verified your email yet.");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function manageCaptcha(token) {
    setProveHuman(false);
    setResendEmail(false);
    if (resendEmail) {
      handleResendEmail(token);
    } else if (!waitingForVerification) {
      registerWithCaptcha(token);
    } else {
      handleLogin(token);
    }
  }

  if (proveHuman || resendEmail) {
    if (!email.length) {
      setProveHuman(false);
    }
    if (!username.length) {
      setProveHuman(false);
    }
    if (!password.length) {
      setProveHuman(false);
    }
    return(
      <div className="w-screen h-screen bg-gradient-to-tl from-primary-1 to-red flex items-center justify-center select-none">
        <div className="w-[32rem] h-auto bg-gradient-to-tl from-mid to-message rounded-2xl px-6 shadow-2xl flex items-center justify-center pb-10 flex-col">
        <div className="pt-10 text-white font-bold text-2xl text-center">
          {waitingForVerification ? "Almost there!" : "Prove you're human"}
        </div>
        <div className="pb-6 text-sub3 text-sm text-center w-3/4 mx-auto pt-2">We just want to make sure you're a real person. Complete the challenge below.</div>
          <HCaptcha
            id="captcha"
            size="normal"
            ref={captchaRef}
            theme="dark"
            sitekey={"a3e7bdd3-bfb2-4b7a-9eed-9a7f2ddb8cd7"}
            onVerify={(token) => manageCaptcha(token)}
            className="select-none w-full"
          />
        </div>
      </div>
    );
  }

  if (waitingForVerification) {
    return (
      <div className="w-screen h-screen bg-gradient-to-tl from-primary-1 to-red flex items-center justify-center select-none">
      <div className="w-[32rem] h-auto bg-gradient-to-tl from-mid to-message rounded-2xl px-6 shadow-2xl">
        <div className="pt-10 text-white font-bold text-2xl text-center">
          Create an account
        </div>
        <div className="gap-1 pb-8 pt-10 flex flex-col">
          <div className="w-full bg-darker rounded-lg py-20">
            <h1 className="text-white font-bold animate-pulse text-center text-xl w-full">Check your inbox...</h1>
            <p className={`${verificationError.length ? 'text-red' : 'text-sub3'} text-center text-sm w-full font-medium`}>{verificationError.length ?  verificationError : 'Verification links last for 15 minutes'}</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <button onClick={() => setProveHuman(true)} className="hover:shadow-2xl group duration-200 w-full h-14 bg-primary-2 rounded-lg font-bold text-primary-1 hover:bg-primary-1 hover:text-white disabled:bg-high disabled:text-sub3">
            I have verified my email
          </button>
          <button onClick={() => setClear(true)} className="hover:shadow-2xl mt-2 group duration-200 w-full h-14 bg-red rounded-lg font-bold text-white hover:bg-white hover:text-mid disabled:bg-high disabled:text-sub3">
            Back to register
          </button>
          <p className="text-xs text-sub3">Already have an account? <button onClick={(e) => router.push('/login')} className="text-xs text-primary-1 hover:underline">Log in</button></p>
        </div>

        <div className="text-2xs text-sub2 py-5">
          {"By registering, you agree to Nitrogen's "}<button onClick={(e) => router.push('/legal/terms')} className="text-2xs text-primary-1 hover:underline">Terms of Service</button> and <button onClick={(e) => router.push('/legal/privacy')} className="text-2xs text-primary-1 hover:underline">Privacy Policy</button>
        </div>
      </div>
    </div>
    )
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-tl from-primary-1 to-red flex items-center justify-center select-none">
      <div className="w-[32rem] h-auto bg-gradient-to-tl from-mid to-message rounded-2xl px-6 shadow-2xl">
        <div className="pt-10 text-white font-bold text-2xl text-center">
          Create an account
        </div>
        <div className="gap-1 pb-8 pt-10 flex flex-col">
          <h1 className={`text-xs font-extrabold pt-5 ${emailErrorMessage === 'EMAIL' ? 'text-sub3' : 'text-red'}`}>{emailErrorMessage}</h1>
          <input ref={emailField} onKeyDown={handleKeyPress} onChange={handleEmailChange} type="email" className="px-4 w-full py-3 rounded-lg bg-black outline-none text-white" />
          <h1 className={`text-xs font-extrabold pt-5 ${usernameErrorMessage === 'USERNAME' ? 'text-sub3' : 'text-red'}`}>{usernameErrorMessage}</h1>
          <input ref={usernameField} onKeyDown={handleKeyPress} onChange={handleUsernameChange} type="text" className="px-4 w-full py-3 rounded-lg bg-black outline-none text-white" />
          <h1 className={`text-xs font-extrabold pt-5 ${passwordErrorMessage === 'PASSWORD' ? 'text-sub3' : 'text-red'}`}>{passwordErrorMessage}</h1>
          <input ref={passwordField} onKeyDown={handleKeyPress} onChange={handlePasswordChange} type="password" className="px-4 w-full py-3 rounded-lg bg-black outline-none text-white" />
        </div>
        <div className="flex flex-col gap-1">
          <button onClick={() => handleRegisterFields()} className="hover:shadow-2xl shadow-primary-1 group duration-200 w-full h-14 bg-primary-2 rounded-lg font-bold text-primary-1 hover:bg-primary-1 hover:text-white disabled:bg-high disabled:text-sub3">
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
          <button onClick={logInWithGoogle} className="flex items-center justify-center gap-2 duration-200 w-full h-14 bg-white rounded-lg font-bold text-mid hover:bg-primary-1 hover:text-white disabled:bg-high disabled:text-sub3">
            <RiGoogleFill className="text-2xl" />
            Log in with Google
          </button>
        </div>
        <div className="text-2xs text-sub2 py-5">
          By registering, you agree to {"Nitrogen's"} <button onClick={(e) => router.push('/legal/terms')} className="text-2xs text-primary-1 hover:underline">Terms of Service</button> and <button onClick={(e) => router.push('/legal/privacy')} className="text-2xs text-primary-1 hover:underline">Privacy Policy</button>
        </div>
      </div>
    </div>
  );
}