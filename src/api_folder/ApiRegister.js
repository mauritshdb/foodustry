import Axios from "axios";

const register = (name, email, password, passwordRepeat, role, profilePictureUrl, phoneNumber) => {
    return Axios({
        method: 'post',
        url: `${process.env.REACT_APP_BASEURL}/api/v1/register`,
        headers: {
            apiKey: `${process.env.REACT_APP_APIKEY}`,
        },
        data: {
            name: name,
            email: email,
            password: password,
            passwordRepeat: passwordRepeat,
            role: role,
            profilePictureUrl: profilePictureUrl,
            phoneNumber: phoneNumber
        }
    });
}

export default register;