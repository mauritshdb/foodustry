import Axios from 'axios';

const updateUser = (name, email, profilePictureUrl, phoneNumber) => {
  return Axios({
    method: 'post',
    url: `${process.env.REACT_APP_BASEURL}/api/v1/update-profile`,
    headers: {
      apiKey: `${process.env.REACT_APP_APIKEY}`,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: {
        name: name,
        email: email,
        profilePictureUrl: profilePictureUrl,
        phoneNumber: phoneNumber
    }
  })
}

export default updateUser;