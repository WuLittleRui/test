import * as config from '../utils/config'
import * as OauthApi from './OauthApi'

export async function payList(page, pageSize, case_number, mobile) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/cashier/pay/list', {
            case_number: case_number,
            page: page,
            pageSize: pageSize,
            mobile: mobile
        });
    } catch (error) {
        return error;


    }
}
