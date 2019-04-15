import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            redirect: '/index'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children: [{
                    path: '/index',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '首页' }
                },
                {
                    path: '/charge/appoint',
                    component: resolve => require(['../components/page/charge/Appoint.vue'], resolve),
                    meta: { title: '预约' }
                },
                {
                    path: '/charge/cashier',
                    component: resolve => require(['../components/page/charge/Cashier.vue'], resolve),
                    meta: { title: '收银中心' }
                },
                {
                    path: '/outpatient/setting',
                    component: resolve => require(['../components/page/outpatient/Setting.vue'], resolve),
                    meta: { title: '基本设置' }
                },
                {
                    path: '/charge/payment',
                    component: resolve => require(['../components/page/charge/Payment.vue'], resolve),
                    meta: { title: '预付款管理' }
                },
                {
                    path: '/charge/arrears',
                    component: resolve => require(['../components/page/charge/Arrears.vue'], resolve),
                    meta: { title: '欠费中心' }
                },
                {
                    path: '/outpatient/payment',
                    component: resolve => require(['../components/page/outpatient/Payment.vue'], resolve),
                    meta: { title: '收款方式' }
                },
                {
                    path: '/outpatient/department',
                    component: resolve => require(['../components/page/outpatient/Department.vue'], resolve),
                    meta: { title: '部门管理' }
                },
                {
                    path: '/outpatient/employee',
                    component: resolve => require(['../components/page/outpatient/Employee.vue'], resolve),
                    meta: { title: '员工管理' }
                },
                {
                    path: '/outpatient/member',
                    component: resolve => require(['../components/page/outpatient/Member.vue'], resolve),
                    meta: { title: '会员卡类型' }
                },
                {
                    path: '/outpatient/discount',
                    component: resolve => require(['../components/page/outpatient/Discount.vue'], resolve),
                    meta: { title: '会员卡折扣' }
                },
                {
                    path: '/outpatient/coupon',
                    component: resolve => require(['../components/page/outpatient/Coupon.vue'], resolve),
                    meta: { title: '优惠卡管理' }
                },
                {
                    path: '/outpatient/charge',
                    component: resolve => require(['../components/page/outpatient/Charge.vue'], resolve),
                    meta: { title: '收费项目管理' }
                },
                {
                    path: '/outpatient/type',
                    component: resolve => require(['../components/page/outpatient/ChargeType.vue'], resolve),
                    meta: { title: '收费项目类型管理' }
                },
                {
                    path: '/outpatient/order',
                    component: resolve => require(['../components/page/outpatient/Order.vue'], resolve),
                    meta: { title: '预约项目' }
                },
                {
                    path: '/outpatient/ordertype',
                    component: resolve => require(['../components/page/outpatient/OrderType.vue'], resolve),
                    meta: { title: '预约项目类型' }
                },
                {
                    path: '/outpatient/royalty',
                    component: resolve => require(['../components/page/outpatient/Royalty.vue'], resolve),
                    meta: { title: '收费项目提成' }
                },
                {
                    path: '/outpatient/docker',
                    component: resolve => require(['../components/page/outpatient/Docker.vue'], resolve),
                    meta: { title: '医生档案' }
                },
                {
                    path: '/case/order',
                    component: resolve => require(['../components/page/case/Order.vue'], resolve),
                    meta: { title: '预约列表' }
                },
                {
                    path: '/case/medical',
                    component: resolve => require(['../components/page/case/Medical.vue'], resolve),
                    meta: { title: '处方管理' }
                },
                {
                    path: '/case/patient',
                    component: resolve => require(['../components/page/case/Patient.vue'], resolve),
                    meta: { title: '患者信息中心' }
                },
                {
                    path: '/case/return',
                    component: resolve => require(['../components/page/case/Return.vue'], resolve),
                    meta: { title: '回访管理' }
                },
                {
                    path: '/stock/record',
                    component: resolve => require(['../components/page/stock/Record.vue'], resolve),
                    meta: { title: '入库记录' }
                },
                {
                    path: '/stock/project',
                    component: resolve => require(['../components/page/stock/Project.vue'], resolve),
                    meta: { title: '库存项目' }
                },
                {
                    path: '/stock/list',
                    component: resolve => require(['../components/page/stock/List.vue'], resolve),
                    meta: { title: '库存列表' }
                },
                {
                    path: '/stock/outgoing',
                    component: resolve => require(['../components/page/stock/Outgoing.vue'], resolve),
                    meta: { title: '出库记录', }
                },
                {
                    path: '/stock/inventory',
                    component: resolve => require(['../components/page/stock/Inventory.vue'], resolve),
                    meta: { title: '盘点记录' }
                },
                {
                    path: '/stock/purchasing',
                    component: resolve => require(['../components/page/stock/Purchasing.vue'], resolve),
                    meta: { title: '产生采购单' }
                },
                {
                    path: '/stock/showgood',
                    component: resolve => require(['../components/page/stock/ShowGoods.vue'], resolve),
                    meta: { title: '批发商品展示' }
                },
                {
                    path: '/financial/collection',
                    component: resolve => require(['../components/page/financial/Collection.vue'], resolve),
                    meta: { title: '收款记录', }
                },
                {
                    path: '/financial/employee',
                    component: resolve => require(['../components/page/financial/Employee.vue'], resolve),
                    meta: { title: '员工提成' }
                },
                {
                    path: '/financial/user',
                    component: resolve => require(['../components/page/financial/User.vue'], resolve),
                    meta: { title: '用户预存款' }
                },
                {
                    path: '/financial/advance',
                    component: resolve => require(['../components/page/financial/Advance.vue'], resolve),
                    meta: { title: '预存款统计' }
                },
                {
                    path: '/financial/arrears',
                    component: resolve => require(['../components/page/financial/Arrears.vue'], resolve),
                    meta: { title: '欠款统计', }
                },
                {
                    path: '/statistical/customer',
                    component: resolve => require(['../components/page/statistical/Customer.vue'], resolve),
                    meta: { title: '客户统计' }
                },
                {
                    path: '/case/registration/:id',
                    component: resolve => require(['../components/page/case/registrationEdit.vue'], resolve),
                    meta: { title: '病历详情', }
                },
                {
                    path: '/case/registration',
                    component: resolve => require(['../components/page/case/Registration.vue'], resolve),
                    meta: { title: '病历管理' }
                },
                {
                    path: '/statistical/sales',
                    component: resolve => require(['../components/page/statistical/Sales.vue'], resolve),
                    meta: { title: '销售统计' }
                },
                {
                    path: '/customer/origin',
                    component: resolve => require(['../components/page/statistical/Origin.vue'], resolve),
                    meta: { title: '客户来源' }
                },
                {
                    path: '/customer/number',
                    component: resolve => require(['../components/page/statistical/Number.vue'], resolve),
                    meta: { title: '就诊人数统计' }
                },
                {
                    path: '/customer/agian',
                    component: resolve => require(['../components/page/statistical/Again.vue'], resolve),
                    meta: { title: '二次消费统计' }
                },
                {
                    path: '/sales/up',
                    component: resolve => require(['../components/page/statistical/SalesUp.vue'], resolve),
                    meta: { title: '销售增长统计' }
                },
                {
                    path: '/sales/rank',
                    component: resolve => require(['../components/page/statistical/Ranking.vue'], resolve),
                    meta: { title: '项目销售排行' }
                },
                {
                    path: '/sms/balance',
                    component: resolve => require(['../components/page/sms/Balance.vue'], resolve),
                    meta: { title: '短信余额' }
                },
                {
                    path: '/sms/setting',
                    component: resolve => require(['../components/page/sms/Setting.vue'], resolve),
                    meta: { title: '推送消息设置', }
                },
                {
                    path: '/sms/short',
                    component: resolve => require(['../components/page/sms/Short.vue'], resolve),
                    meta: { title: '营销短信群发' }
                },
                {
                    path: '/setting/admin',
                    component: resolve => require(['../components/page/setting/Admin.vue'], resolve),
                    meta: { title: '管理员' }
                },
                {
                    path: '/setting/log',
                    component: resolve => require(['../components/page/setting/Log.vue'], resolve),
                    meta: { title: '系统日志' }
                },
                {
                    path: '/setting/notice',
                    component: resolve => require(['../components/page/setting/Notice.vue'], resolve),
                    meta: { title: '通知公告' }
                },
                {
                    path: '/charge/registration',
                    component: resolve => require(['../components/page/charge/Registration.vue'], resolve),
                    meta: { title: '挂号中心' }
                }
            ]
        },
        {
            path: '/register',
            component: resolve => require(['../components/page/Register.vue'], resolve),
            meta: { title: '注册' }
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve),
            meta: { title: '404' }
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve),
            meta: { title: '403' }
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        }

    ]
})