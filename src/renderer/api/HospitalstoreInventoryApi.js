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
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospitalstoreinventory/list', { page: page, pageSize: pageSize, sort: sort, name: key, materials_type: type })
    } catch (error) {
        return error
    }
}
/**
 * 获取所有物料
 */
export async function listStockAll() {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospitalstoreinventory/list/all');
    } catch (error) {
        return error
    }
}
/**
 * @author zxh
 * @description 根据序号获取
 * @param {*} inventory_id 
 */
export async function getMaterialsInventory(inventory_id) {
    try {
        return await OauthApi.getWithClient(config.BASE_URL + '/api/v1/hospitalstoreinventory/' + inventory_id);
    } catch (error) {
        return error
    }
}
/**
 * @author zxh
 * @description 编辑成本价
 * @param {*} inventory_id 
 * @param {*} purchase_price 
 * @param {*} warning_quantity 
 */
export async function editPurchasePrice(mp_id, purchase_price, warning_quantity, materials_type) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospitalstoreinventory/edit/price', { mp_id: mp_id, purchase_price: purchase_price, warning_quantity: warning_quantity, materials_type: materials_type });
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
export async function adjustStock(json, operate_type, order_sn, remark) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospitalstoreinventory/operate/number', { json: json, operate_type: operate_type, order_sn: order_sn, remark: remark });
    } catch (error) {
        return error
    }
}
/**
 * @author zxh
 * 
 * @description 导出excel
 */
export async function exportExcel() {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospitalstoreinventory/exportExcel')
    } catch (error) {
        return error
    }
}