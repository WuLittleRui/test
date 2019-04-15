import * as config from '../utils/config'
import * as OauthApi from './OauthApi'
/**
 * 新增 
 */
export async function add(pro_json) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospitalpuchase/add', {
            pro_json: pro_json
        });
    } catch (error) {
        return error
    }
}
/**
 * 新增 
 */
export async function list(page, pageSize, start_time, end_time) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospitalpuchase/list', {
            page: page,
            pageSize: pageSize,
            start_time: start_time,
            end_time: end_time
        });
    } catch (error) {
        return error
    }
}
/**
 * 查找
 */
export async function byId(purchase_id) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospitalpuchase/byId', {
            purchase_id: purchase_id
        });
    } catch (error) {
        return error
    }
}
/**
 * 删除
 */
export async function del(purchase_id) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospitalpuchase/delete', {
            purchase_id: purchase_id
        });
    } catch (error) {
        return error
    }
}