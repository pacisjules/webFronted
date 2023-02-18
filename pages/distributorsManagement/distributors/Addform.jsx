import { useEffect, useState } from "react";
import { AddDistributor,change_msg } from "../../../features/distributor/distributor";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from "@mui/material/TextField";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { SnackbarProvider, useSnackbar } from "notistack";
import classes from "../../../styles/section/App.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from 'axios';



function Addform(props) {
  
  const { enqueueSnackbar } = useSnackbar();

  const [disname, setDisname] = useState("");
  const [disemail, setDisemail] = useState("");
  const [disphone, setDisphone] = useState("");
  const [disaddress, setDisaddress] = useState("");

  const [disnameerror, setDisnameerror] = useState(false);
  const [disemailerror, setDisemailerror] = useState(false);
  const [disphoneerror, setDisphoneerror] = useState(false);
  const [disaddresserror, setDisaddresserror] = useState(false);

  const [disnameLabel, setDisnameLabel] = useState("Distributor names");
  const [disemailLabel, setDisemailLabel] = useState("Email");
  const [disphoneLabel, setDisphoneLabel] = useState("Phone Number");
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
    } else if (disemail === "") {
      setDisemailerror(true);
      setDisemailLabel("Add Email");
    }else if (disphone === "") {
      setDisphoneerror(true);
      setDisphoneLabel("Add Phone Number");
    } else if (disaddress === "") {
      setDisaddresserror(true);
      setDisaddressLabel("Add Address");
    }  else {
      // whatever you want to send
      const data = {
        user_id: localStorage.getItem('id'),
        names: disname,
        email: disemail,
        phone: disphone,
        address: disaddress,
      };

      dispatch(AddDistributor(data));
      enqueueSnackbar(`${disname} has been added`, { variant: "success" });
      setDisname("");
      setDisemail("");
      setDisphone("");
      setDisaddress("");

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

      <Button variant="contained" color="primary" size="large" onClick={adddistributorfuc}>
        Add distributor
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
