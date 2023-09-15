import Axios from "axios";

const axiosBaseURL = Axios.create({
    baseURL: 'https://kipu-server.onrender.com',
});

export default axiosBaseURL;
