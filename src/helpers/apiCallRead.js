import axios from 'axios';

const BASE_PATH = process.env.REACT_APP_CONTROLLER_API_BASE_PATH;

export const callApiRead = (url) => {
  console.log(BASE_PATH + url)

  return axios({
    method: "GET",
    url: BASE_PATH + url,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('jwtToken')
    }
  })
};

export const callApiReadBlob = (url) => {
  console.log(BASE_PATH + url)
  return axios({
    method: "GET",
    url: BASE_PATH + url,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('jwtToken')
    },
    responseType: 'blob'
  })
};