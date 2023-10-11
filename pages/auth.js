import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FcGoogle } from 'react-icons/fc'

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [isSignup, setIsSignup] = useState(false);
  const {
    user,
    loginWithEmail,
    signupWithEmail,
    logout,
    forgotPassword,
    isLoggedIn,
    handleGoogleLogin,
    handleGoogleSignup
  } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { mode } = router.query;

  useEffect(() => {
    if (mode === "login") {
      setIsLogin(true);
      setIsSignup(false);
    } else if (mode === "signup" || mode === "sign-up") {
      setIsSignup(true);
      setIsLogin(false);
    }
  }, [mode]);
  

  useEffect(() => {
    if (mode === "login" || mode === "" || isLogin) {
      document.title = "Login";
    } else if (mode === "signup" || mode === "sign-up" || isSignup) {
      document.title = "Signup";
    }
  }, [mode, isLogin, isSignup]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
        if (password.length < 8) {
            toast.error("Password must be at least 8 characters long.");
        } else {
            loginWithEmail(email, password);
        }
    } else {
      toast.error("Please enter your email address and password to login.");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
        if (password.length < 8) {
            toast.error("Password must be at least 8 characters long.");
        } else {
            signupWithEmail(email, password);
        }
    } else {
      toast.error("Please enter your email address and password to signup.");
    }
  };

  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center mt-24">
      <div className="bg-white p-8 rounded shadow-xl w-full sm:w-96">
      {isLogin && !isLoggedIn && (
          <form onSubmit={handleLogin}>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <input
              className="mb-6 caret-orange-500 focus:border-orange-500 transition-colors duration-300 ease-in-out w-full p-2 border rounded-xl"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              className="w-full caret-orange-500 focus:border-orange-500 transition-colors duration-300 ease-in-out mb-3 p-2 border rounded-xl"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Add more signup fields here if needed */}

            <button
              className="w-full bg-orange-500 hover:bg-orange-800 transition-colors ease-in-out duration-200 text-white rounded-xl mt-4 p-2"
              type="submit"
              onClick={handleLogin}
            >
              Login
            </button>
            <p className="w-full text-right mt-4 text-sm">
              Don't have an account?{" "}
              <Link
              href={'/auth?mode=signup'}
                onClick={clearForm}
                className="text-orange-600 hover:underline cursor-pointer"
              >
                Signup
              </Link>
            </p>
            {/* Google login button and spacing text */}
            <div className="text-center mt-4">
              <span className="text-gray-500">- or -</span>
            </div>
            <button
              className="flex items-center justify-center gap-3 w-full bg-white transition-colors border border-gray-500 ease-in-out duration-200 text-black rounded-xl mt-4 p-2"
              type="button"
              onClick={handleGoogleLogin}
            >
              <FcGoogle size={20} />
              <span>Login with Google</span>
            </button>
          </form>
        )}

        {isSignup && !isLoggedIn && (
          <form onSubmit={handleSignup}>
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <input
              className="mb-6 w-full p-2 caret-orange-500 focus:border-orange-500 transition-colors duration-300 ease-in-out border rounded-xl"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              className="w-full mb-3 p-2 caret-orange-500 focus:border-orange-500 transition-colors duration-300 ease-in-out border rounded-xl"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              className="w-full bg-orange-500 hover:bg-orange-800 transition-colors ease-in-out duration-200 text-white rounded-xl mt-4 p-2"
              type="submit"
              onClick={handleSignup}
            >
              Sign Up
            </button>
            <p className="mt-4 w-full text-right text-sm">
              Already have an account?{" "}
              <Link
                onClick={clearForm}
                href={'/auth?mode=login'}
                className="text-orange-600 hover:underline cursor-pointer"
              >
                Login
              </Link>
            </p>
            <div className="text-center mt-4">
              <span className="text-gray-500">- or -</span>
            </div>
            <button
              className="flex items-center justify-center gap-3 w-full bg-white transition-colors border border-gray-500 ease-in-out duration-200 text-black rounded-xl mt-4 p-2"
              type="button"
              onClick={handleGoogleSignup}
            >
              <FcGoogle size={20} />
              <span>Signup with Google</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
