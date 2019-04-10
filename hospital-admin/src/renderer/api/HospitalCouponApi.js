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
export async function list(page, pageSize, sort, searchKey, start_time, end_time) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/coupon/list', {
            page: page,
            pageSize: pageSize,
            sort: sort,
            key: searchKey,
            start_time: start_time,
            end_time: end_time
        });
    } catch (error) {
        return error
    }
}

/**
 * 根据支付id查询相应信息
 */
export async function byId(coupon_id) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/coupon/byId', {
            coupon_id: coupon_id
        });
    } catch (error) {
        return error
    }
}

/**
 * 编辑提交事件方法
 */
export async function update(coupon_id, title, end_time, start_time, number_days, quantity, charge_id, withdraw_everyday, number_collections, limit_price, discount, type, pid, typeProduct) {
    try {

        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/coupon/update', {
            title: title,
            end_time: end_time,
            start_time: start_time,
            number_days: number_days,
            quantity: quantity,
            charge_id: charge_id,
            withdraw_everyday: withdraw_everyday,
            number_collections: number_collections,
            limit_price: limit_price,
            type: type,
            coupon_id: coupon_id,
            discount: discount,
            pid: pid,
            typeProduct: typeProduct
        });

    } catch (error) {
        return error
    }
}


/**
 * 删除信息
 */
export async function deletes(coupon_id) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/coupon/delete', {
            coupon_id: coupon_id
        });
    } catch (error) {
        return error
    }
}

/**
 * 新增的提交事件方法
 */
export async function add(title, end_time, start_time, number_days, quantity, charge_id, withdraw_everyday, number_collections, limit_price, discount, type, pid, typeProduct) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/coupon/add', {
            title: title,
            end_time: end_time,
            start_time: start_time,
            number_days: number_days,
            quantity: quantity,
            charge_id: charge_id,
            withdraw_everyday: withdraw_everyday,
            number_collections: number_collections,
            limit_price: limit_price,
            type: type,
            discount: discount,
            pid: pid,
            typeProduct: typeProduct
        });
    } catch (error) {
        return error
    }
}