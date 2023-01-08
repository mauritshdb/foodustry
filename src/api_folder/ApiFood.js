import Axios from 'axios';
const isLogin = Boolean(localStorage.getItem("token") || false)
const getData = () => {
  if (isLogin) {
    return Axios({
      method: 'get',
      url: `${process.env.REACT_APP_BASEURL}/api/v1/foods`,
      headers: {
        apiKey: `${process.env.REACT_APP_APIKEY}`,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
  } else {
    return Axios({
      method: 'get',
      url: `${process.env.REACT_APP_BASEURL}/api/v1/foods`,
      headers: {
        apiKey: `${process.env.REACT_APP_APIKEY}`,
      }
    })
  }

}

export default getData;