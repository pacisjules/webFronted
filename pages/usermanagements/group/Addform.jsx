import React, { useState } from "react";
import { AddGroup,change_msg } from "../../../features/groups/groups";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { SnackbarProvider, useSnackbar } from "notistack";
import classes from "../../../styles/section/App.module.css";

function Addform(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [groupname, setGroupname] = useState("");
  const [groupdescr, setGroupdescr] = useState("");

  const [groupnameError, SetGroupnameError] = useState(false);
  const [groupdescrerror, setGroupdescrerro] = useState(false);

  const [groupnameLabel, SetgroupnameLabel] = useState("Group name");
  const [groupdescrLabel, setGroupdescrLabel] = useState("Description");

  const addgroupfuc = (e) => {
    e.preventDefault();

    if (groupname === "") {
        SetGroupnameError(true);
        SetgroupnameLabel("Add group name");
    } else if (groupdescr === "") {
        groupdescr(true);
        setGroupdescrLabel("Add Description");
    } else {
      // whatever you want to send
      const data = {
        user_id: "630ab6ba-8622-11ed-bfa7-88532eef2751",
        group_name: groupname,
        description: groupdescr,
      };

      dispatch(AddGroup(data));
      enqueueSnackbar(`${groupname} has been added`, { variant: "success" });
      setGroupname("");
      setGroupdescr("");

      SetGroupnameError(false);
      SetgroupnameLabel("Group name");

      setGroupdescrLabel("Description");
      setGroupdescrerro(false);
    }
  };

  return (
    <div className={classes.addform}>
      <TextField
        id="outlined-basic"
        label={groupnameLabel}
        variant="outlined"
        value={groupname}
        error={groupnameError}
        size="small"
        onChange={(e) => {
            setGroupname(e.target.value);
            SetGroupnameError(false);
            SetgroupnameLabel("Group name");
          dispatch(change_msg(null));
        }}
      />
      <br/>

      <TextField
        id="filled-multiline-flexible"
        label={groupdescrLabel}
        multiline
        maxRows={4}
        variant="outlined"
        value={groupdescr}
        error={groupdescrerror}
        size="large"
        onChange={(e) => {
            setGroupdescr(e.target.value);
            setGroupdescrLabel("Description");
            setGroupdescrerro(false);
          dispatch(change_msg(null));
        }}
      />
      <br/>

      <Button variant="contained" color="primary" size="large" onClick={addgroupfuc}>
        Add group
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
