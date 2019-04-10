import * as config from '../utils/config'
import * as OauthApi from './OauthApi'

/***
 * @author wurui
 * @description 获取当前用户管理菜单
 */
export async function getMenu() {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/role/menu');
    } catch (error) {
        return error
    }
}

export async function getProgramList() {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/role/menu/list');
    } catch (error) {
        return error
    }
}
