import axios from "axios";
import {getCookies} from "./utils/Cookies";

const BACKEND_URL = "http://localhost:8080";
const authToken = getCookies("authToken");

export const ApiConstants = {
    login: (params) => {
        return axios({
            method: "post",
            url: `${BACKEND_URL}/login`,
            data: params
        });
    },
    getExpenseTypes: () => {
        return axios({
            method: "get",
            headers: {
                "Authorization": `Bearer ${authToken}`
            },
            url: `${BACKEND_URL}/auth/expense_types`
        })
    },
    getIncomeTypes: (userId) => {
        return axios({
            method: "get",
            headers: {
                "Authorization": `Bearer ${authToken}`
            },
            url: `${BACKEND_URL}/auth/income_types/${userId}`
        })
    },
    getIncomeSources: (userId) => {
        return axios({
            method: "get",
            headers: {
                "Authorization": `Bearer ${authToken}`
            },
            url: `${BACKEND_URL}/auth/income_sources/${userId}`
        })
    },
    addIncomeType: (userId, params) => {
        return axios({
            method: "post",
            headers: {
                "Authorization": `Bearer ${authToken}`
            },
            url: `${BACKEND_URL}/auth/income_type/${userId}`,
            data: params
        })
    }
};