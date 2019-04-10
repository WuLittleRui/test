<template>
    <div v-if="flag" :class=" !onlyShow? 'basic_information':'basic_information_re'">
        <el-scrollbar style="height: 100%;">
            <el-table :data="list" border class="table" empty-text="没有任何记录" element-loading-text='给我一点时间'
                v-loading='listLoading' ref="multipleTable" highlight-current-row>
                <el-table-column prop="state" label="回访状态" header-align="center"  align="center" min-width="70">
                </el-table-column>
                <el-table-column prop="return_people_name" label="主治人员" header-align="center"  align="center" min-width="170">
                </el-table-column>
                <el-table-column prop="employee_name" label="主治医生" header-align="center"  align="center" min-width="170">
                </el-table-column>
                <el-table-column prop="return_time" label="回访时间" align="center" header-align="center" min-width="70" :formatter="formatterDate">
                </el-table-column>
                <el-table-column prop="content" label="回访内容" align="center" header-align="center" min-width="70">
                </el-table-column>
                <el-table-column prop="result" label="回访结果" align="center" header-align="center" min-width="80">
                </el-table-column>
                <el-table-column prop="create_time" label="创建时间" align="center" header-align="center" min-width="80" :formatter="formatterDate">
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page='listQuery.page' :page-sizes='[20,30, 50]' :page-size='listQuery.limit' layout='total, sizes, prev, pager, next, jumper' :total='total'>       
                </el-pagination>
            </div>
        </el-scrollbar>

    </div>
</template>
<script>
import * as HospitalHandleApi from "../../../../../api/HospitalHandleApi";
import { parseTime } from "../../../../../utils/formater";
export default {
	name: "PatientRevisit",
    components: {  },
    data() {
        return {
            flag: false,
            listLoading: false,
            list: [],
            onlyShow: false,
            total: 0,
            listQuery: {
                limit: 20,
                page: 1,
                case_number: null
            }
        }
    },
    methods: {
        formatterDate(row, column, value) {
            return parseTime(value);
        },
        showORnoshow(flag, case_number, onlyShow, edit) {
            this.flag = flag;
            if(edit == true) {
                console.log(edit);
                this.edit = true;
            }
            if(case_number != null) {
                this.listQuery.case_number = case_number;
			} else {
				return;
            }
            if(onlyShow) {
                this.onlyShow = true;
            }
            this.getData();
        },
        handleDelete(index, row) {
            this.$confirm(
                "此操作将永久删除该回访记录, 是否继续?",
                "提示",
                {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
                }
            ).then(() => {
                HospitalHandleApi.deleteRevisit([row.return_id]).then(res => {
                if (res.error === "success") {
                    this.$message({
                    type: "success",
                    message: "删除成功!"
                    });
                    this.getData();
                } else {
                    this.$message({
                    type: "error",
                    message: this.$t(res.error)
                    });
                }
                });
            });
        },
        handleSizeChange(val) {
            this.listQuery.limit = val;
            this.getData();
        },
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.getData();
        },
        getData() {
            HospitalHandleApi.revisitList(this.listQuery.page, this.listQuery.limit, this.listQuery.case_number).then(res => {
                if (res.error === "success") {
                    this.list = res.data.list;
                    this.total = res.data.total;
                } else {
                    this.$message.error(this.$t(res.error));
                }
            })
        }
    }
}
</script>


<style scoped>
.basic_information {
    height: 650px;
}
.basic_information_re {
    height: 520px;
}
</style>
