import * as config from '../utils/config'
import * as OauthApi from './OauthApi'

/**
 * 
 * @author  
 * @description 商品
 */



/**
 * 初始化支付信息
 */
export async function list(pid) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/product/list', {
            pid: pid
        });
    } catch (error) {
        return error
    }
}

export async function prescriptionList(key) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/prescription/all', {title: key});
    } catch (error) {
        return error
    }
}

// 获取商品列表
export async function getGoodList(listquery) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/product/getlist', {
            page: listquery.page,
            pageSize: listquery.limit,
            product_name: listquery.title,
            show_status: listquery.state,
            category_name: listquery.category_name,
            to_type: listquery.to_type,
            packaged: listquery.packaged
        });
    } catch (error) {
        return error
    }
}

/**
 * 获取所有的商品分类  不分页
 */
export async function getCategoryList() {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/product/catelist');
    } catch (error) {
        return error

    }
}