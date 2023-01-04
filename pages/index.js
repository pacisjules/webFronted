import { react, useState, useEffect } from "react";
import Link from 'next/link'

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";


import classes from '../styles/login/App.module.css';

export default function Home() {

  return (
    <div className={classes.maincontainer}>
      
      <div className={classes.LeftDiv}>
      
      <div className={classes.InfoDiv}>
      <div className={classes.igihe}>
        <h1>Kigali, Rwanda</h1>
        <h3>12:00:08 PM</h3>
      </div>

      <div className={classes.logodiv}>
        <h1>Logo Here</h1>
      </div>

      <div className={classes.weatherDiv}>
      <div className={classes.lft}>
      <div className={classes.tp}>
      <h2>October</h2>
      </div>

      <div className={classes.md}>
      <h2>17</h2>
      </div>

      <div className={classes.btm}>
      <h2>2022</h2>
      </div>
      </div>

      <div className={classes.rgt}>
        <h1>20<sup>0</sup></h1>
        <img src="" alt=""/>
      </div>
      
      
      </div>



      </div>


      </div>
      <div className={classes.RightDiv}>
      <h1>Right</h1>
      </div>


    </div>
  );
}
