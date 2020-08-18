<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div>
        <!-- 搜索 -->
        <span>
          <el-input clearable placeholder="输入名称或者描述搜索" style="width: 200px;" class="filter-item" />
          <span class='filter-item'>
            <el-button type="success" icon="el-icon-search">搜索</el-button>
            <el-button type="warning" icon="el-icon-refresh-left">重置</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="handleAdd()">创建课件</el-button>
          </span>
        </span>
        <span>
          <el-button-group>
            <el-button icon="el-icon-search"></el-button>
            <el-button icon="el-icon-refresh" @click="refresh"></el-button>
          </el-button-group>
        </span>
      </div>
      <div class="type">
        <h2>{{type}}</h2>
      </div>
    </div>
    <!--菜单管理-->
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin-top: 20px">
      <el-table ref="table" :data="data" v-loading='loading' :max-height="tableHeight">
        <el-table-column label="ID" prop="id" width="50" />
        <el-table-column prop="type_name" label="分类" align="center" />
        <el-table-column prop="course_name" label="课程名称" width="300" align="center">
          <template slot-scope="scope">
            <!-- <span class="course_title">{{scope.row.course_name}}</span> -->
            <el-tag>{{scope.row.course_name}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="course_desc" show-overflow-tooltip label="课程简介" align="center" />
        <el-table-column prop="course_thumb" label="封面图" align="center" width="130">
          <template slot-scope="scope">
            <el-image :src="scope.row.course_thumb" alt="" class="course_thumb">
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="teacher_name" label="导师名称" align="center" />
        <!-- 是否上架 -->
        <el-table-column prop="disabled" label="是否上架" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.disabled" :active-value="1" :inactive-value="0">
            </el-switch>
          </template>
        </el-table-column>
        <!-- 类型 -->
        <!-- <el-table-column prop="course_type" label="类型" /> -->
        <!-- 视频预览 -->
        <el-table-column prop="video" label="预览" align="center">
          <template slot-scope="scope">
            <!-- <video :src="scope.row.video" controls width="150px"></video> -->
            <el-button type="danger" size="mini" @click="seeVideo(scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="DeltrainingCourseware(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <div class="fenye" style="margin-top:10px;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[5,10, 20, 30, 40]" :page-size="pageSize" layout="total, prev, pager, next,sizes" :total="total">
        </el-pagination>
      </div>
    </el-col>
    <!-- 视频预览弹窗 -->
    <el-dialog title="视频预览" :visible.sync="dialogVisible" width="50%" @close='closeVideo' :close-on-click-modal='false'>
      <div style="text-align: center;">
        <video :src="videoUrl" controls ref="video" width="100%;"></video>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { gettrainingCourseItem, DeltrainingCourseware } from "@/api/training";
export default {
  data() {
    return {
      tableHeight: document.documentElement.clientHeight || document.body.clientHeight,
      pageSize: 10,
      page: 1,
      total: 40,
      loading: false,
      dialogVisible: false,
      id: this.$route.query.id,
      type: this.$route.query.type || localStorage.getItem("type"),
      thirdId: this.$route.query.thirdId || localStorage.getItem("thirdId"),
      value: "0",
      videoUrl: "",
      data: [],
      dialogMenu: {
        show: false,
        title: "",
        option: ""
      },
      formData: {
        menu: "",
        title: "",
        desc: "",
        imgUrl: "",
        sort: 0,
        is_up: "",
        type: '1',
        teacher: "",
        video: ""
      }
    }
  },
  methods: {
    handleAdd() {
      this.$router.push({
        path: '/training/addCourseItem',
        query: {
          id: this.id,
          type: this.type,
          thirdId: this.thirdId
        }
      })
    },
    refresh() {

    },
    seeVideo(row) {
      this.dialogVisible = true
      this.videoUrl = row.link_url
    },
    //弹窗隐藏视频暂停播放
    closeVideo() {
      let vid = this.$refs.video;
      if (!vid.paused) {
        vid.pause()
      }
    },
    handleEdit(row) {
      this.$router.push({
        path: '/training/editCourseItem/' + row.id,
        query: {
          type: this.type,
          thirdId: this.thirdId
        }
      })
    },
    // 分页相关
    handleSizeChange(v) {
      // console.log('每页显示xxx条 触发');
      this.loading = true
      this.pageSize = v
      gettrainingCourseItem({ page_size: this.pageSize, page: this.page }, this.id).then(res => {
        this.data = res.data.list
        this.total = res.data.count
        this.loading = false
      })
    },
    // 分页相关
    handleCurrentChange(v) {
      this.loading = true
      this.page = v
      gettrainingCourseItem({ page_size: this.pageSize, page: this.page }, this.id).then(res => {
        this.data = res.data.list
        this.total = res.data.count
        this.loading = false
      })
    },
    // 删除课件
    DeltrainingCourseware(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DeltrainingCourseware(row.id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          gettrainingCourseItem({ page_size: this.pageSize, page: this.page }, this.id).then(res => {
            this.data = res.data.list
            this.total = res.data.count
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
  components: {

  },
  mounted() {
    // 获取课件列表
    this.loading = true
    gettrainingCourseItem({ page_size: this.pageSize, page: this.page }, this.id).then(res => {
      this.data = res.data.list
      this.total = res.data.count
      this.loading = false
    })
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
    .type {
      color: #31708f;
      background-color: #d9edf7;
      border-color: #bce8f1;
      padding: 15px;
      border: 1px solid transparent;
      border-radius: 4px;
      box-sizing: border-box;
      margin-top: 15px;
      h2 {
        margin: 0;
        margin-left: 10px;
        font-weight: 300;
        font-size: 24px;
      }
    }
  }
}
.course_title {
  font-weight: 600;
  background-color: #23b7e5;
  color: #ffffff;
  padding: 1px 8px;
  border-radius: 15px;
}
.course_thumb {
  width: 80px;
  border-radius: 2px;
}
</style>
