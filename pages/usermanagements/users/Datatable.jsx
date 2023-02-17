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
import { DeleteUser } from "../../../features/userinfos/userinfos.js";
import { useSession, signIn, signOut } from "next-auth/react";
import Asktodelete from "./Asktodelete.jsx";
import NotificationsIcon from '@mui/icons-material/Notifications';

function Datatable() {

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar()
  const [datas, setDatas] = useState([]);
  const [Loaddatas, setLoadDatas] = useState([]);
  const [openaskmsg, setOpenaskmsg] = useState('none');
  const [currentID, setCurrentID] = useState('');
  const [currentUsername, setUserName] = useState('')

  const { data: session, status } = useSession({
    required: true,
  });

  const dispatch = useDispatch();


  const getdata = async ()=>{
    await axios.get("http://127.0.0.1:8000/users?page=1&size=50", { headers: { Authorization: `Bearer ${session.user.token}` } }).then((response)=> setLoadDatas(response.data.items))
  }

  useEffect(() => {
    getdata()
    dispatch(getsections(Loaddatas))
  }, []);

  const mytbl = useSelector((state) => state.sections.sectionstbl);
  console.log(mytbl)


  const columns = [
    // {
    //   field: "id",
    //   headerName: "ID",
    //  // width: 60,
    //   sortable: false,
    //   filterable: false,
    // },
    { field: "names", headerName: "Names", width: 170, editable: true, },
    { field: "email", headerName: "Email", width: 170,editable: true, },
    { field: "phone", headerName: "Phone number", width: 170,editable: true, },
    { field: "role", headerName: "Role", width: 100,editable: true, },
    //{ field: "living", headerName: "Address", width: 170,editable: true, },
    {
      field: "status",
      headerName: "Status",
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

            <DeleteForeverIcon  sx={{
              color:"#fc033d",
              marginLeft:"10px",
              cursor:'pointer'
            }} onClick={()=>{
              setOpenaskmsg('flex');
              setCurrentID(params.id);
              setUserName(params.email);
              console.log(params.id)
            }}/>


            <NotificationsIcon sx={{
              color:"black",
              marginLeft:"10px",
              cursor:'pointer'
            }}

            onClick={()=>{
              console.log(params.id);
              console.log(params.section_name);
              console.log(params.description);
            }}

            />

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
     dispatch(DeleteUser({Did, tkn}))
     setLoadDatas((current) => current.filter((item) => item.user_id !== Did));
     setOpenaskmsg('none')
     enqueueSnackbar(`User deleted successfully`, { variant: "success" });
  }
  
  
  const datarow = Loaddatas.map((item) => ({
    id: item.user_id,
    names: item.first_name+" "+item.last_name,
    email: item.email,
    phone: item.phone,
    role: item.role,
    living: item.living,
    status:item.status==="1"?"Active":"Not Active",
  }));





  return (
    <div
      style={{
        width:"100%",
        display:"flex",
        justifyContent:"center",
      }}
    >

      <Asktodelete currentUsername={currentUsername} setopen={openaskmsg} closeBox={closemsgbox} deleteSection={DltSection}/>

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