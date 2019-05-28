import * as config from '../utils/config'
import * as OauthApi from './OauthApi'

export async function list(page, pageSize, sort, mobile, case_number) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/member/currency/list', {
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

export async function get(mid) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/member/currency/get', {
            mid: mid
        });
    } catch (error) {
        return error;


    }
}

export async function add(mobile, balance, operator, remark, type) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/member/currency/add', {
            mobile: mobile,
            balance: balance,
            operator: operator,
            remark: remark,
            type: type
        });
    } catch (error) {
        return error;


    }
}

export async function adjust(mid, balance, operator, remark, seq_flag, type) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/member/currency/adjust', {
            mid: mid,
            balance: balance,
            operator: operator,
            remark: remark, 
            seq_flag: seq_flag,
            type: type
        });
    } catch (error) {
        return error;


    }
}

export async function detail(mid, page, pageSize, sort, start_time, end_time, seq_flag, type) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/member/currency/detail', {
            mid: mid,
            page: page,
            pageSize: pageSize,
            sort: sort,
            start_time: start_time,
            end_time: end_time,
            seq_flag: seq_flag,
            type: type
        });
    } catch (error) {
        return error;


    }
}