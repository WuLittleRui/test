import * as config from '../utils/config'
import * as OauthApi from './OauthApi'

/**
 * 编辑提交按钮
 */
export async function edit(handle_id, case_number, title, create_time, docter_id, handle_detail, prescription_detail) {
    try {

        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/handle/edit', {
            handle_id: handle_id,
            case_number: case_number,
            title: title,
            create_time: create_time,
            docter_id: docter_id,
            handle_detail: handle_detail,
            prescription_detail: prescription_detail
        });
    } catch (error) {
        return error
    }
}

export async function list(case_number) {
    try {

        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/handle/list', {
            case_number: case_number
        });
    } catch (error) {
        return error
    }
}

export async function payList(handle_id) {
    try {

        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/money/pricing', {
            handle_id: handle_id
        });
    } catch (error) {
        return error
    }
}

export async function payBill(handle_id, detail, remark, employee_id, cost_price) {
    try {

        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/money/update/pricing', {
            handle_id: handle_id,
            detail: detail,
            remark: remark,
            employee_id: employee_id,
            cost_price: cost_price
        });
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function payBillAndPrint(handle_id, detail, remark, employee_id, cost_price) {
    try {

        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/money/update/pricing/print', {
            handle_id: handle_id,
            detail: detail,
            remark: remark,
            employee_id: employee_id,
            cost_price: cost_price
        });
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function cashierDetail(case_number) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/money/pay/detail', {
            case_number: case_number
        });
    } catch (error) { 
        console.log(error)
        return error
    }
}

export async function payCashier(case_number, type, detail, nurse, cashier, remark, pay_amount, cost_price, employee_id) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/money/pay/bill', {
            case_number: case_number,
            type: type,
            detail: detail,
            nurse: nurse,
            cashier: cashier,
            remark: remark,
            pay_amount: pay_amount,
            cost_price: cost_price,
            employee_id: employee_id
        });
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function payCashierAndPrint(case_number, type, detail, nurse, cashier, remark, pay_amount, cost_price, employee_id) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/money/pay/bill/print', {
            case_number: case_number,
            type: type,
            detail: detail,
            nurse: nurse,
            cashier: cashier,
            remark: remark,
            pay_amount: pay_amount,
            cost_price: cost_price,
            employee_id: employee_id
        });
    } catch (error) {
        console.log(error)
        return error
    }
}


export async function revisitList(page, pageSize, case_number) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/revisit/list', {
            case_number: case_number,
            page: page,
            pageSize: pageSize
        });
    } catch (error) {
        console.log(error)
        return error
    }
}
export async function queryOneRevisit(return_id) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/revisit/get', {
            return_id: return_id
        });
    } catch (error) {
        console.log(error)
        return error
    }
}
export async function deleteRevisit(return_id) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/revisit/delete', {
            return_id: return_id
        });
    } catch (error) {
        console.log(error)
        return error
    }
}
export async function addRevisit(case_number, return_time, return_people, employee_id, state, content, result, return_id) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/revisit/add', {
            case_number: case_number,
            return_time: return_time,
            return_people: return_people,
            employee_id: employee_id,
            state: state,
            content: content,
            result: result,
            return_id: return_id
        });
    } catch (error) {
        console.log(error)
        return error
    }
}
export async function editRevisit(return_id, return_time, return_people, employee_id, state, content, result) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/revisit/edit', {
            return_id: return_id,
            return_time: return_time,
            return_people: return_people,
            employee_id: employee_id,
            state: state,
            content: content,
            result: result
        });
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function caseList(case_number) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/case/list', {
            case_number: case_number
        });
    } catch (error) {
        console.log(error)
        return error
    }
}
export async function queryOnecase(handle_id) {
    try {
        return await OauthApi.getWithToken(config.BASE_URL + '/api/v1/case/get', {
            handle_id: handle_id
        });
    } catch (error) {
        console.log(error)
        return error
    }
}
export async function deletecase(handle_id) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/case/delete', {
            handle_id: handle_id
        });
    } catch (error) {
        console.log(error)
        return error
    }
}
export async function addcase(case_number, detail, inspect, dia, sup, trea_plan, trea) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/case/add', {
            case_number: case_number,
            detail: detail,
            inspect: inspect,
            dia: dia,
            sup: sup,
            trea_plan: trea_plan,
            trea: trea
        });
    } catch (error) {
        console.log(error)
        return error
    }
}
export async function editcase(handle_id, detail, inspect, dia, sup, trea_plan, trea) {
    try {
        return await OauthApi.postWithToken(config.BASE_URL + '/api/v1/case/edit', {
            handle_id: handle_id,
            detail: detail,
            inspect: inspect,
            dia: dia,
            sup: sup,
            trea_plan: trea_plan,
            trea: trea
        });
    } catch (error) {
        console.log(error)
        return error
    }
}
