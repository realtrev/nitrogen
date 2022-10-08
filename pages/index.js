import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-mid">
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        <div className="w-full h-20 flex items-center justify-between flex-shrink-0">
          <div className="text-2xl font-bold text-red select-none">
            nitrogen
          </div>
          <div className="flex gap-5">
            <button className="duration-200 font-bold text-white hover:text-primary-1 outline-2 focus-visible:outline-primary-1 rounded outline-none">Home</button>
            <button className="duration-200 font-bold text-sub3 hover:text-primary-1 outline-2 focus-visible:outline-primary-1 rounded outline-none">Blog</button>
          </div>
          <button onClick={(e) => router.push('/login')} className="select-none duration-200 font-bold h-10 px-5 text-primary-1 outline-2 focus-visible:outline-primary-1 hover:text-white hover:bg-primary-1 rounded-lg bg-primary-2 outline-none">
            Log in
          </button>
        </div>
        <div className="w-full flex-grow flex items-center justify-center">
          <h1 className="text-white text-3xl font-bold text-center w-3/4">Welcome to <span className="text-red font-black">Nitrogen</span>. <span className="text-red font-black">Nitrogen</span> is a chat application built by <span className="text-primary-1 font-black">Paridax</span>, mainly for showcase. Inspiration came from many popular chat apps.</h1>
        </div>
      </div>
    </div>
  )
}
