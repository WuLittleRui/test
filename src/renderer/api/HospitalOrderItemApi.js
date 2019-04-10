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
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospitalorderitem/list', {
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
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospitalorderitem/getlist', {
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
 * 根据支付id查询相应信息
 */
export async function getOnePay(item_id) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospitalorderitem/byId', {
            item_id: item_id
        });
    } catch (error) {
        return error
    }
}

/**
 * 编辑提交事件方法
 */
export async function updatePayType(item_id, name, type_id, remark, images) {
    try {

        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospitalorderitem/update', {
            item_id: item_id,
            name: name,
            remark: remark,
            images: images,
            type_id: type_id,


        });

    } catch (error) {
        return error
    }
}


/**
 * 删除信息
 */
export async function deletePayType(item_id) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospitalorderitem/delete', {
            item_id: item_id
        });
    } catch (error) {
        return error
    }
}

/**
 * 新增的提交事件方法
 */
export async function addPayType(name, type_id, remark, images) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospitalorderitem/add', {
            name: name,
            type_id: type_id,
            remark: remark,
            images: images
        });
    } catch (error) {
        return error
    }
}