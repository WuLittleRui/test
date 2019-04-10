import * as config from '../utils/config'
import * as OauthApi from './OauthApi'


/***
 * 
 * 
 */
export async function list() {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospital/list');
    } catch (error) {
        return error
    }
}