import API from '../utils/api';
import setAuthToken from '../utils/setAuthToken';
import {
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  LOGOUT,
} from './actionTypes';
import { toast } from 'react-toastify';

const settings = {
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// Load user
export const loadUser = () => {
  return async (dispatch) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      // get user data
      const res = await API.get('/api/auth');

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };
};

// Register User
export const register = ({ name, email, password }) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // FIX: Send as object, not string
    const body = { name, email, password };

    try {
      const res = await API.post('/api/users', body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      
      toast.success('Registered Successfully !', settings);
      dispatch(loadUser());
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error('User already exists !', settings);
      } else {
        toast.error('Unable to Register !', settings);
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
};

// google auth
export const googleAuth = ({ name, email }) => {
  return async (dispatch) => {
    try {
      toast.success('Authenticated Successfully!', settings);

      dispatch(loadUser());
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
      });

      toast.error('Unable to Authenticate !', settings);
    }
  };
};

// Login User
export const login = (email, password) => {
  return async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // FIX: Send as object, not string
    const body = { email, password };

    try {
      const res = await API.post('/api/auth', body, config);

      toast.success('Logged In Successfully !', settings);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
      });
      toast.error('Invalid Credentials !', settings);
    }
  };
};

export const logout = () => (dispatch) => {
  setAuthToken(null);
  dispatch({ type: LOGOUT });
  toast.success('Logged Out Successfully !', settings);
};