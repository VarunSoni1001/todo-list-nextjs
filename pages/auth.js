import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

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
  } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (isLogin) {
      document.title = "Login";
    } else if (isSignup) {
      document.title = "Signup";
    }
  }, []);

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

  const toggleForms = () => {
    setIsLogin(!isLogin);
    setIsSignup(!isSignup);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center mt-24">
      <div className="bg-white p-8 rounded shadow-lg w-full sm:w-96">
      {isLogin && !isLoggedIn && (
          <form onSubmit={handleLogin}>
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <input
              className="mb-6 w-full p-2 border rounded-3xl"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              className="w-full mb-3 p-2 border rounded-3xl"
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
              className="w-full bg-orange-800 text-white rounded-3xl mt-4 p-2"
              type="submit"
              onClick={handleLogin}
            >
              Login
            </button>
            <p className="mt-2">
              Already have an account?{" "}
              <span
                onClick={toggleForms}
                className="link text-blue-500 cursor-pointer"
              >
                Signup
              </span>
            </p>
          </form>
        )}

        {isSignup && !isLoggedIn && (
          <form onSubmit={handleSignup}>
            <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
            <input
              className="mb-6 w-full p-2 border rounded-3xl"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              className="w-full mb-3 p-2 border rounded-3xl"
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
              className="w-full bg-orange-800 text-white rounded-3xl mt-4 p-2"
              type="submit"
              onClick={handleSignup}
            >
              Sign Up
            </button>
            <p className="mt-2">
              Already have an account?{" "}
              <span
                onClick={toggleForms}
                className="link text-blue-500 cursor-pointer"
              >
                Login
              </span>
            </p>
          </form>
        )}

        {/* {isLoggedIn && (
          <div className="mt-4">
            <span className="font-semibold text-lg">{user?.email}</span>
            <br />
            <button
              className="bg-red-500 text-white rounded mt-2 p-2"
              type="button"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        )} */}

      </div>
    </div>
  );
}
