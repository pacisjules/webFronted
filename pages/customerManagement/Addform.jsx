import React, { useEffect, useState } from "react";
import { AddCustomer,change_msg } from "../../features/customers/customer.js";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from "@mui/material/TextField";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { SnackbarProvider, useSnackbar } from "notistack";
import classes from "../../styles/section/App.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from 'axios';



function Addform(props) {
  
  const { enqueueSnackbar } = useSnackbar();

  const [disname, setDisname] = useState("");
  const [custtin, setCustTin] = useState("");
  const [custbio, setCustBio] = useState("");
  const [disemail, setDisemail] = useState("");
  const [disphone, setDisphone] = useState("");
  const [custidNum, setCustIdNum] = useState("");
  const [custProvince, setCustProvince] = useState("");
  const [custDistrict, setCustDistrict] = useState("");
  const [disaddress, setDisaddress] = useState("");
  

  const [disnameerror, setDisnameerror] = useState(false);
  const [custtinerror, setCustTinerror] = useState(false);
  const [custbioerror, setCustBioerror] = useState(false);
  const [disemailerror, setDisemailerror] = useState(false);
  const [disphoneerror, setDisphoneerror] = useState(false);
  const [custidNumerror, setCustIdNumerror] = useState(false);
  const [custProvinceerror, setCustProvinceerror] = useState(false);
  const [custDistricterror, setCustDistricterror] = useState(false);
  const [disaddresserror, setDisaddresserror] = useState(false);
  

  const [disnameLabel, setDisnameLabel] = useState("Customer names");
  const [custtinLabel, setCustTinLabel] = useState("Tin Number");
  const [custbioLabel, setCustBioLabel] = useState("Bio");
  const [disemailLabel, setDisemailLabel] = useState("Email");
  const [disphoneLabel, setDisphoneLabel] = useState("Phone Number");
  const [custidNumLabel, setCustIdNumLabel] = useState("Id Number");
  const [custProvinceLabel, setCustProvinceLabel] = useState("Province");
  const [custDistrictLabel, setCustDistrictLabel] = useState("District");
  const [disaddressLabel, setDisaddressLabel] = useState("Address");
  

  const { data: session, status } = useSession({
    required: true,
  });

  const dispatch = useDispatch();




 

  const adddistributorfuc = (e) => {
    e.preventDefault();

    if (disname === "") {
      setDisnameerror(true);
      setDisnameLabel("Add Full name");
    } else if (custtin === "") {
      setCustTinerror(true);
      setCustTinLabel("Add Tin Number");
    } else if (custbio === "") {
      setCustBioerror(true);
      setCustBioLabel("Add Bio");
    } else if (disemail === "") {
      setDisemailerror(true);
      setDisemailLabel("Add Email");
    }else if (disphone === "") {
      setDisphoneerror(true);
      setDisphoneLabel("Add Phone Number");
    }else if (custidNum === "") {
      setCustIdNumerror(true);
      setCustIdNumLabel("Add ID Number");
    } else if (custProvince === "") {
      setCustProvinceerror(true);
      setCustProvinceLabel("Add Province");
    }else if (custDistrict === "") {
      setCustDistricterror(true);
      setCustDistrictLabel("Add District");
    }else if (disaddress === "") {
      setDisaddresserror(true);
      setDisaddressLabel("Add Address");
    }  else {
      // whatever you want to send
      const data = {
        user_id: localStorage.getItem('id'),
        names: disname,
        tin:custtin,
        bio:custbio,
        email: disemail,
        phone: disphone,
        identity_number:custidNum,
        province:custProvince,
        district:custDistrict,
        address: disaddress,
        
      };

      dispatch(AddCustomer(data));
      enqueueSnackbar(`${disname} has been added`, { variant: "success" });
      setDisname("");
      setCustTin("");
      setCustBio("");
      setDisemail("");
      setDisphone("");
      setCustIdNum("");
      setCustProvince("");
      setCustDistrict("");
      setDisaddress("");
      
      

      setCustTinerror(false);
      setCustTinLabel("Add Tin Number");

      setCustBioerror(false);
      setCustBioLabel("Add Bio");

      setCustIdNumerror(false);
      setCustIdNumLabel("Add ID Number");
      
      setCustProvinceerror(false);
      setCustProvinceLabel("Add Province");

      setCustDistricterror(false);
      setCustDistrictLabel("Add District");

      




      setDisnameerror(false);
      setDisemailerror(false);
      setDisphoneerror(false);
      setDisaddresserror(false);

      setDisnameLabel("Distributor names");
      setDisemailLabel("Add Email");
      setDisphoneLabel("Add Phone Number");
      setDisaddressLabel("Add Address");
  };
}

  return (
    <div className={classes.addform}>
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
        id="outlined-basic"
        label={custtinLabel}
        variant="outlined"
        value={custtin}
        error={custtinerror}
        size="small"
        onChange={(e) => {
          setCustTin(e.target.value);
          setCustTinerror(false);
          setCustTinLabel("Tin Number");
          dispatch(change_msg(null));
        }}
      />
      <br/>


      <TextField
        id="outlined-basic"
        label={custbioLabel}
        variant="outlined"
        value={custbio}
        error={custbioerror}
        size="small"
        onChange={(e) => {
          setCustBio(e.target.value);
          setCustBioerror(false);
          setCustBioLabel("Bio");
          dispatch(change_msg(null));
        }}
      />
      <br/>
      


      <TextField
        id="outlined-basic"
        label={disemailLabel}
        multiline
        maxRows={4}
        variant="outlined"
        value={disemail}
        error={disemailerror}
        size="small"
        onChange={(e) => {
          setDisemail(e.target.value);
          setDisemailLabel("Email");
          setDisemailerror(false);
          dispatch(change_msg(null));
        }}
      />
      <br/>
      <TextField
        id="outlined-basic"
        label={disphoneLabel}
        multiline
        maxRows={4}
        variant="outlined"
        value={disphone}
        error={disphoneerror}
        size="small"
        onChange={(e) => {
          setDisphone(e.target.value);
          setDisphoneLabel("Phone Number");
          setDisphoneerror(false);
          dispatch(change_msg(null));
        }}
      />
      <br/>

      <TextField
        id="outlined-basic"
        label={custidNumLabel}
        multiline
        maxRows={4}
        variant="outlined"
        value={custidNum}
        error={custidNumerror}
        size="small"
        onChange={(e) => {
          setCustIdNum(e.target.value);
          setCustIdNumerror(false);
          setCustIdNumLabel("ID Number");
          dispatch(change_msg(null));
        }}
      />
      <br/>

      <TextField
        id="outlined-basic"
        label={custProvinceLabel}
        multiline
        maxRows={4}
        variant="outlined"
        value={custProvince}
        error={custProvinceerror}
        size="small"
        onChange={(e) => {
          setCustProvince(e.target.value);
          setCustProvinceerror(false);
          setCustProvinceLabel("Province");
          dispatch(change_msg(null));
        }}
      />
      <br/>

      <TextField
        id="outlined-basic"
        label={custDistrictLabel}
        multiline
        maxRows={4}
        variant="outlined"
        value={custDistrict}
        error={custDistricterror}
        size="small"
        onChange={(e) => {
          setCustDistrict(e.target.value);
          setCustDistricterror(false);
          setCustDistrictLabel("District");
          dispatch(change_msg(null));
        }}
      />
      <br/>

      <TextField
        id="outlined-basic"
        label={disaddressLabel}
        multiline
        maxRows={4}
        variant="outlined"
        value={disaddress}
        error={disaddresserror}
        size="small"
        onChange={(e) => {
          setDisaddress(e.target.value);
          setDisaddressLabel("Address");
          setDisaddresserror(false);
          dispatch(change_msg(null));
        }}
      />
        <br/>

      <Button variant="contained" color="primary" size="large" onClick={adddistributorfuc}>
        Add customer
      </Button>
    </div>
  );
}

export default function IntegrationNotistacks() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Addform />
    </SnackbarProvider>
  );
}
