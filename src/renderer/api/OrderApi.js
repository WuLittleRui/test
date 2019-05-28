import * as config from '../utils/config'
import * as OauthApi from './OauthApi'

export async function listOrder(page, pageSize, sort, date, order_type, docter_id) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/order/list', {
            page: page,
            pageSize: pageSize,
            sort: sort,
            date: date,
            order_type: order_type,
            docter_id: docter_id
        });
    } catch (error) {
        return error;
    } 
}

export async function getCase(mobile) {
    try { 
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/order/getCase', {
            mobile: mobile
        });
    } catch (error) {
        return error;
    } 
}

export async function getTime(employee_id, date) {
    try { 
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/order/getTime', {
            employee_id: employee_id,
            date: date
        });
    } catch (error) {
        return error;
    } 
}

export async function addOrder(mobile, case_number, employee_id, date, start_time, end_time, content, member_remark, type, name) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/order/add/mobile', { 
            case_number: case_number, 
            employee_id: employee_id,
            start_time: start_time,
            end_time: end_time,
            content: content,
            mobile: mobile,
            type: type,
            date: date,
            member_remark: member_remark,
            name: name
        });
    } catch (error) {
        return error
    }
}
