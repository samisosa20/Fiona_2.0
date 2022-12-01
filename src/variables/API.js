import axios from 'axios';

export default axios.create({
    baseURL: `https://api-fiona.itpmsoftware.com/fiona/`
});