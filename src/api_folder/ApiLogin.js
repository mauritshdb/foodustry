import Axios from 'axios';

const login = (email, password) => {
    return Axios({
        method: 'post',
        url: `${process.env.REACT_APP_BASEURL}/api/v1/login`,
        headers: {
            apiKey: `${process.env.REACT_APP_APIKEY}`,
          },
        data: {
            email: email,
            password: password
        }
    });
}

export default login;