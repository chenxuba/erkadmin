<template>
  <div class="main">
    <el-card>
      <el-row>
        <el-col>
          <el-cascader :show-all-levels="false" filterable v-model="courseTypeArr" placeholder="请选择分类" clearable :props='props' :options="courseType" @change="handleChangeCourseType"></el-cascader>
          <el-select v-model="courseItem_id" placeholder="请选择课件" style="margin:0 10px;">
            <el-option v-for="item in courseItemArr" :key="item.id" :label="item.course_name" :value="item.id">
            </el-option>
          </el-select>
          <el-button type="primary" style="width:100px;" size="mini" @click="hanldSearch">筛 选</el-button>
          <el-button type="warning" style="width:100px;" size="mini" @click="reset">重 置</el-button>
          <el-button type="success" style="width:100px;" size="mini" @click="addexamination">创建试卷</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top:20px;">
        <el-col>
          <el-table :data="tableData" style="width: 100%" v-loading='loading' :height="clientHeight">
            <el-table-column prop="id" label="ID" width="55" />
            <el-table-column prop="title" label="试卷名称" show-overflow-tooltip align="center">
              <template slot-scope="scope">
                <el-tag>{{scope.row.title}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="courseware_name" label="所属课件" show-overflow-tooltip align="center" />
            <el-table-column prop="total_num" label="总题目数" width="70" align="center" />
            <el-table-column prop="total_score" label="总分数" width="70" align="center" />
            <el-table-column prop="pass_number" label="合格分数" width="70" align="center">
              <template slot-scope="scope">
                <el-tag size="small" type="danger">{{scope.row.pass_number}}</el-tag>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="status" label="是否上架" width="100" align="center">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.disabled" active-value="1" inactive-value="0">
                </el-switch>
              </template>
            </el-table-column> -->
            <el-table-column label="操作" width="280" align="center">
              <template slot-scope="scope">
                <el-button type="primary" @click="hanlEdit(scope.row)">编辑</el-button>
                <el-button type="danger" @click="hanlDelete(scope.row)">删除</el-button>
                <el-button type="success" @click="hanlAdd(scope.row)">添加试题</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>
    <!--分页-->
    <div class="fenye" style="margin-top:6px;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="page_size" layout="total, prev, pager, next,sizes" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getExamination, DelExamination, getcourseType, getCourseWare } from "@/api/training";
export default {
  data() {
    return {
      loading: false,
      value: "",
      tableData: [],
      props: {
        value: "id",
        label: 'type_name'
      },
      page_size: 10,
      page: 1,
      total: 0,
      clientHeight: document.body.clientHeight - 270,
      courseType: [],//课件分类数组
      courseItemArr: [],//课件数组
      courseTypeArr: [],//选中的课件分类id数组
      courseType_id: '',//最后一级的课件分类id
      courseItem_id: '',//课件id
    }
  },
  methods: {
    // 选择分类后触发，请求课件列表
    handleChangeCourseType(value) {
      console.log(value);
      this.courseType_id = value[3]
      this.courseItem_id = ''
      getCourseWare(this.courseType_id).then(res => {
        this.courseItemArr = res.data
      })

    },
    // 编辑
    hanlEdit(row) {
      this.$router.push('/training/editexamination/' + row.id)
    },
    // 删除
    hanlDelete(row) {
      this.$confirm('此操作将删除该试卷, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DelExamination(row.id).then(res => {
          if (res.code == 0) {
            this.$message.error('删除成功')
            this.getExamination()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    // 添加试题
    hanlAdd(row) {
      this.$router.push({
        path: "/training/questions/" + row.id,
        query: {
          type: row.name
        }
      })
    },
    // 创建试卷
    addexamination() {
      this.$router.push('/training/addexamination')
    },
    // 获取列表
    getExamination() {
      this.loading = true
      getExamination({ page_size: this.page_size, page: this.page }).then(res => {
        this.loading = false
        this.tableData = res.data.list
        this.total = res.data.count
      })
    },
    handleSizeChange(v) {
      this.loading = true
      this.page_size = v
      getExamination({ page: this.page, page_size: this.page_size }).then(res => {
        this.tableData = res.data.list
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
      getExamination({ page: this.page, page_size: this.page_size }).then(res => {
        this.tableData = res.data.list
        this.total = res.data.count
        this.loading = false
      }).catch(err => {
        console.log(err);
      })
    },
    // 获取课件类别
    getcourseType() {
      getcourseType().then(res => {
        this.courseType = res.data.list
      })
    },
    // 搜索
    hanldSearch() {
      if (this.courseItem_id == '') {
        this.$message.error('请完善筛选条件')
      } else {
        this.loading = true
        getExamination({ courseware_id: this.courseItem_id }).then(res => {
          console.log(res);
          if (res.code == 0) {
            this.loading = false
            this.tableData = res.data.list
            this.total = res.data.count
          }
        })
      }
    },
    //重置
    reset() {
      this.courseItem_id = ''
      this.courseTypeArr = []
      this.getExamination()
    }
  },
  mounted() {
    this.getExamination();
    this.getcourseType()
  },
  watch: {

  },
}
</script>

<style lang="scss" scoped>
.main {
  margin: 10px;
}
</style>