import * as config from '../utils/config'
import * as OauthApi from './OauthApi'


/***
 * @author Jian
 * @description 获取管理员操作记录
 * @param key 搜索关键字
 * 
 */
export async function listShopAdminLog(start_date, end_date, key, page, pageSize, sort) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/admin_log/list', { key: key, start_date: start_date, end_date: end_date, page: page, pageSize: pageSize, sort: sort });
    } catch (error) {
        return error
    }
}
export async function deleteShopAdminLog(logIds) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/admin_log/delete', { logIds: logIds });
    } catch (error) {
        return error
    }
}