import * as config from '../utils/config'
import * as OauthApi from './OauthApi'

/**
 * 
 * @author zxh
 * @description  
 *
 */
export async function listStock(page, pageSize, sort, key, type) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospitalstorecheck/list', { page: page, pageSize: pageSize, sort: sort, name: key, materials_type: type })
    } catch (error) {
        return error
    }
}
/**
 * 获取所有物料
 */
export async function listStockAll() {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospitalstorecheck/list/all');
    } catch (error) {
        return error
    }
}
/**
 * @author zxh
 * @description 调整库存
 * @param {*} json [{"inventory_id": 1, "number": 1}]
 * @param {*} operate_type 
 * @param {*} order_sn 
 * @param {*} remark 
 */
export async function adjustquality(json, type) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospitalstorecheck/add', { json: json, type: type });
    } catch (error) {
        return error
    }
}
/**
 * @author zxh
 * @description 根据序号获取
 * @param {*} inventory_id 
 */
export async function getStoreLogDetail(inventory_id) {
    try {
        return await OauthApi.getWithClient(config.BASE_URL + '/api/v1/hospitalstorecheck/' + inventory_id);
    } catch (error) {
        return error
    }
}