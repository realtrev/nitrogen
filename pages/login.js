import { RiGoogleFill } from "react-icons/ri";

export default function Login({ Component, pageProps }) {
  return (
    <div className="w-screen h-screen bg-gradient-to-tl from-primary-1 to-red flex items-center justify-center">
        <div className="w-[32rem] h-auto bg-mid rounded-2xl px-6 shadow-2xl">
            <div className="pt-8 text-red font-bold text-3xl text-center select-none">
              nitrogen
            </div>
            <div className="gap-1 py-8 flex flex-col">
              <h1 className="text-xs text-sub3 font-extrabold">USERNAME OR EMAIL</h1>
              <input type="email" className="px-4 w-full py-3 rounded-lg bg-black outline-none text-white" />
              <h1 className="text-xs text-sub3 font-extrabold pt-5">PASSWORD</h1>
              <input type="password" className="px-4 w-full py-3 rounded-lg bg-black outline-none text-white" />
              <a href="/login/help" className="text-xs">Having trouble logging in?</a>
            </div>
            <div className="flex flex-col gap-1">
              <button className="hover:shadow-2xl shadow-primary-1 group duration-200 w-full h-14 bg-primary-2 rounded-lg font-bold text-primary-1 hover:bg-primary-1 hover:text-white disabled:bg-high disabled:text-sub3">
                Log in
              </button>
              <p className="text-xs text-sub3">Need an account? <a href="/login/help" className="text-xs">Register</a></p>
            </div>
            <div className="flex items-center gap-3 text-sub py-3">
              <div className="border-b border-b-high flex-grow" />
              <div className="flex-shrink-0">OR</div>
              <div className="border-b border-b-high flex-grow" />
            </div>
            <div className="pb-6">
              <button className="flex items-center justify-center gap-2 duration-200 w-full h-14 bg-white rounded-lg font-bold text-mid hover:bg-primary-1 hover:text-white disabled:bg-high disabled:text-sub3">
                <RiGoogleFill className="text-2xl" />
                Log in with Google
              </button>
            </div>
        </div>
    </div>
  );
}