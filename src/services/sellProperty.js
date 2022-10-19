import axios from 'axios';

export const getCountries = () => {
    return new Promise((resolve, reject) => {
        axios.get('https://api.countrystatecity.in/v1/countries')
            .then((response) => {
                console.log(response);
                resolve(response);
            })
    })
}