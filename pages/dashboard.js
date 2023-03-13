import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";

const Dashboard = () => {
  const { data: session, status } = useSession({
    required: true,
  });

  if (status === "authenticated") {
    return (
      <div>
        <Head>
          <title>Home Dashboard</title>
        </Head>
        <h1>Dashboard</h1>
      </div>
    );
  }
}
  

export default Dashboard;
