import axios from 'axios';

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