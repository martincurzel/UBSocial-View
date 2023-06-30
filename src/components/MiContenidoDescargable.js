import React, { useState, useEffect } from 'react';
import { callApiNoRead } from "../helpers/apiCallNoRead";

const MisActividades = () => {
  const [proposals, setProposals]= useState([]);
  const loginToken = localStorage.getItem('jwtToken');

  useEffect(() => {
    // Fetch profile data from the API
    callApiNoRead("GET", "proposal/current", null, loginToken)
      .then(response => {
        console.log('Response:',response);
        setProposals(response.data)
      })
      .catch(error => {
        // Handle any errors from the API
        console.error('Error:',error);
      });
  }, [loginToken]);

  return (
    <div style={{ width: 'auto', margin: 'auto' }}>
      {proposals.length > 0 ? (
        <>
        {proposals.map((proposal, index) => (
          <div key={index}>
            <hr />
            <h3>{proposal.title}</h3>
            <p>{proposal.description}</p>
          </div>
        ))}</>
      ) : (
        <p>No hay propuestas creadas por vos</p>
      )}
    </div>
  );
};

export default MisActividades;