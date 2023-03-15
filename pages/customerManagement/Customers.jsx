import React, { useState } from 'react'
import classes from "../../styles/section/App.module.css";

// import Addform from "./Addform";
import Datatable from "./Datatable"
import Link from "next/link";

export default function Category() {

  return (
    <div className={classes.main}>
      <div className={classes.topintro}>
        <h1>Customers Management</h1>
        <h2>Welcome in Customers Module</h2>
        <p>In publishing and graphic design, Lorem ipsum is a placeholder
          text commonly used to demonstrate the visual form of a document
          or a typeface without relying on meaningful content.</p>
      </div>

      <br/>
      
        <div className={classes.btnlink}>
          <Link href="/customerManagement/AddingForms" >
          <button>ADD NEW CUSTOMER</button>
        </Link>
        </div>
     
      
      <br/>


       {/* <Addform />  */}


      <Datatable />
    </div>
  )
}

