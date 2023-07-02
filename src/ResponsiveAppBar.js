import * as React from 'react';
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
import AdbIcon from '@mui/icons-material/Adb';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./slicers/authSlice";
import { callApiNoRead } from "./helpers/apiCallNoRead";

const pages = [
  { name: 'Actividades', route: '/actividades' },
  { name: 'Propuestas', route: '/propuestas' },
  { name: 'Contenido Descargable', route: '/materias' }
];

const perfil = {
  name: 'Perfil', route: '/perfil'
}

const home = {
  name: 'Home', route: '/'
}

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [nombre, setNombre] = React.useState('');
  const [apellido, setApellido] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    dispatch(logout());
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenLoginModal = () => {
    setErrorMessage("");
    setIsLoginModalOpen(true);
  };
  
  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();

    let user = {
      "Password": password,
      "Email": email
    }

    callApiNoRead("POST", "user/userLogin", user)
      .then(response => {
        let userId = email;
        let loginToken = response.data;
        console.log('Response:',response);
        localStorage.setItem('jwtToken', loginToken);
        dispatch(login({ userId , loginToken}));
        handleCloseLoginModal();
      })
      .catch(error => {
        // Handle any errors from the API
        setErrorMessage(error.response.data);
        console.error('Error:',error);
      });
  };

  const handleOpenSignupModal = () => {
    setErrorMessage("");
    setIsSignupModalOpen(true);
  };

  const handleSignupFormSubmit = (e) => {
    e.preventDefault();

    let user = {
      "Password": password,
      "Email": email,
      "Name": nombre,
      "Surname": apellido,
      "Admin": false
    }

    callApiNoRead("POST", "user/", user)
      .then(response => {
        console.log('Response:',response);
        let logUser = {
          "Password": password,
          "Email": email
        }
        callApiNoRead("POST", "user/userLogin", logUser)
          .then(response => {
            let userId = email;
            let loginToken = response.data;
            console.log('Response signup:',response);
            localStorage.setItem('jwtToken', loginToken);
            dispatch(login({ userId , loginToken}));
            handleCloseSignupModal();
          })
          .catch(error => {
            // Handle any errors from the API
            setErrorMessage(error.response.data);
            console.error('Error login:',error);
          });
      })
      .catch(error => {
        // Handle any errors from the API
        setErrorMessage(error.response.data);
        console.error('Error:',error);
      });
  };

  const handleCloseSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  return (
    <AppBar position="static" style={{ background: '#6d1b7b' }}>
      <Container maxWidth="xl" style={{ marginLeft: 0, marginRight: 0, maxWidth: "100%" }} >
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            UB Social
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
              {pages.map(page => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                <Link to={page.route} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography textAlign="center">{page.name}</Typography>
                </Link>
              </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            UB Social
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                component={Link}
                to={page.route}
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <div style={{ marginLeft: 'auto' }}>
          {isLoggedIn ? (
            <>
              <Button 
                component={Link}
                to={perfil.route}
                color="inherit" 
                onClick={handleCloseNavMenu}>
                  {perfil.name}
              </Button>
              <Button 
                component={Link}
                to={home.route}
                color="inherit" 
                onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={handleOpenLoginModal}>
                Login
              </Button>
              <Button color="inherit" onClick={handleOpenSignupModal}>
                Sign Up
              </Button>
            </>
          )}
        </div>
        </Toolbar>
        <Modal open={isLoginModalOpen} onClose={handleCloseLoginModal}>
        <div style={{ backgroundColor: '#f0f0f0', width: 300, height: 280, margin: 'auto', marginTop: 100, padding: 20 }}>
          <h2>Login</h2>
          <hr/>
          <form className='mt-2' onSubmit={handleLoginFormSubmit} style={{ display: 'grid', gap: '10px' }}>
            <TextField
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type='submit' variant="outlined" color="secondary">Login</Button>
            <div style={{"color": "#fc0303"}} >{errorMessage}</div>
          </form>
        </div>
      </Modal>
      <Modal open={isSignupModalOpen} onClose={handleCloseSignupModal}>
        <div style={{ backgroundColor: '#f0f0f0', width: 300, height: 430, margin: 'auto', marginTop: 100, padding: 20 }}>
          <h2>Signup</h2>
          <form onSubmit={handleSignupFormSubmit} style={{ display: 'grid', gap: '10px' }}>
            <TextField
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              type="nombre"
              label="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <TextField
              type="apellido"
              label="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
            <TextField
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type='submit' variant="outlined" color="secondary">Signup</Button>
            <div style={{"color": "#fc0303"}} >{errorMessage}</div>
          </form>
        </div>
      </Modal>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
