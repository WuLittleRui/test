import * as config from '../utils/config'
import * as OauthApi from './OauthApi'
/**
 * @author zxh
 * @description 导出excel
 */
export async function exportExcel(type) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hodpitalstorelogdetail/exportExcel', { seq_flag: type })
    } catch (error) {
        return error
    }
}
/**
 * 
 * @author zxh
 * @description 获取出账库存记录
 * @param {*} start_date 
 * @param {*} end_date 
 * @param {*} key 
 * @param {*} page 
 * @param {*} pageSize 
 * @param {*} sort 
 */
export async function listOutMaterialsLogApi(type, key, page, pageSize, sort, start_time, end_time) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hodpitalstorelogdetail/list', { type: type, key: key, page: page, pageSize: pageSize, sort: sort, start_time: start_time, end_time: end_time });
    } catch (error) {
        return error
    }
}