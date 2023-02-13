import React,{ useEffect,useState } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import classes from "../../styles/section/App.module.css";
import { getsectiondetail} from '../../features/sections/sections.js';
import { useSession, signIn, signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Head from 'next/head';

function View() {
  const [LoadDatas, setLoadDatas] = useState([]);
  const router = useRouter();
  const { View } = router.query;
  
  const { data: session, status } = useSession({
    required: true,
  });

  const dispatch = useDispatch();


  const getdetaildata = async ()=>{
    await axios.get("http://127.0.0.1:8000/stores/"+View, { headers: { Authorization: `Bearer ${session.user.token}` } }).then((response)=>
     setLoadDatas(response.data),
    
     )
  }

  useEffect(() => {
    getdetaildata()

    dispatch(getsectiondetail(LoadDatas))

  }, []);

  console.log(LoadDatas);

  return (
    <div className={classes.main}>
       <Head>
        <title>Inventory View</title>
      </Head>
      
    <div className={classes.topintro}>
        <h1>Inventory Detail Information</h1>
        <p>Here are detail information about this section</p>
        <div className={classes.currentinfo}>
          <h3>Inventory Name : {LoadDatas.store_name}</h3><br/>
          <h2>Currrent Status : {LoadDatas.status==0?"Not active":"Active"}</h2><br/>
          <h4>Started on: {LoadDatas.created_at}</h4><br/>
          <h5>Description : <p>{LoadDatas.description}</p></h5>
        
        </div>
        <br/>
        <div className={classes.btnlink}>
          <Link href="/inventory/Inventory" >
          <button>Return</button>
        </Link>
        </div>
    </div>
</div>
  )
}

export default View