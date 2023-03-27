import React, { useState } from 'react'
import classes from "../../../styles/section/App.module.css";
import Head from 'next/head';
import Datatable from "./Datatable"

function Permissions() {
  return (
    <div className={classes.main}>
      <Head>
        <title>PermissionsPermissions</title>
      </Head>
      <div className={classes.topintro}>
        <h1>Permissions</h1>
        <h2>Welcome in permissions</h2>
        <p>
        permissions are rules that define what actions can be performed on a particular file, directory,
        or other resource. Permissions are used to control access to system resources and ensure the security and integrity of the system.
        </p>
        <ul style={{
          listStyle:"none",
          fontSize:"10pt",
          fontWeight:"bold"
        }}>
          <li>Read permission: This allows a user to read the contents of a file or directory.</li>
          <li>Write permission: This allows a user to modify the contents of a file or directory.</li>
          <li>Execute permission: This allows a user to run a file or access a directory.</li>
        </ul>
        <p>
        Each of these permissions can be assigned to different types of users, such as the owner of the file or directory, members of a particular group, or all users on the system.
        </p>
      </div>
      <div className={classes.btnlink}>
      </div>
      <br />
     <Datatable/>
    </div>
  )
}

export default Permissions