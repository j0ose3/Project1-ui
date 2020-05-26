import axios from 'axios';

export const p1 = axios.create({
    baseURL: 'http://project1api-env.eba-pgmp5v2m.us-east-1.elasticbeanstalk.com/',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});