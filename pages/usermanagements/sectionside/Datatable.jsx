import { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import { getsections, DeleteSection} from "../../../features/sections/sections.js";
import { useDispatch, useSelector } from "react-redux";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useRouter } from "next/router";

import { useSession, signIn, signOut } from "next-auth/react";
import Asktodelete from "./Asktodelete.jsx";

function Datatable() {

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar()
  const [datas, setDatas] = useState([]);
  const [Loaddatas, setLoadDatas] = useState([]);
  const [openaskmsg, setOpenaskmsg] = useState('none');
  const [currentID, setCurrentID] = useState('');
  const [currentsectName, setSectName] = useState('')

  const { data: session, status } = useSession({
    required: true,
  });

  const dispatch = useDispatch();


  const getdata = async ()=>{
    await axios.get("http://127.0.0.1:8000/all_section?page=1&size=50", { headers: { Authorization: `Bearer ${session.user.token}` } }).then((response)=> setLoadDatas(response.data.items))
  }

  useEffect(() => {
    getdata()
    dispatch(getsections(Loaddatas))
  }, []);

  const mytbl = useSelector((state) => state.sections.sectionstbl);
  console.log(mytbl)


  const columns = [
    {
      field: "id",
      headerName: "ID",
     // width: 60,
      sortable: false,
      filterable: false,
    },
    { field: "section_name", headerName: "Section Name", width: 170, editable: true, },
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
                pathname: '/usermanagements/sectionside/[View]',
                query: { View: params.id }
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
                 pathname: '/usermanagements/sectionside/edit/[Edit]',
                 query: { Edit: params.id },
                
               })
                }}/>

            <DeleteForeverIcon  sx={{
              color:"#fc033d",
              marginLeft:"10px",
              cursor:'pointer'
            }} onClick={()=>{

              setOpenaskmsg('flex');
              setCurrentID(params.id);
              setSectName(params.section_name);
            }}/>

          </div>
        );
      },
    },
  ];

  
  const closemsgbox = ()=>{
    setOpenaskmsg('none')
  }


  const DltSection = ()=>{
     const tkn = session.user.token;
     const Did = currentID;
     dispatch(DeleteSection({Did, tkn}))
     setLoadDatas((current) => current.filter((item) => item.section_id !== Did));
     setOpenaskmsg('none')
     enqueueSnackbar(`Section deleted successfully`, { variant: "success" });
  }
  
  
  const datarow = Loaddatas.map((item) => ({
    id: item.section_id,
    section_name: item.section_name,
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

      <Asktodelete sectionName={currentsectName} setopen={openaskmsg} closeBox={closemsgbox} deleteSection={DltSection}/>

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