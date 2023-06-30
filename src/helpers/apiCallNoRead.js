import axios from 'axios';

const BASE_PATH = process.env.REACT_APP_CONTROLLER_API_BASE_PATH;

export const callApiNoRead = (methodParam, url, data, token) => {
  console.log(BASE_PATH + url);
  console.log(token);
  console.log(data);
  return axios({
    method: methodParam,
    url: BASE_PATH + url,
    data: data,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token
    }
  })
};