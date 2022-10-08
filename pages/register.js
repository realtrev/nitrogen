import { RiGoogleFill } from "react-icons/ri";
import { useRouter } from "next/router";

export default function Login({ Component, pageProps }) {
  const router = useRouter();

  return (
    <div className="w-screen h-screen bg-gradient-to-tl from-primary-1 to-red flex items-center justify-center select-none">
      <div className="w-[32rem] h-auto bg-gradient-to-tl from-mid to-message rounded-2xl px-6 shadow-2xl">
        <div className="pt-10 text-white font-bold text-2xl text-center">
          Create an account
        </div>
        <div className="gap-1 pb-8 pt-10 flex flex-col">
          <h1 className="text-xs text-sub3 font-extrabold">EMAIL</h1>
          <input type="email" className="px-4 w-full py-3 rounded-lg bg-black outline-none text-white" />
          <h1 className="text-xs text-sub3 font-extrabold pt-5">USERNAME</h1>
          <input type="email" className="px-4 w-full py-3 rounded-lg bg-black outline-none text-white" />
          <h1 className="text-xs text-sub3 font-extrabold pt-5">PASSWORD</h1>
          <input type="password" className="px-4 w-full py-3 rounded-lg bg-black outline-none text-white" />
        </div>
        <div className="flex flex-col gap-1">
          <button className="hover:shadow-2xl shadow-primary-1 group duration-200 w-full h-14 bg-primary-2 rounded-lg font-bold text-primary-1 hover:bg-primary-1 hover:text-white disabled:bg-high disabled:text-sub3">
            Continue
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
        <div className="text-2xs p-1 text-sub2 py-5">
          By registering, you agree to Nitrogen's <button onClick={(e) => router.push('/legal/terms')} className="text-2xs text-primary-1 hover:underline">Terms of Service</button> and <button onClick={(e) => router.push('/legal/privacy')} className="text-2xs text-primary-1 hover:underline">Privacy Policy</button>
        </div>
      </div>
      {/* <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs w-80 text-center p-1 text-high">
        By registering, you agree to Nitrogen's <a href="/terms" className="text-xs text-primary-2">Terms of Service</a> and <a href="/privacy" className="text-xs text-primary-2">Privacy Policy</a>
      </div> */}
    </div>
  );
}