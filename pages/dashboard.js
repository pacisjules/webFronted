import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";



const Dashboard = () => {
  const { data: session, status } = useSession({
    required: true,
  });

    return (
        <div>
            Dashboard
        </div>
    );
}

export default Dashboard;
