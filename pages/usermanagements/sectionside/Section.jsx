import React, { useState } from 'react'
import classes from "../../../styles/section/App.module.css";
import Addform from "./Addform";
import Datatable from "./Datatable"
export default function Section() {

  return (
    <div className={classes.main}>
      <div className={classes.topintro}>
        <h1>Sections</h1>
        <h2>Welcome in section management</h2>
        <p>In publishing and graphic design, Lorem ipsum is a placeholder
          text commonly used to demonstrate the visual form of a document
          or a typeface without relying on meaningful content.</p>
      </div>
      {/* <Addform /> */}
      <Datatable/>
    </div>
  )
}

