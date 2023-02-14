import { useEffect, useState } from "react";
import { AddProduct,getcategory,change_msg, getstore } from "../../../features/products/products.js";
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

  const [productname, setProductname] = useState("");
  const [productprice, setProductprice] = useState(null);
  const [unittype, setUnittype] = useState("");
  const [productdescr, setProductdescr] = useState("");

  const [productnameError, SetProductnameError] = useState(false);
  const [productpriceError, SetProductpriceError] = useState(false);
  const [unittypeError, SetUnittypeError] = useState(false);
  const [productdescrerror, setProductdescrerro] = useState(false);

  const [productnameLabel, SetProductnameLabel] = useState("Product name");
  const [productpriceLabel, SetProductpriceLabel] = useState("Product Price");
  const [unittypeLabel, SetUnittypeLabel] = useState("Unit Type");
  const [productdescrLabel, setProductdescrLabel] = useState("Description");
  const [categoryLabel, setCategoryLabel] = useState("Category Name");
  const [storeLabel, setStoreLabel] = useState("Store Name");

  const [loadcategory, setLoadCategory] = useState([]);
  const [categoryName,setCategoryName]= useState("");
  

  const [loadStores, setLoadStores] = useState([]);
  const [storeName,setStoreName]= useState("");

  const { data: session, status } = useSession({
    required: true,
  });

  const dispatch = useDispatch();


  const getcategoriess = async ()=>{
    await axios.get("http://127.0.0.1:8000/category_names", { headers: { Authorization: `Bearer ${session.user.token}` } })
    .then((response)=> setLoadCategory(response.data))
  }

  const getstoress = async ()=>{
    await axios.get("http://127.0.0.1:8000/store_names", { headers: { Authorization: `Bearer ${session.user.token}` } })
    .then((response)=> setLoadStores(response.data))
  }

  useEffect(() => {
    getcategoriess()
    getstoress()


    dispatch(getcategory(loadcategory))
    dispatch(getstore(loadStores))
  }, []);


  const handleStore = (event) => {
    setStoreName(event.target.value);
  };
  const handleChange = (event) => {
    setCategoryName(event.target.value);
  };

  const addproductfuc = (e) => {
    e.preventDefault();

    if (productname === "") {
      SetProductnameError(true);
      SetProductnameLabel("Add Product name");
    } else if (productprice === "") {
      SetProductpriceError(true);
      SetProductpriceLabel("Add Product Price");
    } else if (unittype === "") {
      SetUnittypeError(true);
      SetUnittypeLabel("Add Unit Type");
    } else if (productdescr === "") {
      setProductdescrerro(true);
      setProductdescLabel("Add Description");
    }else {
      // whatever you want to send
      const data = {
        user_id: localStorage.getItem('id'),
        store_id:storeName,
        category_id: categoryName,
        product_name: productname,
        product_price: productprice,
        unity_type: unittype,
        description: productdescr,
      };

      dispatch(AddProduct(data));
      enqueueSnackbar(`${productname} has been added`, { variant: "success" });
      setProductname("");
      setProductprice("");
      setUnittype("");
      setProductdescr("");

      SetProductnameError(false);
      SetProductpriceError(false);
      SetUnittypeError(false);
      setProductdescrerro(false);

      SetProductnameLabel("Product Name");
      SetProductpriceLabel("Product price");
      SetUnittypeLabel("Unity Type");  
      setProductdescrLabel("Description"); 
      setCategoryLabel("Category Name"); 
      setStoreLabel("Store name");
  };
}

  return (
    <div className={classes.addform}>
      <TextField
        id="outlined-basic"
        label={productnameLabel}
        variant="outlined"
        value={productname}
        error={productnameError}
        size="small"
        onChange={(e) => {
          setProductname(e.target.value);
          SetProductnameError(false);
          SetProductnameLabel("Product Name");
          dispatch(change_msg(null));
        }}
      />
      <br/>
      <TextField
        id="outlined-basic"
        label={productpriceLabel}
        variant="outlined"
        value={productprice}
        error={productpriceError}
        size="small"
        onChange={(e) => {
          setProductprice(e.target.value);
          SetProductpriceError(false);
          SetProductpriceLabel("Product price");
          dispatch(change_msg(null));
        }}
      />
      <br/>
      <TextField
        id="outlined-basic"
        label={unittypeLabel}
        variant="outlined"
        value={unittype}
        error={unittypeError}
        size="small"
        onChange={(e) => {
          setUnittype(e.target.value);
          SetUnittypeError(false);
          SetUnittypeLabel("Unity Type");  
          dispatch(change_msg(null));
        }}
      />
      <br/>
      
     



      <TextField
        id="filled-multiline-flexible"
        label={productdescrLabel}
        multiline
        maxRows={4}
        variant="outlined"
        value={productdescr}
        error={productdescrerror}
        size="large"
        onChange={(e) => {
          setProductdescr(e.target.value);
          setProductdescrerro(false);
          setProductdescrLabel("Description"); 
          dispatch(change_msg(null));
        }}
      />
      <br/>
      <InputLabel id="demo-simple-select-label">Category</InputLabel>
      <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          label={categoryLabel}
          value={categoryName}
          onChange={handleChange}
         
        >
          {loadcategory.map((name) => (
            <MenuItem key={name.category_id} value={name.category_id}>
              <ListItemText primary={name.category_name} />
            </MenuItem>
          ))}
        </Select>
        <br/>
        <InputLabel id="demo-simple-select-label">Store name</InputLabel>
      <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          label={storeLabel}
          value={storeName}
          onChange={handleStore}
         
        >
          {loadStores.map((name) => (
            <MenuItem key={name.store_id} value={name.store_id}>
              <ListItemText primary={name.store_name} />
            </MenuItem>
          ))}
        </Select>
        <br/>
        <br/>   

      <Button variant="contained" color="primary" size="large" onClick={addproductfuc}>
        Add product
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
