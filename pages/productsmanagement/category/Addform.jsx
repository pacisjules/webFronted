import { useEffect, useState } from "react";
import { AddCategory,getstores,change_msg } from "../../../features/category/category";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from "@mui/material/TextField";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { SnackbarProvider, useSnackbar } from "notistack";
import classes from "../../../styles/section/App.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from 'axios';



function Addform(props) {
  
  const { enqueueSnackbar } = useSnackbar();

  const [categoryname, setCategoryname] = useState("");
  const [categorydescr, setCategorydescr] = useState("");

  const [categorynameError, SetCategorynameError] = useState(false);
  const [categorydescrerror, setCategorydescrerro] = useState(false);

  const [categorynameLabel, SetcategorynameLabel] = useState("Category name");
  const [categorydescrLabel, setCategorydescrLabel] = useState("Description");
  const [storeLabel, setStoreLabel] = useState("Store Name");

  const [loadStores, setLoadStores] = useState([]);
  const [storeName,setStoreName]= useState("");

  const { data: session, status } = useSession({
    required: true,
  });

  const dispatch = useDispatch();


  const getdata = async ()=>{
    await axios.get("http://127.0.0.1:8000/store_names", { headers: { Authorization: `Bearer ${session.user.token}` } })
    .then((response)=> setLoadStores(response.data))
  }

  useEffect(() => {
    getdata()
    dispatch(getstores(loadStores))
  }, []);



  const handleChange = (event) => {
    setStoreName(event.target.value);
  };

  const addcategoryfuc = (e) => {
    e.preventDefault();

    if (categoryname === "") {
        SetCategorynameError(true);
        SetcategorynameLabel("Add category name");
    } else if (categorydescr === "") {
        setCategorydescrerro(true);
        setCategorydescrLabel("Add Description");
    } else {
      
      // whatever you want to send
      const data = {
        user_id: localStorage.getItem('id'),
        store_id: storeName,
        category_name: categoryname,
        description: categorydescr,
      };

      dispatch(AddCategory(data));
      enqueueSnackbar(`${categoryname} has been added`, { variant: "success" });
      setCategoryname("");
      setCategorydescr("");

      SetCategorynameError(false);
      SetcategorynameLabel("Group name");

      setCategorydescrLabel("Description");
      setCategorydescrerro(false);
      setStoreLabel("Store Name")   
  };
}

  return (
    <div className={classes.addform}>
      <TextField
        id="outlined-basic"
        label={categorynameLabel}
        variant="outlined"
        value={categoryname}
        error={categorynameError}
        size="small"
        onChange={(e) => {
            setCategoryname(e.target.value);
            SetCategorynameError(false);
            SetcategorynameLabel("Category name");
          dispatch(change_msg(null));
        }}
      />
      <br/>
      


      <TextField
        id="filled-multiline-flexible"
        label={categorydescrLabel}
        multiline
        maxRows={4}
        variant="outlined"
        value={categorydescr}
        error={categorydescrerror}
        size="large"
        onChange={(e) => {
            setCategorydescr(e.target.value);
            setCategorydescrLabel("Description");
            setCategorydescrerro(false);
          dispatch(change_msg(null));
        }}
      />
      <br/>
      <InputLabel id="demo-simple-select-label">Store name</InputLabel>
      <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          label={storeLabel}
          value={storeName}
          onChange={handleChange}
         
        >
          {loadStores.map((name) => (
            <MenuItem key={name.store_id} value={name.store_id}>
              <ListItemText primary={name.store_name} />
            </MenuItem>
          ))}
        </Select>
        <br/>

      <Button variant="contained" color="primary" size="large" onClick={addcategoryfuc}>
        Add category
      </Button>
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
