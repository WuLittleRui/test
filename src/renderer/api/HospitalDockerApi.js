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
export async function list() {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospitaldocker/list');
    } catch (error) {
        return error
    }
}
/**
 * 初始化支付信息
 */
export async function getPayList(page, pageSize, key) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospitaldocker/getlist', {
            page: page,
            pageSize: pageSize,
            mobile: key,

        });
    } catch (error) {
        return error
    }
}

/**
 * 根据支付id查询相应信息
 */
export async function getOnePay(employee_id) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospitaldocker/byId', {
            employee_id: employee_id
        });
    } catch (error) {
        return error
    }
}

/**
 * 编辑提交事件方法
 */
export async function updatePayType(employee_id, face, mobile, sex, description, recommend, score, certified) {
    try {

        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospitaldocker/update', {
            employee_id: employee_id,
            face: face,
            mobile: mobile,
            sex: sex,
            description: description,
            recommend: recommend,
            score: score,
            certified: certified
        });

    } catch (error) {
        return error
    }
}


/**
 * 删除信息
 */
export async function deletePayType(employee_id) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospitaldocker/delete', {
            employee_id: employee_id
        });
    } catch (error) {
        return error
    }
}

/**
 * 新增的提交事件方法
 */
export async function addPayType(employee_id, face, mobile, sex, description, recommend, score, certified) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospitaldocker/add', {
            employee_id: employee_id,
            face: face,
            mobile: mobile,
            sex: sex,
            description: description,
            recommend: recommend,
            score: score,
            certified: certified
        });
    } catch (error) {
        return error
    }
}