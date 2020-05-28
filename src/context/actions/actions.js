import Axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_START
} from "../actionTypes";



export const Login = async (username, password) => {
  const response = await Axios.post("http://localhost:8000/login", {
      usernameLogin: username,
      passwordLogin: password,
    })
    .then((res) => {
      console.log(res)
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
      console.log(err)

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
  const config = {
    headers: {
      'Authorization': "Bearer " + localStorage.getItem("token")
    }
  }
  const response = await Axios.get(url, config)
    .then(res => {
      return res
    }).catch(err => {
      return err
    })
  return response
}

export const CreateData = async (pathname, data) => {
  const url = "http://localhost:8000" + pathname
  const config = {
    headers: {
      'Authorization': "Bearer " + localStorage.getItem("token")
    }
  }
  const response = await Axios.post(url, data, {
      ...config,
      'Content-Type': 'multipart/form-data'
    })
    .then(res => {
      if (res.status === 200) {
        return {
          success: true,
          message: "Added new data successfully"
        }
      } else {
        return {
          success: false,
          message: "Added new data failed"
        }
      }
    }).catch(err => {
      return err
    })
  return response
}

export const UpdateData = async (pathname, id, data) => {
  const url = "http://localhost:8000" + pathname + "/" + id
  const config = {
    headers: {
      'Authorization': "Bearer " + localStorage.getItem("token")
    }
  }
  const response = await Axios.put(url, data, {
      ...config,
      'Content-Type': 'multipart/form-data'
    })
    .then(res => {
      if (res.status === 200) {
        return {
          success: true,
          message: "Update data successfully"
        }
      } else {
        return {
          success: false,
          message: "Update data failed"
        }
      }
    }).catch(err => {
      return {
        success: false,
        message: "Update new data failed"
      }
    })
  return response
}

export const DeteleData = async (pathname, id) => {
  const url = "http://localhost:8000/" + pathname + "/" + id
  const config = {
    headers: {
      'Authorization': "Bearer " + localStorage.getItem("token")
    }
  }
  const response = await Axios.delete(url, config)
    .then(res => {
      if (res.status === 200) {
        return {
          success: true,
          message: "Remove data successfully"
        }
      } else {
        return {
          success: false,
          message: "Remove data failed"
        }
      }
    }).catch(err => {
      return {
        success: false,
        message: "Added new data failed"
      }
    })
  return response
}


// Profiles

export const GetProfiles = async () => {
  const url = "http://localhost:8000/user/profile/"
  const config = {
    headers: {
      'Authorization': "Bearer " + localStorage.getItem("token")
    }
  }
  const response = await Axios.get(url, config)
    .then(res => {
      if (res.status === 200) {
        return {
          success: true,
          data: res.data[0]

        }
      } else {
        return {
          success: false,
          data: {}
        }
      }
    }).catch(err => {
      return {
        success: false,
        data: {}
      }
    })
  return response
}

export const UpdateProfile = async (data) => {
  const url = "http://localhost:8000/user/profile/edit"
  const config = {
    headers: {
      'Authorization': "Bearer " + localStorage.getItem("token")
    }
  }
  const response = await Axios.patch(url, data, config)
    .then(res => {
      console.log(res)
      if (res.status === 200) {
        return {
          success: true,
          message: "Update data successfully"
        }
      } else {
        return {
          success: false,
          message: "Update data failed"
        }
      }
    }).catch(err => {
      return {
        success: false,
        message: "Update new data failed"
      }
    })
  return response
}

export const UpdatePicture = async (data) => {
  const url = "http://localhost:8000/user/profile/photo/edit"
  const config = {
    headers: {
      'Authorization': "Bearer " + localStorage.getItem("token")
    }
  }
  const response = await Axios.patch(url, data, {
      ...config,
      'Content-Type': 'multipart/form-data'
    })
    .then(res => {
      console.log(res)
      if (res.status === 200) {
        return {
          success: true,
          message: "Update picture successfully"
        }
      } else {
        return {
          success: false,
          message: "Update pricture failed"
        }
      }
    }).catch(err => {
      return {
        success: false,
        message: "Update new data failed"
      }
    })
  return response
}



export const stringToUppercase = (str) => {
  const log = str.split("_").map((word) => {
    const tmp = word.charAt(0).toUpperCase() + word.slice(1);
    return tmp;
  });
  return log.join(" ");
};