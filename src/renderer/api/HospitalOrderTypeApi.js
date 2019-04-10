import * as config from '../utils/config'
import * as OauthApi from './OauthApi'

/**
 * 
 * @author  
 * @description 店铺管理_支付方式
 */



/**
 * 初始化支付信息
 */
export async function getPayList(page, pageSize, sort) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospitalordertype/list', {
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
export async function getOnePay(type_id) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospitalordertype/byId', {
            type_id: type_id
        });
    } catch (error) {
        return error
    }
}

/**
 * 编辑提交事件方法
 */
export async function updatePayType(type_id, name) {
    try {

        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospitalordertype/update', {
            type_id: type_id,
            name: name
        });

    } catch (error) {
        return error
    }
}


/**
 * 删除信息
 */
export async function deletePayType(type_id) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospitalordertype/delete', {
            type_id: type_id
        });
    } catch (error) {
        return error
    }
}

/**
 * 新增的提交事件方法
 */
export async function addPayType(name) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospitalordertype/add', {
            name: name
        });
    } catch (error) {
        return error
    }
}

/**
 * @author wurui
 * @description 获取所有的支付方式
 */
export async function getAll() {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospitalordertype/get/all');
    } catch (error) {
        return error
    }
}