import * as config from '../utils/config'
import * as OauthApi from './OauthApi'

/**
 * @author wurui
 * @description 获取
 
 */

export async function list(page, pageSize, sort, name, mobile, case_number) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/patient/list', {
            page: page,
            pageSize: pageSize,
            sort: sort,
            name: name,
            mobile: mobile,
            case_number: case_number
        });
    } catch (error) {
        return error;


    }
}

/**
 * @author wurui
 * @description 获取
 
 */

export async function listDetail(page, pageSize, sort, case_number) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/registration/list', {
            page: page,
            pageSize: pageSize,
            sort: sort,
            case_number: case_number
        });
    } catch (error) {
        return error;


    }
}

export async function getOne(handle_id) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/registration/get/' + handle_id);
    } catch (error) {
        return error;


    }
}

export async function deleteSelect(handle_ids) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/registration/delete', {
            handle_ids: handle_ids
        });
    } catch (error) {
        return error;


    }
}

export async function add(case_number, docker_id, create_time, main_illness, present_illness, history, allergy, advice, inspect, supplementary_examination, diagnosis, treatment_plan, treatment, title) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/registration/add', {
            docker_id: docker_id,
            create_time: create_time,
            main_illness: main_illness,
            present_illness: present_illness,
            history: history,
            allergy: allergy,
            advice: advice, 
            inspect: inspect,
            supplementary_examination: supplementary_examination,
            diagnosis: diagnosis,
            treatment_plan: treatment_plan,
            treatment: treatment,
            title: title,
            case_number: case_number
        });
    } catch (error) {
        return error;


    }
}

export async function edit(case_number, docker_id, create_time, main_illness, present_illness, history, allergy, advice, inspect, supplementary_examination, diagnosis, treatment_plan, treatment, title) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + 'api/v1/registration/edit', {
            docker_id: docker_id,
            create_time: create_time,
            main_illness: main_illness,
            present_illness: present_illness,
            history: history,
            allergy: allergy,
            advice: advice, 
            inspect: inspect,
            supplementary_examination: supplementary_examination,
            diagnosis: diagnosis,
            treatment_plan: treatment_plan,
            treatment: treatment,
            title: title,
            case_number: case_number
        });
    } catch (error) {
        return error;


    }
}


