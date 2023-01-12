import Axios from 'axios';
// get user
const getUser = () => {
  return Axios({
    method: 'get',
    url: `${process.env.REACT_APP_BASEURL}/api/v1/user`,
    headers: {
      apiKey: `${process.env.REACT_APP_APIKEY}`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  })
}

export default getUser;