import * as config from '../utils/config'
import * as OauthApi from './OauthApi'
var wx = require('weixin-js-sdk');

export async function Balancelist(page, pageSize) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/sms/sms/list', { page: page, pageSize: pageSize });
    } catch (error) {
        return error
    }
}

export async function packageList(page, pageSize) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/sms/package', { page: page, pageSize: pageSize });
    } catch (error) {
        return error
    }
}

export async function buyer(package_id) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/sms/buyer', { package_id: package_id });
    } catch (error) {
        return error
    }
}

export async function wxUniformOrders(orderSn) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/wx/wxUniformOrders', { orderSn: orderSn });
    } catch (error) {
        return error
    }
}

export function WxPayment(appid, timeStamp, nonceStr, _package, signType, paySign, ) {
    return new Promise(function (resolve, reject) {
        wx.requestPayment({
            appId: appid,
            timeStamp: timeStamp,
            nonceStr: nonceStr,
            package: _package,
            signType: signType,
            paySign: paySign,

            success: res => {
                let data = {
                    error: 'success',
                    error_description: '成功',
                    code: 200
                }
                resolve(data)
            },
            fail: function (error) { // fail调用接口失败
                reject({
                    error: 'network_error',
                    error_description: '网络异常',
                    code: 0
                })
            },
            complete: function (res) { // complete

            }
        })
    })
}
