import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import Groups2Icon from '@mui/icons-material/Groups2';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsIcon from '@mui/icons-material/Settings';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import GroupIcon from '@mui/icons-material/Group';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import PersonIcon from '@mui/icons-material/Person';
import Link from "next/link";

function Sidebar() {
    const [open, setOpen] = React.useState(false);
    const [UserManagement, setUserManagement] = React.useState(false);

    const handleClick = () => {
      setOpen(!open);
    };

    const handleUserManagement = () => {
        setUserManagement(!UserManagement);
      };

  return (
    <div style={{
        zIndex:'2',
        height:'100vh',
        display:'flex',
        position:'fixed',
        flexDirection:'column',
        width:'15%',
        backgroundColor:'white'
    }}>

     
        <List
      sx={{ width: '100%',maxWidth:230, bgcolor: 'white', height:'100%', boxShadow:'11px 5px 10px 0px rgba(0,0,0,0.24)' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <img src="/profilePic.png" alt="user profile" width='59px' style={{
        marginLeft:'15px',
        marginTop:'-8px',
      }}/>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <Link href='/Dashboard' style={{
                textDecoration:'none'
            }}>
        <ListItemText primary="Dashboard" />
        </Link>
      </ListItemButton>
      
      <ListItemButton>
        <ListItemIcon>
          <InventoryIcon />
        </ListItemIcon>
        <ListItemText primary="Inventory" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <PointOfSaleOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Sales" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <ProductionQuantityLimitsOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <Groups2Icon />
        </ListItemIcon>
        <ListItemText primary="Customers" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <SummarizeIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItemButton>


      <ListItemButton onClick={handleUserManagement}>
        <ListItemIcon>
          <ManageAccountsIcon />
        </ListItemIcon>
        <ListItemText primary="User management" />
        {UserManagement ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={UserManagement} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <ViewSidebarIcon />
            </ListItemIcon>
            <Link href='/usermanagements/Section' style={{
                textDecoration:'none'
            }}>
            <ListItemText primary="Section" />
            </Link>
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Group" />
          </ListItemButton>


          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <LockPersonIcon />
            </ListItemIcon>
            <ListItemText primary="Permission" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>

        </List>
      </Collapse>




      
      <ListItemButton>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>

      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
    </div>
  )
}

export default Sidebar