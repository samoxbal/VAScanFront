import axios from 'axios';

if (process.env.NODE_ENV === 'development') {
    require('../../server/mock/axiosMock')(axios);
}

export const api = {
    add_measure: data => {
        return axios.post('/upload', data, {
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        });
    },
    login: data => {
        const options = {
            method: 'post',
            url: '/token',
            headers: {
                'Content-Type': 'application/json'
            },
            data
        };
        return axios(options);
    }
};