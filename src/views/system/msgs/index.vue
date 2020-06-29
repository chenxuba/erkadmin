<template>
  <div class="main">
    <el-card>
      <el-collapse accordion>
        <el-collapse-item>
          <template slot="title">
            <i class="header-icon el-icon-info"></i>温馨提示
          </template>
          <div>1.平台内短信发送记录</div>
          <div>2.发送类型：register:代表注册、bindPhone:绑定手机号、modifyPhone：修改手机号、forgetPwd:忘记密码</div>
        </el-collapse-item>
      </el-collapse>
      <!-- 表格渲染 -->
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style='margin-top: 10px;'>
        <!--表格渲染-->
        <el-card style="margin-top:10px;">
          <el-table ref="table" v-loading="loading" :data="data" style="width: 100%;" size='mini'>
            <el-table-column :show-overflow-tooltip="true" prop="ID" label="ID" />
            <el-table-column :show-overflow-tooltip="true" prop="phone" label="电话" />
            <el-table-column :show-overflow-tooltip="true" prop="type" label="发送类型" />
            <el-table-column :show-overflow-tooltip="true" prop="msg" label="发送内容" />
            <el-table-column :show-overflow-tooltip="true" prop="time" label="发送时间" />
          </el-table>
          <!--分页-->
          <div class="fenye" style="margin-top:20px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, prev, pager, next,sizes" :total="40">
            </el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-card>

  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      data: [],
    }
  },
  methods: {
    //搜索
    toQuery() {

    },
    handleSizeChange() {
      console.log('每页显示xxx条 触发');
    },
    handleCurrentChange() {
      console.log('切换页码触发');
    },
    //录入单号
    entryEms(row){

    }
  },
}
</script>

<style lang="scss" scoped>
.main {
  margin: 10px;
}
</style>