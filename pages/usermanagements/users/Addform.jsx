import React, { useState } from "react";
import { AddUser } from "../../../features/userinfos/userinfos.js";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { SnackbarProvider, useSnackbar } from "notistack";
import classes from "../../../styles/section/App.module.css";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';
import StepContent from '@mui/material/StepContent';
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
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';



import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import AddTaskIcon from '@mui/icons-material/AddTask';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Addform(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [open, setOpen] = React.useState(false);

  //User information
  const [firstName, setFirstname] = useState('')
  const [errorfirstName, seterrorFirstname] = useState(false)
  const [labelfirstName, setlabelFirstname] = useState('First name')

  const [lastName, setLastname] = useState('')
  const [errorlastName, seterrorLastname] = useState(false)
  const [labellastName, setlabelLastname] = useState('Last name')

  const [company, setCompany] = useState('')
  const [errorcompany, seterrorCompany] = useState(false)
  const [labelcompany, setlabelCompany] = useState('Company')



  //User contacts
  const [phone, setPhone] = useState('')
  const [errorphone, seterrorPhone] = useState(false)
  const [labelphone, setlabelPhone] = useState('Phone number')


  const [email, setEmail] = useState('')
  const [erroremail, seterrorEmail] = useState(false)
  const [labelemail, setlabelEmail] = useState('E-mail')


  const [type, setType] = useState('')
  const [errortype, seterrorType] = useState(false)
  const [labeltype, setlabelType] = useState('Type')

  const [living, setLiving] = useState('')
  const [errorliving, seterrorLiving] = useState(false)
  const [labelliving, setlabelLiving] = useState('Living address')




  //Security
  const [username, setUsername] = useState('')
  const [errorusername, seterrorUsername] = useState(false)
  const [labelusername, setlabelUsername] = useState('Create username')



  const [role, setRole] = useState('')
  const [errorrole, seterrorRole] = useState(false)
  const [labelrole, setlabelRole] = useState('Role')


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


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

// Conditions of User information
  const handleNextUserInformation = () => {
    if (firstName === "") {
      seterrorFirstname(true);
      setlabelFirstname('Please enter User First name');
    } else if (lastName === "") {
      seterrorLastname(true)
      setlabelLastname('Please User Last name')
    } else if (company === "") {
      seterrorCompany(true)
      setlabelCompany('Please enter Company name')
    }
    else {
      seterrorFirstname(false);
      seterrorLastname(false)
      seterrorCompany(false)
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  }

// conditions of user contacts

const handleNextUserContacts = ()=>{
  if (phone === "") {
    seterrorPhone(true);
    setlabelPhone('Please enter User Phone number');
  } else if (email === "") {
    seterrorEmail(true)
    setlabelEmail('Please enter User e-mail')
  } else if (type === "") {
    seterrorType(true)
    setlabelType('Please enter type')
  }else if (living === "") {
    seterrorLiving(true)
    setlabelLiving('Please enter Real address')
  }
  else {
    seterrorPhone(false);
    seterrorEmail(false)
    seterrorType(false)
    seterrorLiving(false)
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  }
}


// conditions of user Security

const handleNextUserSec = ()=>{
  if (username === "") {
    seterrorUsername(true);
    setlabelUsername('Please enter Username');
  } else if (role===""){
    seterrorRole(true);
    setlabelRole('Please enter Role');
  }
  else {
    seterrorUsername(false)
    seterrorRole(false)
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  }
}



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
    setFirstname('')
    setLastname('')
    setPhone('')
    setEmail('')
    setCompany('')
    setLiving('')
    setRole('')
    setType('')
    setOpen(false);
  };

  const handleLeave=()=>{
    setOpen(false);
    router.push("/usermanagements/users/Users");
  }


  const handleFinishStaff = (e) => {
    e.preventDefault();
      // whatever you want to send
      const data = {
        username: username,
        first_name: firstName,
        last_name: lastName,
        password: "12345",
        email: email,
        type: type,
        role: role,
        company: company,
        organization_ID: localStorage.getItem('org_id'),
        phone: phone,
        living: living,
      };

      dispatch(AddUser(data));
      setOpen(true);
      enqueueSnackbar(`${firstName} ${lastName} user has been added`, { variant: "success" });
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
        <Box sx={{ width: '100%', display: "flex", flexDirection: "column", padding: "10px", justifyContent: "space-between", alignItems: "center" }}>
          {activeStep === 0 ? (
            <> <br /><br />
              
              <TextField
                id="filled-multiline-flexible"
                label={labelfirstName}
                value={firstName}
                error={errorfirstName}
                multiline
                maxRows={4}
                variant="outlined"
                onChange={(e) => {
                  setFirstname(e.target.value)
                  seterrorFirstname(false)
                  setlabelFirstname('First name')
                }}
                size="small"
                sx={{
                  width: "70%"
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon sx={{
                        color: "green"
                      }} />
                    </InputAdornment>
                  ),
                }}
              />
              <br />
              <TextField
                id="filled-multiline-flexible"
                label={labellastName}
                value={lastName}
                error={errorlastName}
                multiline
                maxRows={4}
                variant="outlined"
                onChange={(e) => {
                  setLastname(e.target.value)
                  seterrorLastname(false)
                  setlabelLastname('Last name')
                }}
                size="small"
                sx={{
                  width: "70%"
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon sx={{
                        color: "green"
                      }} />
                    </InputAdornment>
                  ),
                }}
              />
              <br />
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                sx={{
                  width: "70%"
                }}
                value={company}
                disableClearable
               
                options={top100Films.map((option) => option.title)}
              
                onSelect={(e) => {
                  setCompany(e.target.value)
                  seterrorCompany(false)
                  setlabelCompany('Company');
                }}

                renderInput={(params) => (
                  <TextField
                    {...params}
                    id="filled-multiline-flexible"
                    label={labelcompany}
                    value={company}
                    error={errorcompany}
                    multiline
                    maxRows={4}
                    variant="outlined"
                    size="small"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                      startAdornment: (
                        <InputAdornment position="start">
                          <AddBusinessIcon sx={{
                            color: "#a5ab00"
                          }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              <br />


              <Box sx={{ width: '100%', display: "flex", padding: "10px", justifyContent: "center", alignItems: "center" }}>
                <Stack spacing={2} direction="row">
                  <Button variant="contained" onClick={handleNextUserInformation} endIcon={<NavigateNextIcon />} sx={{
                    backgroundColor: "#02ba5b",
                    "&:hover": {
                      backgroundColor: "#008a43",
                    }
                  }}>Save & Next</Button>
                </Stack>
              </Box>


            </>
          ) : activeStep === 1 ? (
            <>
              <br /><br />
              <TextField
                id="filled-multiline-flexible"
                label={labelphone}
                value={phone}
                error={errorphone}
                multiline
                maxRows={4}
                variant="outlined"
                size="small"
                onChange={(e) => {
                  setPhone(e.target.value)
                  seterrorPhone(false)
                  setlabelPhone('Phone number')
                }}
                sx={{
                  width: "70%"
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalPhoneOutlinedIcon sx={{
                        color: "green"
                      }} />
                    </InputAdornment>
                  ),
                }}
              />
              <br />
              <TextField
                id="filled-multiline-flexible"
                label={labelemail}
                value={email}
                error={erroremail}
                multiline
                maxRows={4}
                variant="outlined"
                size="small"
                onChange={(e) => {
                  setEmail(e.target.value)
                  seterrorEmail(false)
                  setlabelEmail('E-mail')
                }}
                sx={{
                  width: "70%"
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MarkEmailUnreadOutlinedIcon sx={{
                        color: "green"
                      }} />
                    </InputAdornment>
                  ),
                }}
              />
              <br />
              <TextField
                id="filled-multiline-flexible"
                label={labeltype}
                error={errortype}
                multiline
                value={type}
                onChange={(e) => {
                 setType(e.target.value) 
                 seterrorType(false)
                 setlabelType('Type')
                }}
                maxRows={4}
                variant="outlined"
                size="small"
                sx={{
                  width: "70%"
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WrapTextOutlinedIcon sx={{
                        color: "#a5ab00"
                      }} />
                    </InputAdornment>
                  ),
                }}
              />
              <br />
              <TextField
                id="filled-multiline-flexible"
                label={labelliving}
                error={errorliving}
                multiline
                maxRows={4}
                value={living}
                onChange={(e) => {
                  setLiving(e.target.value)
                  seterrorLiving(false)
                  setlabelLiving('Living')
                }}
                variant="outlined"
                size="small"
                sx={{
                  width: "70%"
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeOutlinedIcon sx={{
                        color: "#a5ab00"
                      }} />
                    </InputAdornment>
                  ),
                }}
              />
              <br />
              <Box sx={{ width: '100%', display: "flex", padding: "10px", justifyContent: "center", alignItems: "center" }}>
                <Stack spacing={2} direction="row">
                  <Button variant="contained" onClick={handleBack} startIcon={<ChevronLeftIcon />} sx={{
                    backgroundColor: "#e80078",
                    "&:hover": {
                      backgroundColor: "#ab0058",
                    }
                  }}>Back</Button>
                  <Button variant="contained" onClick={handleNextUserContacts} endIcon={<NavigateNextIcon />} sx={{
                    backgroundColor: "#02ba5b",
                    "&:hover": {
                      backgroundColor: "#008a43",
                    }
                  }}>Save & Next</Button>
                </Stack>
              </Box>
            </>
          ) : activeStep === 2 ? (
            <>

              <TextField
                id="filled-multiline-flexible"
                label={labelusername}
                error={errorusername}
                multiline
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  seterrorUsername(false)
                  setlabelUsername('Username')
                }}
                maxRows={4}
                variant="outlined"
                size="small"
                sx={{
                  width: "70%"
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SupervisedUserCircleIcon sx={{
                        color: "#a5ab00"
                      }} />
                    </InputAdornment>
                  ),
                }}
              />
              <br />

              <TextField
                id="filled-multiline-flexible"
                label={labelrole}
                error={errorrole}
                multiline
                value={role}
                onChange={(e) => {
                  setRole(e.target.value)
                  seterrorRole(false)
                  setlabelRole('Role')
                }}
                maxRows={4}
                variant="outlined"
                size="small"
                sx={{
                  width: "70%",
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SentimentSatisfiedAltIcon sx={{
                        color: "#a5ab00"
                      }} />
                    </InputAdornment>
                  ),
                }}
              />
              <br />
              <br />
              <Box sx={{ width: '100%', display: "flex", padding: "10px", justifyContent: "center", alignItems: "center" }}>
                <Stack spacing={2} direction="row">
                  <Button variant="contained" onClick={handleBack} startIcon={<ChevronLeftIcon />} sx={{
                    backgroundColor: "#e80078",
                    "&:hover": {
                      backgroundColor: "#ab0058",
                    }
                  }}>Back</Button>
                  <Button variant="contained" onClick={handleNextUserSec} endIcon={<NavigateNextIcon />} sx={{
                    backgroundColor: "#02ba5b",
                    "&:hover": {
                      backgroundColor: "#008a43",
                    }
                  }}>Save & Next</Button>
                </Stack>
              </Box>
            </>
          ) : (
            <>
              <Box sx={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"column",
                border:"1px solid orange",
                padding:"20px",
                borderRadius:"20px"
              }}>
                <br/>
                <h2>Be sure for this information</h2>
                <p><b>Names</b>  <i>{firstName} {lastName}</i></p>
                <p><b>Type</b> <i>as {type} of {role} in {company} company</i></p>
                <p><b>Address</b>  <i>in {living}</i></p>
                <br/>
              </Box>
              <Box sx={{ width: '100%', display: "flex", padding: "10px", justifyContent: "center", alignItems: "center" }}>
                <Stack spacing={2} direction="row">
                  <Button variant="contained" onClick={handleBack} startIcon={<ChevronLeftIcon />} sx={{
                    backgroundColor: "#e80078",
                    "&:hover": {
                      backgroundColor: "#ab0058",
                    }
                  }}>Back for correction</Button>
                  <Button variant="contained" onClick={handleFinishStaff} endIcon={<NavigateNextIcon />} sx={{
                    backgroundColor: "#02ba5b",
                    "&:hover": {
                      backgroundColor: "#008a43",
                    }
                  }}>Save information</Button>
                </Stack>
              </Box>
            </>
          )}
        </Box>
      </Box>


      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          backgroundColor:"#78080069"
        }}
      >
        <DialogTitle>{"Wrong credentials"}</DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-slide-description" sx={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            flexDirection:"column"
          }}>
            <AddTaskIcon sx={{
              color:"#02bd49",
              fontSize:"65px",
            }}/>
            User {firstName} {lastName} has added in system <br/>
            and default password is 12345
          </DialogContentText>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleReset} variant="outline">Finish & Add new</Button>
          <Button onClick={handleLeave} variant="outline">Finish</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}


// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  { title: 'Casablanca', year: 1942 },
  { title: 'City Lights', year: 1931 },
  { title: 'Psycho', year: 1960 },
  { title: 'The Green Mile', year: 1999 },
  { title: 'The Intouchables', year: 2011 },
  { title: 'Modern Times', year: 1936 },
  { title: 'Raiders of the Lost Ark', year: 1981 },
  { title: 'Rear Window', year: 1954 },
  { title: 'The Pianist', year: 2002 },
  { title: 'The Departed', year: 2006 },
  { title: 'Terminator 2: Judgment Day', year: 1991 },
  { title: 'Back to the Future', year: 1985 },
  { title: 'Whiplash', year: 2014 },
  { title: 'Gladiator', year: 2000 },
  { title: 'Memento', year: 2000 },
  { title: 'The Prestige', year: 2006 },
  { title: 'The Lion King', year: 1994 },
  { title: 'Apocalypse Now', year: 1979 },
  { title: 'Alien', year: 1979 },
  { title: 'Sunset Boulevard', year: 1950 },
  {
    title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { title: 'The Great Dictator', year: 1940 },
  { title: 'Cinema Paradiso', year: 1988 },
  { title: 'The Lives of Others', year: 2006 },
  { title: 'Grave of the Fireflies', year: 1988 },
  { title: 'Paths of Glory', year: 1957 },
  { title: 'Django Unchained', year: 2012 },
  { title: 'The Shining', year: 1980 },
  { title: 'WALL·E', year: 2008 },
  { title: 'American Beauty', year: 1999 },
  { title: 'The Dark Knight Rises', year: 2012 },
  { title: 'Princess Mononoke', year: 1997 },
  { title: 'Aliens', year: 1986 },
  { title: 'Oldboy', year: 2003 },
  { title: 'Once Upon a Time in America', year: 1984 },
  { title: 'Witness for the Prosecution', year: 1957 },
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  {
    title: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983,
  },
  { title: 'Reservoir Dogs', year: 1992 },
  { title: 'Braveheart', year: 1995 },
  { title: 'M', year: 1931 },
  { title: 'Requiem for a Dream', year: 2000 },
  { title: 'Amélie', year: 2001 },
  { title: 'A Clockwork Orange', year: 1971 },
  { title: 'Like Stars on Earth', year: 2007 },
  { title: 'Taxi Driver', year: 1976 },
  { title: 'Lawrence of Arabia', year: 1962 },
  { title: 'Double Indemnity', year: 1944 },
  {
    title: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
  },
  { title: 'Amadeus', year: 1984 },
  { title: 'To Kill a Mockingbird', year: 1962 },
  { title: 'Toy Story 3', year: 2010 },
  { title: 'Logan', year: 2017 },
  { title: 'Full Metal Jacket', year: 1987 },
  { title: 'Dangal', year: 2016 },
  { title: 'The Sting', year: 1973 },
  { title: '2001: A Space Odyssey', year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: 'Toy Story', year: 1995 },
  { title: 'Bicycle Thieves', year: 1948 },
  { title: 'The Kid', year: 1921 },
  { title: 'Inglourious Basterds', year: 2009 },
  { title: 'Snatch', year: 2000 },
  { title: '3 Idiots', year: 2009 },
  { title: 'Monty Python and the Holy Grail', year: 1975 },
];



export default function IntegrationNotistacks() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Addform />
    </SnackbarProvider>
  );
}
