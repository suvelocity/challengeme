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

network.interceptors.response.use(
  response => response,
  async (error) => {
    const status = error.response ? error.response.status : null
    const originalRequest = error.config;
    console.log(originalRequest);
    
    if(status === 401) {
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
    }

    if (status === 403) {
      const { data: getToken } = await network.post('/api/v1/auth/token', {token: Cookies.get('refreshToken')});
      Cookies.set('accessToken', getToken.token);
      const data = await network(originalRequest)
      return data;
    } else {
      throw error;
    }
  }
);

export default network;