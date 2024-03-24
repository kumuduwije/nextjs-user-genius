// mark as client component
"use client";

import axios from "axios";
// importing necessary functions
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import Image from "next/image";
import Button from '@mui/material/Button'; // Import Material-UI button
import { createContext, useEffect, useState,useContext } from "react";
import { User, UserContext } from "./contexts/UserContext";
import { Avatar, Box, Checkbox, Container, CssBaseline, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from "./assests/image.png"
//import GoogleIcon from '@mui/icons-material/Google';
//import { Copyright } from "@mui/icons-material";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import Link from 'next/link';


const UserIdContext = createContext(null);

function Copyright(props: any) {
  return (
    <Box sx={{fontWeight: "normal",}} >
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        User Genius 
      </Link>{' '}
      by Kumudu Wijewardene
      {' '+new Date().getFullYear()}
      {'.'}
    </Typography>
    </Box>
  );
}

export default function Home() {
  // extracting data from usesession as session
  const { data: session } = useSession()
  const [authUser , setAuthUser] = useState();

  const aUser = useContext(UserContext)

  console.log("auth user id", aUser?.id)


  // function to handle the post request and redirection
  const handlePostAndRedirect = async () => {
       window.location.href = `/dashboard`;
   
  };



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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  // checking if sessions exists
  if (session) {
    // rendering components for logged in users
    //console.log(session.user)
    return (
      <>

  <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            // marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent:'center',
            textAlign:'center',
            height:'90vh'
          }}
        >
          <Box>
            <Box sx={{margin:'0 auto', display:'flex', justifyContent:'center'}}>
              <Avatar  sx={{ m: 1, bgcolor: 'secondary' ,width: 100, height: 100}}>
                <Image
              src={session.user?.image as string}
              fill
              // width={100}
              // height={100}
              alt=""
              style={{borderRadius:"50px"}}
            />
            </Avatar>
            </Box>
            <Typography sx={{fontSize:15, fontWeight:"bold", color:"gray"}}>
              You are Signed in as
            </Typography>

            <Typography   sx={{fontSize:22}}>
              {session.user?.name}
            </Typography>

            <Typography sx={{fontSize:10, color:"gray"}}>
              {session.user?.email}
            </Typography>
          </Box>
         
           <Box sx={{ width: 250 ,mt:5 }}>

           <Link href="/dashboard">

           <Button
            sx={{textTransform:"capitalize", mb:2}}
                // startIcon={<GoogleIcon/>}
                // type="submit"
                fullWidth
                variant="contained"
                // sx={{  }}

                // onClick={handlePostAndRedirect}
              >
                Continue to Dashboard
              </Button>

           </Link>

           



            <Button
            sx={{textTransform:"capitalize"}}
                // startIcon={<GoogleIcon/>}
                type="submit"
                fullWidth
                variant="outlined"
                // sx={{  }}

                onClick={() =>signOut()}
              >
                Sign out
              </Button>
           </Box>



           
          </Box>
            <Copyright />
        

      </Container>
      

      
      {/* <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="w-44 h-44 relative mb-4">
        <Image
          src={session.user?.image as string}
          // fill
          width={80}
          height={80}
          alt=""
          style={{borderRadius:"50px"}}
        />
        </div>
        <p className="text-2xl mb-2">Welcome <span className="font-bold">{session.user?.name}</span>. Signed In As</p>
        <p className="font-bold mb-4">{session.user?.email}</p>
        <Button variant="outlined" className="bg-red-600 py-2 px-6 rounded-md" onClick={() => signOut()}>Sign out</Button>
        <Button variant="contained" className="bg-blue-600 py-2 px-6 rounded-md mt-4" onClick={handlePostAndRedirect}>Continue to Dashboard</Button>
      </div> */}

      


      </>
    )
  }

  // rendering components for not logged in users
  return (

    <>
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            // marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent:'center',
            textAlign:'center',
            height:'90vh'
          }}
        >
          <Box>
            <Avatar  sx={{ m: 1, bgcolor: 'teal', width: 75, height: 75 }}>
              <PeopleAltOutlinedIcon sx={{width: 30, height: 30}} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
          </Box>
         
           <Box sx={{ width: 250 ,mt:5 }}>
            <Button
             sx={{textTransform:"capitalize"}}
               startIcon={<Avatar sx={{ width: 15, height: 15 }} src={GoogleIcon.src} />}
                type="submit"
                fullWidth
                variant="outlined"
                // sx={{  }}

                onClick={() => signIn('google')}
              >
                Sign In With Google
              </Button>
           </Box>



           
          </Box>
            <Copyright />
        

      </Container>
    </>
    // <div className="w-full h-screen flex flex-col justify-center items-center">
    //     <p className="text-2xl mb-2">Not Signed In</p>
    //     <Button variant="contained" className="bg-blue-600 py-2 px-6 rounded-md mb-2" onClick={() => signIn('google')}>Sign in with google</Button>
    //     <Button className="bg-none border-gray-300 border py-2 px-6 rounded-md mb-2" onClick={() => signIn('github')}>Sign in with github</Button>
    // </div>
  )

}