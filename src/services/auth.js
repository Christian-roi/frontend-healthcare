import axios from "axios";

const API_URL = "http://localhost:8000/api/";

const signup = (firstname, lastname, email, password) => {
  return axios.post(API_URL + "signup", {
    firstname,
    lastname,
    email,
    password,
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