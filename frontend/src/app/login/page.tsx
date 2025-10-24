"use client";

import SignIn from "./SignIn";

export default function Login() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-light text-gray-900 dark:text-white mb-2 tracking-tight">
            Welcome back
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-light">
            Sign in to continue to Realista
          </p>
        </div>

        <div className="space-y-6">
          <SignIn />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-400">
                or
              </span>
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 dark:text-white"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 dark:text-white"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Sign in
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <a
              href="#"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
