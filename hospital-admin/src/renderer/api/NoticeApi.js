import * as config from '../utils/config'
import * as OauthApi from './OauthApi'

/**
 * @author wurui
 * @description 获取广告列表
 
 */

export async function listAd(page, pageSize, sort, key) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospitalnotice/list', {
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
 * @description 根据序号获取广告
 * @param {*} aid 
 */
export async function byId(notice_id) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospitalnotice/get', { notice_id: notice_id });
    } catch (error) {
        return error
    }
}

/**
 * @author wurui
 * @description 添加广告
 * @param {*} title 
 
 */
export async function add(title, content) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospitalnotice/add', { title: title, content: content });
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
export async function edit(notice_id, title, content) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospitalnotice/edit', {
            notice_id: notice_id,
            title: title,
            content: content
        });
    } catch (error) {
        return error
    }
}

/**
 * @author wurui
 * @description 删除广告
 * @param {*} aid 
 */
export async function deleteAd(notice_id) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospitalnotice/delete', { notice_id: notice_id });
    } catch (error) {
        return error
    }
}