<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div>
        <!-- 搜索 -->
        <span>
          <el-input v-model="searchKey" clearable placeholder="输入名称或者描述搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery" />
          <span class='filter-item'>
            <el-button type="success" icon="el-icon-search">搜索</el-button>
            <el-button type="warning" icon="el-icon-refresh-left">重置</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="handleAdd()" v-permission="['add']">新增</el-button>
          </span>
        </span>
        <span>
          <el-button-group>
            <el-button icon="el-icon-search"></el-button>
            <el-button icon="el-icon-refresh" @click="refresh"></el-button>
          </el-button-group>
        </span>
      </div>
    </div>
    <!-- 列表渲染 -->
    <el-col style="margin-top: 20px">
      <el-card class="box-card" shadow="never">
        <el-table ref="table" v-loading="loading" :data="data" style="width: 100%;">
          <el-table-column type="index" label="#" width="55" />
          <el-table-column :show-overflow-tooltip="true" prop="username" label="用户名" align="center" />
          <el-table-column :show-overflow-tooltip="true" prop="nickname" label="昵称" align="center" />
          <el-table-column :show-overflow-tooltip="true" prop="group_title" label="所属角色" align="center" />
          <el-table-column label="状态" align="center" prop="status">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status" :disabled="scope.row.uid == 1" :active-value="1" :inactive-value="0"
                         @change="changeEnabled(scope.row.uid, scope.row.status)" />
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="create_time" label="创建日期" align="center">
            <template slot-scope="scope">
              <span>{{ (scope.row.create_time) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" :disabled="scope.row.uid == 1" v-permission="['edit']" @click="handleEdit(scope.row)">编辑
              </el-button>
              <el-button type="danger" icon="el-icon-delete" :disabled="scope.row.uid == 1" v-permission="['delete']">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页组件-->
        <!-- <pagination /> -->
      </el-card>
    </el-col>
    <!-- 新增编辑弹窗 -->
    <DialogUser :dialogUser="dialogUser" :formData="formData" @addok='getUser'></DialogUser>
  </div>
</template>

<script>
import { getuser, PutUserStatus } from "@/api/system/index";
export default {
  name: "user",
  data() {
    return {
      searchKey: "",//搜索关键字
      loading: false,
      data: [],
      dialogUser: {
        show: false
      },
      formData: {}
    }
  },
  methods: {
    //查询
    toQuery() { },
    //刷新
    refresh() { },
    //切换状态
    changeEnabled(id, value) {
      console.log(id, value);
      PutUserStatus(id, value).then(res => {
        if (res.code == 0) {
          this.$message.success("切换状态成功")
        }
      })
    },
    //编辑
    handleEdit(row) {
      this.dialogUser = {
        show: true,
        title: "编辑用户",
        option: "edit"
      };
      this.formData = {
        username: row.username,
        nickName: row.nickname,
        enabled: row.status + '',
        id: row.uid,
        roleid: row.group_id
      };
    },
    //新增
    handleAdd() {
      this.dialogUser = {
        show: true,
        title: "新增用户",
        option: "add"
      };
      this.formData = {
        username: "",
        nickName: "",
        enabled: '1',
        id: "",
        roleid: ""
      };
    },
    //获取用户
    getUser() {
      this.loading = true
      getuser().then(res => {
        if (res.code == 0) {
          this.data = res.data.list
          this.loading = false
        }
      })
    }
  },
  components: {
    DialogUser: resolve => {
      require(['@/components/System/user/DialogUser.vue'], resolve)
    },
  },
  mounted() {
    this.getUser();
  },
}
</script>

<style lang="scss" scoped>
// 工具栏
.head {
  &-container {
    text-indent: -10px;
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      > span {
        display: flex;
        align-items: center;
      }
      .filter {
        &-item {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>