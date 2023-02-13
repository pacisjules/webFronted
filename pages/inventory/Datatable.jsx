import { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import { DeleteStore,getinventory} from "../../features/inventories/inventory.js";
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
  const [currentstoreName, setStoreName] = useState('')

  const { data: session, status } = useSession({
    required: true,
  });

  const dispatch = useDispatch();


  const getdata = async ()=>{
    await axios.get("http://127.0.0.1:8000/all_stores?page=1&size=50", { headers: { Authorization: `Bearer ${session.user.token}` } })
    .then((response)=> setLoadDatas(response.data.items))
  }

  useEffect(() => {
    getdata()
    dispatch(getinventory(Loaddatas))
  }, []);

//   const mytbl = useSelector((state) => state.sections.sectionstbl);
//   console.log(mytbl)


  const columns = [
    {
      field: "id",
      headerName: "ID",
      sortable: false,
      filterable: false,
      editable: false,
    },
    { field: "store_name", headerName: "Store Name", width: 170, editable: false, },
    { field: "address", headerName: "Address", width: 170, editable: false, },
    { field: "description", headerName: "Description", width: 170,editable: false, },
    {
      field: "status",
      headerName: "Status",
      editable: false,
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

          <Box sx={{
            padding:"30px",
            height:"30px",
          }}>

            <VisibilityIcon sx={{
              color:"#3eb300",
              marginLeft:"10px",
              cursor:'pointer'
            }}
            onClick={()=>{
              router.push({
                pathname: '/inventory/[View]',
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
                 pathname: '/inventory/edit/[Edit]',
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
              setStoreName(params.store_name);
            }}/>
          </Box>
          </div>
        );
      },
    },
  ];

  
  const closemsgbox = ()=>{
    setOpenaskmsg('none')
  }


  const DltStore = ()=>{
     const tkn = session.user.token;
     const Did = currentID;
     dispatch(DeleteStore({Did, tkn}))
     setLoadDatas((current) => current.filter((item) => item.store_id !== Did));
     setOpenaskmsg('none')
     enqueueSnackbar(`Store deleted successfully`, { variant: "success" });
  }
  
  
  const datarow = Loaddatas.map((item) => ({
    id: item.store_id,
    store_name: item.store_name,
    address:item.address,
    description: item.description,
    status: item.status==="1"?"Active":"Not Active",
  }));


  return (
    <div
      style={{
        width:"100%",
        display:"flex",
        justifyContent:"center",
      }}
    >

      <Asktodelete storeName={currentstoreName} setopen={openaskmsg} closeBox={closemsgbox} deleteStore={DltStore}/>

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