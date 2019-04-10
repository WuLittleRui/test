import * as config from '../utils/config'
import * as OauthApi from './OauthApi'

/**
 *  
 * @author zxh
 * @description 获取入账库存记录
 * @param {*} start_date 
 * @param {*} end_date 
 * @param {*} key 
 * @param {*} page 
 * @param {*} pageSize 
 * @param {*} sort 
 */
export async function listInMaterialsLogApi(key, page, pageSize, sort, start_time, end_time) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/materialsLog/list', { type: 1, key: key, page: page, pageSize: pageSize, sort: sort, start_time: start_time, end_time: end_time });
    } catch (error) {
        return error
    }
}

/**
 * 
 * @author zxh
 * @description 获取出账库存记录
 * @param {*} start_date 
 * @param {*} end_date 
 * @param {*} key 
 * @param {*} page 
 * @param {*} pageSize 
 * @param {*} sort 
 */
export async function listOutMaterialsLogApi(key, page, pageSize, sort, start_time, end_time) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/materialsLog/list', { type: 0, key: key, page: page, pageSize: pageSize, sort: sort, start_time: start_time, end_time: end_time });
    } catch (error) {
        return error
    }
}

/**
 * @author zxh
 * @description 获取物料列表
 * @param {*} key 
 * @param {*} page 
 * @param {*} pageSize 
 * @param {*} sort 
 */
export async function listMaterials(key, page, pageSize, sort) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/storeproject/list', {
            key: key,
            page: page,
            pageSize: pageSize,
            sort: sort
        });
    } catch (error) {
        return error
    }
}

/**
 * 获取所有物料
 */
export async function listStockAll() {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/stock/list/all');
    } catch (error) {
        return error
    }
}

/**
 * @author zxh
 * @description 添加物料
 * @param {*} materials_name 
 * @param {*} unit 
 * @param {*} standard 
 * @param {*} description 
 */
export async function addMaterials(project_name, unit, standard, description) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/storeproject/add', { project_name: project_name, unit: unit, standard: standard, description: description });
    } catch (error) {
        return error
    }
}

/**
 * @author zxh
 * @description 修改物料
 * @param {*} project_id 
 * @param {*} materials_name 
 * @param {*} unit 
 * @param {*} standard 
 * @param {*} description 
 */
export async function editMaterials(project_id, project_name, unit, standard, description) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/storeproject/edit', { project_id: project_id, project_name: project_name, unit: unit, standard: standard, description: description });
    } catch (error) {
        return error
    }
}

/**
 * @author zxh
 * @description 删除物料
 * @param {*} materials_id
 */
export async function deleteMaterials(project_id) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/storeproject/delete', { project_id: project_id });
    } catch (error) {
        return error
    }
}

/**
 * @author zxh
 * @description 根据物料序号获取物料
 * @param {*} materials_id
 */
export async function getMaterials(project_id) {
    try {
        return await OauthApi.getWithClient(config.BASE_URL + '/api/v1/storeproject/' + project_id);
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
        return await OauthApi.getWithClient(config.BASE_URL + '/api/v1/stock/' + inventory_id);
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
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/stock/edit/price', { mp_id: mp_id, purchase_price: purchase_price, warning_quantity: warning_quantity, materials_type: materials_type });
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
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/stock/operate/number', { json: json, operate_type: operate_type, order_sn: order_sn, remark: remark });
    } catch (error) {
        return error
    }
}

/**
 * @author zxh
 * @description 导出excel
 */
export async function exportExcel(type) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/materialsLog/exportExcel', { seq_flag: type })
    } catch (error) {
        return error
    }
}