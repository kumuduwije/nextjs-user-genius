'use client'
import { Button } from '@mui/material';
import TableView from '../components/Table/TS';
import { useSession, signIn, signOut } from "next-auth/react"
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';


function page() {
    const authUser = useContext(UserContext)

    const { data: session } = useSession({required:true})

  return (
    <>
    <div>



    <h2 style={{ textAlign: "center", textTransform: "uppercase" }}>User Genius</h2>

    <div style={{display:"flex", justifyContent:"space-between"}}>
    {authUser?.name}

<Button variant='outlined' onClick={()=> signOut()} > Sign out</Button>
    </div>

    
    <TableView/>
    
    </div>

    </>
  )
}

export default page