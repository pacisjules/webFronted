import React,{ useEffect,useState } from 'react'
import axios from 'axios';
import classes from "../../../../styles/section/App.module.css";
//import classes from "../../../../styles/group/Groups.modules.css";
import {UPDATEsection, getsectiondetail} from '../../../../features/sections/sections.js';
import { useSession, signIn, signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { SnackbarProvider, useSnackbar } from "notistack";
import Link from "next/link";
import { useRouter } from "next/router";

function Edit () {
    
  // const [LoadDatas, setLoadDatas] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    const [sectionname, setSectionname] = useState("");
    const [sectiondescr, setSectiondescr] = useState("");
    const [sectionstatus, setSectionstatus] = useState("");
   
    const [sectionnameError, SetSectionnameError] = useState(false);
    const [sectiondescrerror, setSectiondescrerro] = useState(false);
    const [sectionstatuserror, setSectionstatuserro] = useState(false);

    const [sectionnameLabel, SetSectionnameLabel] = useState("");
    const [sectiondescrLabel, setSectiondescrLabel] = useState("");
    const [sectionstatusLabel, setSectionstatusLabel] = useState("");

    const router = useRouter();
    const { Edit } = router.query;

    const { data: session, status } = useSession({
      required: true,
    });
  
    const dispatch = useDispatch();

    const getdetailname = async ()=>{
      await axios.get("http://127.0.0.1:8000/section/"+Edit, { headers: { Authorization: `Bearer ${session.user.token}` } })
      .then((response)=> 
       setSectionname(response.data.section_name)
     )
    };
    const getdetaildescri = async ()=>{
      await axios.get("http://127.0.0.1:8000/section/"+Edit, { headers: { Authorization: `Bearer ${session.user.token}` } })
      .then((response)=> 
       setSectiondescr(response.data.description)
     )
    };
    const getdetailstatus = async ()=>{
      await axios.get("http://127.0.0.1:8000/section/"+Edit, { headers: { Authorization: `Bearer ${session.user.token}` } })
      .then((response)=> 
       setSectionstatus(response.data.status),
     )
    };

    
  
    useEffect(() => {
      getdetailname()
      getdetaildescri()
      getdetailstatus()

      dispatch(getsectiondetail(sectionname))
      dispatch(getsectiondetail(sectiondescr))
      dispatch(getsectiondetail(sectionstatus))
     
    }, []);

  
   
    
    // const getupdatedata = async()=>{
    //  await  axios.put('http://127.0.0.1:8000/group_update/',{ headers: { Authorization: `Bearer ${session.user.token}` } },{

    //    group_name:groupname,
    //    description:groupdescr,
    //    status:groupstatus
    // })
         
    // };
    const updatesectionfuc = (e) => {
      e.preventDefault();
  
      if (sectionname === "") {
          SetSectionnameError(true);
          SetSectionnameLabel("Add group name");
      } else if (sectiondescr === "") {
          sectiondescr(true);
          setSectiondescrLabel("Add Description");
      } else {
       // whatever you want to send

       //group update variables with Backend
        const infos = {
          section_id: Edit,
          user_id:localStorage.getItem('id'),
          section_name: sectionname,
          description: sectiondescr,
          status:sectionstatus,
          created_at: "string",
          last_update_at:"string"
        };

        const tkn = session.user.token;
        
        //group send variables to Redux
        dispatch(UPDATEsection({infos, tkn}));

        enqueueSnackbar(`${sectionname} has been updated`, { variant: "success" });
        

        SetSectionnameError(false);
        SetSectionnameLabel("");
  
        setSectiondescrLabel("");
        setSectiondescrerro(false);

        router.push('/usermanagements/sectionside/Section');

      }
    };

  return (
    <div className={classes.main}>
      
      <div className={classes.topintro}>
          <h1>Section Detail Information</h1>
          <p>Here are detail information about this group</p>
          <div className={classes.editform}>
            <TextField
              id="outlined-basic"
              label={sectionnameLabel}
              variant="outlined"
              value={sectionname}
              error={sectionnameError}
              size="small"
              onChange={(e) => {
                  setSectionname(e.target.value);
                  SetSectionnameError(false);
               
              }}
          />
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
                  setSectiondescrerro(false);
              }}
        />
       
        <br/>
        <TextField
              id="outlined-basic"
              label={sectionstatusLabel}
              variant="outlined"
              value={sectionstatus}
              error={sectionnameError}
              size="small"
              onChange={(e) => {
                  setSectionstatus(e.target.value);
                  SetSectionnameError(false);
              }}
          />
          <br/>

          <Button variant="contained" color="primary" size="large" onClick={updatesectionfuc}>
        Edit section
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