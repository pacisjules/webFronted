import React, { useState } from 'react'
import classes from "../../../styles/section/App.module.css";
import Head from 'next/head';
import Datatable from "./Datatable"
import Link from "next/link";

export default function Group() {

  return (
    <div className={classes.main}>
      <Head>
                <title>Group</title>
            </Head>
      <div className={classes.topintro}>
        <h1>User Groups</h1>
        <h2>Welcome in User Groups management</h2>
        <p>In publishing and graphic design, Lorem ipsum is a placeholder
          text commonly used to demonstrate the visual form of a document
          or a typeface without relying on meaningful content.</p>
      </div>

      <br/>
      <div className={classes.btnlink}>
        <Link href="/usermanagements/group/AddingForm" >
        <button>ADD NEW GROUP</button>
      </Link>
      </div>
      
      <br/>


       {/* <Addform />  */}


      <Datatable />
    </div>
  )
}

