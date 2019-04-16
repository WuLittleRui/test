import * as config from '../utils/config'
import * as OauthApi from './OauthApi'

/**
 * 初始化店铺设置数据信息
 */
export async function getShopInfo() {
  try {
    // client_credentials 认证 在用户没有授权给客户端时,客户端获取access_token 情况下使用
    return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/setting/get', {});
  } catch (error) {
    return error
  }
}
/**
 * 
 * 营销设置的提交按钮
 */
export async function updateShop(images, remark, customer_service, lng, lat) {
  try {

    return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/setting/edit', {
      images: images,
      remark: remark,
      customer_service: customer_service,
      lng: lng,
      lat: lat
    });

  } catch (error) {
    return error
  }
}
