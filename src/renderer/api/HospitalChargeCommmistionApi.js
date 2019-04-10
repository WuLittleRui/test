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
export async function getPayList(page, pageSize, group_id, type_id, key) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospitalchargecommission/getlist', {
            page: page,
            pageSize: pageSize,
            group_id: group_id,
            type_id: type_id,
            name: key,
        });
    } catch (error) {
        return error
    }
}



/**
 * 根据支付id查询相应信息
 */
export async function getOnePay(charge_id, group_id) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospitalchargecommission/byId', {
            charge_id: charge_id,
            group_id: group_id
        });
    } catch (error) {
        return error
    }
}

/**
 * 编辑提交事件方法
 */
export async function update(charge_id, group_id, type, commission_value) {
    try {

        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospitalchargecommission/update', {
            charge_id: charge_id,
            commission_value: commission_value,
            type: type,

            group_id: group_id,


        });

    } catch (error) {
        return error
    }
}


/**
 * 删除信息
 */
export async function deletes(charge_id, group_id) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospitalchargecommission/delete', {
            charge_id: charge_id,
            group_id: group_id
        });
    } catch (error) {
        return error
    }
}

/**
 * 新增的提交事件方法
 */
export async function add(charge_id, group_id, type, commission_value) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospitalchargecommission/add', {
            charge_id: charge_id,
            commission_value: commission_value,
            type: type,

            group_id: group_id,

        });
    } catch (error) {
        return error
    }
}