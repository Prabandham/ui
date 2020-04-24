import moment from "moment";

const getCookies = (cookieName = "") => {
    if (!cookieName) {
        return false;
    }

    const cookies = {};

    for (const cookie of document.cookie.split("; ")) {
        const [name, value] = cookie.split("=");

        if (name === cookieName) {
            cookies[name] = decodeURIComponent(value.replace(/\+/g, "%20"));
            return cookies[name];
        }
    }

    return false;
};

const setCookies = (
    cookieName = "",
    value = "",
    expTime = moment().valueOf() + 3600,
    path = "/"
) => {
    if (!cookieName) {
        return false;
    }
    const now = new Date();

    now.setTime(expTime);

    document.cookie = `${cookieName} = ${encodeURIComponent(value)} ; expires= ${now.toUTCString()} ; path= ${path}`;
};

const removeCookies = (cookieName = "", path = "/") => {
    if (!cookieName) {
        return false;
    }
    setCookies(cookieName, "", -1, path);
};

const removeAllCookies = () => {
    removeCookies("authToken");
    removeCookies("tokenExp");
    removeCookies("userId");
    removeCookies("userInfo");
};

export { getCookies, removeCookies, removeAllCookies, setCookies };
