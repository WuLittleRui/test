webpackJsonp([41],{192:function(a,b,c){"use strict";Object.defineProperty(b,"__esModule",{value:!0});var d=c(386),e=c(751),f=c(58),g=f(d.a,e.a,!1,function(){c(748)},"data-v-a20cfa70",null);b["default"]=g.exports},200:function(a,b){"use strict";b.a=function(a){var b=/^1[3|4|5|6|7|8|9][0-9]\d{8}$/;return b.test(a)}},201:function(a,b,c){a.exports={default:c(203),__esModule:!0}},203:function(a,b,c){var d=c(2),e=d.JSON||(d.JSON={stringify:JSON.stringify});a.exports=function(){return e.stringify.apply(e,arguments)}},212:function(a,b,c){"use strict";c.d(b,"a",function(){return l}),c.d(b,"b",function(){return m});var d=c(36),e=c.n(d),f=c(38),g=c.n(f),h=c(37),i=c.n(h),j=c(59),k=c(57),l=function(){var a=i()(e.a.mark(function a(b){var c,d;return e.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return c=void 0,a.next=3,k.c();case 3:if(d=a.sent,!d.error){a.next=6;break}return a.abrupt("return",d);case 6:return b.append("access_token",d.access_token),a.abrupt("return",new g.a(function(a,d){fetch(j.a+"/api/v1/file/upload",{method:"POST",body:b}).then(function(a){return c=!!a.ok,a.json()}).then(function(b){c?a(b):d(b)}).catch(function(a){d(a)})}));case 8:case"end":return a.stop();}},a,this)}));return function(){return a.apply(this,arguments)}}(),m=function(){var a=i()(e.a.mark(function a(b){var c;return e.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return c=void 0,a.abrupt("return",new g.a(function(a,d){fetch(j.a+"/api/v1/file/upload",{method:"POST",body:b}).then(function(a){return c=!!a.ok,a.json()}).then(function(b){c?a(b):d(b)}).catch(function(a){d(a)})}));case 2:case"end":return a.stop();}},a,this)}));return function(){return a.apply(this,arguments)}}()},386:function(a,b,c){"use strict";var d=c(201),e=c.n(d),f=c(750),g=c(200),h=c(59),i=c(212);b.a={data:function(){var a=this;return{form:{verifyCode:"",hosptial_name:"",username:"",password:"",checkPassword:"",mobile:"",address:"",remark:""},license_list:[],docter_list:[],aptitude_list:[],detail_list:[],uploadAction:h.a+"/api/v1/file/upload",active:1,button:"\u83B7\u53D6\u9A8C\u8BC1\u7801",isDisabled:!1,LoginButtonLoading:!1,time:60,rule:{remark:[{required:!0,message:"\u8BF7\u8F93\u5165\u533B\u9662\u7B80\u4ECB",trigger:"blur"}],address:[{required:!0,message:"\u8BF7\u8F93\u5165\u533B\u9662\u5730\u5740",trigger:"blur"}],verifyCode:[{required:!0,validator:function(b,c,d){""===a.form.mobile?d(new Error("\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801")):f.c(a.form.mobile,a.form.verifyCode).then(function(a){"success"===a.error?d():d(new Error("\u9A8C\u8BC1\u7801\u9519\u8BEF"))})},trigger:"blur"}],hosptial_name:[{required:!0,message:"\u8BF7\u8F93\u5165\u533B\u9662\u540D\u79F0",trigger:"blur"}],username:[{required:!0,message:"\u8BF7\u8F93\u5165\u8054\u7CFB\u4EBA",trigger:"blur"}],password:[{required:!0,validator:function(b,c,d){""===a.form.password?d(new Error("\u8BF7\u8F93\u5165\u5BC6\u7801")):(6>a.form.password.length&&d(new Error("\u5BC6\u7801\u9700\u4E3A6\u4F4D\u6570\u5373\u4EE5\u4E0A")),""!==a.form.checkPassword&&a.$refs.form.validateField("checkPassword"),d())},trigger:"blur"}],checkPassword:[{required:!0,validator:function(b,c,d){""===a.form.checkPassword?d(new Error("\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801")):a.form.checkPassword===a.form.password?d():d(new Error("\u4E24\u6B21\u8F93\u5165\u5BC6\u7801\u4E0D\u4E00\u81F4!"))},trigger:"blur"}],mobile:[{required:!0,validator:function(b,c,d){""===a.form.mobile?d(new Error("\u8BF7\u8F93\u5165\u8054\u7CFB\u624B\u673A")):(!Object(g.a)(a.form.mobile)&&d(new Error("\u8BF7\u8F93\u5165\u6B63\u786E\u768411\u4F4D\u624B\u673A\u53F7\u7801")),d())},trigger:"blur"}]}}},mounted:function(){this.resetForm()},methods:{handleUploadImglicense:function(a){var b=this,c=new FormData;c.append("upfile",a.file),c.append("type","image"),i.b(c).then(function(a){"success"===a.error?b.license_list.push({name:a.data.name,url:a.data.url}):b.$message.error(b.$t(a.error))})},handleRemovelicense:function(a,b){this.license_list=b},handleRemovedocter:function(a,b){this.docter_list=b},handleUploadImgdocter:function(a){var b=this,c=new FormData;c.append("upfile",a.file),c.append("type","image"),i.b(c).then(function(a){"success"===a.error?b.docter_list.push({name:a.data.name,url:a.data.url}):b.$message.error(b.$t(a.error))})},handleRemoveaptitude:function(a,b){this.aptitude_list=b},handleUploadImgaptitude:function(a){var b=this,c=new FormData;c.append("upfile",a.file),c.append("type","image"),i.b(c).then(function(a){"success"===a.error?b.aptitude_list.push({name:a.data.name,url:a.data.url}):b.$message.error(b.$t(a.error))})},handleUploadImgdetail:function(a){var b=this,c=new FormData;c.append("upfile",a.file),c.append("type","image"),i.b(c).then(function(a){"success"===a.error?b.detail_list.push({name:a.data.name,url:a.data.url}):b.$message.error(b.$t(a.error))})},handleRemovedetail:function(a,b){this.detail_list=b},previousStep:function(){this.active--},nextStep:function(a){var b=this;this.$refs[a].validate(function(a){return!!a&&void b.active++})},resetForm:function(){this.form.verifyCode="",this.form.hosptial_name="",this.form.username="",this.form.password="",this.form.checkPassword="",this.form.mobile=""},getVerfityCode:function(){var a=this;return""==this.form.mobile||null==this.form.mobile?void this.$message.error("\u8BF7\u8F93\u5165\u624B\u673A\u53F7"):void f.a(this.form.mobile).then(function(b){if("success"===b.error){a.$message({message:"\u77ED\u4FE1\u5DF2\u53D1\u9001",type:"success"}),a.isDisabled=!0;var c=a,d=window.setInterval(function(){c.button=c.time+"\u79D2\u540E\u91CD\u65B0\u53D1\u9001",--c.time,0>c.time&&(c.button="\u91CD\u65B0\u53D1\u9001",c.isDisabled=!1,window.clearInterval(d))},1e3)}else b.error_description?a.$message.error(b.error_description):a.$message.error(b.error)})},returnLogin:function(){this.$router.push("/login")},submitForm:function(a){var b=this;this.$refs[a].validate(function(a){if(a){var c=[];b.license_list.map(function(a){"success"===a.status&&c.push(a.url)});var d=[];b.docter_list.map(function(a){"success"===a.status&&d.push(a.url)});var g=[];b.aptitude_list.map(function(a){"success"===a.status&&g.push(a.url)});var h=[];b.detail_list.map(function(a){"success"===a.status&&h.push(a.url)}),b.LoginButtonLoading=!0,f.b(b.form.hosptial_name,b.form.username,b.form.password,b.form.mobile,b.form.address,b.form.remark,e()(c),e()(d),e()(g),e()(h)).then(function(a){b.LoginButtonLoading=!1,"success"===a.error?(b.$message({type:"success",message:"\u7533\u8BF7\u6210\u529F!"}),b.$router.push("/login")):b.$message.error(b.$t(a.error))})}else return!1})}}}},748:function(a,b,c){var d=c(749);"string"==typeof d&&(d=[[a.i,d,""]]),d.locals&&(a.exports=d.locals);c(131)("035bc2fe",d,!0,{})},749:function(a,b,c){b=a.exports=c(130)(!1),b.push([a.i,".login-wrap[data-v-a20cfa70]{position:relative;width:100%;height:100%;background-color:#fff;background-size:100%;margin:auto}.login-btn[data-v-a20cfa70]{text-align:center;margin:0 20px}.login-btn button[data-v-a20cfa70]{width:30%;height:40px;margin-bottom:10px}.el-scrollbar__wrap[data-v-a20cfa70]{overflow-x:hidden}.container2[data-v-a20cfa70],.container[data-v-a20cfa70]{width:30%;margin:0 auto;margin-top:30px;-webkit-box-shadow:2px 2px 2px #ddd,2px -2px 2px #ddd,-2px 2px 2px #ddd,-2px -2px 2px #ddd;box-shadow:2px 2px 2px #ddd,2px -2px 2px #ddd,-2px 2px 2px #ddd,-2px -2px 2px #ddd;padding:50px;height:350px}",""])},750:function(a,b,c){"use strict";c.d(b,"b",function(){return j}),c.d(b,"a",function(){return k}),c.d(b,"c",function(){return l});var d=c(36),e=c.n(d),f=c(37),g=c.n(f),h=c(59),i=c(57),j=function(){var a=g()(e.a.mark(function a(b,c,d,f,g,j,k,l,m,n){return e.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,i.i(h.a+"/api/v1/hospital/register",{hosptial_name:b,username:c,password:d,mobile:f,address:g,remark:j,license_list:k,docter_list:l,aptitude_list:m,detail_list:n});case 3:return a.abrupt("return",a.sent);case 6:return a.prev=6,a.t0=a["catch"](0),a.abrupt("return",a.t0);case 9:case"end":return a.stop();}},a,this,[[0,6]])}));return function(){return a.apply(this,arguments)}}(),k=function(){var a=g()(e.a.mark(function a(b){return e.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,i.i(h.a+"/api/v1/code/send/SMS",{code_type:"REGISTER",mobile:b});case 3:return a.abrupt("return",a.sent);case 6:return a.prev=6,a.t0=a["catch"](0),a.abrupt("return",a.t0);case 9:case"end":return a.stop();}},a,this,[[0,6]])}));return function(){return a.apply(this,arguments)}}(),l=function(){var a=g()(e.a.mark(function a(b,c){return e.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,i.i(h.a+"/api/v1/code/vertify/code",{code_type:"REGISTER",mobile:b,verify_code:c});case 3:return a.abrupt("return",a.sent);case 6:return a.prev=6,a.t0=a["catch"](0),a.abrupt("return",a.t0);case 9:case"end":return a.stop();}},a,this,[[0,6]])}));return function(){return a.apply(this,arguments)}}()},751:function(a,b){"use strict";b.a={render:function(){var a=this,b=a.$createElement,c=a._self._c||b;return c("div",{staticClass:"login-wrap"},[c("div",{staticStyle:{width:"30%",margin:"0 auto","margin-top":"150px"}},[c("el-steps",{attrs:{active:a.active}},[c("el-step",{attrs:{title:"\u57FA\u672C\u4FE1\u606F",icon:"el-icon-edit"}}),a._v(" "),c("el-step",{attrs:{title:"\u533B\u9662\u4FE1\u606F",icon:"el-icon-upload"}}),a._v(" "),c("el-step",{attrs:{title:"\u533B\u9662\u8D44\u8D28",icon:"el-icon-picture"}})],1)],1),a._v(" "),c("div",{class:3==a.active?"container":"container2"},[c("el-scrollbar",{staticStyle:{height:"100%"}},[c("el-form",{ref:"form",attrs:{model:a.form,rules:a.rule,"label-width":"100px"}},[1==a.active?c("el-form-item",{attrs:{label:"\u533B\u9662\u540D\u79F0",prop:"hosptial_name"}},[c("el-input",{staticStyle:{width:"80%"},model:{value:a.form.hosptial_name,callback:function(b){a.$set(a.form,"hosptial_name",b)},expression:"form.hosptial_name"}})],1):a._e(),a._v(" "),1==a.active?c("el-form-item",{attrs:{label:"\u8054 \u7CFB \u4EBA",prop:"username"}},[c("el-input",{staticStyle:{width:"80%"},model:{value:a.form.username,callback:function(b){a.$set(a.form,"username",b)},expression:"form.username"}})],1):a._e(),a._v(" "),1==a.active?c("el-form-item",{attrs:{label:"\u8054\u7CFB\u624B\u673A",prop:"mobile"}},[c("el-input",{staticStyle:{width:"80%"},attrs:{maxlength:"11"},model:{value:a.form.mobile,callback:function(b){a.$set(a.form,"mobile",b)},expression:"form.mobile"}})],1):a._e(),a._v(" "),1==a.active?c("el-form-item",{attrs:{label:"\u9A8C\u8BC1\u7801",prop:"verifyCode"}},[c("el-row",{attrs:{gutter:20}},[c("el-col",{attrs:{span:13}},[c("el-input",{model:{value:a.form.verifyCode,callback:function(b){a.$set(a.form,"verifyCode",b)},expression:"form.verifyCode"}})],1),a._v(" "),c("el-col",{attrs:{span:2}},[c("el-button",{attrs:{type:"success",disabled:a.isDisabled},on:{click:a.getVerfityCode}},[a._v(a._s(a.button))])],1)],1)],1):a._e(),a._v(" "),1==a.active?c("el-form-item",{attrs:{label:"\u8BBE\u7F6E\u5BC6\u7801",prop:"password"}},[c("el-input",{staticStyle:{width:"80%"},attrs:{type:"password",minlength:"6","show-password":""},model:{value:a.form.password,callback:function(b){a.$set(a.form,"password",b)},expression:"form.password"}})],1):a._e(),a._v(" "),1==a.active?c("el-form-item",{attrs:{label:"\u786E\u8BA4\u5BC6\u7801",prop:"checkPassword"}},[c("el-input",{staticStyle:{width:"80%"},attrs:{type:"password",minlength:"6","show-password":""},model:{value:a.form.checkPassword,callback:function(b){a.$set(a.form,"checkPassword",b)},expression:"form.checkPassword"}})],1):a._e(),a._v(" "),2==a.active?c("el-form-item",{attrs:{label:"\u533B\u9662\u5730\u5740",prop:"address"}},[c("el-input",{staticStyle:{width:"80%"},model:{value:a.form.address,callback:function(b){a.$set(a.form,"address",b)},expression:"form.address"}})],1):a._e(),a._v(" "),2==a.active?c("el-form-item",{attrs:{label:"\u533B\u9662\u4ECB\u7ECD",prop:"remark"}},[c("el-input",{attrs:{type:"textarea",rows:2,maxlength:1000,placeholder:"\u8BF7\u8F93\u5165\u7B80\u4ECB"},model:{value:a.form.remark,callback:function(b){a.$set(a.form,"remark",b)},expression:"form.remark"}})],1):a._e(),a._v(" "),3==a.active?c("el-form-item",{attrs:{label:"\u8425\u4E1A\u6267\u7167"}},[c("el-upload",{staticClass:"upload-demo",attrs:{action:a.uploadAction,"on-remove":a.handleRemovelicense,"http-request":a.handleUploadImglicense,"file-list":a.license_list,"list-type":"picture"}},[c("el-button",{attrs:{size:"small",type:"primary"}},[a._v("\u70B9\u51FB\u4E0A\u4F20")])],1)],1):a._e(),a._v(" "),3==a.active?c("el-form-item",{attrs:{label:"\u533B\u9662\u8D44\u8D28"}},[c("el-upload",{staticClass:"upload-demo",attrs:{action:a.uploadAction,"on-remove":a.handleRemovedocter,"http-request":a.handleUploadImgdocter,"file-list":a.docter_list,"list-type":"picture"}},[c("el-button",{attrs:{size:"small",type:"primary"}},[a._v("\u70B9\u51FB\u4E0A\u4F20")])],1)],1):a._e(),a._v(" "),3==a.active?c("el-form-item",{attrs:{label:"\u533B\u751F\u804C\u79F0\u8D44\u8D28"}},[c("el-upload",{staticClass:"upload-demo",attrs:{action:a.uploadAction,"on-remove":a.handleRemoveaptitude,"http-request":a.handleUploadImgaptitude,"file-list":a.aptitude_list,"list-type":"picture"}},[c("el-button",{attrs:{size:"small",type:"primary"}},[a._v("\u70B9\u51FB\u4E0A\u4F20")])],1)],1):a._e(),a._v(" "),3==a.active?c("el-form-item",{attrs:{label:"\u533B\u9662\u5185\u90E8\u8BE6\u60C5"}},[c("el-upload",{staticClass:"upload-demo",attrs:{action:a.uploadAction,"http-request":a.handleUploadImgdetail,"on-remove":a.handleRemovedetail,"file-list":a.detail_list,"list-type":"picture"}},[c("el-button",{attrs:{size:"small",type:"primary"}},[a._v("\u70B9\u51FB\u4E0A\u4F20")])],1)],1):a._e()],1),a._v(" "),c("div",{staticClass:"login-btn"},[1==a.active?c("el-button",{attrs:{type:"danger"},on:{click:a.returnLogin}},[a._v("\u8FD4\u56DE\u767B\u5F55")]):a._e(),a._v(" "),1==a.active?a._e():c("el-button",{attrs:{type:"danger"},on:{click:a.previousStep}},[a._v("\u4E0A\u4E00\u6B65")]),a._v(" "),3==a.active?a._e():c("el-button",{attrs:{type:"primary"},on:{click:function(){return a.nextStep("form")}}},[a._v("\u4E0B\u4E00\u6B65")]),a._v(" "),3==a.active?c("el-button",{attrs:{type:"primary",loading:a.LoginButtonLoading},on:{click:function(){return a.submitForm("form")}}},[a._v("\u786E\u5B9A")]):a._e()],1)],1)],1)])},staticRenderFns:[]}}});