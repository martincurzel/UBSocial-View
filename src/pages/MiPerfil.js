import React, { useState, useEffect } from 'react';
import { callApiNoRead } from "../helpers/apiCallNoRead";
import { useSelector } from "react-redux";
import { Typography, TextField, Button, Grid } from '@mui/material';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const loginToken = localStorage.getItem('jwtToken');

  useEffect(() => {
    // Fetch profile data from the API
    callApiNoRead("GET", "user/current", null, loginToken)
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

  const handleSaveClick = () => {
    // Perform save operation here, e.g., make an API call to update the profile
    let user = {
        "Password": password,
        "Email": email,
        "Name": name,
        "Surname": surname,
        "Id": 37
    }
    callApiNoRead("PUT", "user", user, loginToken)
      .then(response => {
        console.log('Response:',response);
      })
      .catch(error => {
        // Handle any errors from the API
        console.error('Error:',error);
      });
    setIsEditing(false);
  };

  return (
    <div style={{width: 'auto', margin: 'auto'}}>
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h2">Hola, {name}</Typography>
        <div style={{ borderBottom: '1px solid black', margin: '10px 0' }}></div>
      </div>
      <Grid container spacing={6} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">Nombre:</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          {isEditing ? (
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <Typography>{name}</Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">Apellido:</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          {isEditing ? (
            <TextField
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          ) : (
            <Typography>{surname}</Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">Email:</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          {isEditing ? (
            <TextField
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <Typography>{email}</Typography>
          )}
        </Grid>
        {isEditing && (
          <>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Contraseña:</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </>
        )}
      </Grid>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {isEditing ? (
          <Button variant="contained" color="secondary" onClick={handleSaveClick}>
            Save
          </Button>
        ) : (
          <Button variant="contained" color="secondary" onClick={handleEditClick}>
            Edit
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;