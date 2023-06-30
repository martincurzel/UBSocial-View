import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
import ModalCU from "../components/ModalFormCU";

const BASE_PATH = process.env.REACT_APP_CONTROLLER_API_BASE_PATH;

export const callApiNoRead = (methodParam, url, data) => {
  console.log(BASE_PATH + url);
  console.log(data);
  return axios({
    method: methodParam,
    url: BASE_PATH + url,
    data: data,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('jwtToken')
    }
  })
};



export const addCallWithModal = (url, inputs, text) => {
  withReactContent(Swal).fire({
      title: 'Agregar ' + text,
      html: <ModalCU inputs={inputs} idForm="addForm" />,
      width: '60%',
      showConfirmButton: false,
  }).then((result) => {
      if (result.isConfirmed) {
          callApiNoReadWithModal("post", url, "#addForm", null);
      }
  });
}



//This funcion call to the api with the type of method, url and id of the form where the information was completed
const callApiNoReadWithModal = (methodParam, url, formId, idItem) => {
  const data = {};
  //If the request has data to submit like add student, the formId is not null and the data is saved with the input values when they are not null
  if (formId != null) {
      const formData = new FormData(document.querySelector(formId));
      for (let [key, value] of formData.entries()) {
          if (value !== '') {
              data[key] = value;
          }
      }
  }

  if (idItem !== null) {
      data["id"] = idItem;
  }
  callApiNoRead(methodParam, url, data)
  .then(response => {
    
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

  }).catch(error => {
    const swalDelete = withReactContent(Swal)
    swalDelete.fire({
        icon: 'error',
        title: error.response.data,
        confirmButtonText: "Aceptar"
    })
});
}