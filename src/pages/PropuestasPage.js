import React from 'react';
import { callApiRead } from '../helpers/apiCallRead';
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { addCallWithModal } from '../helpers/apiCallNoRead';

const PropuestasPage = () => {

  const [proposals, setProposals] = useState([]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);


  //send inputs to the hook to generate the form
  //placeholder + required + type
  const inputs = {
    "title": ["Titulo", true, "text"],
    "description": ["Descripcion", true, "text"]
  }

  useEffect(() => {
    const fetchData = async () => {
      await callApiRead("Proposal")
        .then(response => {
          setProposals(response.data)
        })
        .catch(error => {
          // Handle any errors from the API
          console.error('Error:', error);
        });
    }
    fetchData();
  }, []);

  const addProposal = () => {
    addCallWithModal("proposal", inputs, "Propuesta");
  }

  const handleLoginModal = (bool) => {
    setIsLoginModalOpen(bool);
  };

  return (
    <div>
      <div className='row'>
        <div className='col-md-10'>
          <h1 className='mb-5'>Propuestas de la Universidad de belgrano</h1>
        </div>
        <div className='col-md-2 mt-3'>
          {isLoggedIn ? (
              <Button onClick={() => addProposal(true)} variant="outlined" color="secondary">Crear</Button>
          ) : (
            <Button onClick={() => handleLoginModal(true)} variant="outlined" color="secondary">Crear</Button>
          )}
        </div>
      </div>


      {proposals.map((proposal, index) => (
        <div key={index}>
          <hr />
          <h3>{proposal.title}</h3>
          <p>{proposal.description}</p>
        </div>
      ))}

      <Modal open={isLoginModalOpen} onClose={() => handleLoginModal(false)}>
        <div className='text-center' style={{ backgroundColor: '#f0f0f0', width: 300, height: 280, margin: 'auto', marginTop: 100, padding: 20 }}>
          <h4>Iniciar sesion </h4>
          <hr />
          <p>Debes iniciar sesion antes de crear una propuesta</p>
          <Button className='mt-5' variant="outlined" onClick={() => handleLoginModal(false)} color="secondary">Aceptar</Button>
        </div>
      </Modal>


    </div>



  );
};


export default PropuestasPage;