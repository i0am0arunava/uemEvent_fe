import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom'
import {
  Box, Drawer, CssBaseline, Toolbar, List, Typography,
  Divider, IconButton, ListItem, ListItemButton,
  ListItemIcon, ListItemText
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Outlet } from "react-router-dom";
import Footer from './pages/Footer';
import Header from './pages/Header';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
    backgroundColor: '#111827',
    color: '#fff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Layout() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>


      {/* Sidebar Header */}
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: '#111827'  // Tailwind's gray-900 hex
        }}
      >

        <Toolbar sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px' }}>
          <IconButton
            onClick={handleDrawerOpen}
            sx={{
              color: '#55585e',   // Tailwind's gray-200
              fontSize: '1.225rem' // 'lg' in Tailwind = 18px = 1.125rem
            }}
          >
            <MenuIcon fontSize="inherit" />
          </IconButton>


          {/* Make sure Header stretches */}
          <Header />
        </Toolbar>
      </AppBar>


      {/* Sidebar Drawer */}
      <Drawer

sx={{
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: '#111827',
    boxShadow: '0 4px 1px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.2)', // Stronger shadow for more visibility
  },
}}

        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader >
          <div className="flex items-center mr-[58px]">
            <Link to={'/'} className="flex items-center">
              <img src="../src/assets/logo.png" alt="" className='h-28' />
            </Link>
          </div>
          <IconButton onClick={handleDrawerClose}  sx={{
              color: '#55585e',   // Tailwind's gray-200
              fontSize: '1.225rem' // 'lg' in Tailwind = 18px = 1.125rem
            }}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Dashboard",
            "Events",
            "Create Event",
            "Manage Bookings",
            "Attendees",
            "Venues",
            "Schedule",
            "Speakers",
            "Sponsors",
            "Registration",
            "Payments",
            "Seating Allocation",
            "Notifications",
            "Check-In",
            "Reports",
          ].map((text, index) => (
            <ListItem key={text} disablePadding sx={{
              color: '#707682',   // Tailwind's gray-200
              fontSize: '1.225rem' // 'lg' in Tailwind = 18px = 1.125rem
            }}>
              <ListItemButton>
                <ListItemIcon sx={{
                  color: '#707682',   // Tailwind's gray-200
                  fontSize: '1.225rem' // 'lg' in Tailwind = 18px = 1.125rem
                }}>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Main open={open}>
        <DrawerHeader />
        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
        <Footer />
      </Main>

    </Box>
  );
}
