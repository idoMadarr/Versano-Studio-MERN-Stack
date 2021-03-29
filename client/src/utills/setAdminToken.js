import axios from 'axios';

const setAdminToken = token => {
    if (token) {
        axios.defaults.headers.common['authentication'] = token;
    } else {
        delete axios.defaults.headers.common['authentication'];
    }
}

export default setAdminToken;