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

  const handleClick = () => {
    setOpen(!open);
  };

  const handleUserManagement = () => {
    setUserManagement(!UserManagement);
  };

  const ListbtnStyle = {
    

    btn:{

       backgroundColor: "#DBEEFF",
        borderRadius: "10px",
        width: "90%",
        height: "40px",
        marginLeft: "13px",
        marginTop: "10px",
        position:"relative",
        
        

        '&:hover': {
          backgroundColor: "#0054A1",
          "& .dashIcon": {
            color: "#DBEEFF"
          },

          "& .btnT": {
            color: "#DBEEFF"
          },

        },
    },

    iconStyle: {
      color: '#0054A1',
      fontSize:"17px"
    },

    btnTitle:{
        fontSize: "14px",
        fontfamily: "Inter",
        color: "#0054A1",

        '&:hover': {
          color: "white",
        }
    },

    btnTitleSub:{
      fontSize: "13px",
        fontfamily: "Inter",
        color: "#0054A1",
    }


       
  }

const iconStyle = { fontSize: "20px", color: "#0054A1" }

  return (
    <List
      sx={{
        width: "20%",
        bgcolor: "white",
        height: "100%",
       // boxShadow: "11px 5px 10px 0px rgba(0,0,0,0.03)",
        position: "fixed",
        overflowY:"scroll",
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

      <ListItemButton sx={ListbtnStyle.btn}>

          
        <ListItemIcon>
          <DashboardIcon sx={ListbtnStyle.iconStyle} className="dashIcon"/>
        </ListItemIcon>
        <Link
          href="/Dashboard"
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

      <ListItemButton sx={ListbtnStyle.btn}>
        <ListItemIcon >
          <InventoryIcon sx={ListbtnStyle.iconStyle} className="dashIcon"/>
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
                Inventory
              </Typography>
            }/>
      </ListItemButton>

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

      <ListItemButton sx={ListbtnStyle.btn}>
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
      </ListItemButton>

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
