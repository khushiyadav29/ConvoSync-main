import API from './api';

const setAuthToken = token => {
  if (token) {
    // Set token in x-auth-token header for all requests
    API.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete API.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;