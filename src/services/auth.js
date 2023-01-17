import axios from "axios";

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
};

const authService = {
    signup,
    login,
    logout,
};

export default authService;