import React,{ useEffect,useState } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import classes from "../../../styles/section/App.module.css";
import { getdistributordetail} from "../../../features/distributor/distributor";
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
    await axios.get("http://127.0.0.1:8000/distributor/"+View, { headers: { Authorization: `Bearer ${session.user.token}` } }).then((response)=>
     setLoadDatas(response.data),
    
     )
  }

  useEffect(() => {
    getdetaildata()

    dispatch(getdistributordetail(LoadDatas))

  }, []);

  console.log(LoadDatas);

  return (
    <div className={classes.main}>
       <Head>
        <title>Distributor View</title>
      </Head>
      
    <div className={classes.topintro}>
        <h1>Distributor Detail Information</h1>
        <p>Here are detail information about the Distributor</p>
        <div className={classes.currentinfo}>
          <h3>Distributor Names : {LoadDatas.names}</h3><br/>
          <h4>Distributor Email : {LoadDatas.email}</h4><br/>
          <h4>Distributor Phone : {LoadDatas.phone}</h4><br/>
          <h4>Distributor Address : {LoadDatas.address}</h4><br/>

          <h5>Currrent Status : {LoadDatas.status==0?"Not active":"Active" }</h5><br/>
          <p>Started on: {LoadDatas.created_at}</p><br/>
          
        
        </div>
        <br/>
        <div className={classes.btnlink}>
          <Link href="/distributorsManagement/distributors/Distributors" >
          <button>Return</button>
        </Link>
        </div>
    </div>
</div>
  )
}

export default View