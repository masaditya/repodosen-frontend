import Axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILED
} from "../actionTypes";

export const Login = async (username, password) => {
  const response = await Axios.post("http://localhost:8000/login", {
      usernameLogin: username,
      passwordLogin: password,
    })
    .then((res) => {
      console.log(res.data);
      localStorage.setItem("token", res.data.token)
      return {
        type: LOGIN_SUCCESS,
        payload: {
          user: res.data.role,
          token: res.data.token,
        },
      };
    })
    .catch((err) => {
      // console.log(err)
      return {
        type: LOGIN_FAILED,
      };
    });
  console.log(response);
  return response;
};

export const GetAllData = async (pathname) => {
  const response = await Axios.get("https://jsonplaceholder.typicode.com/users")
    .then(res => {
      return res
    }).catch(err => {
      return err
    })
  return response
}