import React, { useState } from "react";
import { AddSection, change_msg } from "../../../features/sections/sections.js";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { SnackbarProvider, useSnackbar } from "notistack";
import classes from "../../../styles/section/App.module.css";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function EditingForm({Appname}) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [sectionname, setSectionname] = useState("");
  const [sectiondescr, setSectiondescr] = useState("");

  const [sectionnameError, SetsectionnameError] = useState(false);
  const [sectiondescrerror, setSectiondescrerro] = useState(false);

  const [sectionnameLabel, SetsectionnameLabel] = useState("Section name");
  const [sectiondescrLabel, setSectiondescrLabel] = useState("Description");


  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const addsectionfuc = (e) => {
    e.preventDefault();

    if (sectionname === "") {
      SetsectionnameError(true);
      SetsectionnameLabel("Add section name");
    } else if (sectiondescr === "") {
      setSectiondescrerro(true);
      setSectiondescrLabel("Add Description");
    } else {
      // whatever you want to send
      const data = {
        user_id: "8b09ff5d-83b7-11ed-bd0b-48d224035647",
        section_name: sectionname,
        description: sectiondescr,
      };

      dispatch(AddSection(data));
      enqueueSnackbar(`${sectionname} has been added`, { variant: "success" });
      setSectionname("");
      setSectiondescr("");

      SetsectionnameError(false);
      SetsectionnameLabel("Section name");

      setSectiondescrLabel("Description");
      setSectiondescrerro(false);
    }
  };

  return (
    <div className={classes.addform}>
      <TextField
        id="outlined-basic"
        label={sectionnameLabel}
        variant="outlined"
        value={sectionname}
        error={sectionnameError}
        size="small"
        onChange={(e) => {
          setSectionname(e.target.value);
          SetsectionnameError(false);
          SetsectionnameLabel("Section name");
          dispatch(change_msg(null));
        }}
      />
      <br/>

      <p>{Appname} sasa</p>


<FormControl sx={{  minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Status</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={age}
        label="Status"
        onChange={handleChange}
      >
        <MenuItem value={1}>Active</MenuItem>
        <MenuItem value={0}>Disable</MenuItem>
      </Select>
    </FormControl>
    <br/>

      <TextField
        id="filled-multiline-flexible"
        label={sectiondescrLabel}
        multiline
        maxRows={4}
        variant="outlined"
        value={sectiondescr}
        error={sectiondescrerror}
        size="large"
        onChange={(e) => {
          setSectiondescr(e.target.value);
          setSectiondescrLabel("Description");
          setSectiondescrerro(false);
          dispatch(change_msg(null));
        }}
      />
<br/>
      <Button variant="contained" color="primary" size="large" onClick={addsectionfuc}>
        Update section
      </Button>
    </div>
  );
}

export default function IntegrationNotistacks() {
  return (
    <SnackbarProvider maxSnack={3}>
      <EditingForm />
    </SnackbarProvider>
  );
}
