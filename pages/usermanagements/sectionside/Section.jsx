import React, { useState } from 'react'
import classes from "../../../styles/section/App.module.css";
import Addform from "./Addform";
import Datatable from "./Datatable"
import Link from "next/link";
import Head from 'next/head';
export default function Section() {

  return (
    <div className={classes.main}>
      <Head>
        <title>Section</title>
      </Head>
      <div className={classes.topintro}>
        <h1>Sections</h1>
        <h2>Welcome in section management</h2>
        <p>Section, administrators or authorized users can view and edit user details such as username, email address, contact information, and user-specific settings. They can also control access and permissions to various features, functions, or data within the system based on each user's role or job function.</p>
      </div>

      <br />
      <div className={classes.btnlink}>
        <Link href="/usermanagements/sectionside/AddingForm" >
          <button>ADD NEW SECTION</button>
        </Link>
      </div>

      <br />


      {/* <Addform /> */}


      <Datatable />
    </div>
  )
}

