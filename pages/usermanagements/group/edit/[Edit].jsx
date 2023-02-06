import React,{ useEffect,useState } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import classes from "../../../../styles/section/App.module.css";
//import classes from "../../../../styles/group/Groups.modules.css";
import {UPDATEGroup, getgroupdetail} from '../../../../features/groups/groups.js';
import { useSession, signIn, signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { SnackbarProvider, useSnackbar } from "notistack";
import Link from "next/link";

function Edit () {
    // const [LoadDatas, setLoadDatas] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    const [groupname, setGroupname] = useState("");
    const [groupdescr, setGroupdescr] = useState("");
    const [groupstatus, setGroupstatus] = useState("");
   

    const [groupnameError, SetGroupnameError] = useState(false);
    const [groupdescrerror, setGroupdescrerro] = useState(false);
    const [groupstatuserror, setGroupstatuserro] = useState(false);

    const [groupnameLabel, SetgroupnameLabel] = useState("");
    const [groupdescrLabel, setGroupdescrLabel] = useState("");
    const [groupstatusLabel, setGroupstatusLabel] = useState("");

    const router = useRouter();
    const { Edit } = router.query;

    const { data: session, status } = useSession({
      required: true,
    });
  
    const dispatch = useDispatch();

    const getdetailname = async ()=>{
      await axios.get("http://127.0.0.1:8000/group/"+Edit, { headers: { Authorization: `Bearer ${session.user.token}` } })
      .then((response)=> 
       setGroupname(response.data.group_name)
     )
    };
    const getdetaildescri = async ()=>{
      await axios.get("http://127.0.0.1:8000/group/"+Edit, { headers: { Authorization: `Bearer ${session.user.token}` } })
      .then((response)=> 
       setGroupdescr(response.data.description)
     )
    };
    const getdetailstatus = async ()=>{
      await axios.get("http://127.0.0.1:8000/group/"+Edit, { headers: { Authorization: `Bearer ${session.user.token}` } })
      .then((response)=> 
       setGroupstatus(response.data.status),
     )
    };

    
  
    useEffect(() => {
      getdetailname()
      getdetaildescri()
      getdetailstatus()

      dispatch(getgroupdetail(groupname))
      dispatch(getgroupdetail(groupdescr))
      dispatch(getgroupdetail(groupstatus))
     
    }, []);

  
   
    
    // const getupdatedata = async()=>{
    //  await  axios.put('http://127.0.0.1:8000/group_update/',{ headers: { Authorization: `Bearer ${session.user.token}` } },{

    //    group_name:groupname,
    //    description:groupdescr,
    //    status:groupstatus
    // })
         
    // };
    const updategroupfuc = (e) => {
      e.preventDefault();
  
      if (groupname === "") {
          SetGroupnameError(true);
          SetgroupnameLabel("Add group name");
      } else if (groupdescr === "") {
          groupdescr(true);
          setGroupdescrLabel("Add Description");
      } else {
       // whatever you want to send

       //group update variables with Backend
        const infos = {
          group_id: Edit,
          user_id:localStorage.getItem('id'),
          group_name: groupname,
          description: groupdescr,
          status:groupstatus,
          created_at: "string",
          last_update_at:"string"
        };

        const tkn = session.user.token;
        
        //group send variables to Redux
        dispatch(UPDATEGroup({infos, tkn}));

        enqueueSnackbar(`${groupname} has been updated`, { variant: "success" });
       

        SetGroupnameError(false);
        SetgroupnameLabel("");
  
        setGroupdescrLabel("");
        setGroupdescrerro(false);
      }
    };

  return (
    <div className={classes.main}>
      
      <div className={classes.topintro}>
          <h1>Group Detail Information</h1>
          <p>Here are detail information about this group</p>
          <div className={classes.editform}>
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
                  setGroupdescrerro(false);
              }}
        />
        {Edit}
        <br/>
        <TextField
              id="outlined-basic"
              label={groupstatusLabel}
              variant="outlined"
              value={groupstatus}
              error={groupnameError}
              size="small"
              onChange={(e) => {
                  setGroupstatus(e.target.value);
                  SetGroupnameError(false);
              }}
          />
          <br/>

          <Button variant="contained" color="primary" size="large" onClick={updategroupfuc}>
        Edit group
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