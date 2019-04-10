import * as config from '../utils/config'
import * as OauthApi from './OauthApi'

export async function list(page, pageSize) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/short/list', { page: page, pageSize: pageSize });
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
