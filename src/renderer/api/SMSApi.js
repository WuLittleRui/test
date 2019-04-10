import * as config from '../utils/config'
import * as OauthApi from './OauthApi'

export async function Balancelist(page, pageSize) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/sms/list', { page: page, pageSize: pageSize });
    } catch (error) {
        return error
    }
}
