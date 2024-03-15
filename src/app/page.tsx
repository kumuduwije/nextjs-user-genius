// mark as client component
"use client";

import axios from "axios";
// importing necessary functions
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image";

export default function Home() {
  // extracting data from usesession as session
  const { data: session } = useSession()

  // function to handle the post request and redirection
  const handlePostAndRedirect = async () => {
    try {
      // Make POST request to create a user
      const response = await axios.post('http://localhost:3001/api/users/', {
        name: session?.user?.name,
        email: session?.user?.email,
        imageUrl: session?.user?.image
      });

      // Extract user ID from the response
      const userId = response.data.id;

      // Redirect the user to the new route
      window.location.href = `http://localhost:3001/api/users/${userId}/customers`;

      console.log("navigate route",`http://localhost:3001/api/users/${userId}/customers` )
    } catch (error) {
      console.error("Error occurred while sending POST request:", error);
    }
  };

  // checking if sessions exists
  if (session) {
    // rendering components for logged in users
    console.log(session.user)
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="w-44 h-44 relative mb-4">
        <Image
          src={session.user?.image as string}
          fill
          alt=""
          className="object-cover rounded-full"
        />
        </div>
        <p className="text-2xl mb-2">Welcome <span className="font-bold">{session.user?.name}</span>. Signed In As</p>
        <p className="font-bold mb-4">{session.user?.email}</p>
        <button className="bg-red-600 py-2 px-6 rounded-md" onClick={() => signOut()}>Sign out</button>
        <button className="bg-blue-600 py-2 px-6 rounded-md mt-4" onClick={handlePostAndRedirect}>Continue to Dashboard</button>
      </div>
    )
  }

  // rendering components for not logged in users
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
        <p className="text-2xl mb-2">Not Signed In</p>
        <button className="bg-blue-600 py-2 px-6 rounded-md mb-2" onClick={() => signIn('google')}>Sign in with google</button>
        <button className="bg-none border-gray-300 border py-2 px-6 rounded-md mb-2" onClick={() => signIn('github')}>Sign in with github</button>
    </div>
  )

}