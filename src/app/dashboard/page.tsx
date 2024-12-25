"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, getAuth } from "firebase/auth";
import { auth, firestore } from "../../firebase/firebase";
import type { User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const DashboardPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        // Check if the user exists in Firestore
        const userDocRef = doc(firestore, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          // Save Google user data to Firestore if not already saved
          const { displayName, email } = user;
          const [firstName, lastName] = displayName ? displayName.split(" ") : ["", ""];
          await setDoc(userDocRef, {
            firstName,
            lastName,
            email,
          });
          setUserName(displayName || "User");
        } else {
          // Retrieve user data from Firestore
          const userData = userDoc.data();
          setUserName(`${userData.firstName} ${userData.lastName}`);
        }
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };

  const handleChangePassword = () => {
    router.push("/passwordChange");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center flex-grow mt-10">
      {userName && (
        <h1 className="text-4xl font-bold mb-6 ml-10">Welcome, {userName}!</h1>
      )}
      <div className="space-x-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
        <button
          onClick={handleChangePassword}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
