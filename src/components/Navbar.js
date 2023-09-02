import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import img from '../imgs/petegory-logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import './nav.css';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import axios from 'axios';
import { setUser } from '../redux/features/userSlice';
import PetsIcon from '@mui/icons-material/Pets';
import { Button, Stack } from '@mui/material';
// const { setUser } = userSlice.actions;






import { AnimatePresence } from 'framer-motion';
function NavbarHeader() {
  const { user } = useSelector(state => state.user);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const [isNavbarVisible, setIsNavbarVisible] = React.useState(true);
  const dispatch = useDispatch();

  // Track navbar visibility

  const getUser = async () => {
    try {
      const res = await axios.post(
        '/api/v1/user/getUserData',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );
      const userData = res.data.data;
      dispatch(setUser(userData));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setIsNavbarVisible(window.scrollY <= 100); // Set visibility based on scroll position
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const linkStyle = {
    textDecoration: 'none', // Remove underline
    color: 'black', // Set text color
    fontWeight: 'bold', // Add bold font weight
    fontFamily: 'CaveatVarialbleFont',
  };
  const link = {
    textDecoration: 'none', // Remove underline
    color: '#C0392B', // Set text color
    fontWeight: 'bold', // Add bold font weight
    fontFamily: 'CaveatVarialbleFont',
  };





  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'white',
        color: 'black',
        opacity: isNavbarVisible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            // size="large"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
            edge="start"
            sx={{
              display: { xs: 'flex', md: 'none' }, // Show on small screens
            }}
          >
            <MenuIcon />
          </IconButton>
         
          <Typography
            variant="h6"
            noWrap
            component="a"
            
            sx={{
              flexGrow: 1,
              fontFamily: 'CaveatVarialbleFont',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link style={linkStyle} to="/">
            PETEGORY
            </Link>
            
          </Typography>
          
          
          
          <Box
            sx={{
              display: {
                xs: 'none',
                md: 'flex',
                transition: 'color 0.3s ease', // Add the transition property
                '&:hover': {
                  color: 'gray', // Change to the color you want on hover
                },
              },
            }}
          >
            <Button  sx={{ mx: 2, color: 'black' }} color="inherit">
            <Link style={linkStyle} to="/">
            HOME
            </Link>
            </Button>
            <Button
            
              sx={{ mx: 2, color: 'black' }}
              color="inherit"
            >
              <Link style={linkStyle} to="/grooming">
            GROOMING
            </Link>
             
            </Button>
            <Button
             
              sx={{ mx: 2, color: 'black' }}
              color="inherit"
            >
           <Link style={linkStyle} to="/hotel">
            HOTEL
            </Link>
              
            </Button>
            <Button
             
              sx={{ mx: 2, color: 'black' }}
              color="inherit"
            >
               <Link style={linkStyle} to="/contact">
            CONTACT
            </Link>
            </Button>
            <Button
             
              sx={{ mx: 2, color: 'black' }}
              color="inherit"
            >
              <Link style={linkStyle} to="/gallery">
              GALLERY
            </Link>
             
            </Button>
            {user ? (
              <Button  className="profile">
                 <Link style={link} to="/profile/account">
                 {user.name}
            </Link>
                
              </Button>
            ) : (
              <Button className="link-hover signin" >
                 <Link style={link} to="/login">
                 LOGIN
            </Link>
                
              </Button>
            )}
          </Box>

          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            <MenuItem
             
              onClick={handleCloseNavMenu}
              component="a"
              sx={{
                fontFamily: 'ChakraPetchBold', // Add fontFamily style here
              }}
            >
              <Link style={linkStyle} to="/">
            HOME
            </Link>
            </MenuItem>
            <MenuItem
              
              onClick={handleCloseNavMenu}
              component="a"
              sx={{
                fontFamily: 'ChakraPetchBold', // Add fontFamily style here
              }}
            >
                <Link style={linkStyle} to="/grooming">
            GROOMING
            </Link>
            </MenuItem>
            <MenuItem
              
              onClick={handleCloseNavMenu}
              component="a"
              sx={{
                fontFamily: 'ChakraPetchBold', // Add fontFamily style here
              }}
            >
              <Link style={linkStyle} to="/hotel">
            HOTEL
            </Link>
            </MenuItem>
            <MenuItem
              
              onClick={handleCloseNavMenu}
              component="a"
              sx={{
                fontFamily: 'ChakraPetchBold', // Add fontFamily style here
              }}
            >
                   <Link style={linkStyle} to="/contact">
            CONTACT
            </Link>
            </MenuItem>
            <MenuItem
              
              onClick={handleCloseNavMenu}
              component="a"
              sx={{
                fontFamily: 'ChakraPetchBold', // Add fontFamily style here
              }}
            >
                <Link style={linkStyle} to="/gallery">
              GALLERY
            </Link>
            </MenuItem>
            <MenuItem
              sx={{
                fontFamily: 'ChakraPetchBold', // Add fontFamily style here
              }}
            >
              {user ? (
                <Button  className="profile">
                 <Link style={linkStyle} to="/profile/account">
                 {user.name}
                 </Link>
                </Button>
              ) : (
                <Button className="link-hover signin" >
                 <Link style={linkStyle} to="/login">
                 LOGIN
                 </Link>
                </Button>
              )}
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>


    </AppBar>
  );
}

export default NavbarHeader;
