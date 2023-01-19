import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Head from "next/head";

const Dashboard = () => {
  const { data: session, status } = useSession({
    required: true,
  });

  return (
    <div>
      <Head>
        <title>Home Dashboard</title>
      </Head>
   
    </div>
  );
};

export default Dashboard;
