import * as config from '../utils/config'
import * as OauthApi from './OauthApi'

export async function list(page, pageSize, add_time) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/class/list', { page: page, pageSize: pageSize, add_time: add_time });
    } catch (error) {
        return error
    }
}

export async function getTime(employee_id, date) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/class/time', { employee_id: employee_id, date: date });
    } catch (error) {
        return error
    }
}

export async function postTime(employee_id, work_date, date) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/class/edit', { employee_id: employee_id, date: date, work_date: work_date });
    } catch (error) {
        return error
    }
}
