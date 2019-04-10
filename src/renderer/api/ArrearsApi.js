import * as config from '../utils/config'
import * as OauthApi from './OauthApi'

export async function list(page, pageSize, sort, mobile, case_number) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/arrear/list', {
            page: page,
            pageSize: pageSize,
            sort: sort,
            mobile: mobile,
            case_number: case_number
        });
    } catch (error) {
        return error;


    }
}

export async function receive(page, pageSize, start_time, end_time, mobile, case_number) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/arrear/receive', {
            page: page,
            pageSize: pageSize,
            start_time: start_time,
            end_time: end_time,
            mobile: mobile,
            case_number: case_number
        });
    } catch (error) {
        return error;


    }
}

export async function royalty(page, pageSize, start_time, end_time, mobile) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/arrear/royalty', {
            page: page,
            pageSize: pageSize,
            start_time: start_time,
            end_time: end_time,
            mobile: mobile
        });
    } catch (error) {
        return error;


    }
}

