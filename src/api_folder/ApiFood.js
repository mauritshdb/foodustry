import Axios from 'axios';

const getData = () => {
  return Axios({
    method: 'get',
    url: `${process.env.REACT_APP_BASEURL}/api/v1/foods`,
    headers: {
      apiKey: `${process.env.REACT_APP_APIKEY}`,
    }
  })
}

export default getData;