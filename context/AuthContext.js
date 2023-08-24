import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useRouter } from "next/router";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_AUTH_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET_FIREBASE,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID_FIREBASE,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
        if (router.pathname === '/todos' || router.pathname.startsWith('/edittodo/')) {
          router.push('/');
        }
      }
    });

    return () => unsubscribe();
  }, []);


  const loginWithEmail = async (email, password) => {
    try {
      toast.loading("Logging you in...", {
        duration: 2000,
      });
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          toast.success("Logged in successfully!", {
            duration: 3000,
          });
          setIsLoggedIn(true);
          router.push('/');
        });
    } catch (error) {
      console.error(error);
      const errorCode = error.code;
      let errorMessage = "Error while logging you in, please try again.";
      if (errorCode === "auth/invalid-email") {
        errorMessage = "Invalid email address, Please enter a valid email.";
      } else if (errorCode === "auth/wrong-password") {
        errorMessage = "Invalid password, Please enter the correct password or try with google sign-in again.";
      } else if (errorCode === "auth/user-not-found") {
        errorMessage =
          "No account found with this email, Please sign up first.";
      }
      toast.error(errorMessage, {
        duration: 5000,
      });
    }
  };

  const signupWithEmail = async (email, password) => {
    try {
      toast.loading("Making your account...", {
        duration: 2000,
      });
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          toast.success("Account created successfully!", {
            duration: 3000,
          });
          setIsLoggedIn(true);
          router.push('/');
        });
    } catch (error) {
      console.error(error);
      const errorCode = error.code;
      let errorMessage = "Error while making your account, please try again.";
      if (errorCode === "auth/invalid-email") {
        errorMessage = "Invalid email address, Please enter a valid email.";
      } else if (errorCode === "auth/weak-password") {
        errorMessage =
          "The password is too weak, Please use a stronger password.";
      } else if (errorCode === "auth/email-already-in-use") {
        errorMessage = "An account with this email address already exists.";
      }
      toast.error(errorMessage, {
        duration: 5000,
      });
    }
  };

  const logout = async () => {
    try {
      await firebase
        .auth()
        .signOut()
        .then(() => {
          toast.loading("Logging you out...", {
            duration: 1000,
          });
          localStorage.removeItem('todos');
          router.push("/");
        });
    } catch (error) {
      console.error(error);
      toast.error(
        "Error while logging you out, please try again after sometime.",
        {
          duration: 5000,
        }
      );
    }
  };

  const forgotPassword = async (email) => {
    try {
      toast.loading("Sending password reset link...", {
        duration: 2000,
      });
      await firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          toast.success("Password reset email sent, Please check your mail!", {
            duration: 5000,
          });
        });
    } catch (error) {
      console.error(error);
      const errorCode = error.code;
      let errorMessage =
        "Error sending the password reset email, Please try again later.";

      if (errorCode === "auth/invalid-email") {
        errorMessage = "Invalid email address, Please enter a valid email.";
      } else if (errorCode === "auth/user-not-found") {
        errorMessage = "No user found with this email address.";
      } else if (errorCode === "auth/too-many-requests") {
        errorMessage =
          "Too many password reset requests, Please try again later.";
      } else if (errorCode === "auth/network-request-failed") {
        errorMessage =
          "Network error! Please check your internet connection and try again.";
      }

      toast.error(errorMessage, {
        duration: 5000,
      });
    }
  };



  return (
    <AuthContext.Provider
      value={{
        user,
        signupWithEmail,
        loginWithEmail,
        logout,
        forgotPassword,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
