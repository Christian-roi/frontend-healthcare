import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));
let url;
process.env.NODE_ENV === 'development' ?
    url = process.env.REACT_APP_DEV_API_URL : url = process.env.REACT_APP_API_URL

export default axios.create({
  baseURL: url,
  headers: {
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${user ? user.token : null}`,
  },
});