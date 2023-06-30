import React, { useState, useEffect } from 'react';
import { callApiNoRead } from "../helpers/apiCallNoRead";
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";

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
    <div style={{ width: 'auto', margin: 'auto' }}>
      {proposals.length > 0 ? (
        <>
        {proposals.map((proposal, index) => (
          <div key={index}>
            <hr />
            <h3>{proposal.title}</h3>
            <p>{proposal.description}</p>
            <Button
                onClick={() => deleteProposal(proposal.id)} variant="outlined" color="secondary"
            >
                {"Eliminar"}
            </Button>
          </div>
        ))}</>
      ) : (
        <p>No hay propuestas creadas por vos</p>
      )}
    </div>
  );
};

export default MisPropuestas;