import * as config from '../utils/config'
import * as OauthApi from './OauthApi'


/**
 * 
 * @author jiangxudong
 * @description 店铺管理_部门管理
 */



/**
 * 初始化信息
 */
export async function getShopGroupList(page, pageSize, sort) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospitalleveldiscount/list', {
            page: page,
            pageSize: pageSize,
            sort: sort
        });
    } catch (error) {
        return error
    }
}

/**
 * 根据id查询信息
 * @param {*} groupId 
 */
export async function getShoupGroupModel(level_id) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospitalleveldiscount/' + level_id);
    } catch (error) {
        return error
    }
}
/**
 * 根据id查询信息
 * @param {*} groupId 
 */
export async function MemberLevel() {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospitalleveldiscount/Level');
    } catch (error) {
        return error
    }
}
export async function getLevel(level_id) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospitalleveldiscount/get', { level_id });
    } catch (error) {
        return error
    }
}

/**
 * 编辑提交按钮
 */
export async function updateShopGroup(form) {
    try {

        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospitalleveldiscount/update', {
            product_discount: form.product_discount,
            package_discount: form.package_discount,
            level_name: form.level_name,
            level_id: form.level_id,
        });
    } catch (error) {
        return error
    }
}

/**
 * 删除方法
 * @param {*} groupId 
 */
export async function deleteShopGroup(level_id) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospitalleveldiscount/delete', {
            level_id: level_id
        });
    } catch (error) {
        return error
    }
}


/**
 * 
 *新增信息
 */
export async function addShopGroup(form) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospitalleveldiscount/add', {
            product_discount: form.product_discount,
            package_discount: form.package_discount,
            level_name: form.level_name,
            level_id: form.level_id,

        });
    } catch (error) {
        return error
    }
}