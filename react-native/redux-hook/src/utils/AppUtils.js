export const httpPostConfig = (url, data) => {
    return {
        method: 'post',
        url: url,
        data: data,
        timeout: 90000,
        responseType: 'json'
    };
};

export const httpGetConfig = (url) => {
    return {
        method: 'GET',
        url: url,
        timeout: 90000,
        responseType: 'json'
    };
};