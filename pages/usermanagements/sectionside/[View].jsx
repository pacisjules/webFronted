import React,{ useEffect,useState } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import classes from "../../../styles/section/App.module.css";
import { getsectiondetail} from '../../../features/sections/sections.js';
import { useSession, signIn, signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";


function View() {
  const [LoadDatas, setLoadDatas] = useState([]);
  const router = useRouter();
  const { View } = router.query;
  
  const { data: session, status } = useSession({
    required: true,
  });

  const dispatch = useDispatch();


  const getdetaildata = async ()=>{
    await axios.get("http://127.0.0.1:8000/section/"+View, { headers: { Authorization: `Bearer ${session.user.token}` } }).then((response)=>
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
      
    <div className={classes.topintro}>
        <h1>Section Detail Information</h1>
        <p>Here are detail information about this section</p>
        <div className={classes.currentinfo}>
          <h2>Section Name : {LoadDatas.section_name}</h2><br/>
          <h3>Currrent Status : {LoadDatas.status}</h3><br/>
          <h4>Date and Time : {LoadDatas.created_at}</h4><br/>
          <h5>Description : <p>{LoadDatas.description}</p></h5>
        
        </div>
        <br/>
        <div className={classes.btnlink}>
          <Link href="/usermanagements/sectionside/Section" >
          <button>Return</button>
        </Link>
        </div>
    </div>
</div>
  )
}

export default View