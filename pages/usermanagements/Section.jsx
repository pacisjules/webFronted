import React, { useState } from 'react'
import classes from "../../styles/section/App.module.css";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import { AddSection, change_msg } from '../../features/sections/sections.js';
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { SnackbarProvider, useSnackbar } from "notistack";

function Section() {

  const dispatch = useDispatch();
  const msg = useSelector((state) => state.sections.msg);
  const { enqueueSnackbar } = useSnackbar();

  const [sectionname, setSectionname] = useState('')
  const [sectiondescr, setSectiondescr] = useState('')

  const [sectionnameError, SetsectionnameError] = useState(false)
  const [sectiondescrerror, setSectiondescrerro] = useState(false)

  const [sectionnameLabel, SetsectionnameLabel] = useState('Section name')
  const [sectiondescrLabel, setSectiondescrLabel] = useState('Description')


  const addsectionfuc = (e) => {
    e.preventDefault();

    if(sectionname===""){
      SetsectionnameError(true)
      SetsectionnameLabel('Add section name')
    }else if(sectiondescr===""){
      setSectiondescrerro(true)
      setSectiondescrLabel('Add Description')
    }else{
          // whatever you want to send
    const data = {
      user_id: "8b09ff5d-83b7-11ed-bd0b-48d224035647",
      section_name: sectionname,
      description: sectiondescr,
    };

    dispatch(AddSection(data));
    enqueueSnackbar(`${sectionname} has been added`, { variant: "success" });
    setSectionname('')
    setSectiondescr('')

    SetsectionnameError(false)
    SetsectionnameLabel('Section name')

    setSectiondescrLabel('Description')
    setSectiondescrerro(false)

    

    }
  };


  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );



  return (
    <div className={classes.main}>
      
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          <React.Fragment>
            <CardContent>        <TextField
              id="outlined-basic"
              label={sectionnameLabel}
              variant="outlined"
              value={sectionname}
              error={sectionnameError}
              onChange={(e) => {
                setSectionname(e.target.value)
                SetsectionnameError(false)
                SetsectionnameLabel('Section name')
                dispatch(change_msg(null))
              }}
            />

              <TextField
                id="filled-multiline-flexible"
                label={sectiondescrLabel}
                multiline
                maxRows={4}
                variant="outlined"
                value={sectiondescr}
                error={sectiondescrerror}
                onChange={(e) => {
                  setSectiondescr(e.target.value)
                  setSectiondescrLabel('Description')
                  setSectiondescrerro(false)
                  dispatch(change_msg(null))
                }}
              />


              <Button variant="contained" color="primary" onClick={addsectionfuc}>
                Add section
              </Button></CardContent>
          </React.Fragment>
        </Card>
      </Box>

    </div>
  )
}

export default function IntegrationNotistacks() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Section />
    </SnackbarProvider>
  );
}
