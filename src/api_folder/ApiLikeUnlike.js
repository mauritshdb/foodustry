import Axios from 'axios';

const handlelike = (id, isLike) => {
    return Axios({
        method: 'post',
        url: `${process.env.REACT_APP_BASEURL}/api/v1/like`,
        headers: {
            apiKey: `${process.env.REACT_APP_APIKEY}`,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: { foodId: id },
    });

}