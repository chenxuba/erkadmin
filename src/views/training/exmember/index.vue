<template>
  <div class="main">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <!--工具栏-->
      <div class="head-container">
        <div>
          <!-- 搜索 -->
          <el-input clearable placeholder="输入会员名称搜索" v-model="searchKey" style="width: 200px;margin-right:10px;" class="filter-item" />
          <el-button type="success" icon="el-icon-search" style=";margin:0 15px;" size="mini" @click="toQuery">搜索</el-button>
          <el-button type="primary" icon="el-icon-refresh-left" size="mini" @click="resetting">重置</el-button>
        </div>
      </div>
      <!--表格渲染-->
      <el-card style="margin-top:10px;">
        <el-table ref="table" v-loading="loading" :max-height="tableHeight" :data="tableData" style="width: 100%;">
          <el-table-column type="index" width="50" label="#" />
          <el-table-column :show-overflow-tooltip="true" prop="member_data.nickname" align="center" label="会员名称">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.member_data.nickname">{{scope.row.member_data.nickname}}</el-tag>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="member_data.phone" label="手机号" align="center" />
          <el-table-column :show-overflow-tooltip="true" prop="id_card" label="身份证号码" align="center" width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.id_card">{{scope.row.id_card}}</span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="create_time" label="考试时间" align="center" />
          <el-table-column :show-overflow-tooltip="true" prop="course_name" label="考试课程" align="center" />
          <el-table-column :show-overflow-tooltip="true" prop="number" label="考试得分" align="center">
            <template slot-scope="scope">
              <el-tag type="danger">{{scope.row.number}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="status_text" label="是否合格" align="center">
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.status_text == '不及格'" effect="dark">{{scope.row.status_text}}</el-tag>
              <el-tag type="success" v-if="scope.row.status_text == '及格'" effect="dark">{{scope.row.status_text}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <div class="fenye" style="margin-top:20px;">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[15, 20, 30, 40]" :page-size="10" layout="total, prev, pager, next,sizes" :total="total">
          </el-pagination>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import { getExamlog } from "@/api/training";
export default {
  data() {
    return {
      searchKey: "",
      loading: false,
      tableData: [],
      tableHeight: document.documentElement.clientHeight - 240,
      page_size: 15,
      page: 1,
      total: 0,
    }
  },
  methods: {
    //搜索
    toQuery() {
      this.loading = true
      getExamlog({ page_size: this.page_size, page: this.page, nickname: this.searchKey }).then(res => {
        this.tableData = res.data.list
        this.total = res.data.count
        this.loading = false
      })
    },
    // 重置 
    resetting() {
      this.searchKey = ''
      this.getExamlog()
    },
    // 获取列表
    getExamlog() {
      this.loading = true
      getExamlog({ page_size: this.page_size, page: this.page }).then(res => {
        console.log(res);
        if (res.code == 0) {
          this.tableData = res.data.list
          this.total = res.data.count
          this.loading = false
        }
      })
    },
    handleSizeChange(v) {
      console.log('每页显示xxx条 触发');
      this.loading = true
      this.page_size = v
      if (this.searchKey) {
        getExamlog({ page_size: this.page_size, page: this.page, nickname: this.searchKey }).then(res => {
          this.tableData = res.data.list
          this.total = res.data.count
          this.loading = false
        })
      } else {
        getExamlog({ page_size: this.page_size, page: this.page }).then(res => {
          this.tableData = res.data.list
          this.total = res.data.count
          this.loading = false
        })
      }
    },
    handleCurrentChange(v) {
      console.log('切换页码触发');
      this.loading = true
      this.page = v
      if (this.searchKey) {
        getExamlog({ page_size: this.page_size, page: this.page, nickname: this.searchKey }).then(res => {
          this.tableData = res.data.list
          this.total = res.data.count
          this.loading = false
        })
      } else {
        getExamlog({ page_size: this.page_size, page: this.page }).then(res => {
          this.tableData = res.data.list
          this.total = res.data.count
          this.loading = false
        })
      }
    },
  },
  mounted() {
    this.getExamlog();
  },
}
</script>

<style lang="scss" scoped>
.main {
  margin: 10px 15px;
}
</style>