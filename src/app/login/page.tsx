"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../firebase/firebase";
import { User } from "firebase/auth";

import Link from "next/link";

const LoginPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }else{
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        router.push("/dashboard");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred while signing in with Google.");
      }
      console.error("Error signing in with Google Auth:", error);
    }
  };
  

  
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        // Retrieve user data from local storage
        const registrationData = localStorage.getItem("registrationData");
        const { firstName = "", lastName = "", gender = "" ,} = registrationData ? JSON.parse(registrationData): {};

        // Check if user exists in Firebase
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (!userDoc.exists()) {
          // Save user data to Firestore after email verification
          await setDoc(doc(firestore, "users", user.uid), {
            firstName,
            lastName,
            gender,
            email: user.email,
          });
        }

        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        setError("Please verify your email before logging in.");
      }
    } catch (error) {
      // Set appropriate error message
      if (error instanceof Error){
        setError(error.message);
      }else {
        setError("An unknown error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto font-[sans-serif] p-6">
      <form onSubmit={handleLogin}>
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <label htmlFor="email" className="text-gray-800 text-sm mb-2 block">Email</label>
            <input
            id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-gray-800 text-sm mb-2 block">Password</label>
            <input
            id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter password"
            />
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="!mt-12">
          <button
            type="submit"
            className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Login
          </button>
          <button
          onClick={signInWithGoogle}
            type="submit"
            className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Sign In with Google
          </button>
        </div>
      </form>
      <Link href="/register" className="text-sm font-light text-gray-500 dark:text-gray-400">
        Don’t have an account yet?{" "}
        <span className="font-medium text-blue-600 hover:underline dark:text-primary-500">
          Sign up
        </span>
      </Link>
    </div>
  );
};

export default LoginPage;
