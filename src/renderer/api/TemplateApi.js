import * as config from '../utils/config'
import * as OauthApi from './OauthApi'

export async function getOne(template_id) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/illness_template/get', { template_id: template_id });
    } catch (error) {
        return error
    }
}

export async function menu() {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/illness_template/menu');
    } catch (error) {
        return error
    }
}

export async function select() {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/illness_template/select');
    } catch (error) {
        return error
    }
}

export async function add(level, big_illness, illness, main_illness, present_illness, history, inspect, sup, dia, trea_plan, trea, advice, edit) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/illness_template/add', {
            level: level,
            big_illness: big_illness,
            illness: illness,
            main_illness: main_illness,
            present_illness: present_illness,
            history: history,
            inspect: inspect,
            sup: sup,
            dia: dia,
            trea_plan: trea_plan,
            trea: trea,
            advice: advice,
            edit: edit
        });
    } catch (error) {
        return error
    }
}

export async function edit(template_id, illness, main_illness, present_illness, history, inspect, sup, dia, trea_plan, trea, advice) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/illness_template/edit', {
            template_id: template_id,
            illness: illness,
            main_illness: main_illness,
            present_illness: present_illness,
            history: history,
            inspect: inspect,
            sup: sup,
            dia: dia,
            trea_plan: trea_plan,
            trea: trea,
            advice: advice
        });
    } catch (error) {
        return error
    }
}
