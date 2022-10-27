import axios from 'axios';

const instance = axios.create({
  baseURL: "https://api.countrystatecity.in/v1/"
});

const ApiRequest = {
  request: async function (url, method, data) {
    let response = null;
    try {
      const apiResponse = await instance(url, {
        method,
        data,
      });
      response = apiResponse.data;
    } catch (error) {
      if (error.response) {
        
      }
    }
    return response;
  },
};

export default ApiRequest;
