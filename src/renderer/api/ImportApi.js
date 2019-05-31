import * as config from '../utils/config'
import * as OauthApi from './OauthApi'

export async function importFile(filePath, type) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/import/patient', { 
            filePath: filePath,
            upload_type: type
          });
    } catch (error) {
        return error
    }
}