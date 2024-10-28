import {Alert} from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../reduxToolkit/store/store';
import {logOutUser} from '../reduxToolkit/reducer/user';
import {_navigate} from '../navigation/navigationUtils';

// Base URLs & API Endpoints
export const BASE_URL = `https://niletechinnovations.com/projects/sherpa/api/`;
export const API_ENDPOINTS = {
  LOGIN: 'login',
  GET_PROFILE: 'profile',
  LOGOUT: 'logout',
  FORGOT_PASSWORD: 'forgot-password',
  VERIFY_OTP: 'verify-otp',
  RESET_PASSWORD: 'reset-password',
  CHANGE_PASSWORD: 'change-password',
  HOME: 'home',
  GET_TODAYJOB: 'all-jobs',
  JOB_DETAIL: 'job/details/',
  GET_CHECKIN: 'driver-todays-shift',
  CHECK_IN: 'driver-attendance',
  START_BREAK: 'driver-break-start',
  END_BREAK: 'driver-break-end',
  START_JOB: 'start-job',
  JOB_STATUS: 'job-statuses',
  END_JOB: 'end-job',
  CHANGE_JOBSTATUS: 'change-job-status',
  NOTIFICATION: 'notifications',
  UPDATE_PROFILE: 'update-profile',
  SCHDULE_JOB: 'schedule-jobs',
  MONTHLY_ATTANDANCE: 'driver-monthly-attendance',
  CLEAR_NOTIFICATION: 'clear-notifications',
};

// Common headers
const getHeaders = (token = '', isMultipart = false) => ({
  'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json',
  Accept: 'application/json',
  Authorization: token ? `Bearer ${token}` : '',
});

// Navigate to welcome screen
const gotoWelcome = () => {
  _navigate();
};

// Logout handler
const handleLogout = async () => {
  await AsyncStorage.clear();
  store.dispatch(logOutUser());
  gotoWelcome();
};

// General error handler
const handleApiError = error => {
  console.log('handleApiError', error)
  const status = error?.response?.status;
  if (status === 401) {
    handleLogout();
  }
};

// Post API call
export const postAPI = async (endPoint, postData, token = '') => {
  try {
    console.log('postData', postData, token)
    const response = await axios.post(`${BASE_URL}${endPoint}`, postData, {
      headers: getHeaders(token, true),
    });
    // handleApiError(response);
    return {response: response?.data, status: true, msg: response?.data?.msg};
  } catch (error) {
    handleApiError(error);
    return {response: error, status: false, msg: error.response?.data?.msg};
  }
};

// Get API call
export const getApi = async endPoint => {
  try {
    const response = await axios.get(`${BASE_URL}${endPoint}`);
    // handleApiError(response);
    return response;
  } catch (error) {
    handleApiError(error);
    return {
      responseJson: null,
      err: error,
    };
  }
};

// Get API with token
export const getApiWithToken = async (token, endPoint) => {
  try {
    const response = await axios.get(`${BASE_URL}${endPoint}`, {
      headers: getHeaders(token),
    });
    // handleApiError(response);
    return response;
  } catch (error) {
    handleApiError(error);
    return {
      responseJson: null,
      err: error,
    };
  }
};

// Post API with token
export const postApiWithToken = async (token, endPoint, data) => {
  try {
    const headers = getHeaders(token, Object.keys(data).length > 0);
    const response = await axios.post(`${BASE_URL}${endPoint}`, data, {
      headers,
    });
    // handleApiError(response);
    return response;
  } catch (error) {
    handleApiError(error);
    return {
      responseJson: null,
      err: error,
    };
  }
};

// Post JSON API with token
export const postJsonApiWithToken = async (token, endPoint, data) => {
  try {
    const response = await axios.post(`${BASE_URL}${endPoint}`, data, {
      headers: getHeaders(token),
    });
    // handleApiError(response);
    return response;
  } catch (error) {
    handleApiError(error);
    return {
      responseJson: null,
      err: error,
    };
  }
};

// Delete API
export const deleteApi = async (token, endPoint, id) => {
  try {
    const response = await axios.delete(`${BASE_URL}${endPoint}/${id}`, {
      headers: getHeaders(token),
    });
    // handleApiError(response);
    return response;
  } catch (error) {
    handleApiError(error);
    return {
      responseJson: null,
      err: error,
    };
  }
};

// Fetch API request (alternative method)
export const requestPostApi = async (
  endPoint,
  body = '',
  method,
  token = '',
) => {
  const url = `${BASE_URL}${endPoint}`;
  const headers = token
    ? {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache',
      }
    : {'Content-Type': 'application/json', Accept: 'application/json'};

  try {
    const response = await fetch(url, {
      method,
      body: body ? JSON.stringify(body) : '',
      headers,
    });
    console.log('done dona', response)
    return {responseJson: await response.json(), err: null};
  } catch (error) {
    handleApiError(error);
    return {
      responseJson: null,
      err: error,
    };
  }
};
