import { useSelector } from "react-redux";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/auth/authActions";

const NavBar = () => {

  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleSignOut = async () => {
  
    console.log("Attempting to Log Out");

    const result = await dispatch(logoutUser());

    if (result.meta.requestStatus === "fulfilled") {
      navigate('/auth/login');
    }
  };

  return (
    <AppBar position="static" sx={{
      backgroundColor: 'white',
      color: 'black',
      borderBottom: '0.3rem solid #ac00a6',
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            onClick={() => navigate('/')}
            sx={{
              mr: 5,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CHOCCO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
            <div>
              {auth.isAuthenticated ? (
                <>
                  <MenuItem key="Donuts" onClick={() => { 
                    handleCloseNavMenu();
                    navigate('/donuts');                
                  }}>
                    <Typography textAlign="center" color="#e58300">Donuts</Typography>
                  </MenuItem>
                  <MenuItem key="Orders" onClick={() => { 
                    handleCloseNavMenu();
                    navigate('/orders');                
                  }}>
                    <Typography textAlign="center" color="black">Orders</Typography>
                  </MenuItem>
                  <MenuItem key="Account Details" onClick={() => { 
                    handleCloseNavMenu();
                    navigate('/profile');                
                  }}>
                    <Typography textAlign="center" color="black">Account Details</Typography>
                  </MenuItem>
                  <MenuItem key="Cart" onClick={() => { 
                    handleCloseNavMenu();
                    navigate('/cart');              
                  }}>
                    <Tooltip title="Shopping Cart">
                      <ShoppingCartIcon />
                    </Tooltip>
                  </MenuItem>
                  <MenuItem key="Logout" onClick={() => { 
                    handleCloseNavMenu();
                    handleSignOut();            
                  }}>
                    <Tooltip title="Log Out">
                      <LogoutIcon />
                    </Tooltip>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem key="Donuts" onClick={() => { 
                    handleCloseNavMenu();
                    navigate('/donuts');                
                  }}>
                    <Typography textAlign="center" color="#e58300">Donuts</Typography>
                  </MenuItem>
                  <MenuItem key="Login" onClick={() => { 
                    handleCloseNavMenu();
                    navigate('/auth/login');                
                  }}>
                    <Typography textAlign="center" color="black">Log In</Typography>
                  </MenuItem>
                  <MenuItem key="Signup" onClick={() => { 
                    handleCloseNavMenu();
                    navigate('/auth/signup');                
                  }}>
                    <Typography textAlign="center" color="black">Sign Up</Typography>
                  </MenuItem>
                </>
              )}
            </div>
            </Menu>
          </Box>
          <Typography
            variant="h4"
            noWrap
            onClick={() => navigate('/')}
            sx={{
              mr: 5,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CHOCCO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },}}>
              <Button
                key="Donuts"
                variant="contained"
                color="secondary"
                onClick={() => { 
                  navigate('/donuts')                
                }}
                sx={{ my: 2, color: 'white', display: 'block', }}
              >
                Donuts
              </Button>
              {auth.isAuthenticated ? (
                <>
                  <Button
                    key="Orders"
                    onClick={() => { 
                      navigate('/orders')                
                    }}
                    sx={{ my: 2, color: 'black', display: 'block' }}
                  >
                    Orders
                  </Button>
                  <Button
                    key="Account Details"
                    onClick={() => { 
                      navigate('/profile')                
                    }}
                    sx={{ my: 2, color: 'black', display: 'block' }}
                  >
                    Account Details
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    key="Login"
                    onClick={() => { 
                      navigate('/auth/login')                
                    }}
                    sx={{ my: 2, color: 'black', display: 'block' }}
                  >
                    Log In
                  </Button>
                  <Button
                    key="Signup"
                    onClick={() => { 
                      navigate('/auth/signup')                
                    }}
                    sx={{ my: 2, color: 'black', display: 'block' }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
          </Box>
          {auth.isAuthenticated && (
          <>
            <Box sx={{ gap: 1, display: { xs: 'none', md: 'flex' }}}>
              <Tooltip title="Shopping Cart">
                <Button
                    key="Cart"
                    onClick={() => { 
                      navigate('/cart')                
                    }}
                    sx={{ my: 0, pt: 1, pb: 0, px: 0, color: 'black', display: 'block' }}
                  >
                    <ShoppingCartIcon />
                </Button>
              </Tooltip>
              <Tooltip title="Log Out">
                <Button
                    key="Logout"
                    onClick={handleSignOut}
                    sx={{ my: 0, pt: 1, pb: 0, px: 0, color: 'black', display: 'block' }}
                  >
                    <LogoutIcon />
                </Button>
              </Tooltip>
            </Box>
          </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
  

export default NavBar;