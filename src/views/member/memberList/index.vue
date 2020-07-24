<template>
  <div class="main">
    <el-card style="margin-top:10px;">
      <!--工具栏-->
      <div class="head-container">
        <el-form ref="ruleForm">
          <div>
            <!-- 输入用户名称搜索 -->
            <el-input clearable placeholder="输入用户名称搜索" v-model="searchName" style="width: 150px;" class="filter-item" />
            <!-- 是否绑定手机号 -->
            <el-select v-model="teacher" placeholder="是否绑定手机号" clearable @clear='clear' @change='changePhone'>
              <el-option v-for="item in teacherArr" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-date-picker :default-time="['00:00:00','23:59:59']" type="daterange" range-separator=":" class="date-item" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期" />
            <!-- 输入手机号码搜索 -->
            <el-input clearable placeholder="输入手机号码搜索" style="width: 150px;" class="filter-item" />
            <!-- 请选择用户状态 -->
            <el-select v-model="teacher" placeholder="请选择用户状态">
              <el-option v-for="item in teacherArr" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <div style="margin-top:10px;">
              <!-- 导出 -->
              <el-button type="warning" icon="el-icon-download" @click="outexport">导出</el-button>
              <el-button type="success" icon="el-icon-search" @click="search">搜索</el-button>
              <el-button type="primary" icon="el-icon-refresh-left" @click="Reset">重置</el-button>
            </div>
          </div>
        </el-form>
      </div>
      <!-- 表格渲染 -->
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style='margin-top: 10px;'>
        <!--表格渲染-->
        <el-card style="margin:10px 0;">
          <el-table ref="table" :data="data" style="width: 100%;" v-loading="loading" height="395">
            <!-- 用户名称 nickname -->
            <el-table-column :show-overflow-tooltip="true" prop="nickname" label="用户名称" align="center" />
            <!-- 手机号 -->
            <el-table-column :show-overflow-tooltip="true" prop="phone" label="手机号" align="center" width="100">
              <template slot-scope="scope">
                {{scope.row.phone | hideMiddle}}
              </template>
            </el-table-column>
            <!-- 头像 headimg -->
            <el-table-column prop="headimg" label="头像" align="center">
              <template slot-scope="scope">
                <img :src="scope.row.headimg" width="100%" alt="" class="headimg">
              </template>
            </el-table-column>
            <!-- 用户身份 is_vip -->
            <el-table-column :show-overflow-tooltip="true" prop="is_vip" label="用户身份" align="center">
              <template slot-scope="scope">
                <el-tag>{{scope.row.is_vip_text}}</el-tag>
              </template>
            </el-table-column>
            <!-- 推荐人 is_agent_name -->
            <el-table-column :show-overflow-tooltip="true" prop="is_agent_name" label="推荐人" align="center" />
            <!-- 消费总金额 consume_amount -->
            <el-table-column :show-overflow-tooltip="true" prop="consume_amount" label="消费" align="center" width="80" />
            <!-- 禁用 disabled -->
            <el-table-column prop="disabled" label="禁用" align="center">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.disabled" :active-value="0" active-text="是" :inactive-value="1" inactive-text="否">
                </el-switch>
              </template>
            </el-table-column>
            <!-- 到期时间 endtime -->
            <el-table-column prop="create_time" label="到期时间" align="center" />
            <!-- 注册时间 create_time  -->
            <el-table-column :show-overflow-tooltip="true" prop="create_time" label="注册时间" align="center" width="130" />
            <!-- 是否核销人员 is_write_text -->
            <el-table-column :show-overflow-tooltip="true" prop="is_write_text" label="核销人员" align="center" />
            <!-- 是否是导师 is_teacher_text -->
            <el-table-column :show-overflow-tooltip="true" prop="is_teacher_text" label="是否是导师" align="center">
              <template slot-scope="scope">
                <el-button type="text">{{scope.row.is_teacher_text}}</el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" align="center">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="编辑视频" placement="top">
                  <el-button @click="handleClick(scope.row)" circle icon="el-icon-edit" type="primary" />
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除视频" placement="top">
                  <el-button type="danger" circle class="btn" icon="el-icon-delete"></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="查看评论" placement="top">
                  <el-button type="warning" circle icon="el-icon-s-comment"></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <div class="fenye" style="margin-top:20px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="page_size" layout="total, prev, pager, next,sizes" :total="total">
            </el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-card>
  </div>
