import React, { useState } from 'react'
import classes from "../../../styles/section/App.module.css";
import Datatable from "./Datatable"
import Link from "next/link";

export default function Users() {

  return (
    <div className={classes.main}>
      <div className={classes.topintro}>
        <h1>Users</h1>
        <h2>Welcome in users management</h2>
        <p>In publishing and graphic design, Lorem ipsum is a placeholder
          text commonly used to demonstrate the visual form of a document
          or a typeface without relying on meaningful content.</p>
      </div>

      <br/>
      <div className={classes.btnlink}>
        <Link href="/usermanagements/users/AddingForm" >
        <button>ADD NEW USER</button>
      </Link>
      </div>
      
      <br/>
      <Datatable />
    </div>
  )
}

