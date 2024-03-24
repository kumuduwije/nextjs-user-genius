'use client'
import { Avatar, Box, Button, Typography, colors } from '@mui/material';
import TableView from '../components/Table/TS';
import { useSession, signIn, signOut } from "next-auth/react"
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import Link from 'next/link';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';



function page() {
    const authUser = useContext(UserContext)

    const { data: session } = useSession({required:true})

  return (
    <>
    <div>



    <h2 style={{ textAlign: "center", textTransform: "uppercase", color: "teal" }}>User Genius</h2>

    <Box sx={{display:"flex", justifyContent:"right", padding:"1rem"}}>

   

    <Box sx={{alignItems:'center', display:"flex", flexDirection:"column",}}>
        <Avatar sx={{width:50, height:50}} src={authUser?.imageUrl}></Avatar>
        <Button variant='text' color='warning'  sx={{textTransform:"capitalize", fontSize:12}}  onClick={() =>signOut() }> Log out</Button>
    </Box>

     <Box sx={{mt:1}}>
     <Typography variant='body2' sx={{marginLeft:1, color:'#2D3250'}}> {authUser?.name}</Typography>
     <Typography  variant='body2' sx={{marginLeft:1, color:"#61677A", fontWeight:'500'}}> {authUser?.email}</Typography>
     </Box>

     


    

      
    </Box>

    
    <TableView/>

    
    
    </div>

    </>
  )
}

export default page