import * as config from '../utils/config'
import * as OauthApi from './OauthApi'

export async function list(page, pageSize, level_id, start_amount, end_amount) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/short/list', { page: page, pageSize: pageSize, level_id: level_id, start_amount: start_amount, end_amount: end_amount });
    } catch (error) {
        return error
    }
}

export async function templateList() {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/short/template');
    } catch (error) {
        return error
    }
}

export async function sendTemplate(template_id, user, params) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/short/send', { template_id: template_id, user: user, params });
    } catch (error) {
        return error
    }
}

export async function level() {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/short/level');
    } catch (error) {
        return error
    }
}

export async function status(orderSn) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/short/status', { buy_id: orderSn});
    } catch (error) {
        return error
    }
}
