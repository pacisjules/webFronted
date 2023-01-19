import React from "react";
import Topbar from "../components/Topbar.js";
import { useSession, signIn, signOut } from "next-auth/react";
import Sidebar from "../components/Sidebar.js";
import classes from "../../styles/Home.module.css";

const Layout = ({ children }) => {
 
  const { data: session, status } = useSession({
    required: true,
  });

  if (status === "authenticated") {
    return (
      <div className={classes.mainall}>
        <div className={classes.top}>
<Topbar />
        </div>

        <div className={classes.bottom}>
        <div className={classes.bottomLeft}>
        <Sidebar/>
        </div>

        <div className={classes.bottomRight}>
          {children}
        </div>
        {/* 
         */}
        </div>
      </div>
    );
  }
};

export default Layout;
