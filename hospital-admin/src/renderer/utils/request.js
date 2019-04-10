import qs from 'qs'

/**
 * @description 发送POST请求
 * @param {string} url 接口地址
 * @param {object} pars 参数对象
 */
export function post(url, pars, head) {
    head = head || {};
    Object.assign(head, {
        'Content-Type': 'application/x-www-form-urlencoded'
    });
    let isOk;
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            headers: head,
            body: qs.stringify(pars, {
                indices: false
            })
        }).then((response) => {
            if (response.status == 504 && response.statusText == 'Gateway Timeout') {
                throw new Error(response.statusText);
            }
            isOk = (response.ok) ? true : false;
            return response.json()
        }).then((responseData) => {
            if (console.group) {
                console.group('post')
                console.info("[url]", url)
                console.info("[data]", pars)
                console.info("[result]", responseData)
                console.groupEnd()
            }
            if (isOk) {
                resolve(responseData)
            } else {
                reject(responseData)
            }
        }).catch((err) => {
            if (err && (err.message === 'Failed to fetch' || err.message === 'Gateway Timeout')) {
                reject({
                    error: 'network_error',
                    'error_description': err.message
                })
                return
            } else if (typeof err.error === undefined) {
                reject({
                    error: 'unknown_error',
                    'error_description': err
                })
                return
            }
            reject(err)
        })
    })
}

/**
 * @description 发送GET请求
 * @param {string} url 接口地址
 */
export function get(url, pars, head) {
    if (pars) {
        if (url.indexOf('?') >= 0) {
            url += "&" + qs.stringify(pars, {
                indices: false
            });
        } else {
            url += "?" + qs.stringify(pars, {
                indices: false
            });
        }
    }
    head = head || {};
    Object.assign(head, {
        'Content-Type': 'application/x-www-form-urlencoded'
    });
    let isOk
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'GET',
            headers: head
        }).then((response) => {
            if (response.status == 504 && response.statusText == 'Gateway Timeout') {
                throw new Error(response.statusText);
            }
            isOk = (response.ok) ? true : false;
            return response.json()
        }).then((responseData) => {
            if (console.group) {
                console.group('get')
                console.info("[url]", url)
                console.info("[result]", responseData)
                console.groupEnd()
            }

            if (isOk) {
                resolve(responseData)
            } else {
                reject(responseData)
            }
        }).catch((err) => {
            //console.log(err)
            if (err && err.message === 'Failed to fetch' || err.message === 'Gateway Timeout') {
                reject({
                    error: 'network_error',
                    'error_description': err.message
                })
                return
            } else if (typeof err.error === undefined) {
                reject({
                    error: 'unknown_error',
                    'error_description': err
                })
                return
            }
            reject(err)
        })
    })
}