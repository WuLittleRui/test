webpackJsonp([1],{164:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(344),i=r(623),o=r(58),l=o(a.a,i.a,!1,function(){r(613)},"data-v-a91b6a44",null);t["default"]=l.exports},196:function(e,t,r){"use strict";t.__esModule=!0;var a=r(197),i=function(e){return e&&e.__esModule?e:{default:e}}(a);t.default=function(e,t,r){return t in e?(0,i.default)(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}},197:function(e,t,r){e.exports={default:r(198),__esModule:!0}},198:function(e,t,r){r(199);var a=r(2).Object;e.exports=function(e,t,r){return a.defineProperty(e,t,r)}},199:function(e,t,r){var a=r(4);a(a.S+a.F*!r(6),"Object",{defineProperty:r(5).f})},201:function(e,t,r){e.exports={default:r(203),__esModule:!0}},203:function(e,t,r){var a=r(2),i=a.JSON||(a.JSON={stringify:JSON.stringify});e.exports=function(){return i.stringify.apply(i,arguments)}},204:function(e,t){"use strict";var r=Math.pow;t.a=function(e,t){var a,i,o;try{a=e.toString().split(".")[1].length}catch(t){a=0}try{i=t.toString().split(".")[1].length}catch(t){i=0}return o=r(10,Math.max(a,i)),(e*o+t*o)/o},t.b=function(e,t){var a=0,i=e.toString(),o=t.toString();try{a+=i.split(".")[1].length}catch(t){}try{a+=o.split(".")[1].length}catch(t){}return+i.replace(".","")*+o.replace(".","")/r(10,a)}},215:function(e,t,r){"use strict";r.d(t,"e",function(){return p}),r.d(t,"f",function(){return d}),r.d(t,"d",function(){return u}),r.d(t,"b",function(){return m}),r.d(t,"a",function(){return c}),r.d(t,"c",function(){return _});var a=r(36),i=r.n(a),o=r(37),l=r.n(o),s=r(59),n=r(57),p=function(){var e=l()(i.a.mark(function e(t,r,a,o,l){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.f(s.a+"/api/v1/hospitalstoreinventory/list",{page:t,pageSize:r,sort:a,name:o,materials_type:l});case 3:return e.abrupt("return",e.sent);case 6:return e.prev=6,e.t0=e["catch"](0),e.abrupt("return",e.t0);case 9:case"end":return e.stop();}},e,this,[[0,6]])}));return function(){return e.apply(this,arguments)}}(),d=function(){var e=l()(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.f(s.a+"/api/v1/hospitalstoreinventory/list/all");case 3:return e.abrupt("return",e.sent);case 6:return e.prev=6,e.t0=e["catch"](0),e.abrupt("return",e.t0);case 9:case"end":return e.stop();}},e,this,[[0,6]])}));return function(){return e.apply(this,arguments)}}(),u=function(){var e=l()(i.a.mark(function e(t){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.e(s.a+"/api/v1/hospitalstoreinventory/"+t);case 3:return e.abrupt("return",e.sent);case 6:return e.prev=6,e.t0=e["catch"](0),e.abrupt("return",e.t0);case 9:case"end":return e.stop();}},e,this,[[0,6]])}));return function(){return e.apply(this,arguments)}}(),m=function(){var e=l()(i.a.mark(function e(t,r,a,o){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.j(s.a+"/api/v1/hospitalstoreinventory/edit/price",{mp_id:t,purchase_price:r,warning_quantity:a,materials_type:o});case 3:return e.abrupt("return",e.sent);case 6:return e.prev=6,e.t0=e["catch"](0),e.abrupt("return",e.t0);case 9:case"end":return e.stop();}},e,this,[[0,6]])}));return function(){return e.apply(this,arguments)}}(),c=function(){var e=l()(i.a.mark(function e(t,r,a,o){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.j(s.a+"/api/v1/hospitalstoreinventory/operate/number",{json:t,operate_type:r,order_sn:a,remark:o});case 3:return e.abrupt("return",e.sent);case 6:return e.prev=6,e.t0=e["catch"](0),e.abrupt("return",e.t0);case 9:case"end":return e.stop();}},e,this,[[0,6]])}));return function(){return e.apply(this,arguments)}}(),_=function(){var e=l()(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.f(s.a+"/api/v1/hospitalstoreinventory/exportExcel");case 3:return e.abrupt("return",e.sent);case 6:return e.prev=6,e.t0=e["catch"](0),e.abrupt("return",e.t0);case 9:case"end":return e.stop();}},e,this,[[0,6]])}));return function(){return e.apply(this,arguments)}}()},226:function(e,t,r){"use strict";var a=r(36),i=r.n(a),o=r(37),l=r.n(o),s=r(215),n=r(60);t.a={data:function(){return{editVisible:!1,title:"\u7F16\u8F91",button_loading:!1,form:{mp_id:"",title:null,purchase_price:"",warning_quantity:"",materials_type:""},rules:{title:[{required:!0,message:"\u8BF7\u8F93\u5165\u540D\u79F0",trigger:"blur"}],purchase_price:[{required:!0,message:"\u8BF7\u8F93\u5165\u6210\u672C\u4EF7",trigger:"blur"}],warning_quantity:[{required:!0,message:"\u8BF7\u8F93\u5165\u9884\u8B66\u6570\u91CF",trigger:"blur"}]}}},mounted:function(){},methods:{showNew:function(){this.title="\u65B0\u589E",this.resetForm(),this.typeDisable=!1,this.editVisible=!0},showEdit:function(e,t,r){var a=this;return l()(i.a.mark(function o(){return i.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return a.title="\u7F16\u8F91",a.resetForm(),a.form.title=t,a.form.materials_type=r,a.editVisible=!0,a.typeDisable=!0,i.next=8,a.getMaterialsInventory(e);case 8:case"end":return i.stop();}},o,a)}))()},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){return!!e&&void(t.button_loading=!0,t.form.mp_id&&s.b(t.form.mp_id,t.form.purchase_price,t.form.warning_quantity,t.form.materials_type).then(function(e){"success"===e.error?(t.button_loading=!1,t.$message({type:"success",message:"\u7F16\u8F91\u6210\u529F!"}),t.$emit("refresh"),t.editVisible=!1):t.$message({type:"error",message:t.$t(e.error)})}))})},resetForm:function(){this.form.purchase_price=null,this.form.title="",this.form.mp_id="",this.form.materials_type=""},getMaterialsInventory:function(e){var t=this;s.d(e).then(function(r){"success"===r.error?(t.form.mp_id=e,null!==r.data.model&&null!==r.data.model.purchasePrice&&(t.form.purchase_price=r.data.model.purchasePrice),null!==r.data.model&&null!==r.data.model.warningQuantity&&(t.form.warning_quantity=r.data.model.warningQuantity)):t.$message.error(t.$t(data.error))})}}}},227:function(e,t,r){"use strict";var a=r(36),i=r.n(a),o=r(37),l=r.n(o),s=r(215),n=r(60),p=r(204);t.a={data:function(){return{editVisible:!1,title:"\u7F16\u8F91",button_loading:!1,inOutLabel:"\u5165\u5E93",inOutTypeLabel:"\u5165\u5E93\u7C7B\u578B",typeList:[{name:"\u91C7\u8D2D",value:1},{name:"\u501F\u7528",value:2},{name:"\u8BA2\u5355",value:3},{name:"\u7834\u635F",value:4}],stock_quantity:0,form:{inout:0,type:1,inventory_id:"",title:null,stock_quantity:0,amount:0,purchase_price:0,order_sn:"",remark:""},rules:{title:[{required:!0,message:"\u8BF7\u8F93\u5165\u540D\u79F0",trigger:"blur"}],stock_quantity:[{required:!0,message:"\u8BF7\u8F93\u5165\u5E93\u5B58\u6570\u91CF",trigger:"blur"}],order_sn:[{required:!0,message:"\u8BF7\u8F93\u5165\u8BA2\u5355\u7F16\u53F7",trigger:"blur"}]}}},mounted:function(){},methods:{outStock:function(e){var t=Object(p.a)(this.stock_quantity,-1*e);this.form.amount=Object(p.b)(t,this.form.purchase_price)},inStock:function(e){var t=Object(p.a)(e,-1*this.stock_quantity);this.form.amount=Object(p.b)(t,this.form.purchase_price)},showEdit:function(e,t,r){var a=this;return l()(i.a.mark(function o(){return i.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return a.resetForm(),a.form.title=t,a.form.inout=r,0===r?(a.title="\u51FA\u5E93",a.inOutLabel="\u51FA\u5E93\u603B\u989D",a.inOutTypeLabel="\u51FA\u5E93\u7C7B\u578B"):(a.title="\u5165\u5E93",a.inOutLabel="\u5165\u5E93\u603B\u989D",a.inOutTypeLabel="\u5165\u5E93\u7C7B\u578B"),a.editVisible=!0,a.typeDisable=!0,i.next=8,a.getMaterialsInventory(e);case 8:case"end":return i.stop();}},o,a)}))()},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(e){t.button_loading=!0;var r="[{\"inventory_id\": "+t.form.inventory_id+", \"number\": "+t.form.stock_quantity+"}]";s.a(r,t.form.type,t.form.order_sn,t.form.remark).then(function(e){t.button_loading=!1,"success"===e.error?(t.button_loading=!1,t.$message({type:"success",message:"\u7F16\u8F91\u6210\u529F!"}),t.$emit("refresh"),t.editVisible=!1):t.$message({type:"error",message:t.$t(e.error)})})}else return!1})},resetForm:function(){this.form.purchase_price=null,this.form.title="",this.form.inventory_id="",this.form.stock_quantity=0,this.form.amount=0,this.form.type=1,this.form.purchase_price=0,this.form.order_sn="",this.form.remark=""},getMaterialsInventory:function(e){var t=this;s.d(e).then(function(r){"success"===r.error?(t.form.inventory_id=e,t.stock_quantity=r.data.model.stockQuantity,t.form.stock_quantity=r.data.model.stockQuantity,t.form.purchase_price=r.data.model.purchasePrice):t.$message.error(t.$t(data.error))})}}}},260:function(e,t,r){"use strict";var a=r(226),i=r(263),o=r(58),l=o(a.a,i.a,!1,function(){r(261)},null,null);t.a=l.exports},261:function(e,t,r){var a=r(262);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);r(131)("2672a370",a,!0,{})},262:function(e,t,r){t=e.exports=r(130)(!1),t.push([e.i,".tree{overflow:auto;height:200px}",""])},263:function(e,t){"use strict";t.a={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-dialog",{attrs:{title:e.title,visible:e.editVisible,width:"50%"},on:{"update:visible":function(t){e.editVisible=t}}},[r("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"110px"}},[r("el-form-item",{attrs:{label:"\u540D\u79F0",prop:"title"}},[r("el-input",{attrs:{disabled:""},model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"\u6210\u672C\u4EF7",prop:"purchase_price"}},[r("el-input-number",{attrs:{precision:2,step:1,min:0},model:{value:e.form.purchase_price,callback:function(t){e.$set(e.form,"purchase_price",t)},expression:"form.purchase_price"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"\u9884\u8B66\u6570\u91CF",prop:"warning_quantity"}},[r("el-input-number",{attrs:{precision:0,step:1,min:0},model:{value:e.form.warning_quantity,callback:function(t){e.$set(e.form,"warning_quantity",t)},expression:"form.warning_quantity"}})],1)],1),e._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(){e.editVisible=!1}}},[e._v("\u53D6 \u6D88")]),e._v(" "),r("el-button",{attrs:{type:"primary",loading:e.button_loading},on:{click:function(){return e.submitForm("form")}}},[e._v("\u786E \u5B9A")])],1)],1)},staticRenderFns:[]}},264:function(e,t,r){"use strict";var a=r(227),i=r(267),o=r(58),l=o(a.a,i.a,!1,function(){r(265)},null,null);t.a=l.exports},265:function(e,t,r){var a=r(266);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);r(131)("b767faae",a,!0,{})},266:function(e,t,r){t=e.exports=r(130)(!1),t.push([e.i,".tree{overflow:auto;height:200px}",""])},267:function(e,t){"use strict";t.a={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-dialog",{attrs:{title:e.title,visible:e.editVisible,width:"50%"},on:{"update:visible":function(t){e.editVisible=t}}},[r("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"110px"}},[r("el-form-item",{attrs:{label:"\u540D\u79F0",prop:"title"}},[r("el-input",{attrs:{disabled:""},model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),e._v(" "),r("el-form-item",{attrs:{label:e.inOutTypeLabel,prop:"stock_quantity"}},[r("el-select",{staticClass:"handle-select mr10",attrs:{clearable:"",placeholder:"\u8BF7\u9009\u62E9\u7C7B\u578B"},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}},e._l(e.typeList,function(e){return r("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})}),1)],1),e._v(" "),r("el-form-item",{attrs:{label:"\u5E93\u5B58\u6570\u91CF",prop:"stock_quantity"}},[0===e.form.inout?r("el-input-number",{attrs:{precision:0,step:1,min:0,max:e.stock_quantity},on:{change:e.outStock},model:{value:e.form.stock_quantity,callback:function(t){e.$set(e.form,"stock_quantity",t)},expression:"form.stock_quantity"}}):e._e(),e._v(" "),1===e.form.inout?r("el-input-number",{attrs:{precision:0,step:1,min:e.stock_quantity},on:{change:e.inStock},model:{value:e.form.stock_quantity,callback:function(t){e.$set(e.form,"stock_quantity",t)},expression:"form.stock_quantity"}}):e._e()],1),e._v(" "),3===e.form.type?r("el-form-item",{attrs:{label:"\u8BA2\u5355\u7F16\u53F7",prop:"order_sn"}},[r("el-input",{model:{value:e.form.order_sn,callback:function(t){e.$set(e.form,"order_sn",t)},expression:"form.order_sn"}})],1):e._e(),e._v(" "),r("el-form-item",{attrs:{label:"\u5907\u6CE8"}},[r("el-input",{model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1)],1),e._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("div",[r("div",[e._v(e._s(e.title)+":"+e._s(e.form.new_number))]),e._v(" "),1===e.form.type?r("div",[e._v(e._s(e.title)+"\u603B\u989D:"+e._s(e.form.amount))]):e._e()]),e._v(" "),r("el-button",{on:{click:function(){e.editVisible=!1}}},[e._v("\u53D6 \u6D88")]),e._v(" "),r("el-button",{attrs:{type:"primary",loading:e.button_loading},on:{click:function(){return e.submitForm("form")}}},[e._v("\u786E \u5B9A")])],1)],1)},staticRenderFns:[]}},268:function(e,t,r){"use strict";r.d(t,"d",function(){return p}),r.d(t,"e",function(){return d}),r.d(t,"a",function(){return u}),r.d(t,"c",function(){return m});var a=r(36),i=r.n(a),o=r(37),l=r.n(o),s=r(59),n=r(57),p=function(){var e=l()(i.a.mark(function e(t,r,a,o,l){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.f(s.a+"/api/v1/hospitalstorecheck/list",{page:t,pageSize:r,sort:a,name:o,materials_type:l});case 3:return e.abrupt("return",e.sent);case 6:return e.prev=6,e.t0=e["catch"](0),e.abrupt("return",e.t0);case 9:case"end":return e.stop();}},e,this,[[0,6]])}));return function(){return e.apply(this,arguments)}}(),d=function(){var e=l()(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.f(s.a+"/api/v1/hospitalstorecheck/list/all");case 3:return e.abrupt("return",e.sent);case 6:return e.prev=6,e.t0=e["catch"](0),e.abrupt("return",e.t0);case 9:case"end":return e.stop();}},e,this,[[0,6]])}));return function(){return e.apply(this,arguments)}}(),u=function(){var e=l()(i.a.mark(function e(t,r){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.j(s.a+"/api/v1/hospitalstorecheck/add",{json:t,type:r});case 3:return e.abrupt("return",e.sent);case 6:return e.prev=6,e.t0=e["catch"](0),e.abrupt("return",e.t0);case 9:case"end":return e.stop();}},e,this,[[0,6]])}));return function(){return e.apply(this,arguments)}}(),m=function(){var e=l()(i.a.mark(function e(t){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.e(s.a+"/api/v1/hospitalstorecheck/"+t);case 3:return e.abrupt("return",e.sent);case 6:return e.prev=6,e.t0=e["catch"](0),e.abrupt("return",e.t0);case 9:case"end":return e.stop();}},e,this,[[0,6]])}));return function(){return e.apply(this,arguments)}}()},344:function(e,t,r){"use strict";var a=r(196),i=r.n(a),o=r(36),l=r.n(o),s=r(37),n=r.n(s),p=r(260),d=r(615),u=r(619),m=r(264),c=r(268),_=r(57),f=r(60);t.a={name:"MaterialsInventory",components:{ListEdit:p.a,MaterialsInventoryInOrOut:m.a,CheckEdit:d.a,StoreLogDetail:u.a},data:function(){return{multipleSelection:[],typeList:[{name:"\u5546\u54C1",value:1},{name:"\u7269\u6599",value:2}],list:[],downloadLoading:!1,total:null,listLoading:!0,listQuery:{page:1,limit:20,sort:null,searchKey:"",type:""},auth:{STOCKLIST_ADD:!1,STOCKLIST_EDIT:!1}}},mounted:function(){var e=this;return n()(l.a.mark(function t(){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,_.a("STOCK_LIST");case 2:return e.auth.STOCKLIST_ADD=t.sent,t.next=5,_.a("STOCK_LIST");case 5:e.auth.STOCKLIST_EDIT=t.sent,e.getData();case 7:case"end":return t.stop();}},t,e)}))()},methods:i()({formatterDate:function(e,t,r){return Object(f.parseTime)(r)},handleDownload:function(){var e=this;this.downloadLoading=!0,c.exportExcel().then(function(t){if(e.downloadLoading=!1,"success"===t.error){var r=document.createElement("iframe");r.src=t.data.path,r.style.display="none",document.body.appendChild(r)}else"invaild_token"===t.error||"not_login"===t.error?e.$router.push("/login"):t.error_description?e.$message.error(t.error_description):e.$message.error(t.error)})},handleCurrentChange:function(e){this.listQuery.page=e,this.getData()},getData:function(){var e=this;this.listLoading=!0,c.d(this.listQuery.page,this.listQuery.limit,this.listQuery.sort,this.listQuery.searchKey,this.listQuery.type).then(function(t){e.listLoading=!1,"success"===t.error?(e.total=t.data.total,e.list=t.data.list):"invaild_token"===t.error||"not_login"===t.error?e.$router.push("/login"):t.error_description?e.$message.error(t.error_description):e.$message.error(t.error)})},search:function(){this.listQuery.page=1,this.getData()},hanldeSort:function(e){this.listQuery.sort=e.prop+("ascending"==e.order?"":" desc"),this.getData()},formatterType:function(e){for(var t=0;t<this.typeList.length;t++)if(this.typeList[t].value==e.materials_type)return this.typeList[t].name},handleEdit:function(e,t){this.$refs.StoreLogDetail.showEdit(t.mp_id,t.title)},handleBatch:function(){this.$refs.CheckEdit.showEdit()},handleOperate:function(e,t,r){this.$refs.materialsInventoryInOrOut.showEdit(t.inventory_id,t.title,r)},handleSelectionChange:function(e){this.multipleSelection=e},handleSizeChange:function(e){this.listQuery.limit=e,this.getData()}},"handleCurrentChange",function(e){this.listQuery.page=e,this.getData()})}},345:function(e,t,r){"use strict";var a=r(201),i=r.n(a),o=r(36),l=r.n(o),s=r(37),n=r.n(s),p=r(268),d=r(60),u=r(204);t.a={data:function(){return{editVisible:!1,title:"\u7F16\u8F91",button_loading:!1,productlistLoading:!1,inOutLabel:"\u5165\u5E93",productsList:[],multipleSelection:[],inOutTypeLabel:"\u5165\u5E93\u7C7B\u578B",typeList:[{name:"\u91C7\u8D2D",value:1},{name:"\u501F\u7528",value:2},{name:"\u8BA2\u5355",value:3},{name:"\u7834\u635F",value:4}],stock_quantity:0,form:{inout:0,type:1,inventory_id:"",title:null,stock_quantity:0,amount:0,real_quantity:0,order_sn:"",remark:""},rules:{title:[{required:!0,message:"\u8BF7\u8F93\u5165\u540D\u79F0",trigger:"blur"}],real_quantity:[{required:!0,message:"\u8BF7\u8F93\u5165\u5B9E\u9645\u6570\u91CF",trigger:"blur"}]}}},methods:{changeFun:function(e){console.log("this.productsList111",this.productsList),console.log("val11",e);var t=[];e.forEach(function(e){t.push({inventory_id:e.inventory_id,real_quantity:e.real_quantity,remark:e.remark})}),this.multipleSelection=t},stockChanges:function(e,t){this.multipleSelection.forEach(function(r){r.inventory_id===e&&(r.remark=t)},this)},stockChange:function(e,t){this.multipleSelection.forEach(function(r){r.inventory_id===e&&(r.real_quantity=t)},this)},showEdit:function(){var e=this;return n()(l.a.mark(function t(){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.resetForm(),e.editVisible=!0,e.typeDisable=!0,t.next=5,e.getData();case 5:case"end":return t.stop();}},t,e)}))()},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(e){var r=t.multipleSelection.length;if(0==r)return void t.$message({type:"error",message:"\u8BF7\u52FE\u9009\u9700\u8981\u8C03\u6574\u5E93\u5B58\u7684\u8BB0\u5F55\uFF01"});2!=t.form.type&&4!=t.form.type,t.button_loading=!0,p.a(i()(t.multipleSelection),t.form.type).then(function(e){t.button_loading=!1,"success"===e.error?(t.button_loading=!1,t.$message({type:"success",message:"\u7F16\u8F91\u6210\u529F!"}),t.$emit("refresh"),t.editVisible=!1):t.$message({type:"error",message:t.$t(e.error)})})}else return!1})},getData:function(){var e=this;this.listLoading=!0,p.e().then(function(t){if(e.listLoading=!1,"success"===t.error){e.productsList=t.data.list,console.log("dthis.",e.productsList);var r=[];e.productsList.forEach(function(e){r.push({title:e.title,inventory_id:e.inventory_id,materials_type:e.materials_type,mp_id:e.mp_id,stock_quantity:e.stock_quantity,real_quantity:0,remark:e.remarks})}),e.productsList=r}else"invaild_token"===t.error||"not_login"===t.error?e.$router.push("/login"):t.error_description?e.$message.error(t.error_description):e.$message.error(t.error)})},resetForm:function(){var e=this;this.form.purchase_price=null,this.form.title="",this.form.inventory_id="",this.form.stock_quantity=0,this.form.amount=0,this.form.type=1,this.form.purchase_price=0,this.form.order_sn="",this.form.remark="",this.multipleSelection=[],this.$nextTick(function(){e.$refs.multipleTable!==void 0&&e.$refs.multipleTable.clearSelection()})}}}},346:function(e,t,r){"use strict";var a=r(201),i=r.n(a),o=r(36),l=r.n(o),s=r(37),n=r.n(s),p=r(196),d=r.n(p),u=r(268),m=r(60),c=r(204);t.a={data:function(){var e;return e={editVisible:!1,title:"\u7F16\u8F91",button_loading:!1,productlistLoading:!1,inOutLabel:"\u5165\u5E93",productsList:[],multipleSelection:[],inOutTypeLabel:"\u5546\u54C1\u540D\u79F0:",typeList:[{name:"\u91C7\u8D2D",value:1},{name:"\u501F\u7528",value:2},{name:"\u8BA2\u5355",value:3},{name:"\u7834\u635F",value:4}],stock_quantity:0},d()(e,"title",""),d()(e,"form",{inout:0,type:1,inventory_id:"",title:null,stock_quantity:0,amount:0,real_quantity:0,order_sn:"",remark:""}),d()(e,"rules",{title:[{required:!0,message:"\u8BF7\u8F93\u5165\u540D\u79F0",trigger:"blur"}],real_quantity:[{required:!0,message:"\u8BF7\u8F93\u5165\u5B9E\u9645\u6570\u91CF",trigger:"blur"}]}),e},methods:{formatterDate:function(e,t,r){return Object(m.parseTime)(r)},stockChanges:function(e,t){this.multipleSelection.forEach(function(r){r.inventory_id===e&&(r.remark=t)},this)},stockChange:function(e,t){this.multipleSelection.forEach(function(r){r.inventory_id===e&&(r.real_quantity=t)},this)},showEdit:function(e,t){var r=this;return n()(l.a.mark(function a(){return l.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return r.resetForm(),r.title=t,r.editVisible=!0,r.typeDisable=!0,a.next=6,r.getData(e);case 6:case"end":return a.stop();}},a,r)}))()},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(e){var r=t.multipleSelection.length;if(0==r)return void t.$message({type:"error",message:"\u8BF7\u52FE\u9009\u9700\u8981\u8C03\u6574\u5E93\u5B58\u7684\u8BB0\u5F55\uFF01"});2!=t.form.type&&4!=t.form.type,t.button_loading=!0,u.a(i()(t.multipleSelection),t.form.type).then(function(e){t.button_loading=!1,"success"===e.error?(t.button_loading=!1,t.$message({type:"success",message:"\u7F16\u8F91\u6210\u529F!"}),t.$emit("refresh"),t.editVisible=!1):t.$message({type:"error",message:t.$t(e.error)})})}else return!1})},getData:function(e){var t=this;this.listLoading=!0,u.c(e).then(function(e){t.listLoading=!1,"success"===e.error?t.productsList=e.data.list:"invaild_token"===e.error||"not_login"===e.error?t.$router.push("/login"):e.error_description?t.$message.error(e.error_description):t.$message.error(e.error)})},resetForm:function(){var e=this;this.form.purchase_price=null,this.form.title="",this.form.inventory_id="",this.form.stock_quantity=0,this.form.amount=0,this.form.type=1,this.form.purchase_price=0,this.form.order_sn="",this.form.remark="",this.multipleSelection=[],this.$nextTick(function(){e.$refs.multipleTable!==void 0&&e.$refs.multipleTable.clearSelection()})}}}},613:function(e,t,r){var a=r(614);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);r(131)("1353ae2c",a,!0,{})},614:function(e,t,r){t=e.exports=r(130)(!1),t.push([e.i,".handle-box[data-v-a91b6a44]{margin-bottom:20px}.handle-select[data-v-a91b6a44]{width:120px}.handle-input[data-v-a91b6a44]{width:300px;display:inline-block}.table[data-v-a91b6a44]{width:100%;font-size:14px}.red[data-v-a91b6a44]{color:red}.table-expand[data-v-a91b6a44]{font-size:0}.table-expand[data-v-a91b6a44] label{width:120px;color:#909399;font-size:12px}.table-expand[data-v-a91b6a44] .el-form-item__content{font-size:12px}.table-expand .el-form-item[data-v-a91b6a44]{margin-right:0;margin-bottom:0;width:33%}",""])},615:function(e,t,r){"use strict";var a=r(345),i=r(618),o=r(58),l=o(a.a,i.a,!1,function(){r(616)},null,null);t.a=l.exports},616:function(e,t,r){var a=r(617);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);r(131)("f59cc0de",a,!0,{})},617:function(e,t,r){t=e.exports=r(130)(!1),t.push([e.i,".tree{overflow:auto;height:200px}",""])},618:function(e,t){"use strict";t.a={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-dialog",{attrs:{title:"\u76D8\u70B9\u5E93\u5B58",visible:e.editVisible,width:"80%"},on:{"update:visible":function(t){e.editVisible=t}}},[r("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"110px"}},[r("el-form-item",{attrs:{label:"\u5546\u54C1\u5E93\u5B58"}},[r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.productlistLoading,expression:"productlistLoading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.productsList,"tooltip-effect":"dark",border:"",height:"200","element-loading-text":"\u7ED9\u6211\u4E00\u70B9\u65F6\u95F4"},on:{"selection-change":e.changeFun}},[r("el-table-column",{attrs:{type:"selection"}}),e._v(" "),r("el-table-column",{attrs:{label:"\u540D\u79F0"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.title))]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"\u5E93\u5B58\u6570\u91CF"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.stock_quantity===void 0?r("span",[e._v("0")]):r("span",[e._v(e._s(t.row.stock_quantity))])]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"\u5B9E\u9645\u6570\u91CF"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-input-number",{attrs:{precision:0,step:1},on:{change:function(r){return e.stockChange(t.row.inventory_id,r)}},model:{value:t.row.real_quantity,callback:function(r){e.$set(t.row,"real_quantity",r)},expression:"scope.row.real_quantity "}})]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"\u5907\u6CE8"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-input",{on:{change:function(r){return e.stockChanges(t.row.inventory_id,r)}},model:{value:t.row.remark,callback:function(r){e.$set(t.row,"remark",r)},expression:"scope.row.remark "}})]}}])})],1)],1)],1),e._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(){e.editVisible=!1}}},[e._v("\u53D6 \u6D88")]),e._v(" "),r("el-button",{attrs:{type:"primary",loading:e.button_loading},on:{click:function(){return e.submitForm("form")}}},[e._v("\u786E \u5B9A")])],1)],1)},staticRenderFns:[]}},619:function(e,t,r){"use strict";var a=r(346),i=r(622),o=r(58),l=o(a.a,i.a,!1,function(){r(620)},null,null);t.a=l.exports},620:function(e,t,r){var a=r(621);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);r(131)("3785fe47",a,!0,{})},621:function(e,t,r){t=e.exports=r(130)(!1),t.push([e.i,".tree{overflow:auto;height:200px}",""])},622:function(e,t){"use strict";t.a={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-dialog",{attrs:{title:"\u5E93\u5B58\u65E5\u5FD7",visible:e.editVisible,width:"80%"},on:{"update:visible":function(t){e.editVisible=t}}},[r("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"110px"}},[r("el-form-item",{attrs:{label:e.inOutTypeLabel,prop:"stock_quantity"}},[e._v(e._s(this.title)+"\n            \n        ")]),e._v(" "),r("el-form-item",{attrs:{label:"\u5546\u54C1\u5E93\u5B58\u65E5\u5FD7"}},[r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.productlistLoading,expression:"productlistLoading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.productsList,"tooltip-effect":"dark",border:"",height:"200","element-loading-text":"\u7ED9\u6211\u4E00\u70B9\u65F6\u95F4"}},[r("el-table-column",{attrs:{label:"\u9879\u76EEsn"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.project_sn))]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"\u8BB0\u5F55\u7C7B\u578B"},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.ref_sn?r("span",[e._v("\u51FA")]):r("span",[e._v("\u8FDB")])]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"\u6570\u91CF"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.number))]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"create_time",label:"\u521B\u5EFA\u65F6\u95F4"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(e._f("parseTime")(t.row.create_time,"{y}-{m}-{d}")))])]}}])})],1)],1)],1),e._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(){e.editVisible=!1}}},[e._v("\u53D6 \u6D88")]),e._v(" "),r("el-button",{attrs:{type:"primary",loading:e.button_loading},on:{click:function(){e.editVisible=!1}}},[e._v("\u786E \u5B9A")])],1)],1)},staticRenderFns:[]}},623:function(e,t){"use strict";t.a={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"table"},[r("div",{staticClass:"crumbs"},[r("el-breadcrumb",{attrs:{separator:"/"}},[r("el-breadcrumb-item",[e._v("\u5E93\u5B58\u4E2D\u5FC3")]),e._v(" "),r("el-breadcrumb-item",[e._v("\u76D8\u70B9\u8BB0\u5F55")])],1)],1),e._v(" "),r("div",{staticClass:"container"},[r("div",{staticClass:"handle-box"},[r("el-input",{staticClass:"handle-input mr10",attrs:{placeholder:"\u7B5B\u9009\u5173\u952E\u5B57"},model:{value:e.listQuery.searchKey,callback:function(t){e.$set(e.listQuery,"searchKey",t)},expression:"listQuery.searchKey"}}),e._v(" "),r("el-select",{staticClass:"handle-select mr10",attrs:{clearable:"",placeholder:"\u8BF7\u9009\u62E9\u7C7B\u578B"},model:{value:e.listQuery.type,callback:function(t){e.$set(e.listQuery,"type",t)},expression:"listQuery.type"}},e._l(e.typeList,function(e){return r("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})}),1),e._v(" "),r("el-button",{attrs:{type:"primary",icon:"el-icon-lx-search"},on:{click:e.search}},[e._v("\u641C\u7D22")]),e._v(" "),r("el-button",{attrs:{type:"primary",icon:"el-icon-edit"},on:{click:e.handleBatch}},[e._v("\u6279\u91CF\u76D8\u70B9")])],1),e._v(" "),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],ref:"multipleTable",staticClass:"table",attrs:{data:e.list,border:"","empty-text":"\u6CA1\u6709\u4EFB\u4F55\u8BB0\u5F55","element-loading-text":"\u7ED9\u6211\u4E00\u70B9\u65F6\u95F4"},on:{"sort-change":e.hanldeSort}},[r("el-table-column",{attrs:{prop:"title",label:"\u540D\u79F0","header-align":"center",align:"center",sortable:"","min-width":"120"}}),e._v(" "),r("el-table-column",{attrs:{prop:"materials_type",label:"\u7C7B\u578B","header-align":"center",align:"center",sortable:"","min-width":"120",formatter:e.formatterType}}),e._v(" "),r("el-table-column",{attrs:{prop:"create_time",label:"\u521B\u5EFA\u65F6\u95F4",align:"center","header-align":"center",sortable:"","min-width":"160",formatter:e.formatterDate}}),e._v(" "),r("el-table-column",{attrs:{prop:"operate",label:"\u64CD\u4F5C\u4EBA",align:"center","header-align":"center",sortable:"","min-width":"160"}}),e._v(" "),r("el-table-column",{attrs:{label:"\u5E93\u5B58\u6570\u91CF","header-align":"center",align:"center",sortable:"","min-width":"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.stock_quantity===void 0?r("span",[e._v("0")]):r("span",[e._v(e._s(t.row.stock_quantity))])]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"remark",label:"\u5907\u6CE8",align:"center","header-align":"center",sortable:"","min-width":"160"}}),e._v(" "),e.auth.STOCKLIST_EDIT&&e.auth.STOCKLIST_EDIT?r("el-table-column",{attrs:{label:"\u64CD\u4F5C","header-align":"center",align:"center","min-width":"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.auth.STOCKLIST_EDIT?r("el-button",{attrs:{type:"text",icon:"el-icon-edit"},on:{click:function(){return e.handleEdit(t.$index,t.row)}}},[e._v("\u67E5\u770B\u65E5\u5FD7")]):e._e()]}}],null,!1,3545368274)}):e._e()],1),e._v(" "),r("div",{staticClass:"pagination"},[r("el-pagination",{attrs:{background:"","current-page":e.listQuery.page,"page-sizes":[20,30,50],"page-size":e.listQuery.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1),e._v(" "),r("ListEdit",{ref:"ListEdit",on:{refresh:e.getData}}),e._v(" "),r("MaterialsInventoryInOrOut",{ref:"MaterialsInventoryInOrOut",on:{refresh:e.getData}}),e._v(" "),r("CheckEdit",{ref:"CheckEdit",on:{refresh:e.getData}}),e._v(" "),r("StoreLogDetail",{ref:"StoreLogDetail",on:{refresh:e.getData}})],1)},staticRenderFns:[]}}});