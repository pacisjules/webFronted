import React from "react";
import classes from "../../../styles/section/App.module.css";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import AnnouncementIcon from '@mui/icons-material/Announcement';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

function Announcement({storeName,closeBox, setopen, deleteStore}) {
  return (
    <div className={classes.askdelete} style={{
        display:setopen
    }}>
      <div className={classes.msgbox}>
        <div className={classes.msgboxTop}>
          <div className={classes.msgboxTopIconBox}>
            <AnnouncementIcon sx={{
                color:"white",
                fontSize:"60px"
            }}/>
          </div>
            <h1>Not possible to delete {storeName} category!</h1>
            <p>
              This is the warning which inform you the situation here!! <br/><br/>
            
            You can not delete this category because it is contained product inside of it for more information consult the administrator of the system
            </p>        
        </div>
        <div className={classes.msgboxBottom}>
          <Stack direction="row" spacing={2}>
            
            
            <Button startIcon={<KeyboardBackspaceIcon />} variant="contained" onClick={closeBox} sx={{
                backgroundColor:"#0054A1", "&:hover":{
                    backgroundColor:"#00294F",
                }
            }}>
             <Link
              href="/productsmanagement/category/Category"
              style={{
              textDecoration: "none",
              color: "white"
             }}
             >
              Back
             </Link>
            </Button>
{/* <Button startIcon={<DeleteIcon />} onClick={deleteStore} variant="contained" sx={{
                backgroundColor:"#D21900",
                "&:hover":{
                    backgroundColor:"#710D00",
                }
            }}>Delete Store</Button> */}
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default Announcement;
