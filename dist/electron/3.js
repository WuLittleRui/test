webpackJsonp([3],{162:function(a,b,c){"use strict";Object.defineProperty(b,"__esModule",{value:!0});var d=c(341),e=c(609),f=c(58),g=f(d.a,e.a,!1,function(){c(603)},"data-v-6f671426",null);b["default"]=g.exports},196:function(a,b,c){"use strict";b.__esModule=!0;var d=c(197),e=function(a){return a&&a.__esModule?a:{default:a}}(d);b.default=function(a,b,c){return b in a?(0,e.default)(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}},197:function(a,b,c){a.exports={default:c(198),__esModule:!0}},198:function(a,b,c){c(199);var d=c(2).Object;a.exports=function(a,b,c){return d.defineProperty(a,b,c)}},199:function(a,b,c){var d=c(4);d(d.S+d.F*!c(6),"Object",{defineProperty:c(5).f})},201:function(a,b,c){a.exports={default:c(203),__esModule:!0}},203:function(a,b,c){var d=c(2),e=d.JSON||(d.JSON={stringify:JSON.stringify});a.exports=function(){return e.stringify.apply(e,arguments)}},204:function(a,b){"use strict";var c=Math.pow;b.a=function(a,b){var d,e,f;try{d=a.toString().split(".")[1].length}catch(a){d=0}try{e=b.toString().split(".")[1].length}catch(a){e=0}return f=c(10,Math.max(d,e)),(a*f+b*f)/f},b.b=function(a,b){var d=0,e=a.toString(),f=b.toString();try{d+=e.split(".")[1].length}catch(a){}try{d+=f.split(".")[1].length}catch(a){}return+e.replace(".","")*+f.replace(".","")/c(10,d)}},215:function(a,b,c){"use strict";c.d(b,"e",function(){return j}),c.d(b,"f",function(){return k}),c.d(b,"d",function(){return l}),c.d(b,"b",function(){return m}),c.d(b,"a",function(){return n}),c.d(b,"c",function(){return o});var d=c(36),e=c.n(d),f=c(37),g=c.n(f),h=c(59),i=c(57),j=function(){var a=g()(e.a.mark(function a(b,c,d,f,g){return e.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,i.f(h.a+"/api/v1/hospitalstoreinventory/list",{page:b,pageSize:c,sort:d,name:f,materials_type:g});case 3:return a.abrupt("return",a.sent);case 6:return a.prev=6,a.t0=a["catch"](0),a.abrupt("return",a.t0);case 9:case"end":return a.stop();}},a,this,[[0,6]])}));return function(){return a.apply(this,arguments)}}(),k=function(){var a=g()(e.a.mark(function a(){return e.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,i.f(h.a+"/api/v1/hospitalstoreinventory/list/all");case 3:return a.abrupt("return",a.sent);case 6:return a.prev=6,a.t0=a["catch"](0),a.abrupt("return",a.t0);case 9:case"end":return a.stop();}},a,this,[[0,6]])}));return function(){return a.apply(this,arguments)}}(),l=function(){var a=g()(e.a.mark(function a(b){return e.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,i.e(h.a+"/api/v1/hospitalstoreinventory/"+b);case 3:return a.abrupt("return",a.sent);case 6:return a.prev=6,a.t0=a["catch"](0),a.abrupt("return",a.t0);case 9:case"end":return a.stop();}},a,this,[[0,6]])}));return function(){return a.apply(this,arguments)}}(),m=function(){var a=g()(e.a.mark(function a(b,c,d,f){return e.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,i.j(h.a+"/api/v1/hospitalstoreinventory/edit/price",{mp_id:b,purchase_price:c,warning_quantity:d,materials_type:f});case 3:return a.abrupt("return",a.sent);case 6:return a.prev=6,a.t0=a["catch"](0),a.abrupt("return",a.t0);case 9:case"end":return a.stop();}},a,this,[[0,6]])}));return function(){return a.apply(this,arguments)}}(),n=function(){var a=g()(e.a.mark(function a(b,c,d,f){return e.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,i.j(h.a+"/api/v1/hospitalstoreinventory/operate/number",{json:b,operate_type:c,order_sn:d,remark:f});case 3:return a.abrupt("return",a.sent);case 6:return a.prev=6,a.t0=a["catch"](0),a.abrupt("return",a.t0);case 9:case"end":return a.stop();}},a,this,[[0,6]])}));return function(){return a.apply(this,arguments)}}(),o=function(){var a=g()(e.a.mark(function a(){return e.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,i.f(h.a+"/api/v1/hospitalstoreinventory/exportExcel");case 3:return a.abrupt("return",a.sent);case 6:return a.prev=6,a.t0=a["catch"](0),a.abrupt("return",a.t0);case 9:case"end":return a.stop();}},a,this,[[0,6]])}));return function(){return a.apply(this,arguments)}}()},226:function(a,b,c){"use strict";var d=c(36),e=c.n(d),f=c(37),g=c.n(f),h=c(215),i=c(60);b.a={data:function(){return{editVisible:!1,title:"\u7F16\u8F91",button_loading:!1,form:{mp_id:"",title:null,purchase_price:"",warning_quantity:"",materials_type:""},rules:{title:[{required:!0,message:"\u8BF7\u8F93\u5165\u540D\u79F0",trigger:"blur"}],purchase_price:[{required:!0,message:"\u8BF7\u8F93\u5165\u6210\u672C\u4EF7",trigger:"blur"}],warning_quantity:[{required:!0,message:"\u8BF7\u8F93\u5165\u9884\u8B66\u6570\u91CF",trigger:"blur"}]}}},mounted:function(){},methods:{showNew:function(){this.title="\u65B0\u589E",this.resetForm(),this.typeDisable=!1,this.editVisible=!0},showEdit:function(a,b,c){var d=this;return g()(e.a.mark(function f(){return e.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return d.title="\u7F16\u8F91",d.resetForm(),d.form.title=b,d.form.materials_type=c,d.editVisible=!0,d.typeDisable=!0,e.next=8,d.getMaterialsInventory(a);case 8:case"end":return e.stop();}},f,d)}))()},submitForm:function(a){var b=this;this.$refs[a].validate(function(a){return!!a&&void(b.button_loading=!0,b.form.mp_id&&h.b(b.form.mp_id,b.form.purchase_price,b.form.warning_quantity,b.form.materials_type).then(function(a){"success"===a.error?(b.button_loading=!1,b.$message({type:"success",message:"\u7F16\u8F91\u6210\u529F!"}),b.$emit("refresh"),b.editVisible=!1):b.$message({type:"error",message:b.$t(a.error)})}))})},resetForm:function(){this.form.purchase_price=null,this.form.title="",this.form.mp_id="",this.form.materials_type=""},getMaterialsInventory:function(a){var b=this;h.d(a).then(function(c){"success"===c.error?(b.form.mp_id=a,null!==c.data.model&&null!==c.data.model.purchasePrice&&(b.form.purchase_price=c.data.model.purchasePrice),null!==c.data.model&&null!==c.data.model.warningQuantity&&(b.form.warning_quantity=c.data.model.warningQuantity)):b.$message.error(b.$t(data.error))})}}}},227:function(a,b,c){"use strict";var d=c(36),e=c.n(d),f=c(37),g=c.n(f),h=c(215),i=c(60),j=c(204);b.a={data:function(){return{editVisible:!1,title:"\u7F16\u8F91",button_loading:!1,inOutLabel:"\u5165\u5E93",inOutTypeLabel:"\u5165\u5E93\u7C7B\u578B",typeList:[{name:"\u91C7\u8D2D",value:1},{name:"\u501F\u7528",value:2},{name:"\u8BA2\u5355",value:3},{name:"\u7834\u635F",value:4}],stock_quantity:0,form:{inout:0,type:1,inventory_id:"",title:null,stock_quantity:0,amount:0,purchase_price:0,order_sn:"",remark:""},rules:{title:[{required:!0,message:"\u8BF7\u8F93\u5165\u540D\u79F0",trigger:"blur"}],stock_quantity:[{required:!0,message:"\u8BF7\u8F93\u5165\u5E93\u5B58\u6570\u91CF",trigger:"blur"}],order_sn:[{required:!0,message:"\u8BF7\u8F93\u5165\u8BA2\u5355\u7F16\u53F7",trigger:"blur"}]}}},mounted:function(){},methods:{outStock:function(a){var b=Object(j.a)(this.stock_quantity,-1*a);this.form.amount=Object(j.b)(b,this.form.purchase_price)},inStock:function(a){var b=Object(j.a)(a,-1*this.stock_quantity);this.form.amount=Object(j.b)(b,this.form.purchase_price)},showEdit:function(a,b,c){var d=this;return g()(e.a.mark(function f(){return e.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return d.resetForm(),d.form.title=b,d.form.inout=c,0===c?(d.title="\u51FA\u5E93",d.inOutLabel="\u51FA\u5E93\u603B\u989D",d.inOutTypeLabel="\u51FA\u5E93\u7C7B\u578B"):(d.title="\u5165\u5E93",d.inOutLabel="\u5165\u5E93\u603B\u989D",d.inOutTypeLabel="\u5165\u5E93\u7C7B\u578B"),d.editVisible=!0,d.typeDisable=!0,e.next=8,d.getMaterialsInventory(a);case 8:case"end":return e.stop();}},f,d)}))()},submitForm:function(a){var b=this;this.$refs[a].validate(function(a){if(a){b.button_loading=!0;var c="[{\"inventory_id\": "+b.form.inventory_id+", \"number\": "+b.form.stock_quantity+"}]";h.a(c,b.form.type,b.form.order_sn,b.form.remark).then(function(a){b.button_loading=!1,"success"===a.error?(b.button_loading=!1,b.$message({type:"success",message:"\u7F16\u8F91\u6210\u529F!"}),b.$emit("refresh"),b.editVisible=!1):b.$message({type:"error",message:b.$t(a.error)})})}else return!1})},resetForm:function(){this.form.purchase_price=null,this.form.title="",this.form.inventory_id="",this.form.stock_quantity=0,this.form.amount=0,this.form.type=1,this.form.purchase_price=0,this.form.order_sn="",this.form.remark=""},getMaterialsInventory:function(a){var b=this;h.d(a).then(function(c){"success"===c.error?(b.form.inventory_id=a,b.stock_quantity=c.data.model.stockQuantity,b.form.stock_quantity=c.data.model.stockQuantity,b.form.purchase_price=c.data.model.purchasePrice):b.$message.error(b.$t(data.error))})}}}},260:function(a,b,c){"use strict";var d=c(226),e=c(263),f=c(58),g=f(d.a,e.a,!1,function(){c(261)},null,null);b.a=g.exports},261:function(a,b,c){var d=c(262);"string"==typeof d&&(d=[[a.i,d,""]]),d.locals&&(a.exports=d.locals);c(131)("2672a370",d,!0,{})},262:function(a,b,c){b=a.exports=c(130)(!1),b.push([a.i,".tree{overflow:auto;height:200px}",""])},263:function(a,b){"use strict";b.a={render:function(){var a=this,b=a.$createElement,c=a._self._c||b;return c("el-dialog",{attrs:{title:a.title,visible:a.editVisible,width:"50%"},on:{"update:visible":function(b){a.editVisible=b}}},[c("el-form",{ref:"form",attrs:{model:a.form,rules:a.rules,"label-width":"110px"}},[c("el-form-item",{attrs:{label:"\u540D\u79F0",prop:"title"}},[c("el-input",{attrs:{disabled:""},model:{value:a.form.title,callback:function(b){a.$set(a.form,"title",b)},expression:"form.title"}})],1),a._v(" "),c("el-form-item",{attrs:{label:"\u6210\u672C\u4EF7",prop:"purchase_price"}},[c("el-input-number",{attrs:{precision:2,step:1,min:0},model:{value:a.form.purchase_price,callback:function(b){a.$set(a.form,"purchase_price",b)},expression:"form.purchase_price"}})],1),a._v(" "),c("el-form-item",{attrs:{label:"\u9884\u8B66\u6570\u91CF",prop:"warning_quantity"}},[c("el-input-number",{attrs:{precision:0,step:1,min:0},model:{value:a.form.warning_quantity,callback:function(b){a.$set(a.form,"warning_quantity",b)},expression:"form.warning_quantity"}})],1)],1),a._v(" "),c("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[c("el-button",{on:{click:function(){a.editVisible=!1}}},[a._v("\u53D6 \u6D88")]),a._v(" "),c("el-button",{attrs:{type:"primary",loading:a.button_loading},on:{click:function(){return a.submitForm("form")}}},[a._v("\u786E \u5B9A")])],1)],1)},staticRenderFns:[]}},264:function(a,b,c){"use strict";var d=c(227),e=c(267),f=c(58),g=f(d.a,e.a,!1,function(){c(265)},null,null);b.a=g.exports},265:function(a,b,c){var d=c(266);"string"==typeof d&&(d=[[a.i,d,""]]),d.locals&&(a.exports=d.locals);c(131)("b767faae",d,!0,{})},266:function(a,b,c){b=a.exports=c(130)(!1),b.push([a.i,".tree{overflow:auto;height:200px}",""])},267:function(a,b){"use strict";b.a={render:function(){var a=this,b=a.$createElement,c=a._self._c||b;return c("el-dialog",{attrs:{title:a.title,visible:a.editVisible,width:"50%"},on:{"update:visible":function(b){a.editVisible=b}}},[c("el-form",{ref:"form",attrs:{model:a.form,rules:a.rules,"label-width":"110px"}},[c("el-form-item",{attrs:{label:"\u540D\u79F0",prop:"title"}},[c("el-input",{attrs:{disabled:""},model:{value:a.form.title,callback:function(b){a.$set(a.form,"title",b)},expression:"form.title"}})],1),a._v(" "),c("el-form-item",{attrs:{label:a.inOutTypeLabel,prop:"stock_quantity"}},[c("el-select",{staticClass:"handle-select mr10",attrs:{clearable:"",placeholder:"\u8BF7\u9009\u62E9\u7C7B\u578B"},model:{value:a.form.type,callback:function(b){a.$set(a.form,"type",b)},expression:"form.type"}},a._l(a.typeList,function(a){return c("el-option",{key:a.value,attrs:{label:a.name,value:a.value}})}),1)],1),a._v(" "),c("el-form-item",{attrs:{label:"\u5E93\u5B58\u6570\u91CF",prop:"stock_quantity"}},[0===a.form.inout?c("el-input-number",{attrs:{precision:0,step:1,min:0,max:a.stock_quantity},on:{change:a.outStock},model:{value:a.form.stock_quantity,callback:function(b){a.$set(a.form,"stock_quantity",b)},expression:"form.stock_quantity"}}):a._e(),a._v(" "),1===a.form.inout?c("el-input-number",{attrs:{precision:0,step:1,min:a.stock_quantity},on:{change:a.inStock},model:{value:a.form.stock_quantity,callback:function(b){a.$set(a.form,"stock_quantity",b)},expression:"form.stock_quantity"}}):a._e()],1),a._v(" "),3===a.form.type?c("el-form-item",{attrs:{label:"\u8BA2\u5355\u7F16\u53F7",prop:"order_sn"}},[c("el-input",{model:{value:a.form.order_sn,callback:function(b){a.$set(a.form,"order_sn",b)},expression:"form.order_sn"}})],1):a._e(),a._v(" "),c("el-form-item",{attrs:{label:"\u5907\u6CE8"}},[c("el-input",{model:{value:a.form.remark,callback:function(b){a.$set(a.form,"remark",b)},expression:"form.remark"}})],1)],1),a._v(" "),c("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[c("div",[c("div",[a._v(a._s(a.title)+":"+a._s(a.form.new_number))]),a._v(" "),1===a.form.type?c("div",[a._v(a._s(a.title)+"\u603B\u989D:"+a._s(a.form.amount))]):a._e()]),a._v(" "),c("el-button",{on:{click:function(){a.editVisible=!1}}},[a._v("\u53D6 \u6D88")]),a._v(" "),c("el-button",{attrs:{type:"primary",loading:a.button_loading},on:{click:function(){return a.submitForm("form")}}},[a._v("\u786E \u5B9A")])],1)],1)},staticRenderFns:[]}},341:function(a,b,c){"use strict";var d=c(196),e=c.n(d),f=c(36),g=c.n(f),h=c(37),i=c.n(h),j=c(260),k=c(605),l=c(264),m=c(215),n=c(57),o=c(60);b.a={name:"MaterialsInventory",components:{ListEdit:j.a,MaterialsInventoryInOrOut:l.a,MaterialsInventoryBatchInOrOut:k.a},data:function(){return{multipleSelection:[],typeList:[{name:"\u5546\u54C1",value:1},{name:"\u7269\u6599",value:2}],list:[],downloadLoading:!1,total:null,listLoading:!0,listQuery:{page:1,limit:20,sort:null,searchKey:"",type:""},auth:{STOCKLIST_ADD:!1,STOCKLIST_EDIT:!1}}},mounted:function(){var a=this;return i()(g.a.mark(function b(){return g.a.wrap(function(b){for(;;)switch(b.prev=b.next){case 0:return b.next=2,n.a("STOCK_LIST");case 2:return a.auth.STOCKLIST_ADD=b.sent,b.next=5,n.a("STOCK_LIST");case 5:a.auth.STOCKLIST_EDIT=b.sent,a.getData();case 7:case"end":return b.stop();}},b,a)}))()},methods:e()({handleDownload:function(){var a=this;this.downloadLoading=!0,m.c().then(function(b){if(a.downloadLoading=!1,"success"===b.error){var c=document.createElement("iframe");c.src=b.data.path,c.style.display="none",document.body.appendChild(c)}else"invaild_token"===b.error||"not_login"===b.error?a.$router.push("/login"):b.error_description?a.$message.error(b.error_description):a.$message.error(b.error)})},handleCurrentChange:function(a){this.listQuery.page=a,this.getData()},getData:function(){var a=this;this.listLoading=!0,m.e(this.listQuery.page,this.listQuery.limit,this.listQuery.sort,this.listQuery.searchKey,this.listQuery.type).then(function(b){a.listLoading=!1,"success"===b.error?(a.total=b.data.total,a.list=b.data.list):"invaild_token"===b.error||"not_login"===b.error?a.$router.push("/login"):b.error_description?a.$message.error(b.error_description):a.$message.error(b.error)})},search:function(){this.listQuery.page=1,this.getData()},hanldeSort:function(a){this.listQuery.sort=a.prop+("ascending"==a.order?"":" desc"),this.getData()},formatterType:function(a){for(var b=0;b<this.typeList.length;b++)if(this.typeList[b].value==a.materials_type)return this.typeList[b].name},handleEdit:function(a,b){this.$refs.ListEdit.showEdit(b.mp_id,b.title,b.materials_type)},handleBatch:function(){this.$refs.MaterialsInventoryBatchInOrOut.showEdit()},handleOperate:function(a,b,c){this.$refs.materialsInventoryInOrOut.showEdit(b.inventory_id,b.title,c)},handleSelectionChange:function(a){this.multipleSelection=a},handleSizeChange:function(a){this.listQuery.limit=a,this.getData()}},"handleCurrentChange",function(a){this.listQuery.page=a,this.getData()})}},342:function(a,b,c){"use strict";var d=c(201),e=c.n(d),f=c(36),g=c.n(f),h=c(37),i=c.n(h),j=c(215),k=c(60),l=c(204);b.a={data:function(){return{editVisible:!1,title:"\u7F16\u8F91",button_loading:!1,productlistLoading:!1,inOutLabel:"\u5165\u5E93",productsList:[],multipleSelection:[],inOutTypeLabel:"\u5165\u5E93\u7C7B\u578B",typeList:[{name:"\u91C7\u8D2D",value:1},{name:"\u501F\u7528",value:2},{name:"\u8BA2\u5355",value:3},{name:"\u7834\u635F",value:4}],stock_quantity:0,form:{inout:0,type:1,inventory_id:"",title:null,stock_quantity:0,amount:0,purchase_price:0,order_sn:"",remark:""},rules:{title:[{required:!0,message:"\u8BF7\u8F93\u5165\u540D\u79F0",trigger:"blur"}],stock_quantity:[{required:!0,message:"\u8BF7\u8F93\u5165\u5E93\u5B58\u6570\u91CF",trigger:"blur"}],order_sn:[{required:!0,message:"\u8BF7\u8F93\u5165\u8BA2\u5355\u7F16\u53F7",trigger:"blur"}]}}},methods:{changeFun:function(a){var b=[];a.forEach(function(a){b.push({mp_id:a.mp_id,number:a.number,type:a.materials_type})},this),this.multipleSelection=b},stockChange:function(a,b){this.multipleSelection.forEach(function(c){c.mp_id===a&&(c.number=b)},this)},showEdit:function(){var a=this;return i()(g.a.mark(function b(){return g.a.wrap(function(b){for(;;)switch(b.prev=b.next){case 0:return a.resetForm(),a.editVisible=!0,a.typeDisable=!0,b.next=5,a.getData();case 5:case"end":return b.stop();}},b,a)}))()},submitForm:function(a){var b=this;this.$refs[a].validate(function(a){if(a){var c=b.multipleSelection.length;if(0==c)return void b.$message({type:"error",message:"\u8BF7\u52FE\u9009\u9700\u8981\u8C03\u6574\u5E93\u5B58\u7684\u8BB0\u5F55\uFF01"});2!=b.form.type&&4!=b.form.type,b.button_loading=!0,j.a(e()(b.multipleSelection),b.form.type,b.form.order_sn,b.form.remark).then(function(a){b.button_loading=!1,"success"===a.error?(b.button_loading=!1,b.$message({type:"success",message:"\u7F16\u8F91\u6210\u529F!"}),b.$emit("refresh"),b.editVisible=!1):b.$message({type:"error",message:b.$t(a.error)})})}else return!1})},getData:function(){var a=this;this.listLoading=!0,j.f().then(function(b){a.listLoading=!1,"success"===b.error?a.productsList=b.data.list:"invaild_token"===b.error||"not_login"===b.error?a.$router.push("/login"):b.error_description?a.$message.error(b.error_description):a.$message.error(b.error)})},resetForm:function(){var a=this;this.form.purchase_price=null,this.form.title="",this.form.inventory_id="",this.form.stock_quantity=0,this.form.amount=0,this.form.type=1,this.form.purchase_price=0,this.form.order_sn="",this.form.remark="",this.multipleSelection=[],this.$nextTick(function(){a.$refs.multipleTable!==void 0&&a.$refs.multipleTable.clearSelection()})}}}},603:function(a,b,c){var d=c(604);"string"==typeof d&&(d=[[a.i,d,""]]),d.locals&&(a.exports=d.locals);c(131)("51d5c48c",d,!0,{})},604:function(a,b,c){b=a.exports=c(130)(!1),b.push([a.i,".handle-box[data-v-6f671426]{margin-bottom:20px}.handle-select[data-v-6f671426]{width:120px}.handle-input[data-v-6f671426]{width:300px;display:inline-block}.table[data-v-6f671426]{width:100%;font-size:14px}.red[data-v-6f671426]{color:red}.table-expand[data-v-6f671426]{font-size:0}.table-expand[data-v-6f671426] label{width:120px;color:#909399;font-size:12px}.table-expand[data-v-6f671426] .el-form-item__content{font-size:12px}.table-expand .el-form-item[data-v-6f671426]{margin-right:0;margin-bottom:0;width:33%}",""])},605:function(a,b,c){"use strict";var d=c(342),e=c(608),f=c(58),g=f(d.a,e.a,!1,function(){c(606)},null,null);b.a=g.exports},606:function(a,b,c){var d=c(607);"string"==typeof d&&(d=[[a.i,d,""]]),d.locals&&(a.exports=d.locals);c(131)("70f7664a",d,!0,{})},607:function(a,b,c){b=a.exports=c(130)(!1),b.push([a.i,".tree{overflow:auto;height:200px}",""])},608:function(a,b){"use strict";b.a={render:function(){var a=this,b=a.$createElement,c=a._self._c||b;return c("el-dialog",{attrs:{title:"\u5E93\u5B58",visible:a.editVisible,width:"50%"},on:{"update:visible":function(b){a.editVisible=b}}},[c("el-form",{ref:"form",attrs:{model:a.form,rules:a.rules,"label-width":"110px"}},[c("el-form-item",{attrs:{label:a.inOutTypeLabel,prop:"stock_quantity"}},[c("el-select",{staticClass:"handle-select mr10",attrs:{clearable:"",placeholder:"\u8BF7\u9009\u62E9\u7C7B\u578B"},model:{value:a.form.type,callback:function(b){a.$set(a.form,"type",b)},expression:"form.type"}},a._l(a.typeList,function(a){return c("el-option",{key:a.value,attrs:{label:a.name,value:a.value}})}),1)],1),a._v(" "),3===a.form.type?c("el-form-item",{attrs:{label:"\u8BA2\u5355\u7F16\u53F7",prop:"order_sn"}},[c("el-input",{model:{value:a.form.order_sn,callback:function(b){a.$set(a.form,"order_sn",b)},expression:"form.order_sn"}})],1):a._e(),a._v(" "),c("el-form-item",{attrs:{label:"\u5907\u6CE8"}},[c("el-input",{model:{value:a.form.remark,callback:function(b){a.$set(a.form,"remark",b)},expression:"form.remark"}})],1),a._v(" "),c("el-form-item",{attrs:{label:"\u5546\u54C1\u5E93\u5B58"}},[c("el-table",{directives:[{name:"loading",rawName:"v-loading",value:a.productlistLoading,expression:"productlistLoading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:a.productsList,"tooltip-effect":"dark",border:"",height:"200","element-loading-text":"\u7ED9\u6211\u4E00\u70B9\u65F6\u95F4"},on:{"selection-change":a.changeFun}},[c("el-table-column",{attrs:{type:"selection"},on:{"selection-change":a.changeFun}}),a._v(" "),c("el-table-column",{attrs:{label:"\u540D\u79F0"},scopedSlots:a._u([{key:"default",fn:function(b){return[a._v(a._s(b.row.title))]}}])}),a._v(" "),c("el-table-column",{attrs:{label:"\u6210\u672C\u4EF7"},scopedSlots:a._u([{key:"default",fn:function(b){return[b.row.purchase_price===void 0?c("span",[a._v("0")]):c("span",[a._v(a._s(b.row.purchase_price))])]}}])}),a._v(" "),c("el-table-column",{attrs:{label:"\u5E93\u5B58\u6570\u91CF"},scopedSlots:a._u([{key:"default",fn:function(b){return[c("el-input-number",{attrs:{precision:0,step:1},on:{change:function(c){return a.stockChange(b.row.mp_id,c)}},model:{value:b.row.number,callback:function(c){a.$set(b.row,"number",c)},expression:"scope.row.number"}})]}}])})],1)],1)],1),a._v(" "),c("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[c("el-button",{on:{click:function(){a.editVisible=!1}}},[a._v("\u53D6 \u6D88")]),a._v(" "),c("el-button",{attrs:{type:"primary",loading:a.button_loading},on:{click:function(){return a.submitForm("form")}}},[a._v("\u786E \u5B9A")])],1)],1)},staticRenderFns:[]}},609:function(a,b){"use strict";b.a={render:function(){var a=this,b=a.$createElement,c=a._self._c||b;return c("div",{staticClass:"table"},[c("div",{staticClass:"crumbs"},[c("el-breadcrumb",{attrs:{separator:"/"}},[c("el-breadcrumb-item",[a._v("\u5E93\u5B58\u4E2D\u5FC3")]),a._v(" "),c("el-breadcrumb-item",[a._v("\u5E93\u5B58\u5217\u8868")])],1)],1),a._v(" "),c("div",{staticClass:"container"},[c("div",{staticClass:"handle-box"},[c("el-input",{staticClass:"handle-input mr10",attrs:{placeholder:"\u7B5B\u9009\u5173\u952E\u5B57"},model:{value:a.listQuery.searchKey,callback:function(b){a.$set(a.listQuery,"searchKey",b)},expression:"listQuery.searchKey"}}),a._v(" "),c("el-select",{staticClass:"handle-select mr10",attrs:{clearable:"",placeholder:"\u8BF7\u9009\u62E9\u7C7B\u578B"},model:{value:a.listQuery.type,callback:function(b){a.$set(a.listQuery,"type",b)},expression:"listQuery.type"}},a._l(a.typeList,function(a){return c("el-option",{key:a.value,attrs:{label:a.name,value:a.value}})}),1),a._v(" "),c("el-button",{attrs:{type:"primary",icon:"el-icon-lx-search"},on:{click:a.search}},[a._v("\u641C\u7D22")]),a._v(" "),c("el-button",{attrs:{type:"primary",icon:"el-icon-download",loading:a.downloadLoading},on:{click:a.handleDownload}},[a._v("\u5BFC\u51FA\u8868\u683C")]),a._v(" "),c("el-button",{attrs:{type:"primary",icon:"el-icon-edit"},on:{click:a.handleBatch}},[a._v("\u6279\u91CF\u8C03\u6574")])],1),a._v(" "),c("el-table",{directives:[{name:"loading",rawName:"v-loading",value:a.listLoading,expression:"listLoading"}],ref:"multipleTable",staticClass:"table",attrs:{data:a.list,border:"","empty-text":"\u6CA1\u6709\u4EFB\u4F55\u8BB0\u5F55","element-loading-text":"\u7ED9\u6211\u4E00\u70B9\u65F6\u95F4"},on:{"sort-change":a.hanldeSort,"selection-change":a.handleSelectionChange}},[c("el-table-column",{attrs:{type:"expand"},scopedSlots:a._u([{key:"default",fn:function(b){return[c("el-form",{staticClass:"table-expand",attrs:{"label-position":"left",inline:""}},[c("el-form-item",{attrs:{label:"\u8FDB\u8D27\u603B\u6570"}},[b.row.total_purchases===void 0?c("span",[a._v("0")]):c("span",[a._v(a._s(b.row.total_purchases))])]),a._v(" "),c("el-form-item",{attrs:{label:"\u8FDB\u8D27\u603B\u989D"}},[b.row.purchase_amount===void 0?c("span",[a._v("0")]):c("span",[a._v(a._s(b.row.purchase_amount))])]),a._v(" "),c("el-form-item",{attrs:{label:"\u51FA\u5E93\u603B\u6570"}},[b.row.total_deliver===void 0?c("span",[a._v("0")]):c("span",[a._v(a._s(b.row.total_deliver))])]),a._v(" "),c("el-form-item",{attrs:{label:"\u51FA\u5E93\u603B\u989D"}},[b.row.deliver_amount===void 0?c("span",[a._v("0")]):c("span",[a._v(a._s(b.row.deliver_amount))])])],1)]}}])}),a._v(" "),c("el-table-column",{attrs:{prop:"title",label:"\u540D\u79F0","header-align":"center",align:"center",sortable:"","min-width":"120"}}),a._v(" "),c("el-table-column",{attrs:{prop:"materials_type",label:"\u7C7B\u578B","header-align":"center",align:"center",sortable:"","min-width":"120",formatter:a.formatterType}}),a._v(" "),c("el-table-column",{attrs:{label:"\u5E93\u5B58\u6570\u91CF","header-align":"center",align:"center",sortable:"","min-width":"120"},scopedSlots:a._u([{key:"default",fn:function(b){return[b.row.stock_quantity===void 0?c("span",[a._v("0")]):c("span",[a._v(a._s(b.row.stock_quantity))])]}}])}),a._v(" "),c("el-table-column",{attrs:{label:"\u6210\u672C\u4EF7","header-align":"center",align:"center",sortable:"","min-width":"120"},scopedSlots:a._u([{key:"default",fn:function(b){return[b.row.purchase_price===void 0?c("span",[a._v("0")]):c("span",[a._v(a._s(b.row.purchase_price))])]}}])}),a._v(" "),c("el-table-column",{attrs:{label:"\u9884\u8B66\u6570\u91CF","header-align":"center",align:"center",sortable:"","min-width":"120"},scopedSlots:a._u([{key:"default",fn:function(b){return[b.row.warning_quantity===void 0?c("span",[a._v("0")]):c("span",[a._v(a._s(b.row.warning_quantity))])]}}])}),a._v(" "),a.auth.STOCKLIST_EDIT&&a.auth.STOCKLIST_EDIT?c("el-table-column",{attrs:{label:"\u64CD\u4F5C","header-align":"center",align:"center","min-width":"160"},scopedSlots:a._u([{key:"default",fn:function(b){return[a.auth.STOCKLIST_EDIT?c("el-button",{attrs:{type:"text",icon:"el-icon-edit"},on:{click:function(){return a.handleEdit(b.$index,b.row)}}},[a._v("\u8BBE\u7F6E\u6210\u672C\u4EF7")]):a._e()]}}],null,!1,2310607125)}):a._e()],1),a._v(" "),c("div",{staticClass:"pagination"},[c("el-pagination",{attrs:{background:"","current-page":a.listQuery.page,"page-sizes":[20,30,50],"page-size":a.listQuery.limit,layout:"total, sizes, prev, pager, next, jumper",total:a.total},on:{"size-change":a.handleSizeChange,"current-change":a.handleCurrentChange}})],1)],1),a._v(" "),c("ListEdit",{ref:"ListEdit",on:{refresh:a.getData}}),a._v(" "),c("MaterialsInventoryInOrOut",{ref:"MaterialsInventoryInOrOut",on:{refresh:a.getData}}),a._v(" "),c("MaterialsInventoryBatchInOrOut",{ref:"MaterialsInventoryBatchInOrOut",on:{refresh:a.getData}})],1)},staticRenderFns:[]}}});