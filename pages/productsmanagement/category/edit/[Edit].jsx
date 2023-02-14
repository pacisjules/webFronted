import React,{ useEffect,useState } from 'react'
import axios from 'axios';
import classes from "../../../../styles/section/App.module.css";
//import classes from "../../../../styles/group/Groups.modules.css";
import {UPDATEcategory,change_msg} from '../../../../features/category/category.js';
import { useSession, signIn, signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { SnackbarProvider, useSnackbar } from "notistack";
import Link from "next/link";
import { useRouter } from "next/router";
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

  const [categoryname, setCategoryname] = useState("");
  const [categorydescr, setCategorydescr] = useState("");
  const [catgorystatus, setCategorystatus] = useState("");

  const [categorynameError, SetCategorynameError] = useState(false);
  const [categorydescrerror, setCategorydescrerro] = useState(false);
  

  const [categorynameLabel, SetcategorynameLabel] = useState("");
  const [categorydescrLabel, setCategorydescrLabel] = useState("");
  
  const [storeLabel, setStoreLabel] = useState("Store Name");

  const [loadStores, setLoadStores] = useState([]);
  const [storeName,setStoreName]= useState("");

    const router = useRouter();
    const { Edit } = router.query;

  const handleChange = (event) => {
    setStoreName(event.target.value);
  };

    const { data: session, status } = useSession({
      required: true,
    });
  
    const dispatch = useDispatch();

    const getdetailname = async ()=>{
      await axios.get("http://127.0.0.1:8000/category/"+Edit, { headers: { Authorization: `Bearer ${session.user.token}` } })
      .then((response)=> 
      setCategoryname(response.data.category_name)
     )
    };
    const getdetaildescri = async ()=>{
        await axios.get("http://127.0.0.1:8000/category/"+Edit, { headers: { Authorization: `Bearer ${session.user.token}` } })
        .then((response)=> 
        setCategorydescr(response.data.description)
       )
      };
      const getdatastore = async ()=>{
        await axios.get("http://127.0.0.1:8000/store_names", { headers: { Authorization: `Bearer ${session.user.token}` } })
        .then((response)=> setLoadStores(response.data))
      }
    const getdetailstatus = async ()=>{
      await axios.get("http://127.0.0.1:8000/category/"+Edit, { headers: { Authorization: `Bearer ${session.user.token}` } })
      .then((response)=> 
      setCategorystatus(response.data.status),
     )
    };

    
  
    useEffect(() => {
      getdetailname()
      getdatastore()
      getdetaildescri()
      getdetailstatus()


    }, []);

  
   
    

    const updatestorefuc = (e) => {
      e.preventDefault();
  
      if (categoryname === "") {
        SetCategorynameError(true);
        SetcategorynameLabel("Add Store name");
      } else if (categorydescr === "") {
        setCategorydescrerro(true);
        setCategorydescrLabel("Add Store Description");
      }else {
       // whatever you want to send

       //group update variables with Backend
        const infos = {
          category_id: Edit,
          user_id:localStorage.getItem('id'),
          category_name: categoryname,
          description: categorydescr,
          store_id:storeName,
          status:catgorystatus,
          created_at: "string",
          last_update_at:"string"
        };

        const tkn = session.user.token;
        
        //group send variables to Redux
        dispatch(UPDATEcategory({infos, tkn}));

        enqueueSnackbar(`${categoryname} has been updated`, { variant: "success" });
        

        SetCategorynameError(false);
        SetcategorynameLabel("");

        setCategorydescrerro(false);
        setCategorydescrLabel("");
        setStoreLabel("");
        

        router.push('/productsmanagement/category/Category');

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
        label={categorynameLabel}
        variant="outlined"
        value={categoryname}
        error={categorynameError}
        size="small"
        onChange={(e) => {
            setCategoryname(e.target.value);
            SetCategorynameError(false);
            SetcategorynameLabel("Category name");
          dispatch(change_msg(null));
        }}
      />
      <br/>
      


      <TextField
        id="filled-multiline-flexible"
        label={categorydescrLabel}
        multiline
        maxRows={4}
        variant="outlined"
        value={categorydescr}
        error={categorydescrerror}
        size="large"
        onChange={(e) => {
            setCategorydescr(e.target.value);
            setCategorydescrLabel("Description");
            setCategorydescrerro(false);
          dispatch(change_msg(null));
        }}
      />
      <br/>

      <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          label={storeLabel}
          value={storeName}
          onChange={handleChange}
         
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
        
        maxRows={4}
        variant="outlined"
        value={catgorystatus}
        size="small"
        onChange={(e) => {
          setCategorystatus(e.target.value);
            
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