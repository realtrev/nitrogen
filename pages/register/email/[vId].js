import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Verify({ linkExists, verified, linkExpired }) {
  const router = useRouter();

  const [success, setSuccess] = useState(verified);

  const { vId } = router.query;

  useEffect(() => {
    // send a get request to /api/auth/register/[confirmationString]
    console.log(vId);
  }, [vId]);

  return (
    <div className="w-screen h-screen bg-gradient-to-tl from-primary-1 to-red flex items-center justify-center select-none">
    <div className="w-[40rem] h-auto bg-gradient-to-tl from-mid to-message rounded-2xl px-6 shadow-2xl">
      <div className="pt-10 text-white font-bold text-2xl text-center">
        Create an account
      </div>
      <div className="gap-1 pb-8 pt-10 flex flex-col">
        <div className="w-full bg-darker rounded-lg py-20">
          {!success ?
          <div className="text-white text-center">
            <h1 className="text-white font-bold text-center text-2xl w-full">This verification link doesn't work anymore.</h1>
            <p className="text-sub3 text-center mt-2 w-full">Please try registering again or close this window.</p>
          </div>
          :
          <div className="text-white text-center">
            <h1 className="text-white font-bold text-center text-2xl w-full">Email address verified!</h1>
            <p className="text-sub3 text-center mt-2 w-full">You can now log in to your account.</p>
          </div>
          }
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <button onClick={(e) => {
          window.close();
        }} className="hover:shadow-2xl group duration-200 w-full h-14 bg-primary-2 rounded-lg font-bold text-primary-1 hover:bg-primary-1 hover:text-white disabled:bg-high disabled:text-sub3">
          Close this window
        </button>
        <button onClick={(e) => router.push('/register')} className="hover:shadow-2xl mt-2 group duration-200 w-full h-14 bg-red rounded-lg font-bold text-white hover:bg-white hover:text-mid disabled:bg-high disabled:text-sub3">
          Back to registration
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

export async function getServerSideProps(context) {
  const { vId } = context.query;
  console.log(vId);
  let linkExists = false;
  let linkExpired = false;
  let verified = false;
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/accounts/verify/${vId}`);

  if (res.data.success) {
    verified = true;
    linkExists = true;
  } else {
    linkExpired = true;
  }

  return {
    props: {
      linkExists,
      linkExpired,
      verified
    }
  }
}