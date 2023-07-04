import React, { useState, useEffect } from 'react';
import { callApiNoRead } from "../helpers/apiCallNoRead";
import { Typography, TextField, Button, Grid } from '@mui/material';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MiPerfil = () => {
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const loginToken = localStorage.getItem('jwtToken');

  useEffect(() => {
    // Fetch profile data from the API
    callApiNoRead("GET", "user/current", null)
      .then(response => {
        console.log('Response:',response);
        const { name, surname, email } = response.data[0];
        setName(name);
        setSurname(surname);
        setEmail(email);
      })
      .catch(error => {
        // Handle any errors from the API
        console.error('Error:',error);
      });
  }, [loginToken]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  function isValidEmail(email) {
    // You can use a regular expression or any other method to validate the email format
    // Here's an example using a basic regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleSaveClick = () => {
    console.log(surname);
    if (!name || !surname || !email || !isValidEmail(email)) {
      const swalDelete = withReactContent(Swal)
      swalDelete.fire({
        icon: 'error',
        title: "Por favor complete todos los campos correctamente",
        confirmButtonText: "Aceptar"
      })
    }
    else{
      // Perform save operation here, e.g., make an API call to update the profile
      let user = {
        "Email": email,
        "Name": name,
        "Surname": surname,
        "Id": 37
      }
      callApiNoRead("PUT", "user", user, loginToken)
      .then(response => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Operacion realizada con exito!',
          showConfirmButton: false,
          timer: 1000
      })
        console.log('Response:',response);
      })
      .catch(error => {
        // Handle any errors from the API
        const swalDelete = withReactContent(Swal)
        swalDelete.fire({
          icon: 'error',
          title: 'Hubo un error en tu pedido!',
          confirmButtonText: "Aceptar"
        })
        console.error('Error:',error);
      });
      setIsEditing(false);
    }
    
  };

  return (
    <div style={{width: 'auto', margin: 'auto'}}>
      {name === null ? (
      <>
        <span>cargando...</span>
      </>
      ) : (
      <>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <Typography variant="h2">Hola {name}</Typography>
        {isEditing ? (
          <>
          </>
        ) : (
          <Button variant="contained" color="secondary" onClick={handleEditClick} style={{ marginLeft: '30px' }}>
            Edit
          </Button>
        )}
      </div>
      <div style={{ borderBottom: '3px solid violet', margin: 'auto' , width: '100%', pb: 5}}></div>
      <Grid container spacing={6} justifyContent="center" alignItems="center" sx={{ pt: 4, width: 200 }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">Nombre:</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!isEditing}
            variant='standard'
            color= 'secondary'
            sx={isEditing ? { width: 300 } : { width: 300, border: 'none', margin: 0 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">Apellido:</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!isEditing}
            variant='standard'
            color= 'secondary'
            sx={isEditing ? { width: 300 } : { width: 300, border: 'none', margin: 0 }}
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">Email:</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!isEditing}
            variant='standard'
            color= 'secondary'
            sx={isEditing ? { width: 300 } : { width: 300, border: 'none', margin: 0 }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        
      </Grid>
      <div style={{ textAlign: 'left', marginTop: '30px' }}>
        {isEditing ? (
            <>
                <Button variant="outlined" color="secondary" onClick={handleCancelClick} style={{ marginRight: '10px' }}>
                  Cancelar
                </Button>
                <Button variant="contained" color="secondary" onClick={handleSaveClick} style={{ marginLeft: '10px' }}>
                  Save
                </Button>
            </>
          ) : (
          <></>
        )}
      </div>
      </>
      )}
    </div>
  );
};

export default MiPerfil;