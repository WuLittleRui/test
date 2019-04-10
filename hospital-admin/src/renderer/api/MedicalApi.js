import * as config from '../utils/config'
import * as OauthApi from './OauthApi'

/**
 * @author wurui
 * @description 获取
 
 */

export async function list(page, pageSize, sort, key) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/prescription/list', {
            page: page,
            pageSize: pageSize,
            sort: sort,
            title: key
        });
    } catch (error) {
        return error;


    }
}



/**
 * @author wurui
 * @description 
 * @param {*} aid 
 */
export async function byId(prescription_id) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/prescription/' + prescription_id);
    } catch (error) {
        return error
    }
}

/**
 * @author wurui
 * @description 添加广告
 * @param {*} title 
 
 */
export async function add(title, spec, unit, unit_price, remark) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/prescription/add', { title: title, spec: spec, unit: unit, unit_price: unit_price, remark: remark });
    } catch (error) {
        return error
    }
}

/**
 * @author wurui
 * @description 修改广告
 * @param {*} aid 
 * @param {*} title 
 
 */
export async function edit(prescription_id, title, spec, unit, unit_price, remark) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/prescription/edit', { prescription_id: prescription_id, title: title, spec: spec, unit: unit, unit_price: unit_price, remark: remark });
    } catch (error) {
        return error
    }
}

/**
 * @author wurui
 * @description 删除广告
 * @param {*} aid 
 */
export async function deleteSelect(prescription_ids) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/prescription/delete', { prescription_ids: prescription_ids });
    } catch (error) {
        return error
    }
}

export async function listAll(title) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/prescription/get/all', { title: title });
    } catch (error) {
        return error
    }
}

