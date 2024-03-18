// mark as client component
"use client";
import axios from "axios";
import { SessionProvider, getSession } from "next-auth/react"

import React, { useEffect, useState } from 'react'
import { UserContext } from "../contexts/UserContext";

const AuthUserWrapper = ({children}: {children: React.ReactNode}) => {

    const [authUser , setAuthUser] = useState();

    useEffect(() => {

        const fetchData = async () => {
          const session = await getSession();
          if (session?.user) {
            try {
              const response = await axios.post(
                "http://localhost:3001/api/users/",
                {
                  name: session.user.name,
                  email: session.user.email,
                  imageUrl: session.user.image,
                }
              );
              const userId = response.data.id;
              console.log("user from serve", response.data)
              setAuthUser(response.data)
              //console.log("user object",response.data)
            } catch (error) {
              console.error("Error occurred while sending POST request:", error);
            }
          }
        };
    
        fetchData();
      }, []);
  return (
    <UserContext.Provider value={authUser}>
        {children}
    </UserContext.Provider>
  )
}

export default AuthUserWrapper