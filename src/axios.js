import axios from 'axios';

const FIREBASE_URL = process.env.REACT_APP_FIREBASE_URL;

const instance = axios.create({
  baseURL: FIREBASE_URL
});

export default instance;