import React, { useState, useEffect } from 'react';
import { callApiNoRead } from "../helpers/apiCallNoRead";
import Grid from '@mui/material/Grid';
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const MisPropuestas = () => {
  const [proposals, setProposals]= useState([]);
  const loginToken = localStorage.getItem('jwtToken');

  useEffect(() => {
    // Fetch profile data from the API
    callApiNoRead("GET", "proposal/current", null)
      .then(response => {
        console.log('Response:',response);
        setProposals(response.data)
      })
      .catch(error => {
        // Handle any errors from the API
        console.error('Error:',error);
      });
  }, [loginToken]);

  const deleteProposal = (id) => {
    callApiNoRead("DELETE", "proposal/" + id, null)
      .then(response => {
        console.log('Response:',response);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Operacion realizada con exito!',
          showConfirmButton: false,
          timer: 1000
      })
    
      setTimeout(function () {
          window.location.reload();
      }, 1150);
      })
      .catch(error => {
        // Handle any errors from the API
        const swalDelete = withReactContent(Swal);
        swalDelete.fire({
          icon: 'error',
          title: error.response.data,
          confirmButtonText: "Aceptar"
      });
        console.error('Error:',error);
      });
  }

  return (
    <div style={{ width: 'auto' }}>
      {proposals.length > 0 ? (
        <>
          {proposals.map((proposal, index) => (
            <div key={index}>
              <hr />
              <Grid container spacing={3} justifyContent="center" alignItems="center">
                <Grid item xs={5}>
                  <h3>{proposal.title}</h3>
                </Grid>
                <Grid item xs={5}>
                  <p>{proposal.description}</p>
                </Grid>
                <Grid item xs={2}>
                  <IconButton aria-label="delete" onClick={() => deleteProposal(proposal.id)} variant="outlined" color="error">
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </div>
          ))}
        </>
      ) : (
        <p>No hay propuestas creadas por vos</p>
      )}
  </div>
  );
};

export default MisPropuestas;