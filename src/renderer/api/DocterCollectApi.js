import * as config from '../utils/config'
import * as OauthApi from './OauthApi'

export async function list(page, pageSize, sort, docter_mobile, docter_name, start_time, end_time) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/doctercollect/list', {
            page: page,
            pageSize: pageSize,
            sort: sort,
            docter_mobile: docter_mobile,
            docter_name: docter_name,
            start_time: start_time,
            end_time: end_time
        });
    } catch (error) {
        return error;


    }
}

export async function all(page, pageSize, sort, docter_mobile, docter_name, start_time, end_time) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/doctercollect/all', {
            page: page,
            pageSize: pageSize,
            sort: sort,
            docter_mobile: docter_mobile,
            docter_name: docter_name,
            start_time: start_time,
            end_time: end_time
        });
    } catch (error) {
        return error;


    }
}
