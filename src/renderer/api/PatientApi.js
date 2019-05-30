import * as config from '../utils/config'
import * as OauthApi from './OauthApi'

/**
 * @author wurui
 * @description 获取
 
 */

export async function list(name, mobile, case_number, key) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/patient/list', {
            name: name,
            mobile: mobile,
            case_number: case_number, 
            key: key
        });
    } catch (error) {
        return error;


    }
}

/**
 * @author wurui
 * @description 获取
 
 */

export async function patients(query_time, key) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/patient/patient', {
            query_time: query_time,
            key: key
        });
    } catch (error) {
        return error;


    }
}

export async function payList(page, pageSize, case_number) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/money/pay/list', {
            case_number: case_number,
            page: page,
            pageSize: pageSize
        });
    } catch (error) {
        return error;


    }
}

export async function cancelBill(sn) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/money/cancel', {
            sn: sn
        });
    } catch (error) {
        return error;


    }
}

export async function getPatientDetail(case_number) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/patient/get/' + case_number);
    } catch (error) {
        return error;


    }
}

/**
 * @author wurui
 * @description 删除
 * @param {*} aid 
 */
export async function deleteSelect(case_number) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/patient/delete', { case_number: case_number });
    } catch (error) {
        return error
    }
}

/**
 * @author wurui
 * @description 
 * @param {*} aid 
 */
export async function getCaseNumber() {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/patient/case_number');
    } catch (error) {
        return error
    }
} 

export async function getMemberLevel() {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/patient/level');
    } catch (error) {
        return error
    }
}

/**
 * @author wurui
 * @description 
 * @param {*} aid  
 */
export async function getEmployee(type) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/hospital_employee/get/all/byType', {type : type});
    } catch (error) {
        return error
    }
}

/**
 * @author wurui
 * @description 添加广告
 * @param {*} title 
 
 */
export async function add(case_number, name, mobile, sex, age, birthday, type, allergy, history, address, level) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/patient/add', { 
            case_number: case_number, name: name, mobile: mobile, sex: sex, age: age,
            birthday: birthday, type: type, allergy: allergy, history: history, address: address, level_id: level
        });
    } catch (error) {
        return error
    }
}

/**
 * @author wurui
 * @description 修改广告
 * @param {*} aid 
 * @param {*} title 
 
 */
export async function edit(case_number, name, mobile, sex, age, birthday, type, allergy, history, address, level) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/patient/edit', { 
            case_number: case_number, name: name, mobile: mobile, sex: sex, age: age,
            birthday: birthday, type: type, allergy: allergy, history: history, address: address, level_id: level
        });
    } catch (error) {
        return error
    }
}

export async function addOrder(case_number, employee_id, start_time, end_time, content, order_remark) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/order/add', { 
            case_number: case_number, 
            start_time: start_time,
            end_time: end_time,
            content: content,
            employee_id: employee_id,
            order_remark: order_remark
        });
    } catch (error) {
        return error
    }
}

