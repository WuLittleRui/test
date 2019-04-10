import * as config from '../utils/config'
import * as OauthApi from './OauthApi'

export async function getProgramList() {
    return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/program/tree');
}