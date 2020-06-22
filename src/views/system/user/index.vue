<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div>
        <!-- 搜索 -->
        <span>
          <el-input v-model="searchKey" size="small" clearable placeholder="输入名称或者描述搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery" />
          <span class='filter-item'>
            <el-button size="mini" type="success" icon="el-icon-search">搜索</el-button>
            <el-button size="mini" type="warning" icon="el-icon-refresh-left">重置</el-button>
            <el-button size="mini" type="primary" icon="el-icon-plus" @click="handleAdd()">新增</el-button>
          </span>
        </span>
        <span>
          <el-button-group>
            <el-button icon="el-icon-search" size="mini"></el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="refresh"></el-button>
          </el-button-group>
        </span>
      </div>
    </div>
    <!-- 列表渲染 -->
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin-top: 20px">
      <el-card class="box-card" shadow="never">
        <el-table ref="table" v-loading="loading" :data="data" style="width: 100%;" size='mini'>
          <el-table-column type="index" label="#" width="55" />
          <el-table-column :show-overflow-tooltip="true" prop="username" label="用户名" />
          <el-table-column :show-overflow-tooltip="true" prop="nickName" label="昵称" />
          <el-table-column prop="sex" label="性别" />
          <el-table-column :show-overflow-tooltip="true" prop="phone" width="100" label="电话" />
          <el-table-column label="状态" align="center" prop="enabled">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.enabled" :disabled="user.id === scope.row.id" active-color="#409EFF" inactive-color="#F56C6C" @change="changeEnabled(scope.row, scope.row.enabled)" />
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="createTime" width="135" label="创建日期">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="115" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页组件-->
        <!-- <pagination /> -->
      </el-card>
    </el-col>
    <!-- 新增编辑弹窗 -->
    <DialogUser :dialogUser="dialogUser" :formData="formData"></DialogUser>
  </div>
</template>

<script>
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
    changeEnabled() { },
    //编辑
    handleEdit(row) {
      this.dialogUser = {
        show: true,
        title: "编辑用户",
        option: "edit"
      };
      this.formData = {
        username: row.username,
        phone: row.phone,
        nickName: row.nickName,
        sex: row.sex,
        enabled: row.enabled
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
        phone: "",
        nickName: "",
        sex: '男',
        enabled: '1'
      };
    }
  },
  components: {
    DialogUser: resolve => {
      require(['@/components/System/user/DialogUser.vue'], resolve)
    },
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