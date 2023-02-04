import React,{ useEffect,useState } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import classes from "../../../styles/section/App.module.css";
import { getgroupdetail} from '../../../features/groups/groups.js';
import { useSession, signIn, signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";


function View() {
  const [LoadDatas, setLoadDatas] = useState([]);
  const [groupName, setgroupName] = useState("");
  const [descr, setDescr] = useState("");
  const [statuss, setStatuss] = useState("");
  const [createDate, setCreatedate] = useState("");
  const router = useRouter();
  const { View } = router.query;
  
  const { data: session, status } = useSession({
    required: true,
  });

  const dispatch = useDispatch();


  const getdetaildata = async ()=>{
    await axios.get("http://127.0.0.1:8000/group/"+View, { headers: { Authorization: `Bearer ${session.user.token}` } }).then((response)=>
     setLoadDatas(response.data),
    
     )
  }

  useEffect(() => {
    getdetaildata()

    dispatch(getgroupdetail(LoadDatas))

  }, []);

  console.log(LoadDatas);

  return (
    <div className={classes.main}>
      
    <div className={classes.topintro}>
        <h1>Group Detail Information</h1>
        <p>Here are detail information about this group</p>
        <div className={classes.currentinfo}>
          <h2>Group Name : {LoadDatas.group_name}</h2><br/>
          <h3>Currrent Status : {LoadDatas.status}</h3><br/>
          <h4>Date and Time : {LoadDatas.created_at}</h4><br/>
          <h5>Description : <p>{LoadDatas.description}</p></h5>
        
        </div>
        <br/>
        <div className={classes.btnlink}>
          <Link href="/usermanagements/group/Group" >
          <button>Return</button>
        </Link>
        </div>
    </div>
</div>
  )
}

export default View