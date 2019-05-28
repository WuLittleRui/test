import * as config from '../utils/config'
import * as OauthApi from './OauthApi'

export async function getVerfityCode(username, hospital_name) {
    try {
        return await OauthApi.postWithClient(config.BASE_URL + '/reset/send/SMS', { 
            code_type: "RESET",
            username: username,
            hospital_name: hospital_name
         });
    } catch (error) {
        return error
    }
}

export async function resetPassword(username, hospital_name, code, password) {
    try {
        return await OauthApi.postWithClient(config.BASE_URL + '/reset/password', { 
            code_type: "RESET",
            username: username,
            code: code,
            password: password,
            hospital_name: hospital_name
         });
    } catch (error) {
        return error
    }
}
