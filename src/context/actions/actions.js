import Axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILED
} from "../actionTypes";

export const Login = async (username, password) => {

  const response = await Axios.post("http://localhost:8000/login", {
    usernameLogin: username,
    passwordLogin: password
  }).then(res => {
    console.log(res.data)
    return {
      message: "SUCCESS"
    }
  }).catch(err => {
    console.log(err)
    return {
      message: "FAILED"
    }
  })

  return response
};