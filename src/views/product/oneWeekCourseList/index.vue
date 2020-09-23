<template>
  <div class="main">
    <el-card style="margin-top:10px;padding-bottom:20px;">
      <!--工具栏-->
      <div class="head-container">
        <div>
          <!-- 搜索 -->
          <el-input clearable v-model="course_name" placeholder="输入课程名称搜索" style="width: 150px;margin-right:10px;" class="filter-item" />
          <!-- 选择导师 -->
          <el-select v-model="teacher" placeholder="请选择导师" filterable clearable>
            <el-option v-for="item in teacherArr" :key="item.id" :label="item.teacher_name" :value="item.id">
            </el-option>
          </el-select>
          <el-date-picker :default-time="['00:00:00','23:59:59']" style="margin:0 10px;" type="daterange" range-separator="至" class="date-item"
                          value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期" v-model="seleteTime" />
          <el-button type="success" icon="el-icon-search" @click="search">搜索</el-button>
          <el-button type="primary" icon="el-icon-refresh-left" @click="resetting">重置</el-button>
          <el-button type="warning" icon="el-icon-edit" @click="handleAdd">新增课程</el-button>
        </div>
      </div>
      <!-- 表格渲染 -->
      <el-col style='margin-top: 10px;'>
        <!--表格渲染-->
        <el-table ref="table" :data="data" style="width: 100%;" v-loading='loading' :max-height="tableHeight" border>
          <el-table-column type="index" label="#" width="45" align="center" />
          <!-- 标题 title -->
          <el-table-column :show-overflow-tooltip="true" prop="course_name" label="标题" align="center" />
          <!-- 封面图片 img -->
          <el-table-column prop="course_thumb" label="封面图片" align="center" width="110">
            <template slot-scope="scope">
              <img :src="scope.row.course_thumb" width="80" height="40" alt="">
            </template>
          </el-table-column>
          <!-- 所属分类 category -->
          <el-table-column :show-overflow-tooltip="true" prop="type_name" label="所属分类" align="center" width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.type_id == 0">
                <el-tag size="mini" type="warning">每周一课</el-tag>
              </span>
              <span v-else>{{scope.row.type_name}}</span>
            </template>
          </el-table-column>
          <!-- 类型 course_type -->
          <el-table-column :show-overflow-tooltip="true" prop="course_type_text" label="类型" align="center" width="60">
            <template slot-scope="scope">
              <el-tag type="danger" size="mini">{{scope.row.course_type_text}}</el-tag>
            </template>
          </el-table-column>
          <!-- 课程归属 from -->
          <el-table-column :show-overflow-tooltip="true" prop="teacher_title" label="归属" align="center" width="70" />
          <!-- 价格/密码 pwdOrPrice -->
          <el-table-column :show-overflow-tooltip="true" prop="course_price" label="价格/密码" align="center" width="100">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.course_price == 0.00" size="mini">免费</el-tag>
              <el-tag v-else size="mini">{{scope.row.course_price}}</el-tag>
            </template>
          </el-table-column>
          <!-- VIP折扣 vip -->
          <el-table-column prop="is_vip_text" label="VIP折扣" align="center" width="100">
            <template slot-scope="scope">
              <el-tag effect="dark" type="success" size="mini">{{scope.row.is_vip_text}}</el-tag>
            </template>
          </el-table-column>
          <!-- SVIP折扣 svip -->
          <el-table-column prop="is_svip_text" label="SVIP折扣" align="center" width="100">
            <template slot-scope="scope">
              <el-tag effect="dark" type="warning" size="mini">{{scope.row.is_svip_text}}</el-tag>
            </template>
          </el-table-column>
          <!-- 分享收益 share -->
          <el-table-column :show-overflow-tooltip="true" prop="recommend_price_text" label="分享收益" align="center" width="100">
            <template slot-scope="scope">
              <el-tag size="mini">{{scope.row.recommend_price_text}}</el-tag>
            </template>
          </el-table-column>
          <!-- 创建时间 createTime  -->
          <el-table-column :show-overflow-tooltip="true" prop="create_time" label="创建时间" align="center" width="110" />
          <el-table-column label="操作" align="center" fixed="right" width="120">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <el-button @click="handleEdit(scope.row)" icon="el-icon-edit" type="primary" />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <el-button type="danger" class="btn" icon="el-icon-delete" @click="handleDel(scope.row)"></el-button>
              </el-tooltip>
              <p style="margin:5px 0;"></p>
              <el-tooltip class="item" effect="dark" content="查看评论" placement="top">
                <el-button type="warning" icon="el-icon-s-comment"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="上传课时" placement="top">
                <el-button type="success" icon="el-icon-upload" @click="uploadItem(scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <pagination :page="page" :total="total" :page_size="page_size" :background="true" @handleCurrentChange="handleCurrentChange"
                    @handleSizeChange="handleSizeChange" />
      </el-col>
    </el-card>
  </div>
</template>

<script>
import { getCourseList, getTeachersList, delCourse } from "@/api/product/index";
import pagination from "@/components/Common/pagination"

export default {
  data() {
    return {
      loading: false,
      tableHeight: document.documentElement.clientHeight - 260 || document.body.clientHeight - 260,
      teacher: "",//选择导师筛选
      teacherArr: [],//导师列表
      data: [],
      page: 1,
      page_size: 10,
      total: 0,
      course_name: "",
      seleteTime: "",//选择时间筛选
    }
  },
  methods: {
    // 去编辑页面
    handleEdit(row) {
      this.$router.push({
        path: '/product/editcourse/' + row.id
      })
    },
    // 跳转到新增课程页面Z
    handleAdd() {
      this.$router.push('/product/addcourse?weekType=week')
    },
    // 去上传课时页面
    uploadItem(row) {
      this.$router.push('/product/uploadItem/' + row.id)
    },
    // 翻页
    handleCurrentChange(val) {
      this.page = val;
      this.getCourseList();
    },
    // 翻页
    handleSizeChange(val) {
      this.page_size = val;
      this.page = 1;
      this.getCourseList();
    },
    handleClickTabs() { },
    // 获取课程列表
    getCourseList() {
      this.loading = true
      this.data = []
      getCourseList({ type: 0, code: 0, teacher_type: 1, disabled: 1, page_size: this.page_size, page: this.page, course_name: this.course_name, teacher_name: this.teacher, start_time: this.start_time, end_time: this.end_time }).then(res => {
        this.data = res.data.list
        this.loading = false
        this.total = res.data.count
      }).catch(err => {
        console.log(err);
        this.loading = false
      })
    },
    //搜索
    search() {
      this.getCourseList()
    },
    //获取导师列表
    getTeachersList() {
      getTeachersList().then(res => {
        this.teacherArr = res.data.list
      })
    },
    //重置
    resetting() {
      this.seleteTime = ''
      this.course_name = ''
      this.teacher = ''
      this.getCourseList()
    },
    //删除课程
    handleDel(row) {
      this.$confirm('此操作将删除该课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delCourse(row.id).then(res => {
          this.$message.success("删除成功！")
          this.getCourseList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
  mounted() {
    this.getCourseList();
    this.getTeachersList()
  },
  components: {
    pagination,
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