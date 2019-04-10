import { post, get } from '../utils/request';
import * as config from '../utils/config';
import storage from '../utils/storage';

/**
 * @description 授权登录[账号+密码]
 * @param {String} username 账号
 * @param {String} password 密码
 */
export async function login(username, password) {
    try {
        let token = await post(config.BASE_URL + "/oauth/token", {
            'client_id': config.CLIENT_ID,
            'grant_type': 'password',
            'username': username,
            'password': password,
            'client_secret': config.CLIENT_SECRECT
        });
        if (token.error && token.error !== '') {
            return token;
        }
        token.create_time = new Date().getTime();
        const userInfo = await get(config.BASE_URL + "/api/v1/admin/info", null, {
            Authorization: "Bearer " + token.access_token
        }); // 获取用户信息
        if (userInfo.error && userInfo.error !== 'success') {
            return userInfo;
        }
        Object.assign(token, userInfo.data);
        await setUserInfoToStorage(token);
        return token;
    } catch (error) {
        return error;
    }
}
/**
 *  @description 检查用户是否登录
 *  @returns true 已经登录  false 未登录
 */
export async function checkLogin() {
    let user = await getUserInfoFromStorage();
    if (user)
        return true;
    else
        return false;
}


Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

/**
 * 检查权限
 * @param {*} role 
 */
export async function checkAuthorities(role) {
    let user = storage.get("user");
    if (!user) {
        return false
    }
    let authorities = user.auths;
    if (authorities.contains(role))
        return true;
    return false;
}
/**
 * @description 刷新access_token
 * @param {String} refresh_token 刷新的token
 * @param {Number} times 次数
 */
export async function refreshToken(refresh_token, times) {
    if (!times) times = 0;
    try {
        let token = await post(config.BASE_URL + '/oauth/token', {
            'client_id': config.CLIENT_ID,
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token,
            'client_secret': config.CLIENT_SECRECT
        });
        if (!token.error || token.error === '') {
            let user = await getUserInfoFromStorage();
            user = user || {};
            token.create_time = new Date().getTime();
            // users[token.openid] = Object.assign(users[token.openid], token);

            Object.assign(user, token);

            await setUserInfoToStorage(user);

            return user;
        } else if (token.error === 'invalid_token' || token.error == 'invalid_grant') {

            await storage.remove('user');

            return {
                error: 'not_login'
            };
        }
    } catch (error) {
        console.error('refreshToken error:', error)
        if (times < 3) {
            return await refreshToken(refresh_token, ++times);
        }
    }
}

/**
 * @description 获取access_token
 */
export async function getAccessToken() {
    try {
        let token = await getUserInfoFromStorage();
        if (!token) {
            return {
                error: 'not_login'
            };
        }
        if (token.create_time + (token.expires_in - 5) * 1000 < new Date().getTime()) {
            token = await refreshToken(token.refresh_token);
            if (token.error)
                return token;
            else return {
                access_token: token.access_token
            }
        } else {
            return {
                access_token: token.access_token
            }
        }
    } catch (error) {
        console.error('error:' + error);
        return error;
    }
}

/**
 * @description 重置access_token
 */
export async function resetAccessToken() {
    try {
        let user = await getUserInfoFromStorage();
        user.create_time = 0;
        await setUserInfoToStorage(user);
    } catch (error) {
        console.error('error: network_error');
        return {
            error: 'network_error'
        };
    }
}

/**
 * @description client_credentials认证,在用户没有授权给客户端时,客户端获取access_token情况下使用
 */
export async function getClient_credentials() {
    try {
        let token = await getTokenFromStorage();
        if (token && token.create_time + (token.expires_in - 5) * 1000 > new Date().getTime()) {
            return token;
        }
        //debugger;
        token = await post(config.BASE_URL + "/oauth/token", {
            client_id: config.CLIENT_ID,
            client_secret: config.CLIENT_SECRECT,
            grant_type: "client_credentials",
        });
        token.create_time = new Date().getTime();
        if (token.error && token.error !== '') {
            return {
                error: token.error
            };
        }
        await setTokenToStorage(token);
        return token;
    } catch (error) {
        console.error('error:' + error);
        return error;
    }
}

export async function resetCredentialsToken() {
    storage.remove('token');
}
/**
 * @description 登出
 */
export async function logOut() {
    storage.remove('user');
    storage.remove('authorities');
    return {
        error: 'success'
    };
}

/**
 * @description 从storage获取用户个人信息
 */
export async function getUserInfoFromStorage() {
    return storage.get('user');
}

/**
 * @description 保存用户个人信息到storage
 * @param {Object} users 用户个人信息
 */
export async function setUserInfoToStorage(users) {
    storage.save('user', users);
}

/**
 * @description 从storage获取用户的token,用于client_credentials认证
 */
export async function getTokenFromStorage() {
    return storage.get('token');
}

/**
 * @description 保存用户的用户的token到storage,用于client_credentials认证
 * @param {String} token 用户的token
 */
export async function setTokenToStorage(token) {
    storage.save('token', token);
}


/**
 * @description 发送POST请求[微信小程序-网络请求]
 * @param {String} url 接口地址
 * @param {Object} pars 参数对象
 */
export async function postWithToken(url, pars) {
    let access_token = await getAccessToken()
    if (access_token.error) {
        return access_token;
    }
    return post(url, pars, { 'Authorization': 'Bearer ' + access_token.access_token });
}
/**
 * @description 发送GET请求[微信小程序-网络请求]
 * @param {String} url 接口地址
 * @param {Object} pars 参数对象
 */
export async function getWithToken(url, pars) {
    let access_token = await getAccessToken()
    if (access_token.error) {
        return access_token;
    }
    return get(url, pars, { 'Authorization': 'Bearer ' + access_token.access_token });
}
/**
 * @description 发送GET请求 client_credentials 认证时调用 [微信小程序-网络请求]
 * @param {String} url  接口地址
 * @param {Object} pars 参数对象
 */
export async function getWithClient(url, pars) {
    let access_token = await getClient_credentials()
    if (access_token.error) {
        return access_token;
    }
    return get(url, pars, { 'Authorization': 'Bearer ' + access_token.access_token });
}
/**
 * @description 发送POST请求 client_credentials 认证时调用 [微信小程序-网络请求]
 * @param {String} url 接口地址
 * @param {Object} pars 参数对象
 */
export async function postWithClient(url, pars) {
    let access_token = await getClient_credentials()
    if (access_token.error) {
        return access_token;
    }
    return post(url, pars, { 'Authorization': 'Bearer ' + access_token.access_token });
}