"use client";

import SignIn from "./SignIn";

export default function Login() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-md border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black uppercase text-black mb-2 tracking-tighter">
            Realista
          </h1>
          <p className="text-black font-bold uppercase tracking-widest">
            Access Terminal
          </p>
        </div>

        <div className="space-y-6">
          <SignIn />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-4 border-black"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-black font-bold uppercase">
                or
              </span>
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold uppercase text-black mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-white border-4 border-black focus:outline-none focus:bg-accent focus:text-white text-black font-mono"
                placeholder="YOU@EXAMPLE.COM"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold uppercase text-black mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 bg-white border-4 border-black focus:outline-none focus:bg-accent focus:text-white text-black font-mono"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-4 bg-black text-white text-xl font-black uppercase border-4 border-black hover:bg-white hover:text-black transition-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
            >
              Sign in
            </button>
          </form>

          <p className="text-center text-sm text-black font-bold uppercase">
            Don't have an account?{" "}
            <a
              href="#"
              className="text-accent hover:underline font-black"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
