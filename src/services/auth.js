import axios from "axios";
import api from '../api';

let url;
process.env.NODE_ENV === 'development' ?
    url = process.env.REACT_APP_DEV_API_URL : url = process.env.REACT_APP_API_URL
const API_URL = `${url}api/`;

const signup = (firstName, lastName, email, password) => {
  return axios.post(API_URL + "signup", {
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
  });
};

const login = (email, password) => {
    return axios.post(API_URL + "login", {
        email: email,
        password: password,
    }).then((response) => {
        if(response.data.token){
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("archive");
};

const insertImage = (image) => {
    return axios.post(API_URL + "addImage/" + JSON.parse(localStorage.getItem('user')).id, {
        image: image,
    });
};

const deleteImage = (image) => {
    return axios.delete(API_URL + "deleteImage/" + JSON.parse(localStorage.getItem('user')).id, {
        image: image,
    });
};

const getCurrentUser = () => {
    return axios.get(API_URL + "getuserinfo/" + JSON.parse(localStorage.getItem('user')).id);
};

const authService = {
    signup,
    login,
    logout,
    insertImage,
    deleteImage,
    getCurrentUser,
};

export default authService;