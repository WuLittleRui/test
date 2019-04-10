import * as config from '../utils/config'
import * as OauthApi from './OauthApi'

/**
 * 
 * @author jiangxudong
 * @description 店铺管理_支付方式
 */



/**
 * 初始化支付信息
 */
export async function getPayList(page, pageSize, sort) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/pay_type/list', {
            page: page,
            pageSize: pageSize,
            sort: sort
        });
    } catch (error) {
        return error
    }
}

/**
 * 根据支付id查询相应信息
 */
export async function getOnePay(payTypeId) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/pay_type/byId', {
            pay_type_id: payTypeId
        });
    } catch (error) {
        return error
    }
}

/**
 * 编辑提交事件方法
 */
export async function updatePayType(pay_type_id, pay_type_name) {
    try {

        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/pay_type/update', {
            pay_type_id: pay_type_id,
            pay_type_name: pay_type_name
        });

    } catch (error) {
        return error
    }
}


/**
 * 删除信息
 */
export async function deletePayType(pay_type_id) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/pay_type/delete', {
            pay_type_id: pay_type_id
        });
    } catch (error) {
        return error
    }
}

/**
 * 新增的提交事件方法
 */
export async function addPayType(pay_type_name) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/pay_type/add', {
            pay_type_name: pay_type_name
        });
    } catch (error) {
        return error
    }
}

/**
 * @author wurui
 * @description 获取所有的支付方式
 */
export async function getAll(mid) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/pay_type/get/all', { mid: mid });
    } catch (error) {
        return error
    }
}