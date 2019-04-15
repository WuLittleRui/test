import Vue from 'vue';
import App from './App';
import router from './router';
import i18n from './lang' // Internationalization
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import '../../static/css/icon.css';
import "babel-polyfill";
import * as OauthApi from './api/OauthApi';
import * as filters from './utils/formater';
import { ipcRenderer } from "electron";

Vue.use(ElementUI, { size: 'small', i18n: (key, value) => i18n.t(key, value) });


// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

ipcRenderer.on("message", (event, text)=> {
    Vue.prototype.$alert(text, '系统更新', {
        confirmButtonText: '确定',
        callback: action => {
            
        }
      });
});

ipcRenderer.on("update", (event, text)=> {
    Vue.prototype.$alert(text, '系统更新', {
        confirmButtonText: '确定',
        callback: action => {
            ipcRenderer.send("checkForUpdate");
        }
      });
});

ipcRenderer.send("checkForUpdate");

//使用钩子函数对路由进行权限跳转
router.beforeEach(async (to, from, next) => {
    if(to.path === "/register") {
        next();
    } else if (to.path !== '/login' && await OauthApi.checkLogin() === false) {
        next('/login');
    }
    else if (to.meta.role && await OauthApi.checkAuthorities(to.meta.role) === false) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
})


new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');