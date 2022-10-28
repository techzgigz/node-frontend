import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:4000/api/v1'


export const getCountries = () => {
    return new Promise((resolve, reject) => {
        axios.get('https://api.countrystatecity.in/v1/countries')
            .then((response) => {
                console.log(response);
                resolve(response);
            })
    })
}

export const getProperty = async () => {
    try {
        let response = await axios.get('/getProperty');
        return response.data.data;
    }
    catch (error) {
        console.log(error)
        return null
    }

}
export const addProperty = async (data) => {
    try {
        let response = await axios.post('/addProperty',  data);
        return response.data.data;
    }
    catch (error) {
        console.log(error)
        return error
    }
}

export const searchProperty = async (data) => {
    try {
        let response = await axios.post('/addProperty',  data);
        return response.data.data;
    }
    catch (error) {
        console.log(error)
        return error
    }
}

export const paymentStripe = async (paymentMethodType,currency,amount) => {
    try {
        let response = await axios.post('/create-payment-intent',  {
            paymentMethodType: paymentMethodType,
            currency: currency,
            amount:  amount
        });
        return response.data.data;
    }
    catch (error) {
        console.log(error)
        return error
    }
}