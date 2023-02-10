import React, { useState } from "react";
import { AddCategory,change_msg } from "../../../features/category/category";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { SnackbarProvider, useSnackbar } from "notistack";
import classes from "../../../styles/section/App.module.css";

function Addform(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [categoryname, setCategoryname] = useState("");
  const [categorydescr, setCategorydescr] = useState("");

  const [categorynameError, SetCategorynameError] = useState(false);
  const [categorydescrerror, setCategorydescrerro] = useState(false);

  const [categorynameLabel, SetcategorynameLabel] = useState("Category name");
  const [categorydescrLabel, setCategorydescrLabel] = useState("Description");

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
        store_id:"f8b30258-a87e-11ed-9c7e-88532eef2751",
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
    }
  };

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
