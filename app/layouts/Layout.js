import React from "react";
import Topbar from "../components/Topbar.js";
import { useSession, signIn, signOut } from "next-auth/react";

const Layout = ({ children }) => {
  const { data: session, status } = useSession({
    required: true,
  });

  if (status === "authenticated") {
    return (
      <div>
        <Topbar />
        {children}
      </div>
    );
  }
};

export default Layout;
