<template>
  <div class="main">
    <el-card style="margin-top:10px;">
      <!--工具栏-->
      <div class="head-container">
        <div style="display:flex;align-item:center;">
          <!-- 搜索 -->
          <el-input clearable placeholder="输入直播名称" style="width: 200px;" class="filter-item" v-model="keyVal" />
          <el-date-picker :default-time="['00:00:00','23:59:59']" type="daterange" range-separator="至" class="date-item" style="margin:0 10px;"
                          value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期" v-model="seleteTime" />
          <el-button type="success" icon="el-icon-search" @click="search">搜索</el-button>
          <el-button type="primary" icon="el-icon-refresh-left" @click="resetting">重置</el-button>
        </div>
      </div>
      <!-- 表格渲染 -->
      <el-col style='margin-top: 10px;'>
        <!--表格渲染-->
        <el-card style="margin:10px 0;">
          <el-table ref="table" :data="data" style="width: 100%;" v-loading='loading' :max-height="tableHeight">
            <el-table-column :show-overflow-tooltip="true" prop="id" label="ID" width="55" />
            <el-table-column prop="broadcast_name" label="直播名称" align="left" min-width="125">
              <template slot-scope="scope">
                <span style="font-weight:900;">{{scope.row.broadcast_name}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="broadcast_img" label="直播封面" align="center">
              <template slot-scope="scope">
                <img :src="scope.row.broadcast_img" width="80px" alt="">
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="commit_status" label="状态" align="center">
              <template slot-scope="scope">
                <el-tag size="mini" v-if="scope.row.commit_status == 0" type="danger">审核中</el-tag>
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="teacher_name" label="直播归属" align="center" />
            <el-table-column :show-overflow-tooltip="true" prop="broadcast_price" label="价格/密码" align="center">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.broadcast_price == 0 && scope.row.is_admission == 1" size="mini">{{scope.row.broadcast_price_text}}</el-tag>
                <el-tag v-if=" scope.row.is_admission == 0" size="mini" type="danger">{{scope.row.is_admission_text}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="start_time" label="开播时间" align="center">
              <template slot-scope="scope">
                <span>{{$formatDate(scope.row.start_time * 1000,'yyyy-MM-dd hh:mm:ss')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="warning" size="mini">审核</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <pagination :page="page" :total="total" :page_size="page_size" :background="true" @handleCurrentChange="handleCurrentChange"
                      @handleSizeChange="handleSizeChange" />
        </el-card>
      </el-col>
    </el-card>

  </div>
</template>

<script>
import { getLivetList, shenheLive } from "@/api/live";
export default {
  data() {
    return {
      tableHeight: document.documentElement.clientHeight - 280 || document.body.clientHeight - 280,
      seleteTime: '',
      keyVal: "",//搜索关键词
      loading: false,
      page: 1,
      page_size: 10,
      total: 0,
      data: [],//直播列表
    }
  },
  methods: {
    // 审核通过
    handleClick(row) {
      this.$confirm('确定要审核通过吗？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        shenheLive(row.id, 1).then(res => {
          this.$message({
            type: 'success',
            message: '审核成功!'
          });
          this.getLivetList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消审核'
        });
      });
    },
    handleCurrentChange(val) {
      this.page = val
      this.getLivetList()
    },
    handleSizeChange(val) {
      this.page_size = val
      this.getLivetList()
    },
    //重置
    resetting() {
      this.seleteTime = ''
      this.keyVal = ''
      this.getLivetList()
    },
    //获取直播列表
    getLivetList() {
      this.loading = true
      this.data = []
      getLivetList({ page: this.page, page_size: this.page_size, commit_status: 0, broadcast_name: this.keyVal, start_time: this.start_time, end_time: this.end_time }).then(res => {
        this.data = res.data.list
        this.total = res.data.count
        this.loading = false
      }).catch(err => {
        console.log(err);
        this.loading = false
      })
    },
    search() {
      this.getLivetList()
    }
  },
  mounted() {
    this.getLivetList();
  },
  computed: {
    start_time() {
      if (this.seleteTime == '' || this.seleteTime == null) {
        return ""
      } else {
        return (new Date(this.seleteTime[0]).getTime()) / 1000
      }
    },
    end_time() {
      if (this.seleteTime == '' || this.seleteTime == null) {
        return ""
      } else {
        return (new Date(this.seleteTime[1]).getTime()) / 1000
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  margin: 10px;
  .liuliang {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    span {
      width: 32%;
      border-radius: 6px;
      color: #dcf2f8;
      text-align: center;
      background-color: #23b7e5;
      padding-bottom: 10px;
      .num {
        color: #fff;
        font-size: 34px;
        margin-top: 10px;
        margin-bottom: 10px;
        font-weight: 600;
      }
      .txt {
        color: #dddce4;
        font-size: 14px;
      }
    }
  }
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
  .p {
    font-size: 14px;
    margin-bottom: 10px;
  }

  .p3 {
    &:hover {
      color: #fe8130;
      cursor: pointer;
    }
  }

  .p5 {
    line-height: 20px;
    &:hover {
      color: #fe8130;
      cursor: pointer;
    }
  }
  .a1 {
    width: 100%;
    background: #dcedf6;
    border-radius: 5px;
    padding: 20px;
    box-sizing: border-box;
    h1 {
      font-weight: 800;
      color: #45738f;
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
  .t {
    font-size: 15px;
    font-weight: 600;
  }
  .center {
    text-align: center;
    margin-top: 20px;
  }
}
</style>