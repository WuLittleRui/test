import * as config from '../utils/config'
import * as OauthApi from './OauthApi'



/***
 * @author jiangxudong
 * @description 店铺设置上传修改图片信息
 * 
 */

/**
 * 资源上传
 * @param {object} formData formData
 */
export async function upload(formData) {
    let isOk
    const token = await OauthApi.getAccessToken()
    if (token.error) {
        return token
    }
    formData.append('access_token', token.access_token)
    return new Promise((resolve, reject) => {
        fetch(config.BASE_URL + '/api/v1/file/upload', {
                method: 'POST',
                body: formData
            }).then((response) => {
                if (response.ok) {
                    isOk = true
                } else {
                    isOk = false
                }
                return response.json()
            })
            .then((responseData) => {
                if (isOk) {
                    resolve(responseData)
                } else {
                    reject(responseData)
                }
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export async function uploadNoToken(formData) {
    let isOk
    return new Promise((resolve, reject) => {
        fetch(config.BASE_URL + '/api/v1/file/upload', {
                method: 'POST',
                body: formData
            }).then((response) => {
                if (response.ok) {
                    isOk = true
                } else {
                    isOk = false
                }
                return response.json()
            })
            .then((responseData) => {
                if (isOk) {
                    resolve(responseData)
                } else {
                    reject(responseData)
                }
            })
            .catch((error) => {
                reject(error)
            })
    })
}
