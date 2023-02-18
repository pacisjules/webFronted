import React,{ useEffect,useState } from 'react'
import axios from 'axios';
import classes from "../../../../styles/section/App.module.css";
//import classes from "../../../../styles/group/Groups.modules.css";
import {UPDATEDistributor,getdetailDis,change_msg} from '../../../../features/distributor/distributor.js';
import { useSession, signIn, signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
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

  const [disname, setDisname] = useState("");
  const [disemail, setDisemail] = useState("");
  const [disphone, setDisphone] = useState("");
  const [disaddress, setDisaddress] = useState("");

  const [disnameerror, setDisnameerror] = useState(false);
  const [disemailerror, setDisemailerror] = useState(false);
  const [disphoneerror, setDisphoneerror] = useState(false);
  const [disaddresserror, setDisaddresserror] = useState(false);

  const [disnameLabel, setDisnameLabel] = useState("");
  const [disemailLabel, setDisemailLabel] = useState("");
  const [disphoneLabel, setDisphoneLabel] = useState("");
  const [disaddressLabel, setDisaddressLabel] = useState("");

    const router = useRouter();
    const { Edit } = router.query;


    const { data: session, status } = useSession({
      required: true,
    });
  
    const dispatch = useDispatch();

    const getdetailname = async ()=>{
        await axios.get("http://127.0.0.1:8000/distributor/"+Edit, { headers: { Authorization: `Bearer ${session.user.token}` } }).then((response)=>
        setDisname(response.data.names),
        
         )
      }
    const getdetaildemail = async ()=>{
        await axios.get("http://127.0.0.1:8000/distributor/"+Edit, { headers: { Authorization: `Bearer ${session.user.token}` } })
        .then((response)=> 
        setDisemail(response.data.email)
       )
      };

      const getdetailphone = async ()=>{
        await axios.get("http://127.0.0.1:8000/distributor/"+Edit, { headers: { Authorization: `Bearer ${session.user.token}` } })
        .then((response)=> setDisphone(response.data.phone))
      }
    const getdetailaddress = async ()=>{
      await axios.get("http://127.0.0.1:8000/distributor/"+Edit, { headers: { Authorization: `Bearer ${session.user.token}` } })
      .then((response)=> 
      setDisaddress(response.data.address),
     )
    };

    
  
    useEffect(() => {
      getdetailname()
      getdetaildemail()
      getdetailphone()
      getdetailaddress()
      
      dispatch(getdetailDis(disname))
      dispatch(getdetailDis(disemail))
      dispatch(getdetailDis(disphone))
      dispatch(getdetailDis(disaddress))

    }, []);

  
   
    

    const updatestorefuc = (e) => {
      e.preventDefault();
  
      if (disname === "") {
        setDisnameerror(true);
        setDisnameLabel("Add Full name");
      } else if (disemail === "") {
        setDisemailerror(true);
        setDisemailLabel("Add Email");
      }else if (disphone === "") {
        setDisphoneerror(true);
        setDisphoneLabel("Add Phone Number");
      } else if (disaddress === "") {
        setDisaddresserror(true);
        setDisaddressLabel("Add Address");
      } else {
       // whatever you want to send

       //group update variables with Backend
        const infos = {
          distributor_id: Edit,
          user_id:localStorage.getItem('id'),
          names: disname,
          email: disemail,
          phone :disphone,
          address:disaddress,
          status:"1",
          created_at: "string",
          last_update_at:"string"
        };

        const tkn = session.user.token;
        
        //group send variables to Redux
        dispatch(UPDATEDistributor({infos, tkn}));

        enqueueSnackbar(`${disname} has been updated`, { variant: "success" })
        

        router.push('/distributorsManagement/distributors/Distributors');

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
        label={disnameLabel}
        variant="outlined"
        value={disname}
        error={disnameerror}
        size="small"
        onChange={(e) => {
          setDisname(e.target.value);
          setDisnameerror(false);
          setDisnameLabel("Distributor names");
          dispatch(change_msg(null));
        }}
      />
      <br/>
      


      <TextField
        id="filled-multiline-flexible"
        label={disemailLabel}
        multiline
        maxRows={4}
        variant="outlined"
        value={disemail}
        error={disemailerror}
        size="large"
        onChange={(e) => {
          setDisemail(e.target.value);
          setDisemailLabel("Email");
          setDisemailerror(false);
          dispatch(change_msg(null));
        }}
      />
      <br/>
      <TextField
        id="filled-multiline-flexible"
        label={disphoneLabel}
        multiline
        maxRows={4}
        variant="outlined"
        value={disphone}
        error={disphoneerror}
        size="large"
        onChange={(e) => {
          setDisphone(e.target.value);
          setDisphoneLabel("Phone Number");
          setDisphoneerror(false);
          dispatch(change_msg(null));
        }}
      />
      <br/>

      <TextField
        id="filled-multiline-flexible"
        label={disaddressLabel}
        multiline
        maxRows={4}
        variant="outlined"
        value={disaddress}
        error={disaddresserror}
        size="large"
        onChange={(e) => {
          setDisaddress(e.target.value);
          setDisaddressLabel("Address");
          setDisaddresserror(false);
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