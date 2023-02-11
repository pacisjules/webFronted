import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import PointOfSaleOutlinedIcon from "@mui/icons-material/PointOfSaleOutlined";
import ProductionQuantityLimitsOutlinedIcon from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import Groups2Icon from "@mui/icons-material/Groups2";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsIcon from "@mui/icons-material/Settings";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import GroupIcon from "@mui/icons-material/Group";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import Typography from "@mui/material/Typography";

function Sidebar() {
  const [open, setOpen] = React.useState(false);
  const [UserManagement, setUserManagement] = React.useState(false);
  const [ProductManagement, setProductManagement] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleUserManagement = () => {
    setUserManagement(!UserManagement);
  };

  const handleProduct = ()=>{
    setProductManagement(!ProductManagement);
  };


  const ListbtnStyle = {
    
    btn:{
        width: "100%",
        height: "40px",
        marginTop: "0px",
        position:"relative",
        transition:"0.3s ease-in-out",
        color:"#e1f1fc",
        '&:hover': {
          backgroundColor: "#008cff",
          "& .dashIcon": {
            color: "#DBEEFF",
          },

          "& .btnT": {
            color: "#DBEEFF"
          },

        },
    },

    iconStyle: {
      color: '#e1f1fc',
      fontSize:"17px"
    },

    btnTitle:{
        fontSize: "12px",
        fontfamily: "Inter",
        color: "#e1f1fc",
        fontWeight:"bold",
        '&:hover': {
          color: "yellow",
        }
    },

    btnTitleSub:{
      fontSize: "13px",
        fontfamily: "Inter",
        color: "#47acff",
        transition:"0.2s ease-in-out",
        '&:hover': {
          color: "white",
        }
    }


       
  }

const iconStyle = { fontSize: "20px", color: "#0054A1" }

  return (
    <List
      sx={{
        backgroundColor:"#00041f",
        width: "15%",
        bgcolor: "#00041f",
        height: "100%",
        borderRight:"1px solid #00041f",
        //boxShadow: "11px 5px 10px 0px rgba(0,0,0,0.03)",
        position: "fixed",
        //overflowY:"scroll",
        // display: "flex",
        // flexDirection: "column",
        // justifyContent:"space-around"
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {/* <center>
      <img
        src="/profilePic.png"
        alt="user profile"
        width="59px"
        style={{
          marginLeft: "auto",
          marginBottom: "15px",
        }}
      /></center> */}

      {/* Dashboard */}

      <ListItemButton sx={ListbtnStyle.btn}>

          
        <ListItemIcon>
          <DashboardIcon sx={ListbtnStyle.iconStyle} className="dashIcon"/>
        </ListItemIcon>
        <Link
          href="/dashboard"
          style={{
            textDecoration: "none",
          }}
        >
          <ListItemText
            disableTypography
            primary={
              <Typography
                type="body2"
                className="btnT"
                sx={
                  ListbtnStyle.btnTitle
                }
              >
                Dashboard
              </Typography>
            }
          />
        </Link>
      </ListItemButton>

      {/* Inventory */}

      <ListItemButton sx={ListbtnStyle.btn}>
      
        <ListItemIcon >
          <InventoryIcon sx={ListbtnStyle.iconStyle} className="dashIcon"/>
        </ListItemIcon>
        <Link
          href="/inventory/Inventory"
          style={{
            textDecoration: "none",
          }}
        >
        <ListItemText disableTypography
            primary={
              <Typography
                type="body2"
                className="btnT"
                sx={
                  ListbtnStyle.btnTitle
                }
              >
                Inventory
              </Typography>
            }/>
            </Link>
      </ListItemButton>

      {/* SALES MODULE */}

      <ListItemButton sx={ListbtnStyle.btn}>
        <ListItemIcon >
          <PointOfSaleOutlinedIcon sx={ListbtnStyle.iconStyle} className="dashIcon"/>
        </ListItemIcon>
        <ListItemText disableTypography
            primary={
              <Typography
                type="body2"
                className="btnT"
                sx={
                  ListbtnStyle.btnTitle
                }
              >
                Sales
              </Typography>
            } />
      </ListItemButton>

       {/* PRODUCTS MODULE */}

      <ListItemButton sx={ListbtnStyle.btn} onClick={handleProduct}>
      
        <ListItemIcon >
          <ProductionQuantityLimitsOutlinedIcon sx={ListbtnStyle.iconStyle} className="dashIcon"/>
        </ListItemIcon>
        
        <ListItemText disableTypography
            primary={
              <Typography
                type="body2"
                className="btnT"
                sx={
                  ListbtnStyle.btnTitle
                }
              >
                Products
              </Typography>
            } />
            {ProductManagement ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={ProductManagement} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <Link
              href="/productsmanagement/category/Category"
              style={{
                textDecoration: "none",
              }}
            >
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <ViewSidebarIcon sx={ListbtnStyle.iconStyle}/>
            </ListItemIcon>
            
            <ListItemText disableTypography
            primary={
              <Typography
                type="body2"
                className="btnT"
                sx={
                  ListbtnStyle.btnTitleSub
                }
              >
                Category
              </Typography>
            } />
            
          </ListItemButton>
          </Link>
          <Link
              href="/usermanagements/group/Group"
              style={{
                textDecoration: "none",
              }}
            >
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <GroupIcon sx={ListbtnStyle.iconStyle}/>
            </ListItemIcon>
            
              <ListItemText disableTypography
            primary={
              <Typography
                type="body2"
                className="btnT"
                sx={
                  ListbtnStyle.btnTitleSub
                }
              >
                Product
              </Typography>
            } />
            
          </ListItemButton>
          </Link>
          

        </List>
      </Collapse>


      <ListItemButton sx={ListbtnStyle.btn}>
        <ListItemIcon >
          <Groups2Icon sx={ListbtnStyle.iconStyle} className="dashIcon"/>
        </ListItemIcon>
        <ListItemText disableTypography
            primary={
              <Typography
                type="body2"
                className="btnT"
                sx={
                  ListbtnStyle.btnTitle
                }
              >
                Customers
              </Typography>
            } />

      </ListItemButton>

      <ListItemButton sx={ListbtnStyle.btn}>
        <ListItemIcon >
          <SummarizeIcon sx={ListbtnStyle.iconStyle} className="dashIcon"/>
        </ListItemIcon>
        <ListItemText disableTypography
            primary={
              <Typography
                type="body2"
                className="btnT"
                sx={
                  ListbtnStyle.btnTitle
                }
              >
                Reports
              </Typography>
            } />
      </ListItemButton>

      <ListItemButton sx={ListbtnStyle.btn} onClick={handleUserManagement}>
        <ListItemIcon >
          <ManageAccountsIcon sx={ListbtnStyle.iconStyle} className="dashIcon" />
        </ListItemIcon>
        <ListItemText disableTypography
            primary={
              <Typography
                type="body2"
                className="btnT"
                sx={
                  ListbtnStyle.btnTitle
                }
              >
                Users
              </Typography>
            } />
        {UserManagement ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={UserManagement} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <ViewSidebarIcon sx={ListbtnStyle.iconStyle}/>
            </ListItemIcon>
            <Link
              href="/usermanagements/sectionside/Section"
              style={{
                textDecoration: "none",
              }}
            >
            <ListItemText disableTypography
            primary={
              <Typography
                type="body2"
                className="btnT"
                sx={
                  ListbtnStyle.btnTitleSub
                }
              >
                Section
              </Typography>
            } />
            </Link>
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <GroupIcon sx={ListbtnStyle.iconStyle}/>
            </ListItemIcon>
            <Link
              href="/usermanagements/group/Group"
              style={{
                textDecoration: "none",
              }}
            >
              <ListItemText disableTypography
            primary={
              <Typography
                type="body2"
                className="btnT"
                sx={
                  ListbtnStyle.btnTitleSub
                }
              >
                Group
              </Typography>
            } />
            </Link>
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <LockPersonIcon sx={ListbtnStyle.iconStyle}/>
            </ListItemIcon>
            <ListItemText disableTypography
            primary={
              <Typography
                type="body2"
                className="btnT"
                sx={
                  ListbtnStyle.btnTitleSub
                }
              >
                Permission
              </Typography>
            } />
          </ListItemButton>

          <Link
              href="/usermanagements/users/Users"
              style={{
                textDecoration: "none",
              }}
            >
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <PersonIcon sx={ListbtnStyle.iconStyle}/>
            </ListItemIcon>
            <ListItemText disableTypography
            primary={
              <Typography
                type="body2"
                className="btnT"
                sx={
                  ListbtnStyle.btnTitleSub
                }
              >
                Users
              </Typography>
            }/>
          </ListItemButton>
          </Link>
        </List>
      </Collapse>

      <ListItemButton sx={ListbtnStyle.btn}>
        <ListItemIcon>
          <SettingsIcon sx={ListbtnStyle.iconStyle} className="dashIcon"/>
        </ListItemIcon>
        <ListItemText disableTypography
            primary={
              <Typography
                type="body2"
                className="btnT"
                sx={
                  ListbtnStyle.btnTitle
                }
              >
                Settings
              </Typography>
            } />
      </ListItemButton>
    </List>
  );
}

export default Sidebar;
