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
import axios from 'axios';

const pages = [
  { name: 'Actividades', route: '/actividades' },
  { name: 'Propuestas', route: '/propuestas' },
  { name: 'Contenido Descargable', route: '/contenido' },
  { name: 'Perfil', route: '/perfil' }
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [dni, setDni] = React.useState('');
  const [nombre, setNombre] = React.useState('');
  const [apellido, setApellido] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleLogout = (event) => {
    setIsLoggedIn(false);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  };
  
  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();

    // Make the API call using Axios
    /*axios.post('/api/endpoint', {
      email,
      password,
    })
      .then((response) => {
        setIsLoggedIn(true);
        handleCloseLoginModal();
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors from the API
        console.error(error);
      });*/
      handleCloseLoginModal();
  };

  const handleOpenSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const handleSignupFormSubmit = (e) => {
    e.preventDefault();
    // Make the API call using Axios
    /*axios.post('/api/endpoint', {
      email,
      password,
    })
      .then((response) => {
        setIsLoggedIn(true);
        handleCloseLoginModal();
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors from the API
        console.error(error);
      });*/
    handleCloseSignupModal();
  };

  const handleCloseSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  return (
    <AppBar position="static" style={{ background: '#6d1b7b' }}>
      <Container maxWidth="xl">
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
            LOGO
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
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
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
        <div style={{ backgroundColor: '#f0f0f0', width: 300, height: 250, margin: 'auto', marginTop: 100, padding: 20 }}>
          <h2>Login</h2>
          <form onSubmit={handleLoginFormSubmit} style={{ display: 'grid', gap: '10px' }}>
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
          </form>
        </div>
      </Modal>
      <Modal open={isSignupModalOpen} onClose={handleCloseSignupModal}>
        <div style={{ backgroundColor: '#f0f0f0', width: 300, height: 450, margin: 'auto', marginTop: 100, padding: 20 }}>
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
              type="dni"
              label="DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
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
          </form>
        </div>
      </Modal>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
