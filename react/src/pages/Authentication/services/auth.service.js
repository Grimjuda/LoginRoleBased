import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password, empresa, sitioweb) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    empresa,
    sitioweb,
  });
};
const forgotpassword = (email) => {
  return axios.post(API_URL + "forgotpassword", {
    
    email
    
  });
};

const sendemail = (email,password) => {
  return axios.post(API_URL + "sendemail", {
    
    email,
    password
    
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  sendemail,
  forgotpassword,
  getCurrentUser,
};