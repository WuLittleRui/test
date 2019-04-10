import * as config from '../utils/config'
import * as OauthApi from './OauthApi'


/***
 * @author Jian
 * @description 获取当前店家管理员列表
 * @param key 搜索关键字
 * 
 */
export async function listShopAdmin(key, state, page, pageSize, sort) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/admin/list', { key: key, state: state, page: page, pageSize: pageSize, sort: sort });
    } catch (error) {
        return error
    }
}

export async function deleteShopAdmin(adminIds) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/admin/delete', { adminIds: adminIds });
    } catch (error) {
        return error
    }
}

export async function getShopAdmin(adminId) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/admin/' + adminId);
    } catch (error) {
        return error
    }
}

export async function editShopAdmin(adminId, mobile, programs) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/admin/edit', { adminId: adminId, mobile: mobile, programs: programs });
    } catch (error) {
        return error
    }
}


export async function addShopAdmin(username, password, mobile, programs) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/admin/add', { username: username, password: password, mobile: mobile, programs: programs });
    } catch (error) {
        return error
    }
}

export async function resetPassword(adminId, password) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/admin/reset_password', { adminId: adminId, password: password });
    } catch (error) {
        return error
    }
}

export async function changePassword(old_password, new_password) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/admin/change_password', { old_password: old_password, new_password: new_password });
    } catch (error) {
        return error
    }
}