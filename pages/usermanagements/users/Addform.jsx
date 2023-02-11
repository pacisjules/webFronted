import React, { useState } from "react";
import { AddSection, change_msg } from "../../../features/sections/sections.js";
import { useDispatch } from "react-redux";
import { SnackbarProvider, useSnackbar } from "notistack";
import classes from "../../../styles/section/App.module.css";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = ['User information', 'User address', 'Security', 'Finish setup'];


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
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>

            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>

          </Box>
        </React.Fragment>
      )}
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
