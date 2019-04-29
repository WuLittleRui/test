import * as config from '../utils/config'
import * as OauthApi from './OauthApi'

export async function getVerfityCode(mobile) {
    try {
        return await OauthApi.postWithClient(config.BASE_URL + '/api/v1/code/send/SMS', { 
            code_type: "PERSON",
            mobile: mobile
         });
    } catch (error) {
        return error
    }
}

export async function verfityCode(mobile, code) {
    try {
        return await OauthApi.getWithClient(config.BASE_URL + '/api/v1/person/code', { 
            verify_code: code,
            mobile: mobile
         });
    } catch (error) {
        return error
    }
}

export async function getCase(code) {
    try {
        return await OauthApi.getWithClient(config.BASE_URL + '/api/v1/person/case', { 
            code: code
         });
    } catch (error) {
        return error
    }
}

export async function getHandle(code, start_time, end_time) {
    try {
        return await OauthApi.getWithClient(config.BASE_URL + '/api/v1/person/handle', { 
            code: code,
            start_time: start_time,
            end_time: end_time
         });
    } catch (error) {
        return error
    }
}

export async function getCashier(code, page, pageSize) {
    try {
        return await OauthApi.getWithClient(config.BASE_URL + '/api/v1/person/cashier', { 
            code: code,
            page: page,
            pageSize: pageSize
         });
    } catch (error) {
        return error
    }
}
