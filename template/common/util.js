import Http from '@souche-f2e/http-request';

const ajax = (url, params = {}) => {
    params.url = url;
    params.type = params.type || 'get';
    return Http.ajax(params).then(res => {
        if (res.code === '10001') {
            // TODO 退出登录
        }
        if (res.message === 'OK' || res.success) {
            return Promise.resolve(res.data);
        } else {
            throw res;
        }
    }).catch(err => {
        // TODO 数据异常
        return Promise.reject(err);
    });
};

export default {
    modelName(baseURL) {
        return (params) => {
            // TODO 请求预处理
            params.opts = params.opts || {};
            return ajax(baseURL + params.url, {
                data: params.opts,
                type: params.method
            });
        };
    }
};