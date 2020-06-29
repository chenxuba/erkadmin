<template>
  <div class="main">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <!--工具栏-->
      <div class="head-container">
        <div>
          <!-- 搜索 -->
          <el-input clearable size="small" placeholder="输入会员名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery" />
          <el-date-picker :default-time="['00:00:00','23:59:59']" type="daterange" range-separator=":" size="small" class="date-item" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期" />
          <el-button type="success" size="mini" icon="el-icon-search">搜索</el-button>
          <el-button type="primary" size="mini" icon="el-icon-refresh-left">重置</el-button>
          <el-button type="warning" size="mini" icon="el-icon-download">导出</el-button>
        </div>
      </div>
      <!--表格渲染-->
      <el-card style="margin-top:10px;">
        <el-table ref="table" v-loading="loading" :data="data" style="width: 100%;" size='mini'>
          <el-table-column type="index" width="55" label="#" />
          <el-table-column :show-overflow-tooltip="true" prop="IdNumber" label="证书编号" />
          <el-table-column :show-overflow-tooltip="true" prop="name" label="真实姓名" />
          <el-table-column :show-overflow-tooltip="true" prop="img" label="照片">
              <template slot-scope="scope">
                  <img :src="scope.row.img" alt="">
              </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="IDCard" label="身份证号" />
          <el-table-column :show-overflow-tooltip="true" prop="phone" label="联系方式" />
          <el-table-column :show-overflow-tooltip="true" prop="address" label="邮寄地址" />
          <el-table-column :show-overflow-tooltip="true" prop="course" label="所学课程" />
          <el-table-column :show-overflow-tooltip="true" prop="userID" label="用户身份" />
          <el-table-column :show-overflow-tooltip="true" prop="applyTime" label="申请时间" />
          <el-table-column :show-overflow-tooltip="true" prop="ems" label="快递单号">
               <template slot-scope="scope">
                  <el-button type="primary" @click="entryEms(scope.row)">录入单号</el-button>
              </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="type" label="审核状态" />
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
    //录入单号
    entryEms(row){

    }
  },
}
</script>

<style lang="scss" scoped>
.main {
  margin: 10px 15px;
}
</style>