webpackJsonp([41],{175:function(a,b,c){"use strict";Object.defineProperty(b,"__esModule",{value:!0});var d=c(346),e=c(654),f=c(58),g=f(d.a,e.a,!1,function(){c(652)},"data-v-6b394c90",null);b["default"]=g.exports},202:function(a,b,c){"use strict";c.d(b,"b",function(){return j}),c.d(b,"c",function(){return k}),c.d(b,"d",function(){return l}),c.d(b,"e",function(){return m}),c.d(b,"f",function(){return n}),c.d(b,"a",function(){return o});var d=c(36),e=c.n(d),f=c(37),g=c.n(f),h=c(59),i=c(57),j=function(){var a=g()(e.a.mark(function a(){return e.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,i.f(h.a+"/api/v1/record/case");case 3:return a.abrupt("return",a.sent);case 6:return a.prev=6,a.t0=a["catch"](0),a.abrupt("return",a.t0);case 9:case"end":return a.stop();}},a,this,[[0,6]])}));return function(){return a.apply(this,arguments)}}(),k=function(){var a=g()(e.a.mark(function a(){return e.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,i.f(h.a+"/api/v1/record/origin");case 3:return a.abrupt("return",a.sent);case 6:return a.prev=6,a.t0=a["catch"](0),a.abrupt("return",a.t0);case 9:case"end":return a.stop();}},a,this,[[0,6]])}));return function(){return a.apply(this,arguments)}}(),l=function(){var a=g()(e.a.mark(function a(b,c,d){return e.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,i.f(h.a+"/api/v1/record/sale",{type:b,start_time:c,end_time:d});case 3:return a.abrupt("return",a.sent);case 6:return a.prev=6,a.t0=a["catch"](0),a.abrupt("return",a.t0);case 9:case"end":return a.stop();}},a,this,[[0,6]])}));return function(){return a.apply(this,arguments)}}(),m=function(){var a=g()(e.a.mark(function a(){return e.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,i.f(h.a+"/api/v1/record/sale/growth");case 3:return a.abrupt("return",a.sent);case 6:return a.prev=6,a.t0=a["catch"](0),a.abrupt("return",a.t0);case 9:case"end":return a.stop();}},a,this,[[0,6]])}));return function(){return a.apply(this,arguments)}}(),n=function(){var a=g()(e.a.mark(function a(b,c,d,f,g){return e.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,i.f(h.a+"/api/v1/record/sale/rank",{page:b,pageSize:c,sort:d,start_time:f,end_time:g});case 3:return a.abrupt("return",a.sent);case 6:return a.prev=6,a.t0=a["catch"](0),a.abrupt("return",a.t0);case 9:case"end":return a.stop();}},a,this,[[0,6]])}));return function(){return a.apply(this,arguments)}}(),o=function(){var a=g()(e.a.mark(function a(){return e.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,i.f(h.a+"/api/v1/record/memberagin");case 3:return a.abrupt("return",a.sent);case 6:return a.prev=6,a.t0=a["catch"](0),a.abrupt("return",a.t0);case 9:case"end":return a.stop();}},a,this,[[0,6]])}));return function(){return a.apply(this,arguments)}}()},346:function(a,b,c){"use strict";var d=c(36),e=c.n(d),f=c(37),g=c.n(f),h=c(202),i=c(132),j=c.n(i);b.a={name:"sort",components:{echarts:i},data:function(){return{list:[],total:null,listLoading:!0,className:"className",className1:"className1",data:[],data1:[],name:[],options:[{value:1,label:"\u6309\u5929\u67E5"},{value:2,label:"\u6309\u6708\u67E5"}],id:"id",id1:"id1",listQuery:{type:1,time:[]}}},mounted:function(){var a=this;return g()(e.a.mark(function b(){return e.a.wrap(function(b){for(;;)switch(b.prev=b.next){case 0:a.getData();case 1:case"end":return b.stop();}},b,a)}))()},methods:{handleFilter:function(){this.getData()},changes:function(){this.listQuery.time=[]},getData:function(){var a=this;this.listLoading=!0;var b=null,c=null;0<this.listQuery.time.length&&1==this.listQuery.type&&(b=this.listQuery.time[0],c=this.listQuery.time[1]),0<this.listQuery.time.length&&2==this.listQuery.type&&(b=this.listQuery.time,c=this.listQuery.time),h.d(this.listQuery.type,b,c).then(function(b){a.listLoading=!1,"success"===b.error?(a.data=[],b.data.list.forEach(function(b){var c={};c.name=b.product_name,c.value=b.sell_quantity,a.data.push(c)}),a.data1=[],b.data.pre_list.forEach(function(b){var c={};c.name=b.product_name,c.value=b.sell_quantity,a.data1.push(c)}),a.initChart()):"invaild_token"===b.error||"not_login"===b.error?a.$router.push("/login"):b.error_description?a.$message.error(b.error_description):a.$message.error(b.error)})},initChart:function(){this.chart=i.init(document.getElementById(this.id)),this.chart.setOption({title:{text:"\u6536\u8D39\u9879\u76EE\u7EDF\u8BA1",x:"center"},tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},series:{name:"\u6536\u8D39\u9879\u76EE\u7EDF\u8BA1",type:"pie",roseType:"angle",radius:"55%",data:this.data,itemStyle:{shadowBlur:200,shadowOffsetX:0,shadowOffsetY:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}),this.chart=i.init(document.getElementById(this.id1)),this.chart.setOption({title:{text:"\u5904\u65B9\u7EDF\u8BA1",x:"center"},tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},series:{name:"\u5904\u65B9\u7EDF\u8BA1",type:"pie",roseType:"angle",radius:"55%",data:this.data1,itemStyle:{shadowBlur:200,shadowOffsetX:0,shadowOffsetY:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}})}}}},652:function(a,b,c){var d=c(653);"string"==typeof d&&(d=[[a.i,d,""]]),d.locals&&(a.exports=d.locals);c(131)("7a159126",d,!0,{})},653:function(a,b,c){b=a.exports=c(130)(!1),b.push([a.i,".handle-box[data-v-6b394c90]{margin-bottom:20px}.handle-select[data-v-6b394c90]{width:120px}.handle-input[data-v-6b394c90]{width:300px;display:inline-block}.table[data-v-6b394c90]{width:100%;font-size:14px}.red[data-v-6b394c90]{color:red}.table-expand[data-v-6b394c90]{font-size:0}.table-expand[data-v-6b394c90] label{width:120px;color:#909399;font-size:12px}.table-expand[data-v-6b394c90] .el-form-item__content{font-size:12px}.table-expand .el-form-item[data-v-6b394c90]{margin-right:0;margin-bottom:0;width:33%}",""])},654:function(a,b){"use strict";b.a={render:function(){var a=this,b=a.$createElement,c=a._self._c||b;return c("div",{staticClass:"table"},[c("div",{staticClass:"crumbs"},[c("el-breadcrumb",{attrs:{separator:"/"}},[c("el-breadcrumb-item",[c("i",{staticClass:"el-icon-lx-calendar"}),a._v("\u7EDF\u8BA1\u4E2D\u5FC3")]),a._v(" "),c("el-breadcrumb-item",[a._v("\u9500\u552E\u7EDF\u8BA1")])],1)],1),a._v(" "),c("div",{staticClass:"container"},[c("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[c("el-select",{attrs:{placeholder:"\u8BF7\u9009\u62E9"},on:{change:function(){return a.changes()}},model:{value:a.listQuery.type,callback:function(b){a.$set(a.listQuery,"type",b)},expression:"listQuery.type"}},a._l(a.options,function(a){return c("el-option",{key:a.value,attrs:{label:a.label,value:a.value}})}),1),a._v(" "),1==a.listQuery.type?c("el-date-picker",{attrs:{type:"daterange","value-format":"yyyy-MM-dd","range-separator":"\u81F3","start-placeholder":"\u5F00\u59CB\u65E5\u671F","end-placeholder":"\u7ED3\u675F\u65E5\u671F"},model:{value:a.listQuery.time,callback:function(b){a.$set(a.listQuery,"time",b)},expression:"listQuery.time"}}):a._e(),a._v(" "),2==a.listQuery.type?c("el-date-picker",{attrs:{type:"month","value-format":"yyyy-MM",placeholder:"\u9009\u62E9\u6708"},model:{value:a.listQuery.time,callback:function(b){a.$set(a.listQuery,"time",b)},expression:"listQuery.time"}}):a._e(),a._v(" "),c("el-button",{attrs:{type:"primary",icon:"el-icon-lx-search"},on:{click:a.handleFilter}},[a._v("\u67E5\u8BE2")])],1),a._v(" "),c("el-row",{attrs:{gutter:20}},[c("el-col",{attrs:{span:12}},[c("el-card",{attrs:{shadow:"hover"}},[c("div",{class:a.className,staticStyle:{height:"500px",width:"100%","margin-top":"10px"},attrs:{id:a.id}})])],1),a._v(" "),c("el-col",{attrs:{span:12}},[c("el-card",{attrs:{shadow:"hover"}},[c("div",{class:a.className1,staticStyle:{height:"500px",width:"100%","margin-top":"10px"},attrs:{id:a.id1}})])],1)],1)],1)])},staticRenderFns:[]}}});