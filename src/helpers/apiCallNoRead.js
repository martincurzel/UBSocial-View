import axios from 'axios';

const BASE_PATH = process.env.REACT_APP_CONTROLLER_API_BASE_PATH;

export const callApiNoRead = (methodParam, url, data) => {
    console.log(BASE_PATH + url);
    console.log(data);
    return axios({
      method: methodParam,
      url: BASE_PATH + url,
      data: data,
      headers: {
        'Content-Type': 'application/json'
      }
    })
};