import {undefined} from "@umijs/utils/compiled/zod";

const TOKEN = 'Token';

export const setToken = (token: string | undefined) => {
    if (token) {
        sessionStorage.setItem(TOKEN, token);
    }
};

export const getToken = () => {
    return sessionStorage.getItem(TOKEN);
};

export const removeToken = () => {
    sessionStorage.removeItem(TOKEN);
};
