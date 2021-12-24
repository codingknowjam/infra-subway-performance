import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    stages: [
        {duration: '5s', target: 50},
        {duration: '10s', target: 300},
        {duration: '10s', target: 300},
        {duration: '5s', target: 0},
    ],
    thresholds: {
        http_req_duration: ['p(99)<200'],
    },
};

const BASE_URL = 'http://lsm7179-alb-1556721989.ap-northeast-2.elb.amazonaws.com';

export default function () {
    let pathResponse = http.get(`${BASE_URL}/paths/?source=7&target=78`);
    check(pathResponse, {
        'find path': response => response.status === 200
    });

    sleep(1);
};