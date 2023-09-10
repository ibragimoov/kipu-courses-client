import Axios from "axios";

const axiosBaseURL = Axios.create({
    baseURL: "http://localhost:5000/",
});

export default axiosBaseURL;
