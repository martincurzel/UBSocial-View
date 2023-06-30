import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Button } from '@mui/material';

const ModalFormCU = (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = () => {
    Swal.clickConfirm()
  };

  const closeModal = () => {
    Swal.clickCancel()
  };

  //Conditional input, if the form is a update form, the defaultValue will be filled in the try. Else, the input will not have a defaultValue
  function Input({ allProps, theKey }) {
    let input;
    try {
      input = <input
        id={theKey}
        type={allProps.inputs[theKey][2]}
        defaultValue={allProps.data[0][theKey]}
        className={errors[theKey] ? 'mb-4 form-control is-invalid ' : 'mb-4 form-control'}
        {...register(theKey, { required: allProps.inputs[theKey][1] })} />
    } catch {
      input = <input
        id={theKey}
        type={allProps.inputs[theKey][2]}
        className={errors[theKey] ? 'mb-4 form-control is-invalid ' : 'mb-4 form-control'}
        {...register(theKey, { required: allProps.inputs[theKey][1] })} />
    }
    return input
  }

  //create the form with the inputs of the prop "inputs"
  return (
    <form id={props.idForm} className="container mt-5" onSubmit={handleSubmit(onSubmit)}>
      <div className='row justify-content-center mb-4'>
        {Object.keys(props.inputs).map((key, index) =>
          <div key={index} className='col-3'>
            <label className='form-label'>{props.inputs[key][0]}</label>
            <Input allProps={props} theKey={key} />
          </div>
        )}
      </div>
      <Button type="submit" variant="outlined" color="secondary">Enviar</Button>
      <Button onClick={closeModal} className='mx-2' variant="outlined" color="secondary">Cancelar</Button>
    </form>
  );
};

export default ModalFormCU;
