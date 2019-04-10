<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 系统消息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`未读消息(${list.length})`" name="first">
                    <el-table :data="list" :show-header="false" style="width: 100%">
                        <el-table-column>
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.title}}</span>
                                <span class="message-title">{{scope.row.content}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="create_time" width="180">
                                <template slot-scope="scope">
                                       <span class="message-title">{{scope.row.create_time | parseTime()  }}</span>
                                </template>
                        </el-table-column>
                        <el-table-column width="120">
                            <template slot-scope="scope">
                                <el-button size="small" @click="handleRead(scope.$index,scope.row)">标为已读</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="handle-row">
                        <el-button  @click="AllreadNotices"    type="primary">全部标为已读</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="`已读消息(${list1.length})`" name="second">
                    <template v-if="message === 'second'">
                        <el-table :data="list1" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                        <span class="message-title">{{scope.row.content}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="readed_time" width="180">
                                <template slot-scope="scope">
                                       <span class="message-title">{{scope.row.readed_time | parseTime()  }}</span>
                                </template>
                        </el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button type="danger" @click="handleDel(scope.$index,scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button  @click="allDelete" type="danger">删除全部</el-button>
                        </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="`回收站(${recycle.length})`" name="third">
                    <template v-if="message === 'third'">
                        <el-table :data="recycle"     :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                       <span class="message-title">{{scope.row.content}}</span>
                                </template>
                            </el-table-column>
                     
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button @click="handleRestore(scope.$index,scope.row)">还原</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button   @click="handleDelete" type="danger">清空回收站</el-button>
                        </div>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import * as NoticeStatusApi from "../../api/NoticeStatusApi";
export default {
  name: "tabs",
  data() {
    return {
           listQuery: {
        page: 1,
        limit:50,
        sort: null,
        title: "",
        readed: false,
        admin_id:"",
        
      },
      deleted:false,
        list:[],
        list1:[],
        total:"",
      message: "first",
      showHeader: false,
      recycle: [],
      multipleSelection:[],
    };
  },
   async mounted() {
    //初始化权
   await this.getinformation();
    this.getData();
  this.getread();
  this.getdeleted();
  },
  methods: {
    allDelete(){
           NoticeStatusApi.AllreadNotices(0,true,this.listQuery.admin_id,true).then(data => {
        if (data.error === "success") {
           this.getData();
           this.getread();
            this.getdeleted();
        } else if (
          data.error === "invaild_token" ||
          data.error === "not_login"
        ) {
          //判断是否认证过期
          this.$router.push("/login");
        } else if (data.error_description) {
          this.$message.error(data.error_description);
        } else {
          this.$message.error(data.error);
        }
      });
    },
    AllreadNotices(){
           NoticeStatusApi.AllreadNotices(1,true,this.listQuery.admin_id,false).then(data => {
        if (data.error === "success") {
           this.getData();
           this.getread();
        } else if (
          data.error === "invaild_token" ||
          data.error === "not_login"
        ) {
          //判断是否认证过期
          this.$router.push("/login");
        } else if (data.error_description) {
          this.$message.error(data.error_description);
        } else {
          this.$message.error(data.error);
        }
      });
    },
    getData() {
      NoticeStatusApi.getNotices(this.listQuery.page,this.listQuery.limit,this.listQuery.readed,this.listQuery.admin_id,false).then(data => {
        if (data.error === "success") {
          this.total = data.data.total;
          this.list = data.data.list;
        } else if (
          data.error === "invaild_token" ||
          data.error === "not_login"
        ) {
          //判断是否认证过期
          this.$router.push("/login");
        } else if (data.error_description) {
          this.$message.error(data.error_description);
        } else {
          this.$message.error(data.error);
        }
      });
    },
     getread() {
      NoticeStatusApi.getNotices(this.listQuery.page,this.listQuery.limit,true,this.listQuery.admin_id,false).then(data => {
        if (data.error === "success") {
          this.total = data.data.total;
          this.list1 = data.data.list;
        } else if (
          data.error === "invaild_token" ||
          data.error === "not_login"
        ) {
          //判断是否认证过期
          this.$router.push("/login");
        } else if (data.error_description) {
          this.$message.error(data.error_description);
        } else {
          this.$message.error(data.error);
        }
      });
    },
     editNotices(notice_id,deleted) {
      NoticeStatusApi.editNotices(true,this.listQuery.admin_id,notice_id,deleted).then(data => {
        if (data.error === "success") {
        this.getread();
        this.getdeleted();     
        } else if (
          data.error === "invaild_token" ||
          data.error === "not_login"
        ) {
          //判断是否认证过期
          this.$router.push("/login");
        } else if (data.error_description) {
          this.$message.error(data.error_description);
        } else {
          this.$message.error(data.error);
        }
      });
    },
       getdeleted() {
      NoticeStatusApi.getNotices(this.listQuery.page,this.listQuery.limit,true,this.listQuery.admin_id,true).then(data => {
        if (data.error === "success") {
 
          this.recycle = data.data.list;
            this.getData();
            this.getread();
        } else if (
          data.error === "invaild_token" ||
          data.error === "not_login"
        ) {
          //判断是否认证过期
          this.$router.push("/login");
        } else if (data.error_description) {
          this.$message.error(data.error_description);
        } else {
          this.$message.error(data.error);
        }
      });
    },
     deleteNotices() {
      NoticeStatusApi.deleteNotices(true,this.listQuery.admin_id,true).then(data => {
        if (data.error === "success") {
      this.getdeleted();
        } else if (
          data.error === "invaild_token" ||
          data.error === "not_login"
        ) {
          //判断是否认证过期
          this.$router.push("/login");
        } else if (data.error_description) {
          this.$message.error(data.error_description);
        } else {
          this.$message.error(data.error);
        }
      });
    },
      async  getinformation() {
     let data = await NoticeStatusApi.getinformation().then(data => {
        if (data.error === "success") {
          this.listQuery.admin_id=data.data.admin_id;
          console.log(" this.listQuery.admin_id:", this.listQuery.admin_id);
        } else if (
          data.error === "invaild_token" ||
          data.error === "not_login"
        ) {
          //判断是否认证过期
          this.$router.push("/login");
        } else if (data.error_description) {
          this.$message.error(data.error_description);
        } else {
          this.$message.error(data.error);
        }
      });
    },
    handleDelete(){
          this.deleteNotices();
    },
    
    handleRead(index,row) {
      this.editNotices(row.notice_id);
    },
    handleDel(index,row) {
      this.deleted=true;
      this.editNotices(row.notice_id,this.deleted);
    },
    handleRestore(index,row) {
      this.deleted=false;
       this.editNotices(row.notice_id,this.deleted);
    }
  },
  computed: {
    unreadNum() {
      return this.unread.length;
    }
  }
};
</script>

<style>
.message-title {
  cursor: pointer;
}
.handle-row {
  margin-top: 30px;
}
</style>

