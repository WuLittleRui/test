import * as config from '../utils/config'
import * as OauthApi from './OauthApi'


/***
 * @author Jian
 * @description 获取当前店家管理员列表
 * @param key 搜索关键字
 * 
 */
export async function list(page, pageSize) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/template/list', { page: page, pageSize: pageSize });
    } catch (error) {
        return error
    }
}

export async function deleteTemp(template_id) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/template/delete', { template_id: template_id });
    } catch (error) {
        return error
    }
}

export async function getTemp(template_id) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/template/get', { template_id: template_id });
    } catch (error) {
        return error
    }
}

export async function editTemp(template_id, title, content, type) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/template/edit', { title: title, type: type, template_id: template_id, content: content });
    } catch (error) {
        return error
    }
}


export async function addTemp(title, content, type) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/template/add', { title: title, type: type, content: content });
    } catch (error) {
        return error
    }
}