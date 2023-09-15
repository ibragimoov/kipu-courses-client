import Axios from "axios";
import dotenv from 'dotenv';

dotenv.config();


const axiosBaseURL = Axios.create({
    baseURL: process.env.API_URL,
});

export default axiosBaseURL;
