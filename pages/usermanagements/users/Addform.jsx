import React, { useState } from "react";
import { AddSection, change_msg } from "../../../features/sections/sections.js";
import { useDispatch } from "react-redux";
import { SnackbarProvider, useSnackbar } from "notistack";
import classes from "../../../styles/section/App.module.css";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';
import StepContent from '@mui/material/StepContent';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import TextField from "@mui/material/TextField";
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';
import WrapTextOutlinedIcon from '@mui/icons-material/WrapTextOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

function Addform(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  const [sectionname, setSectionname] = useState("");
  const [sectiondescr, setSectiondescr] = useState("");

  const [sectionnameError, SetsectionnameError] = useState(false);
  const [sectiondescrerror, setSectiondescrerro] = useState(false);

  const [sectionnameLabel, SetsectionnameLabel] = useState("Section name");
  const [sectiondescrLabel, setSectiondescrLabel] = useState("Description");

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
        user_id: localStorage.getItem('id'),
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
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          <Step key={1}>
            <StepLabel>
              User information
            </StepLabel>
          </Step>
          <Step key={2}>
            <StepLabel>User Contacts</StepLabel>
          </Step>
          <Step key={3}>
            <StepLabel>Security</StepLabel>
          </Step>

          <Step key={4}>
            <StepLabel>Finish</StepLabel>
          </Step>
        </Stepper>
        <Box sx={{ width: '100%', display: "flex", flexDirection:"column", padding: "10px", justifyContent:"space-between", alignItems: "center" }}>
          {activeStep === 0 ? (
          <> <br/><br/>
        <TextField
        id="filled-multiline-flexible"
        label="First name"
        multiline
        maxRows={4}
        variant="outlined"
        size="small"
        sx={{
          width:"70%"
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonOutlineIcon sx={{
                color:"green"
              }} />
            </InputAdornment>
          ),
        }}
        />
<br/>
<TextField
        id="filled-multiline-flexible"
        label="Last name"
        multiline
        maxRows={4}
        variant="outlined"
        size="small"
        sx={{
          width:"70%"
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonOutlineIcon sx={{
                color:"green"
              }} />
            </InputAdornment>
          ),
        }}
        />
<br/>
<TextField
        id="filled-multiline-flexible"
        label="Company"
        multiline
        maxRows={4}
        variant="outlined"
        size="small"
        sx={{
          width:"70%"
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AddBusinessIcon sx={{
                color:"#a5ab00"
              }}/>
            </InputAdornment>
          ),
        }}
        />
      <br/>
          </>
          ) : activeStep === 1 ? (
          <>
          <br/><br/>
        <TextField
        id="filled-multiline-flexible"
        label="Phone number"
        multiline
        maxRows={4}
        variant="outlined"
        size="small"
        sx={{
          width:"70%"
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocalPhoneOutlinedIcon sx={{
                color:"green"
              }} />
            </InputAdornment>
          ),
        }}
        />
<br/>
<TextField
        id="filled-multiline-flexible"
        label="E-mail"
        multiline
        maxRows={4}
        variant="outlined"
        size="small"
        sx={{
          width:"70%"
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MarkEmailUnreadOutlinedIcon sx={{
                color:"green"
              }} />
            </InputAdornment>
          ),
        }}
        />
<br/>
<TextField
        id="filled-multiline-flexible"
        label="Type"
        multiline
        maxRows={4}
        variant="outlined"
        size="small"
        sx={{
          width:"70%"
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <WrapTextOutlinedIcon sx={{
                color:"#a5ab00"
              }}/>
            </InputAdornment>
          ),
        }}
        />
      <br/>
      <TextField
        id="filled-multiline-flexible"
        label="Living address"
        multiline
        maxRows={4}
        variant="outlined"
        size="small"
        sx={{
          width:"70%"
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <HomeOutlinedIcon sx={{
                color:"#a5ab00"
              }}/>
            </InputAdornment>
          ),
        }}
        />
      <br/>
          </>
          ) : activeStep === 2 ? (
          <>
          </>
          ) : (
          <>
          </>
          )}
        </Box>

        <Box sx={{ width: '100%', display: "flex", padding: "10px", justifyContent: "center", alignItems: "center" }}>
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={handleBack} startIcon={<ChevronLeftIcon/>} sx={{
                backgroundColor:"#e80078",
                "&:hover":{
                    backgroundColor:"#ab0058",
                }
            }}>Back</Button>
            <Button variant="contained" onClick={handleNext} endIcon={<NavigateNextIcon />} sx={{
                backgroundColor:"#02ba5b",
                "&:hover":{
                    backgroundColor:"#008a43",
                }
            }}>Next</Button>
          </Stack>
        </Box>
      </Box>
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
