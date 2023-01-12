import Axios from 'axios';

const createFood = (nama, description, imageUrl, ingredients) => {
    return Axios({
        method: 'post',
        url: `${process.env.REACT_APP_BASEURL}/api/v1/create-food`,
        headers: {
            apiKey: `${process.env.REACT_APP_APIKEY}`,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
            name: nama,
            description: description,
            imageUrl: imageUrl,
            ingredients: JSON.parse(ingredients)
        }
    })
}

export default createFood;