import * as config from '../utils/config'
import * as OauthApi from './OauthApi'


/**
 * 
 * @author jiangxudong
 * @description 店铺管理_员工管理
 */




/**
 * 初始化信息查询
 */
export async function getemployeeList(key, state, page, pageSize, sort, group_id) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospital_employee/list', {
            key: key,
            state: state,
            page: page,
            pageSize: pageSize,
            sort: sort,
            group_id: group_id
        });
    } catch (error) {
        return error
    }
}

/**
 * 删除信息
 */
export async function delEmployee(employee_id) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospital_employee/delete', { employeeId: employee_id });
    } catch (error) {
        return error
    }
}

/**
 * 获取所有的员工列表
 */
export async function getAll() {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospital_employee/get/all');
    } catch (error) {
        return error
    }
}

/**
 * 锁定信息_修改员工状态
 */
export async function lockOrUnlockEmployee(employeeId, state) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospital_employee/state', { employeeId: employeeId, state: state });

    } catch (error) {
        return error
    }
}

/**
 * 根据id查询要修改的对应信息
 * @param {*} employeeId 
 */
export async function getEmployee(employeeId) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospital_employee/' + employeeId);
    } catch (error) {
        return error
    }
}

/**
 * 
 * @description 获取员工列表
 *
 */
export async function getShopGroupList() {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospitalgroup/getlist')
    } catch (error) {
        return error
    }
}

/**
 *修改信息 
 */
export async function updateEmployee(username, password, mobile, group_id, face, employeeId, state) {
    try {

        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospital_employee/update', { username: username, password: password, mobile: mobile, group_id: group_id, face: face, employeeId: employeeId, state: state });
    } catch (error) {
        return error
    }
}

/**
 * 添加
 */
export async function addEmployee(username, password, mobile, groupId, face) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/hospital_employee/add', { username: username, password: password, mobile: mobile, groupId: groupId, face: face })
    } catch (error) {
        return error
    }
}


/**
 * 资源上传
 * @param {object} formData formData
 */
export async function upload(formData) {
    let isOk
    const token = await OauthApi.getAccessToken()
    if (token.error) {
        return token
    }
    formData.append('access_token', token.access_token)
    return new Promise((resolve, reject) => {
        fetch(config.BASE_URL + '/api/v1/file/upload', {
                method: 'POST',
                body: formData
            }).then((response) => {
                if (response.ok) {
                    isOk = true
                } else {
                    isOk = false
                }
                return response.json()
            })
            .then((responseData) => {
                if (isOk) {
                    resolve(responseData)
                } else {
                    reject(responseData)
                }
            })
            .catch((error) => {
                reject(error)
            })
    })
}