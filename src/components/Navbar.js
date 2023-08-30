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

  return (
    <AppBar
      position="static"
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
            <MenuIcon/>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PETEGORY
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
            <Button href="/" sx={{ mx: 2, color: 'black' }} color="inherit">
              HOME
            </Button>
            <Button
              href="/grooming"
              sx={{ mx: 2, color: 'black' }}
              color="inherit"
            >
              GROOMING
            </Button>
            <Button
              href="/hotel"
              sx={{ mx: 2, color: 'black' }}
              color="inherit"
            >
              HOTEL
            </Button>
            <Button
              href="/contact"
              sx={{ mx: 2, color: 'black' }}
              color="inherit"
            >
              CONTACT
            </Button>
            <Button
              href="/gallery"
              sx={{ mx: 2, color: 'black' }}
              color="inherit"
            >
              GALLERY
            </Button>
            {user ? (
              <Button href="/profile/account" className="profile">
                {user.name}
              </Button>
            ) : (
              <Button className="link-hover signin" href="/login">
                LOGIN
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
            <MenuItem href="/" onClick={handleCloseNavMenu} component="a">
              HOME
            </MenuItem>
            <MenuItem
              href="/grooming"
              onClick={handleCloseNavMenu}
              component="a"
            >
              GROOMING
            </MenuItem>
            <MenuItem href="/hotel" onClick={handleCloseNavMenu} component="a">
              HOTEL
            </MenuItem>
            <MenuItem
              href="/contact"
              onClick={handleCloseNavMenu}
              component="a"
            >
              CONTACT
            </MenuItem>
            <MenuItem
              href="/gallery"
              onClick={handleCloseNavMenu}
              component="a"
            >
              GALLERY
            </MenuItem>

            {user ? (
              <Button href="/profile/account" className="profile">
                {user.name}
              </Button>
            ) : (
              <Button className="link-hover signin" href="/login">
                LOGIN
              </Button>
            )}
          </Menu>
        </Toolbar>
      </Container>

      {/* <Container>
        <Navbar.Brand href="/">
          <img className="logo" src={img} alt="Logo" />
          PET’EGORY
        </Navbar.Brand>
        <Navbar.Toggle className="hamberger" />
        <Navbar.Collapse className="nav-container">
          <Nav>
            <Nav.Link className="link-hover" href="/">
              HOME
            </Nav.Link>
            <Nav.Link className="link-hover" href="/grooming">
              GROOMING
            </Nav.Link>
            <Nav.Link className="link-hover" href="/hotel">
              HOTEL
            </Nav.Link>
            <Nav.Link className="link-hover" href="/contact">
              CONTACT
            </Nav.Link>
            <Nav.Link className="link-hover" href="/gallery">
              GALLERY
            </Nav.Link>

            {user ? (
              <Nav.Link href="/profile/account" className="profile">
                {user.name}
              </Nav.Link>
            ) : (
              <Nav.Link className="link-hover signin" href="/login">
                LOGIN
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container> */}
    </AppBar>
  );
}

export default NavbarHeader;
