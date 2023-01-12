import Axios from "axios";

const getAllUser = () => {
    return Axios({
        method: 'get',
        url: `${process.env.REACT_APP_BASEURL}/api/v1/all-user`,
        headers: {
          apiKey: `${process.env.REACT_APP_APIKEY}`,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
}

export default getAllUser;