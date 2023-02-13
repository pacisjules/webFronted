import React, { useState } from "react";
import { AddStore,change_msg } from "../../features//inventories/inventory.js";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { SnackbarProvider, useSnackbar } from "notistack";
import classes from "../../styles/section/App.module.css";
function Addform(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [storename, setStorename] = useState("");
  const [storeaddress, setStoreaddress] = useState("");
  const [storedescr, setStoredescr] = useState("");

  const [storenameError, SetStorenameError] = useState(false);
  const [storeaddressError, SetStoreaddressError] = useState(false);
  const [storedescrerror, setStoredescrerro] = useState(false);

  const [storenameLabel, SetStorenameLabel] = useState("Store name");
  const [storeaddressLabel, SetStoreaddressLabel] = useState("Store address");
  const [storedescrLabel, setStoredescrLabel] = useState("Description");

  const addstorefuc = (e) => {
    e.preventDefault();

    if (storename === "") {
        SetStorenameError(true);
        SetStorenameLabel("Add store name");
    } else if (storeaddress === "") {
        SetStoreaddressError(true);
        SetStoreaddressLabel("Add Store Address");
    }else if (storedescr === "") {
        setStoredescrerro(true);
        setStoredescrLabel("Add Description");
    } else {
      // whatever you want to send
      const data = {
        user_id: localStorage.getItem('id'),
        store_name: storename,
        org_setting_id:localStorage.getItem('org_id'),
        address:storeaddress,
        description: storedescr,
      };

      dispatch(AddStore(data));

      enqueueSnackbar(`${storename} has been added`, { variant: "success" });
      setStorename("");
      setStoreaddress("");
      setStoredescr("");

      SetStorenameError(false);
      SetStorenameLabel("Store name");

      SetStoreaddressError(false);
      SetStoreaddressLabel("Store address");

      setStoredescrLabel("Description");
      setStoredescrerro(false);
    }
  };

  return (
    <div className={classes.addform}>
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
            SetStorenameLabel("Store name");
          dispatch(change_msg(null));
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
            SetStoreaddressLabel("Store Address");
          dispatch(change_msg(null));
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
            setStoredescrLabel("Description");
            setStoredescrerro(false);
          dispatch(change_msg(null));
        }}
      />
      <br/>

      <Button variant="contained" color="primary" size="large" onClick={addstorefuc}>
        Add store
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
