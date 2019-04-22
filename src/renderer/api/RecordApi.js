import * as config from '../utils/config'
import * as OauthApi from './OauthApi'


/**
 * 客户统计
 */
export async function getMenber() {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/record/case');
    } catch (error) {
        return error
    }
}
/**
 * 客户统计来源
 */
export async function getOrgin() {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/record/origin');
    } catch (error) {
        return error
    }
}

/**
 * 销售统计
 */
export async function getShopSale(type, start_time, end_time) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/record/sale', { type: type, start_time: start_time, end_time: end_time });
    } catch (error) {
        return error
    }
}
/**
 * 销售增长统计
 */
export async function getShopSaleGrowth() {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/record/sale/growth');
    } catch (error) {
        return error
    }
}
/**
 * 项目排行
 */
export async function getShopSaleSort(page, pageSize, sort, start, end) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/record/sale/rank', {
            page: page,
            pageSize: pageSize,
            sort: sort,
            start_time: start,
            end_time: end
        });
    } catch (error) {
        return error
    }
}

/**
 * 二次消费统计
 */
export async function getAgain() {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/record/memberagin');
    } catch (error) {
        return error
    }
}