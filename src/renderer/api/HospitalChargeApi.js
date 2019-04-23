import * as config from '../utils/config'
import * as OauthApi from './OauthApi'

/**
 * 
 * @author  
 * @description 优惠券
 */ 



/**
 * 初始化支付信息
 */
export async function list(charge_id) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospitalcharge/list', {
            charge_id: charge_id

        });
    } catch (error) {
        return error
    }
}
/**
 * 初始化支付信息
 */
export async function getPayList(page, pageSize, key, type_id) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospitalcharge/getlist', {
            page: page,
            pageSize: pageSize,

            name: key,
            type_id: type_id
        });
    } catch (error) {
        return error
    }
}

/**
 * 初始化支付信息
 */
export async function getAllList(type_id, name) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospitalcharge/get/all', {
            type_id: type_id,
            name: name
        });
    } catch (error) {
        return error
    }
}

/**
 * 根据支付id查询相应信息
 */
export async function getOnePay(charge_id) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospitalcharge/byId', {
            charge_id: charge_id
        });
    } catch (error) {
        return error
    }
}

/**
 * 编辑提交事件方法
 */
export async function updatePayType(charge_id, name, unit, unit_price, type_id, remark, is_discount) {
    try {

        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospitalcharge/update', {
            charge_id: charge_id,
            name: name,
            unit: unit,
            unit_price: unit_price,
            type_id: type_id,
            remark: remark,
            is_discount: is_discount
        });

    } catch (error) {
        return error
    }
}


/**
 * 删除信息
 */
export async function deletePayType(charge_id) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospitalcharge/delete', {
            charge_id: charge_id
        });
    } catch (error) {
        return error
    }
}

/**
 * 新增的提交事件方法
 */
export async function addPayType(name, unit, unit_price, type_id, remark, is_discount) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospitalcharge/add', {
            name: name,
            unit: unit,
            unit_price: unit_price,
            type_id: type_id,
            remark: remark,
            is_discount: is_discount
        });
    } catch (error) {
        return error
    }
}