import React from "react";
import classes from "../../styles/section/App.module.css";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

function Asktodelete({storeName,closeBox, setopen, deleteStore}) {
  return (
    <div className={classes.askdelete} style={{
        display:setopen
    }}>
      <div className={classes.msgbox}>
        <div className={classes.msgboxTop}>
          <div className={classes.msgboxTopIconBox}>
            <QuestionMarkIcon sx={{
                color:"white",
                fontSize:"60px"
            }}/>
          </div>
            <h1>Are you sure to delete {storeName} </h1>
            <p>
              Warning check before to remove this distributor may cause conflicts in
              system
            </p>
          
        </div>
        <div className={classes.msgboxBottom}>
          <Stack direction="row" spacing={2}>
            
            
            <Button startIcon={<KeyboardBackspaceIcon />} variant="contained" onClick={closeBox} sx={{
                backgroundColor:"#0054A1", "&:hover":{
                    backgroundColor:"#00294F",
                }
            }}>
            Leave it & Back
            </Button>
<Button startIcon={<DeleteIcon />} onClick={deleteStore} variant="contained" sx={{
                backgroundColor:"#D21900",
                "&:hover":{
                    backgroundColor:"#710D00",
                }
            }}>Delete Distributor</Button>
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default Asktodelete;
