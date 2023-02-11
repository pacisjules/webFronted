import React, { useState } from 'react'
import classes from "../../styles/section/App.module.css";
import Head from 'next/head';
// import Addform from "./Addform";
import Datatable from "./Datatable"
import Link from "next/link";

export default function Group() {

  return (
    <div className={classes.main}>
      <Head>
        <title>Inventory</title>
      </Head>
      <div className={classes.topintro}>
        <h1>Inventory</h1>
        <h2>Welcome in Inventory Module</h2>
        <p>In publishing and graphic design, Lorem ipsum is a placeholder
          text commonly used to demonstrate the visual form of a document
          or a typeface without relying on meaningful content.</p>
      </div>

      <br/>
      <div className={classes.count}>
        <h2>2 Store</h2>
        <p>All Stores</p>
        <div className={classes.btnlink}>
          <Link href="/inventory/AddingForm" >
          <button>ADD NEW STOCK</button>
        </Link>
        </div>
      </div>
      
      <br/>


       {/* <Addform />  */}


      <Datatable />
    </div>
  )
}

