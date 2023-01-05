import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));

export default axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user ? user.token : null}`
    }
});