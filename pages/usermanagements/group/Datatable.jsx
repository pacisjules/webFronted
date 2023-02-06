import { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import {DeleteGroup, getgroups} from '../../../features/groups/groups.js';
import { useDispatch, useSelector } from "react-redux";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useRouter } from "next/router";

import { useSession, signIn, signOut } from "next-auth/react";
import Asktodeletegroup from "./Asktodeletegroup.jsx";

function Datatable() {

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar()
  const [datas, setDatas] = useState([]);
  const [Loaddatas, setLoadDatas] = useState([]);
  const [openaskmsg, setOpenaskmsg] = useState('none');
  const [currentID, setCurrentID] = useState('');
  const [currentGroupName, setCurrentGroupName] = useState('')

  const { data: session, status } = useSession({
    required: true,
  });

  const dispatch = useDispatch();


  const getdata = async ()=>{
    await axios.get("http://127.0.0.1:8000/all_group?page=1&size=50", { headers: { Authorization: `Bearer ${session.user.token}` } }).then((response)=> setLoadDatas(response.data.items))
  }

  useEffect(() => {
    getdata()
    dispatch(getgroups(Loaddatas))
  }, []);

//   const mytbl = useSelector((state) => state.groups.groupstbl);
//   console.log(mytbl)


  const columns = [
    {
      field: "id",
      headerName: "ID",
     // width: 60,
      sortable: false,
      filterable: false,
    },
    { field: "group_name", headerName: "Group Name", width: 170, editable: true, },
    { field: "description", headerName: "Description", width: 170,editable: true, },
    {
      field: "status",
      headerName: "Status",
     // width: 100,
      type: 'boolean',
      editable: true,
    },

    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            {" "}


            <VisibilityIcon sx={{
                color:"#3eb300",
              marginLeft:"10px",
              cursor:'pointer'
            }}
            onClick={()=>{
                router.push({
                    pathname: '/usermanagements/group/[View]',
                    query: { View: params.id },
                    
                })
                
            }}

            />
            <EditIcon sx={{
                color:"#0362fc",
              marginLeft:"10px",
              cursor:'pointer'
            }}

            onClick={()=>{
              router.push({
                pathname: '/usermanagements/group/edit/[Edit]',
                query: { Edit: params.id },
                
            })
            }}

            />

            <DeleteForeverIcon  sx={{
              color:"#fc033d",
              marginLeft:"10px",
              cursor:'pointer'
            }} onClick={()=>{

              setOpenaskmsg('flex');
              setCurrentID(params.id);
              setCurrentGroupName(params.group_name);
            }}/>
          </div>
        );
      },
    },
  ];

  
  const closemsgbox = ()=>{
    setOpenaskmsg('none')
  }


  const DltGroup = ()=>{
     const tkn = session.user.token;
     const Did = currentID;
     dispatch(DeleteGroup({Did, tkn}))
     
     setLoadDatas((current) => current.filter((item) => item.group_id !== Did));
     setOpenaskmsg('none')
     enqueueSnackbar(`Group deleted successfully`, { variant: "success" });
  }


  
  
  const datarow = Loaddatas.map((item) => ({
    id: item.group_id,
    group_name: item.group_name,
    description: item.description,
    status: item.status,
  }));





  return (
    <div
      style={{
        width:"100%",
        display:"flex",
        justifyContent:"center",
      }}
    >

       <Asktodeletegroup groupName={currentGroupName} setopen={openaskmsg} closeBox={closemsgbox} deleteGroup={DltGroup}/>

      <div style={{
        width: "80%",
        height: "400px",
        backgroundColor: "white",
      }}>
      <DataGrid
        rows={datarow}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
      </div>
    </div>
  );
}


export default function IntegrationNotistacks() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Datatable />
    </SnackbarProvider>
  );
}