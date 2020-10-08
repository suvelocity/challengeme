import axios from 'axios';
import Cookies from "js-cookie";

const network = axios.create({});

const getToken = () => {
  return Cookies.get('accessToken');
}

network.interceptors.request.use(
  config => {
    // Do something before request is sent

    config.headers["authorization"] = "bearer " + getToken();
    return config;
  }
);

// network.interceptors.response.use(
//   config => {
//     console.log('RESPONSE', config)
//     return config;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       window.location = '/login';
//     }
//     return error;
//   }
// );

export default network;