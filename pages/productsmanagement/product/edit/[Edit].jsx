import React,{ useEffect,useState } from 'react'
import axios from 'axios';
import classes from "../../../../styles/section/App.module.css";
//import classes from "../../../../styles/group/Groups.modules.css";
import {UPDATEProduct,change_msg} from '../../../../features/products/products.js';
import { useSession, signIn, signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { SnackbarProvider, useSnackbar } from "notistack";
import Link from "next/link";
import { useRouter } from "next/router";
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
// import Checkbox from '@mui/material/Checkbox';
// import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
// import Favorite from '@mui/icons-material/Favorite';
// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Edit () {
    
  // const [LoadDatas, setLoadDatas] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const [productname, setProductname] = useState("");
  const [productprice, setProductprice] = useState(null);
  const [unittype, setUnittype] = useState("");
  const [productdescr, setProductdescr] = useState("");
  const [productstatus, setproductstatus]= useState("");

  const [productnameError, SetProductnameError] = useState(false);
  const [productpriceError, SetProductpriceError] = useState(false);
  const [unittypeError, SetUnittypeError] = useState(false);
  const [productdescrerror, setProductdescrerro] = useState(false);

  const [productnameLabel, SetProductnameLabel] = useState("");
  const [productpriceLabel, SetProductpriceLabel] = useState("");
  const [unittypeLabel, SetUnittypeLabel] = useState("");
  const [productdescrLabel, setProductdescrLabel] = useState("");
  const [categoryLabel, setCategoryLabel] = useState("");
  const [storeLabel, setStoreLabel] = useState("");

  const [loadcategory, setLoadCategory] = useState([]);
  const [categoryName,setCategoryName]= useState("");
  

  const [loadStores, setLoadStores] = useState([]);
  const [storeName,setStoreName]= useState("");

    const router = useRouter();
    const { Edit } = router.query;


    const handleStore = (event) => {
      setStoreName(event.target.value);
     };
     const handleChange = (event) => {
      setCategoryName(event.target.value);
     };

    const { data: session, status } = useSession({
      required: true,
    });
  
    const dispatch = useDispatch();

    const getdetailname = async ()=>{
      await axios.get("http://127.0.0.1:8000/product/"+Edit, { headers: { Authorization: `Bearer ${session.user.token}` } })
      .then((response)=> 
      setProductname(response.data.product_name)
     )
    };
    const getprice = async ()=>{
        await axios.get("http://127.0.0.1:8000/product/"+Edit, { headers: { Authorization: `Bearer ${session.user.token}` } })
        .then((response)=> 
        setProductprice(response.data.product_price)
       )
      };
      const getunittype = async ()=>{
        await axios.get("http://127.0.0.1:8000/product/"+Edit, { headers: { Authorization: `Bearer ${session.user.token}` } })
        .then((response)=> 
        setUnittype(response.data.unity_type)
       )
      };
      const getdetaildescri = async ()=>{
        await axios.get("http://127.0.0.1:8000/product/"+Edit, { headers: { Authorization: `Bearer ${session.user.token}` } })
        .then((response)=> 
        setProductdescr(response.data.description)
       )
      };
      const getdatastore = async ()=>{
        await axios.get("http://127.0.0.1:8000/store_names", { headers: { Authorization: `Bearer ${session.user.token}` } })
        .then((response)=> setLoadStores(response.data))
      };
      
    const getcategoriess = async ()=>{
      await axios.get("http://127.0.0.1:8000/category_names", { headers: { Authorization: `Bearer ${session.user.token}` } })
      .then((response)=> setLoadCategory(response.data))
    };
    
    const getdetailstatus = async ()=>{
      await axios.get("http://127.0.0.1:8000/product/"+Edit, { headers: { Authorization: `Bearer ${session.user.token}` } })
      .then((response)=> 
      setproductstatus(response.data.status),
     )
    };
    
  
    useEffect(() => {
      getdetailname()
      getprice()
      getunittype()
      getdatastore()
      getdetaildescri()
      getdetailstatus()
      getcategoriess()


    }, []);

  
   
    

    const updatestorefuc = (e) => {
      e.preventDefault();
  
      if (productname === "") {
        SetProductnameError(true);
        SetProductnameLabel("Add Product name");
      } else if (productprice === "") {
        SetProductpriceError(true);
        SetProductpriceLabel("Add Product Price");
      } else if (unittype === "") {
        SetUnittypeError(true);
        SetUnittypeLabel("Add Unit Type");
      } else if (productdescr === "") {
        setProductdescrerro(true);
        setProductdescLabel("Add Description");
      }else {
       // whatever you want to send

       //group update variables with Backend
        const infos = {
          product_id: Edit,
          user_id: localStorage.getItem('id'),
          store_id:storeName,
          category_id: categoryName,
          product_name: productname,
          product_price: productprice,
          unity_type: unittype,
          description: productdescr,
          status:productstatus,
          created_at: "string",
          last_update_at:"string"
        };

        const tkn = session.user.token;
        
        //group send variables to Redux
        dispatch(UPDATEProduct({infos, tkn}));

       
        enqueueSnackbar(`${productname} has been updated`, { variant: "success" });
        setProductname("");
        setProductprice("");
        setUnittype("");
        setProductdescr("");
  
        SetProductnameError(false);
        SetProductpriceError(false);
        SetUnittypeError(false);
        setProductdescrerro(false);
  
        SetProductnameLabel("");
        SetProductpriceLabel("");
        SetUnittypeLabel("");  
        setProductdescrLabel(""); 
        setCategoryLabel(""); 
        setStoreLabel("");
        

        router.push('/productsmanagement/product/Product');

      }
    };

  return (
    <div className={classes.main}>
      
      <div className={classes.topintro}>
          <h1>Group Detail Information</h1>
          <p>Here are detail information about this group</p>
          <div className={classes.editform}>
          <TextField
        id="outlined-basic"
        label={productnameLabel}
        variant="outlined"
        value={productname}
        error={productnameError}
        size="small"
        onChange={(e) => {
          setProductname(e.target.value);
          SetProductnameError(false);
          SetProductnameLabel("Product Name");
          dispatch(change_msg(null));
        }}
      />
      <br/>
      <TextField
        id="outlined-basic"
        label={productpriceLabel}
        variant="outlined"
        value={productprice}
        error={productpriceError}
        size="small"
        onChange={(e) => {
          setProductprice(e.target.value);
          SetProductpriceError(false);
          SetProductpriceLabel("Product price");
          dispatch(change_msg(null));
        }}
      />
      <br/>
      <TextField
        id="outlined-basic"
        label={unittypeLabel}
        variant="outlined"
        value={unittype}
        error={unittypeError}
        size="small"
        onChange={(e) => {
          setUnittype(e.target.value);
          SetUnittypeError(false);
          SetUnittypeLabel("Unity Type");  
          dispatch(change_msg(null));
        }}
      />
      <br/>
      
     



      <TextField
        id="filled-multiline-flexible"
        label={productdescrLabel}
        multiline
        maxRows={4}
        variant="outlined"
        value={productdescr}
        error={productdescrerror}
        size="large"
        onChange={(e) => {
          setProductdescr(e.target.value);
          setProductdescrerro(false);
          setProductdescrLabel("Description"); 
          dispatch(change_msg(null));
        }}
      />
      <br/>
      <InputLabel id="demo-simple-select-label">Category</InputLabel>
      <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          label={categoryLabel}
          value={categoryName}
          onChange={handleChange}
         
        >
          {loadcategory.map((name) => (
            <MenuItem key={name.category_id} value={name.category_id}>
              <ListItemText primary={name.category_name} />
            </MenuItem>
          ))}
        </Select>
        <br/>
        <InputLabel id="demo-simple-select-label">Store name</InputLabel>
      <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          label={storeLabel}
          value={storeName}
          onChange={handleStore}
         
        >
          {loadStores.map((name) => (
            <MenuItem key={name.store_id} value={name.store_id}>
              <ListItemText primary={name.store_name} />
            </MenuItem>
          ))}
        </Select>
        <br/>

        <TextField
        id="outlined-basic"
        label=""
        variant="outlined"
        value={productstatus}
        size="small"
        onChange={(e) => {
          setproductstatus(e.target.value);
          dispatch(change_msg(null));
        }}
      />
      <br/>
        

      <Button variant="contained" color="primary" size="large" onClick={updatestorefuc}>
        Add category
      </Button>        
       </div>
      </div>
    </div>    
  )
}

export default function IntegrationNotistacks() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Edit />
    </SnackbarProvider>
  );
}