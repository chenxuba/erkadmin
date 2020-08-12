<template>
  <div class="main">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <!--工具栏-->
      <div class="head-container">
        <div>
          <!-- 搜索 -->
          <el-input clearable  placeholder="输入会员名称搜索" style="width: 200px;margin-right:10px;" class="filter-item"  />
          <el-date-picker :default-time="['00:00:00','23:59:59']" type="daterange" range-separator=":"  class="date-item" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期" />
          <el-button type="success"  icon="el-icon-search" style=";margin:0 15px;" size="mini">搜索</el-button>
          <el-button type="primary"  icon="el-icon-refresh-left" size="mini">重置</el-button>
          <el-button type="warning"  icon="el-icon-download" size="mini">导出</el-button>
        </div>
      </div>
      <!--表格渲染-->
      <el-card style="margin-top:10px;">
        <el-table ref="table" v-loading="loading" :data="data" style="width: 100%;" >
          <el-table-column type="index" width="55" label="#" />
          <el-table-column :show-overflow-tooltip="true" prop="username" label="会员名称" />
          <el-table-column :show-overflow-tooltip="true" prop="phone" label="手机号" />
          <el-table-column :show-overflow-tooltip="true" prop="IDCard" label="身份证号码" />
          <el-table-column :show-overflow-tooltip="true" prop="applyTime" label="申请时间" />
          <el-table-column :show-overflow-tooltip="true" prop="course" label="考试课程" />
          <el-table-column :show-overflow-tooltip="true" prop="studyType" label="学习状态" />
          <el-table-column :show-overflow-tooltip="true" prop="score" label="考试得分" />
          <el-table-column :show-overflow-tooltip="true" prop="isHege" label="是否合格" />
        </el-table>
        <!--分页-->
        <div class="fenye" style="margin-top:20px;">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, prev, pager, next,sizes" :total="40">
          </el-pagination>
        </div>
      </el-card>
    </el-col>
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
  },
}
</script>

<style lang="scss" scoped>
.main {
  margin: 10px 15px;
}
</style>