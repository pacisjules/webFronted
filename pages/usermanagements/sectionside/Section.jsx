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
        <p>In publishing and graphic design, Lorem ipsum is a placeholder
          text commonly used to demonstrate the visual form of a document
          or a typeface without relying on meaningful content.</p>
      </div>

      <br/>
      <div className={classes.btnlink}>
        <Link href="/usermanagements/sectionside/AddingForm" >
        <button>ADD NEW SECTION</button>
      </Link>
      </div>
      
      <br/>


      {/* <Addform /> */}


      <Datatable />
    </div>
  )
}

