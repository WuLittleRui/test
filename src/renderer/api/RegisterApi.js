import * as config from '../utils/config'
import * as OauthApi from './OauthApi'

export async function register(hosptial_name, username, password, mobile, address, remark, license_list, docter_list, aptitude_list, detail_list) {
    try {
        return await OauthApi.postWithClient(config.BASE_URL + '/api/v1/hospital/register', { 
            hosptial_name: hosptial_name, 
            username: username, 
            password: password, 
            mobile: mobile, 
            address: address,
            remark: remark,
            license_list: license_list,
            docter_list: docter_list,
            aptitude_list: aptitude_list,
            detail_list: detail_list
         });
    } catch (error) {
        return error
    } 
}

export async function getVerfityCode(mobile) {
    try {
        return await OauthApi.postWithClient(config.BASE_URL + '/api/v1/code/send/SMS', { 
            code_type: "REGISTER",
            mobile: mobile
         });
    } catch (error) {
        return error
    }
}

export async function verVerfityCode(mobile, code) {
    try {
        return await OauthApi.postWithClient(config.BASE_URL + '/api/v1/code/vertify/code', { 
            code_type: "REGISTER",
            mobile: mobile,
            verify_code: code
         });
    } catch (error) {
        return error
    }
}
