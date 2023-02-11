import React,{ useEffect,useState } from 'react'
import axios from 'axios';
import classes from "../../../styles/section/App.module.css";
//import classes from "../../../../styles/group/Groups.modules.css";
import {UPDATEStore, getinventorydetail} from '../../../features/inventories/inventory.js';
import { useSession, signIn, signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { SnackbarProvider, useSnackbar } from "notistack";
import Link from "next/link";
import { useRouter } from "next/router";

function Edit () {
    
  // const [LoadDatas, setLoadDatas] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

  const [storename, setStorename] = useState("");
  const [storeaddress, setStoreaddress] = useState("");
  const [storedescr, setStoredescr] = useState("");
  const [storestatus, setStorestatus]= useState("");

  const [storenameError, SetStorenameError] = useState(false);
  const [storeaddressError, SetStoreaddressError] = useState(false);
  const [storedescrerror, setStoredescrerro] = useState(false);
  const [storestatuserror, setStorestatuserror]= useState(false);

  const [storenameLabel, SetStorenameLabel] = useState("");
  const [storeaddressLabel, SetStoreaddressLabel] = useState("");
  const [storedescrLabel, setStoredescrLabel] = useState("");
  const [storestatusLabel, setStorestatusLabel]= useState("");

    const router = useRouter();
    const { Edit } = router.query;

    const { data: session, status } = useSession({
      required: true,
    });
  
    const dispatch = useDispatch();

    const getdetailname = async ()=>{
      await axios.get("http://127.0.0.1:8000/stores/"+Edit, { headers: { Authorization: `Bearer ${session.user.token}` } })
      .then((response)=> 
      setStorename(response.data.store_name)
     )
    };
    const getdetailaddress = async ()=>{
        await axios.get("http://127.0.0.1:8000/stores/"+Edit, { headers: { Authorization: `Bearer ${session.user.token}` } })
        .then((response)=> 
        setStoreaddress(response.data.address)
       )
      };
    const getdetaildescri = async ()=>{
      await axios.get("http://127.0.0.1:8000/stores/"+Edit, { headers: { Authorization: `Bearer ${session.user.token}` } })
      .then((response)=> 
      setStoredescr(response.data.description)
     )
    };
    const getdetailstatus = async ()=>{
      await axios.get("http://127.0.0.1:8000/stores/"+Edit, { headers: { Authorization: `Bearer ${session.user.token}` } })
      .then((response)=> 
      setStorestatus(response.data.status),
     )
    };

    
  
    useEffect(() => {
      getdetailname()
      getdetailaddress()
      getdetaildescri()
      getdetailstatus()

      dispatch(getinventorydetail(storename))
      dispatch(getinventorydetail(storeaddress))
      dispatch(getinventorydetail(storedescr))
      dispatch(getinventorydetail(storestatus))
     
    }, []);

  
   
    

    const updatestorefuc = (e) => {
      e.preventDefault();
  
      if (storename === "") {
        SetStorenameError(true);
        SetStorenameLabel("Add Store name");
      } else if (storeaddress === "") {
        SetStoreaddressError(true);
        SetStoreaddressLabel("Add Store Address");
      } else if (storedescr === "") {
        setStoredescrerro(true);
        setStoredescrLabel("Add Store Description");
      }else if (storestatus === "") {
        setStorestatuserror(true);
        setStorestatusLabel("Add Store status");
      }else {
       // whatever you want to send

       //group update variables with Backend
        const infos = {
          store_id: Edit,
          user_id:localStorage.getItem('id'),
          store_name: storename,
          address:storeaddress,
          description: storedescr,
          org_setting_id:"ede4b603-a84f-11ed-825a-88532eef2751",
          status:storestatus,
          created_at: "string",
          last_update_at:"string"
        };

        const tkn = session.user.token;
        
        //group send variables to Redux
        dispatch(UPDATEStore({infos, tkn}));

        enqueueSnackbar(`${storename} has been updated`, { variant: "success" });
        

        SetStorenameError(false);
        SetStorenameLabel("");

        SetStoreaddressError(false);
        SetStoreaddressLabel("");
  
        setStoredescrerro(false);
        setStoredescrLabel("");

        setStorestatuserror(false);
        setStorestatusLabel("");

        router.push('/inventory/Inventory');

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
              label={storenameLabel}
              variant="outlined"
              value={storename}
              error={storenameError}
              size="small"
              onChange={(e) => {
                setStorename(e.target.value);
                SetStorenameError(false);
               
              }}
          />
          <br/>

          <TextField
              id="outlined-basic"
              label={storeaddressLabel}
              variant="outlined"
              value={storeaddress}
              error={storeaddressError}
              size="small"
              onChange={(e) => {
                setStoreaddress(e.target.value);
                SetStoreaddressError(false);
               
              }}
          />
          <br/>

            <TextField
              id="filled-multiline-flexible"
              label={storedescrLabel}
              multiline
              maxRows={4}
              variant="outlined"
              value={storedescr}
              error={storedescrerror}
              size="large"
              onChange={(e) => {
                setStoredescr(e.target.value);
                setStoredescrerro(false);
              }}
        />
       
        <br/>
        <TextField
              id="outlined-basic"
              label={storestatusLabel}
              variant="outlined"
              value={storestatus}
              error={storestatuserror}
              size="small"
              onChange={(e) => {
                setStorestatus(e.target.value);
                setStorestatuserror(false);
              }}
          />
          <br/>

          <Button variant="contained" color="primary" size="large" onClick={updatestorefuc}>
        Edit store
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