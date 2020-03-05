import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://deliberate-sprints.firebaseio.com/'
});

export default instance;