</template>

<script>
import { getmemberList } from "@/api/member";
export default {
  data() {
    return {
      loading: true,
      searchName: "",
      teacher: "",
      is_having_phone: '-1',//是否绑定手机号的值
      teacherArr: [{
        value: '1',
        label: '已绑定'
      }, {
        value: '0',
        label: '未绑定'
      }],
      data: [],
      page: 1,
      page_size: 10,
      total: 0
    }
  },
  methods: {
    //   用户名搜索
    search() {
      this.loading = true
      getmemberList({ nickname: this.searchName, is_having_phone: this.is_having_phone }).then(res => {
        this.data = res.data.list
        this.total = res.data.count
        this.loading = false
      }).catch(err => {
        console.log(err);
      })
    },
    //   是否绑定手机号
    changePhone(v) {
      this.is_having_phone = v
      this.loading = true
      getmemberList({ nickname: this.searchName, is_having_phone: this.is_having_phone }).then(res => {
        this.data = res.data.list
        this.total = res.data.count
        this.loading = false
      }).catch(err => {
        console.log(err);
      })
    },
    //重置
    Reset() {
      this.loading = true
      this.searchName = ''
      this.getmemberList()
    },
    //导出
    outexport() {
      this.$confirm('此操作将导出文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '导出成功!'
        });
        window.location.href = process.env.VUE_APP_BASE_API + '/members/export?page_size=99999'
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消导出'
        });
      });
    },
    clear() {
      this.is_having_phone = '-1'
      this.loading = true
      getmemberList({ is_having_phone: this.is_having_phone }).then(res => {
        this.data = res.data.list
        this.total = res.data.count
        this.loading = false
      }).catch(err => {
        console.log(err);
      })
    },
    handleClick(row) {
    },
    handleAdd() {
      this.$router.push('/product/addcourse')
    },
    handleSizeChange(v) {
      this.loading = true
      this.page_size = v
      getmemberList({ page: this.page, page_size: this.page_size }).then(res => {
        this.data = res.data.list
        this.total = res.data.count
        this.loading = false
      }).catch(err => {
        console.log(err);
      })
    },
    //切换页码
    handleCurrentChange(v) {
      this.loading = true
      this.page = v
      getmemberList({ page: this.page, page_size: this.page_size }).then(res => {
        this.data = res.data.list
        this.total = res.data.count
        this.loading = false
      }).catch(err => {
        console.log(err);
      })
    },
    //获取用户列表
    getmemberList() {
      getmemberList({ page: this.page, page_size: this.page_size }).then(res => {
        this.data = res.data.list
        this.total = res.data.count
        this.loading = false
      }).catch(err => {
        console.log(err);
      })
    },

  },
  filters: {
    hideMiddle(val) {
      return `${val.substring(0, 3)}****${val.substring(val.length - 3)}`
    }
  },
  mounted() {
    this.getmemberList();
  },
}
</script>

<style lang="scss" scoped>
.main {
  margin: 10px;
  // 工具栏
  .head {
    &-container1 {
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
  .flex {
    display: flex;
  }
  .headimg {
    width: 45px;
    height: 45px;
    border-radius: 4px;
  }
  ::v-deep .el-switch {
    margin-left: -10px;
  }
  ::v-deep .el-switch__label--left {
    position: relative;
    left: 44px;
    color: #fff;
    z-index: -1111;
    span {
      font-size: 12px !important;
    }
  }
  ::v-deep .el-switch__label--right {
    position: relative;
    right: 44px;
    color: #fff;
    span {
      font-size: 12px !important;
    }
    z-index: -1111;
  }
  ::v-deep .el-switch__label--right.is-active {
    z-index: 1111;
    font-size: 12px !important;
    color: #fff !important;
  }
  ::v-deep .el-switch__label--left.is-active {
    z-index: 1111;
    font-size: 12px !important;
    color: #9c9c9c !important;
  }
}
</style>