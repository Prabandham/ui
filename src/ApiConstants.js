import axios from "axios";
import { getCookies } from "./utils/Cookies";

const BACKEND_URL = "http://localhost:8080";

const authToken = () => {
    const authToken = getCookies("authToken");
    if (authToken === undefined || authToken === null) {
        setTimeout(() => {
            authToken();
        }, 1000);
    }
    return authToken
}

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
                "Authorization": `Bearer ${authToken()}`
            },
            url: `${BACKEND_URL}/auth/expense_types`
        })
    },
    getIncomeSources: (userId) => {
        return axios({
            method: "get",
            headers: {
                "Authorization": `Bearer ${authToken()}`
            },
            url: `${BACKEND_URL}/auth/income_sources/${userId}`
        })
    },
    addIncomeSource: (userId, params) => {
        return axios({
            method: "post",
            headers: {
                "Authorization": `Bearer ${authToken()}`
            },
            url: `${BACKEND_URL}/auth/income_source/${userId}`,
            data: params
        })
    },
    getAccounts: (userId) => {
        return axios({
            method: "get",
            headers: {
                "Authorization": `Bearer ${authToken()}`
            },
            url: `${BACKEND_URL}/auth/accounts/${userId}`
        })
    },
    addAccount: (userId, params) => {
        return axios({
            method: "post",
            headers: {
                "Authorization": `Bearer ${authToken()}`
            },
            url: `${BACKEND_URL}/auth/account/${userId}`,
            data: params
        })
    },
    getIncomes: (userId) => {
        return axios({
            method: "get",
            headers: {
                "Authorization": `Bearer ${authToken()}`
            },
            url: `${BACKEND_URL}/auth/incomes/${userId}`
        })
    },
    addIncome: (userId, params) => {
        return axios({
            method: "post",
            headers: {
                "Authorization": `Bearer ${authToken()}`
            },
            url: `${BACKEND_URL}/auth/income/${userId}`,
            data: params
        })
    },
    getExpenses: (userId) => {
        return axios({
            method: "get",
            headers: {
                "Authorization": `Bearer ${authToken()}`
            },
            url: `${BACKEND_URL}/auth/expenses/${userId}`
        })
    },
    addExpense: (userId, params) => {
        return axios({
            method: "post",
            headers: {
                "Authorization": `Bearer ${authToken()}`
            },
            url: `${BACKEND_URL}/auth/expense/${userId}`,
            data: params
        })
    }
};