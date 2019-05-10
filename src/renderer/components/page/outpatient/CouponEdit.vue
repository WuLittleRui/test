<!-- 优惠券 -->
<template>
    <el-dialog :title='title' :visible.sync='editVisible' width="800px">
        <el-form :rules='rules' ref='form' :model='form' label-position='left' label-width='110px' style='margin-left:50px' v-loading='listLoading' element-loading-text='给我一点时间'>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form-item label-width='100px' label='优惠券名称' prop='title' style='width: 310px'>
                            <el-input v-model='form.title'></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                        <el-form-item label-width='100px' label='优惠券类型' prop='type' style='width: 310px'>
                            <el-select v-model="form.type" placeholder="请选择优惠券类型" @change="typeChange">
                                <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="7">
                    <div class="grid-content bg-purple">
                        <el-form-item label-width='70px' label='消费满' prop='limit_price' style='width: 210px'>
                            <el-input-number v-model="form.limit_price" :min="0" :precision="2" :step="1" style="width: 130px"></el-input-number>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="1">
                    <div class="grid-content bg-purple">
                        <el-form-item label='元'>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="7">
                    <div class="grid-content bg-purple-light">
                        <el-form-item :label-width='discountPriceLabelWidth' :label='discount_label' prop='discount'>
                            <el-input-number v-if="form.type === 2" v-model="form.discount" :min="0" :precision="2" :step="1" style="width: 150px"></el-input-number>
                            <el-input-number v-if="form.type === 1" v-model="form.discount" :min="0" style="width: 150px"></el-input-number>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="1">
                    <div class="grid-content bg-purple-light">
                        <el-form-item :label='unit'>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form-item label-width='80px' label='活动时间' prop='time' style='width: 310px'>
                            <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="form.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <div class="grid-content bg-purple">
                        <el-form-item label='优惠券有效天数' prop='number_days' style='width: 310px'>
                            <el-input-number v-model="form.number_days" :precision="0" :step="1" :min="0"></el-input-number>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form-item label-width='170px' label='活动时间内可领取次数' prop='number_collections' style='width: 310px'>
                            <el-input-number v-model="form.number_collections" :min="0"></el-input-number>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <div class="grid-content bg-purple">
                        <el-form-item label-width='130px' label='每天可以领取次数' prop='withdraw_everyday' style='width: 310px'>
                            <el-input-number v-model="form.withdraw_everyday" :min="0"></el-input-number>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form-item label-width='170px' label='总数量' prop='quantity' style='width: 310px'>
                            <el-input-number v-model="form.quantity" :min="1"></el-input-number>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-form-item label='类型' prop='TypeProduct'>
                <el-radio v-model="form.TypeProduct" :label="1" border size="medium" @change="TypeList">收费项目</el-radio>
                <el-radio v-model="form.TypeProduct" :label="2" border size="medium" @change="TypeList">处方</el-radio>
            </el-form-item>
            <el-form-item v-if="this.form.TypeProduct== 1 " label='项目' label-width='60px'>
                <el-table ref="multipleTable" :data="ChargeList" tooltip-effect="dark" border style="width: 100%" @selection-change="changeFun" height="200" v-loading='productlistLoading' element-loading-text='给我一点时间'>
                    <el-table-column type="selection" @selection-change="changeFun">
                    </el-table-column>
                    <el-table-column label='项目名称'>
                        <template slot-scope="scope">{{ scope.row.name }}
                    </template>
                            </el-table-column>
                            <el-table-column label='价格'>
                    <template slot-scope="scope">
                        {{ scope.row.unit_price }}/{{ scope.row.unit }}
                    </template>
          </el-table-column>
        </el-table>
      </el-form-item>
        <el-form-item v-if="this.form.TypeProduct== 2 "   label='处方' label-width='60px'>
                <el-table ref="multipleTable" :data="productsList" tooltip-effect="dark" border style="width: 100%" @selection-change="changeFuns" height="200" v-loading='productlistLoading' element-loading-text='给我一点时间'>
                    <el-table-column type="selection" @selection-change="changeFuns">
                    </el-table-column>
                    <el-table-column label='处方名称'>
                        <template slot-scope="scope">
                            {{ scope.row.name }}
                        </template>
                    </el-table-column>
                    <el-table-column label='价格'>
                        <template slot-scope="scope">
                            {{ scope.row.unit_price }}/{{ scope.row.unit }}
                        </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <div class='app-footer'>
      <el-button @click='editVisible = false'>取消</el-button>
      <el-button type='primary' :loading="button_loading" @click='submitForm("form")'>确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
    import * as HospitalCouponApi from "../../../api/HospitalCouponApi";
    import * as HospitalChargeApi from "../../../api/HospitalChargeApi";
    import * as ProductApi from "../../../api/ProductApi";
    import * as OauthApi from "../../../api/OauthApi";
    import {
        validPhone
    } from "../../../utils/validate";
    import {
        parseTime
    } from "../../../utils/formater";
    export default {
        data() {
            return {
                /* form */
                editVisible: false,
                title: "新增", // dialog标题
                button_loading: false, // 确认按钮加载
                listLoading: false, // form主体加载
                discount_label: "抵扣", // discount_price标题
                discountPriceLabelWidth: "50px", // discount_price标题宽度
                unit: "元", // discount_price单位
                typeOptions: [
                    // 优惠券类型
                    {
                        value: 1,
                        label: "抵用券"
                    },
                    {
                        value: 2,
                        label: "优惠券"
                    }
                ],
                /* 商品 */
                productsList: null, // 商品列表
                ChargeList: null,
                productlistLoading: false, // 商品列表加载
                multipleSelection: [],
                multipleSelections: [],
                charge_ids: '',
                pids: '',
                form: {
                    coupon_id: 0,
                    title: null,
                    type: 1,
                    limit_price: 1,
                    discount: 1,
                    time: [],
                    start_time: "",
                    end_time: "",
                    number_days: 1,
                    number_collections: 1,
                    withdraw_everyday: 1,
                    quantity: "",
                    TypeProduct: 1,
                },
                rules: {
                    TypeProduct: [{
                        required: true,
                        message: "请选择产品类型",
                        trigger: "blur"
                    }],
                    quantity: [{
                        required: true,
                        message: "请输入优惠券数量",
                        trigger: "blur"
                    }],
                    title: [{
                        required: true,
                        message: "请输入优惠券名称",
                        trigger: "blur"
                    }],
                    type: [{
                        required: true,
                        message: "请选择优惠券类型",
                        trigger: "blur"
                    }],
                    limit_price: [{
                        type: "number",
                        required: true,
                        message: "请输入满减金额",
                        trigger: "blur"
                    }],
                    discount: [{
                        type: "number",
                        required: true,
                        message: "请输入折扣",
                        trigger: "blur"
                    }],
                    time: [{
                        required: true,
                        message: "请选择活动时间",
                        trigger: "blur"
                    }]
                }
            };
        },
        mounted() {
            this.getChargeList(0);
            this.getProductLidt(0);
        },
        methods: {
            TypeList() {
                if (this.pids !== '' || this.charge_ids !== '') {
                    if (this.form.TypeProduct == 1) {
                        this.getCharge(this.charge_ids);
                    } else {
                        this.getProduct(this.pids);
                    }
                }
            },
            //按商品序号获取商品
            getChargeList(charge_id) {
                this.productlistLoading = true;
                HospitalChargeApi.list(charge_id).then(response => {
                    if (response.error === "success") {
                        var arr = [];
                        response.data.list.forEach(function(element) {
                            arr.push({
                                charge_id: element.charge_id,
                                name: element.name,
                                unit_price: element.unit_price,
                                unit: element.unit
                            });
                        });
                        this.ChargeList = arr;
                    } else if (
                    data.error === "invaild_token" ||
                    data.error === "not_login"
                    ) {
                    //判断是否认证过期
                    OauthApi.logOut();
                    this.$router.push("/login");
                    }  else {
                        this.$message.error(this.$t(response.error));
                    }
                    this.productlistLoading = false;
                });
            },
            //按商品序号获取商品
            getProductLidt() {
                this.productlistLoading = true;
                ProductApi.prescriptionList().then(response => {
                    if (response.error === "success") {
                        var arr = [];
                        response.data.forEach(function(element) {
                            arr.push({
                                pid: element.prescription_id,
                                name: element.title,
                                unit_price: element.unit_price, 
                                unit: element.unit
                            });
                        });
                        this.productsList = arr;
                    } else if (
                        data.error === "invaild_token" ||
                        data.error === "not_login"
                    ) {
                        //判断是否认证过期
                        OauthApi.logOut();
                        this.$router.push("/login");
                    }  else {
                        this.$message.error(this.$t(response.error));
                    }
                    this.productlistLoading = false;
                });
            },
            // 选择优惠券触发事件
            changeFun(val) {
                let arr = [];
                val.forEach(function(element) {
                    arr.push({
                        charge_id: element.charge_id
                    });
                }, this);
                this.multipleSelection = arr;
            },
            changeFuns(val) {
                let arr = [];
                val.forEach(function(element) {
                    arr.push({
                        pid: element.pid
                    });
                }, this);
                this.multipleSelections = arr;
            },
            // 优惠券类型下拉框触发事件
            typeChange(value) {
                if (value === 2) {
                    this.unit = "%";
                    this.discount_label = "折扣";
                    this.discountPriceLabelWidth = "50px";
                } else {
                    this.unit = "元";
                    this.discount_label = "抵扣";
                    this.discountPriceLabelWidth = "50px";
                }
            },
            showNew() {
                this.title = "新增";
                this.resetForm();
                this.editVisible = true;
            },
            async showEdit(coupon_id) {
                this.title = "编辑";
                this.resetForm();
                this.editVisible = true;
                await this.getCouponInfo(coupon_id);
            },
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.button_loading = true;
                        this.form.start_time = parseTime(
                            this.form.time[0],
                            "{y}-{m}-{d} {h}:{i}:{s}"
                        );
                        this.form.end_time = parseTime(
                            this.form.time[1],
                            "{y}-{m}-{d} {h}:{i}:{s}"
                        );
                        var discount = 0;
                        if (this.form.type == 1) {
                            discount = this.form.discount / 100;
                        }
                        if (this.form.TypeProduct == 1) {
                            this.multipleSelections = [];
                        } else {
                            this.multipleSelection = [];
                        }
                        //修改
                        if (this.form.coupon_id) {
                            HospitalCouponApi.update(
                                this.form.coupon_id,
                                this.form.title,
                                this.form.end_time,
                                this.form.start_time,
                                this.form.number_days,
                                this.form.quantity,
                                JSON.stringify(this.multipleSelection),
                                this.form.withdraw_everyday,
                                this.form.number_collections,
                                this.form.limit_price,
                                this.form.discount,
                                this.form.type,
                                JSON.stringify(this.multipleSelections),
                                this.form.TypeProduct,
                            ).then(res => {
                                this.button_loading = false;
                                if (res.error === "success") {
                                    this.$message({
                                        type: "success",
                                        message: "编辑成功!"
                                    });
                                    this.$emit("refresh");
                                    this.editVisible = false;
                                } else if (
                                res.error === "invaild_token" ||
                                res.error === "not_login"
                                ) {
                                //判断是否认证过期
                                OauthApi.logOut();
                                this.$router.push("/login");
                                }  else {
                                    this.$message({
                                        type: "error",
                                        message: this.$t(res.error)
                                    });
                                }
                            });
                        } else {
                            //添加
                            HospitalCouponApi.add(
                                this.form.title,
                                this.form.end_time,
                                this.form.start_time,
                                this.form.number_days,
                                this.form.quantity,
                                JSON.stringify(this.multipleSelection),
                                this.form.withdraw_everyday,
                                this.form.number_collections,
                                this.form.limit_price,
                                this.form.discount,
                                this.form.type,
                                JSON.stringify(this.multipleSelections),
                                this.form.TypeProduct,
                            ).then(res => {
                                this.button_loading = false;
                                if (res.error === "success") {
                                    this.$message({
                                        type: "success",
                                        message: "添加成功!"
                                    });
                                    this.$emit("refresh");
                                    this.editVisible = false;
                                } else if (
                                res.error === "invaild_token" ||
                                res.error === "not_login"
                                ) {
                                //判断是否认证过期
                                OauthApi.logOut();
                                this.$router.push("/login");
                                }  else {
                                    this.$message({
                                        type: "error",
                                        message: this.$t(res.error)
                                    });
                                }
                            });
                        }
                    } else {
                        return false;
                    }
                });
            },
            resetForm() {
                this.form.TypeProduct = 1;
                this.form.coupon_id = null;
                this.form.title = null;
                this.form.quantity = '';
                this.form.type = 1;
                this.form.limit_price = 1;
                this.form.discount = 1;
                this.form.time = [];
                this.form.number_days = 1;
                this.form.withdraw_everyday = 1;
                this.form.number_collections = 1;
                this.$nextTick(() => {
                    if (this.$refs.multipleTable !== undefined) {
                        this.$refs.multipleTable.clearSelection(); //取消所有勾选
                    }
                });
                this.$nextTick(() => {
                    if (this.$refs.form !== undefined) {
                        this.$refs.form.resetFields();
                    }
                });
            },
            getCouponInfo(coupon_id) {
                HospitalCouponApi.byId(coupon_id).then(res => {
                    if (res.error === "success") {
                        if (res.data.detail.length > 0) {
                            this.form.discount = res.data.detail[0].discount;
                            this.form.limit_price = res.data.detail[0].limit_price;
                            this.form.type = res.data.detail[0].type;
                        }
                        this.form.coupon_id = res.data.list.coupon_id;
                        this.form.title = res.data.list.title;
                        this.form.number_collections = res.data.list.number_collections;
                        this.form.withdraw_everyday = res.data.list.withdraw_everyday;
                        this.form.start_time = parseTime(
                            res.data.list.start_time,
                            "{y}-{m}-{d} {h}:{i}:{s}"
                        );
                        this.form.end_time = parseTime(
                            res.data.list.end_time,
                            "{y}-{m}-{d} {h}:{i}:{s}"
                        );
                        this.form.time.push(this.form.start_time);
                        this.form.time.push(this.form.end_time);
                        this.form.quantity = res.data.list.quantity;
                        this.form.number_days = res.data.list.number_days;
                        this.form.TypeProduct = res.data.list.type;
                        this.charge_ids = res.data.list.charge_id;
                        this.pids = res.data.list.pid;
                        if (this.form.TypeProduct == 1) {
                            this.getCharge(res.data.list.charge_id);
                        } else {
                            this.getProduct(this.pids);
                        }
                    } else if (
                        res.error === "invaild_token" ||
                        res.error === "not_login"
                    ) {
                    //判断是否认证过期
                        OauthApi.logOut();
                        this.$router.push("/login");
                    }  else {
                        this.$message.error(this.$t(res.error));
                    }
                });
            },
            getCharge(charge_id) {
                this.$nextTick(function () {
                    var a = charge_id.split(",");
                    this.$refs.multipleTable.clearSelection(); //取消所有勾选
                    for (var i = 0; i < a.length; i++) {
                        var tempA = a[i];
                        for (var j = 0; j < this.ChargeList.length; j++) {
                            var tempB = this.ChargeList[j];
                            if (tempA == (tempB.charge_id+ "")) {
                                this.multipleSelection.push({
                                    charge_id: tempB.charge_id
                                });
                                this.$refs.multipleTable.toggleRowSelection(tempB);
                            }
                        }
                    }
                })
            },
            getProduct(pid) {
                
                this.$nextTick(function () {
                    var a = pid.split(",");
                    this.$refs.multipleTable.clearSelection(); //取消所有勾选
                    for (var i = 0; i < a.length; i++) {
                        var tempA = a[i];
                        for (var j = 0; j < this.productsList.length; j++) {
                            var tempB = this.productsList[j];
                            if (tempA == (tempB.pid + "")) {
                                this.multipleSelections.push({
                                    pid: tempB.pid
                                });
                                this.$refs.multipleTable.toggleRowSelection(tempB);
                                
                            }
                        }
                    }
                })
            }
        }
    };
</script>

<style>
    .tree {
        overflow: auto;
        height: 200px;
    }
</style>
        
