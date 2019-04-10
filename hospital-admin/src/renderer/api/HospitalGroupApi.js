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
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospitalgroup/list', {
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
export async function getShoupGroupModel(groupId) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospitalgroup/' + groupId);
    } catch (error) {
        return error
    }
}

/**
 * 编辑提交按钮
 */
export async function updateShopGroup(groupId, groupName, type) {
    try {

        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospitalgroup/update', {
            groupId: groupId,
            groupName: groupName.trim(),
            type: type
        });
    } catch (error) {
        return error
    }
}

/**
 * 删除方法
 * @param {*} groupId 
 */
export async function deleteShopGroup(groupId) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospitalgroup/delete', {
            groupId: groupId
        });
    } catch (error) {
        return error
    }
}


/**
 * 
 *新增信息
 */
export async function addShopGroup(groupName, type) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospitalgroup/add', {
            groupName: groupName.trim(),
            type: type,
        });
    } catch (error) {
        return error
    }
}