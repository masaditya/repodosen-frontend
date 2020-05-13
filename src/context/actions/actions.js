import Axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_START
} from "../actionTypes";

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }
}

export const Login = async (username, password) => {
  const response = await Axios.post("http://localhost:8000/login", {
      usernameLogin: username,
      passwordLogin: password,
    })
    .then((res) => {
      console.log(res.data)
      if (res.data.success) {
        localStorage.setItem("token", res.data.token)
        return {
          type: LOGIN_SUCCESS,
          payload: {
            isAdmin: res.data.role === "admin",
            token: res.data.token,
          },
        };
      } else {
        return {
          type: LOGIN_FAILED,
          payload: {}
        }
      }
    })
    .catch((err) => {
      return {
        type: LOGIN_FAILED,
      };
    });
  return response;
};

export const Logout = () => {
  return {
    type: LOGOUT_START
  }
}

export const GetAllData = async (pathname) => {
  const url = "http://localhost:8000" + pathname
  console.log(url)
  const response = await Axios.get(url, config)
    .then(res => {
      return res
    }).catch(err => {
      return err
    })
  return response
}