import React,{ useEffect,useState } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import classes from "../../../styles/section/App.module.css";
import { getoroductdetail} from '../../../features/products/products.js';
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
    await axios.get("http://127.0.0.1:8000/product/"+View, { headers: { Authorization: `Bearer ${session.user.token}` } }).then((response)=>
     setLoadDatas(response.data),
    
     )
  }

  useEffect(() => {
    getdetaildata()

    dispatch(getoroductdetail(LoadDatas))

  }, []);

  console.log(LoadDatas);

  return (
    <div className={classes.main}>
       <Head>
        <title>Product View</title>
      </Head>
      
    <div className={classes.topintro}>
        <h1>Product  Detail Information</h1>
        <p>Here are detail information about this product</p>
        <div className={classes.currentinfo}>
          <h3>Category Name : {LoadDatas.product_name}</h3><br/>
          <h3>Product Price : {LoadDatas.product_price}</h3><br/>
          <h3>Unity Type : {LoadDatas.unity_type}</h3><br/>
          <h2>Currrent Status : {LoadDatas.status==0?"Not active":"Active"}</h2><br/>
          <h4>Started on: {LoadDatas.created_at}</h4><br/>
          <h5>Description : <p>{LoadDatas.description}</p></h5>
        
        </div>
        <br/>
        <div className={classes.btnlink}>
          <Link href="/productsmanagement/product/Product" >
          <button>Return</button>
        </Link>
        </div>
    </div>
</div>
  )
}

export default View