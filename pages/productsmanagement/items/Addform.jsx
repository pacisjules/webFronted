import { useEffect, useState } from "react";
import { AddItem,change_msg, getproduct, getitempro } from "../../../features/items/item.js";
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
  const [productprice, setProductprice] = useState(0.00);
  const   [quantity, setQuantity] = useState(0);
  const [LoadProducts, setLoadProducts] = useState([]);

  const [productnameError, SetProductnameError] = useState(false);
  const [productpriceError, SetProductpriceError] = useState(false);
  const [quantityError, SetquantityError] = useState(false);

  const [productnameLabel, SetProductnameLabel] = useState("Product name");
  const [productpriceLabel, SetProductpriceLabel] = useState("Product Price");
  const [quantityLabel, SetquantityLabel] = useState("Quantity");
 
  const [LoadItem, setLoadItem]  =useState([]);

 

  const { data: session, status } = useSession({
    required: true,
  });

  const dispatch = useDispatch();


  const getdataprod = async ()=>{
    await axios.get("http://127.0.0.1:8000/get_products", { headers: { Authorization: `Bearer ${session.user.token}` } })
    .then((response)=> setLoadProducts(response.data))
  };
  
  const getdataitem = async ()=>{
    await axios.get("http://127.0.0.1:8000/get_items", { headers: { Authorization: `Bearer ${session.user.token}` } })
    .then((response)=> setLoadItem(response.data))
  };


  

  useEffect(() => {
    getdataprod()
    getdataitem()
    dispatch(getproduct(LoadProducts))
    dispatch(getitempro(LoadItem));
  }, []);


  const handleProduct = (event) => {
    setProductname(event.target.value);
  };
 

  const addproductfuc = (e) => {
    e.preventDefault();

    if (productname === "") {
      SetProductnameError(true);
      SetProductnameLabel("Add Product name");
    } else if (productprice === "") {
      SetProductpriceError(true);
      SetProductpriceLabel("Add Product Price");
    } else if (quantity === "") {
      SetquantityError(true);
      SetquantityLabel("Add quantity");
    } else{
      // whatever you want to send
      // let data ;
      // for (var i = 0; i < LoadItem.length; i++) {
      //   if (LoadItem[i].product_id === productname) {
      //      data = {
      //       user_id: localStorage.getItem('id'),
      //       product_id:productname,
      //       product_price: productprice,
      //       quantity: quantity + LoadItem[i].quantity,
      //     };
            
      //   }
      //   else {
      //     data = {
      //       user_id: localStorage.getItem('id'),
      //       product_id:productname,
      //       product_price: productprice,
      //       quantity: quantity ,
      //     };
      //   }
      // }
    const  data = {
              user_id: localStorage.getItem('id'),
              product_id:productname,
              product_price: productprice,
              quantity: quantity ,
             };

      dispatch(AddItem(data));
      enqueueSnackbar(`${productname} has been added`, { variant: "success" });
      setProductname("");
      setProductprice("");
      setQuantity("");
      

      SetProductnameError(false);
      SetProductpriceError(false);
      SetquantityError(false);
      

      SetProductnameLabel("Product Name");
      SetProductpriceLabel("Product price");
      SetquantityLabel("Quantity");  
      
  };
}

  return (
    <div className={classes.addform}>
      <InputLabel id="demo-simple-select-label">Product</InputLabel>
      <Select
          labelId="outlined-basic"
          id="outlined-basic"
          label={productnameLabel}
          value={productname}
          onChange={handleProduct}
         
        >
          {LoadProducts.map((name) => (
            <MenuItem key={name.product_id} value={name.product_id}>
              <ListItemText primary={name.product_name} />
            </MenuItem>
          ))}
        </Select>
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
        label={quantityLabel}
        variant="outlined"
        value={quantity}
        error={quantityError}
        size="small"
        onChange={(e) => {
          setQuantity(e.target.value);
          SetquantityError(false);
          SetquantityLabel("Unity Type");  
          dispatch(change_msg(null));
        }}
      />
      
        <br/>
        <br/>   

      <Button variant="contained" color="primary" size="large" onClick={addproductfuc}>
        Add item
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
