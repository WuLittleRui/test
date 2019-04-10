import * as config from '../utils/config'
import * as OauthApi from './OauthApi'

export async function currency() {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/record/currency');
    } catch (error) {
        return error;


    }
}

export async function currencyDetail() {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/record/currency/detail');
    } catch (error) {
        return error;
    }
}