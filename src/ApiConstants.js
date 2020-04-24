import axios from "axios";

const BACKEND_URL = "http://localhost:8080";

export const ApiConstants = {
    login: (params) => {
        return axios({
            method: "post",
            url: `${BACKEND_URL}/login`,
            data: params
        });
    }
};