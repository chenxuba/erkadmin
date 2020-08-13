<template>
  <div class="main">
    <!--工具栏-->
    <div class="head-container" style="margin: 10px;">
      <div style="display: flex;align-items: center;justify-content: space-between;">
        <span style="display: flex;align-items: center;">
          <span class='filter-item'>
            <el-button size="mini" type="success" icon="el-icon-search" @click='outexport'>导出</el-button>
          </span>
        </span>
        <span>
          <el-button-group>
            <el-button icon="el-icon-search" size="mini"></el-button>
            <el-button icon="el-icon-refresh" size="mini"></el-button>
          </el-button-group>
        </span>
      </div>
    </div>
    <el-tabs type="border-card" v-model="activeTab" @tab-click='changeTab'>
      <el-tab-pane v-for="(item,index) in tabs" :key="index" :label="item.type" :name="item.name">
        <!--:is实现多个组件实现同一个挂载点-->
        <component :is="activeTab" :tableData='tableData' :loading='loading' :detail='detail' :wenjuan='wenjuan' ref="childref"></component>
        <div class="fenye" style="margin-top:15px;" v-if="item.name != 'studystatics'">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[5,10, 20, 30, 40]" :page-size="page_size" layout="total, prev, pager, next,sizes" :total="total">
          </el-pagination>
        </div>
        <div class="fenye" style="margin-top:15px;" v-if="item.name == 'studystatics'">
          <el-pagination @current-change="handleCurrentChange1" :page-sizes="[5,10, 20, 30, 40]" :page-size="page_size1" layout="total, prev, pager, next" :total="wenjuancount">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getStudyCoursesrank, getStudystatics, getquestionnaire } from "@/api/activity/21DayStudy";
export default {
  data() {
    return {
      loading: false,
      week_no: 1,
      total: 0,
      page_size: 10,
      page_size1: 10,
      page: 1,
      page1: 1,
      tableData: [],
      detail: {},
      wenjuan: [],
      wenjuancount: 0,
      activeTab: 'fristWeek',
      tabs: [
        {
          type: '第一周',
          name: 'fristWeek',
        },
        {
          type: '第二周',
          name: 'secondWeek',
        },
        {
          type: '第三周',
          name: 'thirdWeek',
        },
        {
          type: '数据概览和课程反馈',
          name: 'studystatics',
        }
      ]
    }
  },
  components: {
    fristWeek: resolve => {
      require(['@/views/activity/21DayStudy/statistical/fristWeek.vue'], resolve)
    },
    secondWeek: resolve => {
      require(['@/views/activity/21DayStudy/statistical/secondWeek.vue'], resolve)
    },
    thirdWeek: resolve => {
      require(['@/views/activity/21DayStudy/statistical/thirdWeek.vue'], resolve)
    },
    studystatics: resolve => {
      require(['@/views/activity/21DayStudy/statistical/studystatics.vue'], resolve)
    },
  },
  methods: {
    changeTab(e) {
      this.loading = true
      this.week_no = Number(e.index) + 1
      if (this.week_no != 4) {
        getStudyCoursesrank({ week_no: this.week_no, page_size: this.page_size, page: this.page }).then(res => {
          if (res.code == 0) {
            this.loading = false
            this.tableData = res.data.list
          }
        })
      }
    },
    handleSizeChange(v) {
      this.page_size = v
      this.loading = true
      getStudyCoursesrank({ week_no: this.week_no, page_size: this.page_size, page: this.page }).then(res => {
        this.tableData = res.data.list
        this.total = res.data.count
        this.loading = false
      })
    },
    handleCurrentChange(v) {
      this.loading = true
      this.page = v
      getStudyCoursesrank({ week_no: this.week_no, page_size: this.page_size, page: this.page }).then(res => {
        this.tableData = res.data.list
        this.total = res.data.count
        this.loading = false
      })

    },

    handleCurrentChange1(v) {
      this.loading = true
      this.page1 = v
      getquestionnaire({ page_size: this.page_size, page: this.page1 }).then(res => {
        this.wenjuan = res.data.list
        this.wenjuancount = res.data.count
        this.loading = false
      })

    },
    //导出
    outexport() {
      if (this.week_no != 4) {
        if (this.tableData == '') {
          this.$message.error('数据为空，不允许执行导出！')
        } else {
          this.$confirm('此操作将导出文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            window.location.href = process.env.VUE_APP_BASE_API + '/study/courses/export?week_no=' + this.week_no
            this.$message({
              type: 'success',
              message: '导出成功!'
            });

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消导出'
            });
          });
        }
      } else {
        this.$confirm('此操作将导出文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          window.location.href = process.env.VUE_APP_BASE_API + '/study/questionnaire/export'
          this.$message({
            type: 'success',
            message: '导出成功!'
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消导出'
          });
        });

      }




    },
    getStudystatics() {
      getStudystatics().then(res => {
        this.detail = res.data
      })
    },
    // 获取问卷
    getquestionnaire() {
      getquestionnaire().then(res => {
        console.log(res);
        this.wenjuan = res.data.list
        this.wenjuancount = res.data.count
        this.loading = false
      })
    },
    getStudyCoursesrank() {
      this.loading = true
      getStudyCoursesrank({ week_no: 1, page_size: this.page_size, page: this.page }).then(res => {
        if (res.code == 0) {
          this.tableData = res.data.list
          this.total = res.data.count
          this.loading = false
        }
      })
    }
  },
  mounted() {
    this.getStudyCoursesrank()
    this.getStudystatics()
    this.getquestionnaire()
  },
}
</script>

<style lang="scss" scoped>
</style>