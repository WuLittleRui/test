import * as config from '../utils/config'
import * as OauthApi from './OauthApi'

export async function listOrder(page, pageSize, sort, date, order_type) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/order/list', {
            page: page,
            pageSize: pageSize,
            sort: sort,
            date: date,
            order_type: order_type
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

export async function addOrder(mobile, case_number, employee_id, start_time, end_time, content, member_remark, type) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/order/add/mobile', { 
            case_number: case_number, 
            employee_id: employee_id,
            start_time: start_time,
            end_time: end_time,
            content: content,
            mobile: mobile,
            type: type,
            member_remark: member_remark
        });
    } catch (error) {
        return error
    }
}
