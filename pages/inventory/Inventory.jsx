import React, { useState, useEffect } from 'react'
import classes from "../../styles/section/App.module.css";
import Head from 'next/head';
// import Addform from "./Addform";
import Datatable from "./Datatable"
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";

export default function Group() {
  const router = useRouter();
  const [numberdata, setNumberdata] = useState([]);
  
  const { data: session, status } = useSession({
    required: true,
  });

  const dispatch = useDispatch();

  const getnumdata = async ()=>{
    await axios.get("http://127.0.0.1:8000/count_storess", { headers: { Authorization: `Bearer ${session.user.token}` } })
    .then((response)=> setNumberdata(response.data))
  }

  useEffect(() => {
    getnumdata()
    dispatch(getnumber(numberdata))
  }, []);

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
        <h2>{numberdata.numberofstores} Store</h2>
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

