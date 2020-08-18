<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div>
        <!-- 搜索 -->
        <span>
          <!-- <el-input clearable placeholder="输入名称或者描述搜索" style="width: 200px;" class="filter-item" /> -->
          <span class='filter-item'>
            <!-- <el-button type="success" icon="el-icon-search">搜索</el-button>
            <el-button type="warning" icon="el-icon-refresh-left">重置</el-button> -->
            <el-button type="primary" icon="el-icon-plus" @click="handleAdd()">创建课程</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="handleAdd()">创建须知</el-button>
          </span>
        </span>
        <span>
          <el-button-group>
            <el-button icon="el-icon-search"></el-button>
            <el-button icon="el-icon-refresh" @click="refresh"></el-button>
          </el-button-group>
        </span>
      </div>
    </div>
    <!--菜单管理-->
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin-top: 20px">
      <el-card class="box-card" shadow="never">
        <el-table ref="table" :data="data" v-loading='loading'>
          <el-table-column label="ID" prop="id" width="55" />
          <el-table-column prop="type_name" label="类别" align="center" width="300">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.type_name" placement="top">
                <span style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.type_name}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="course_price" label="价格" align="center">
            <template slot-scope="scope">
              <span class="course_price" v-if="scope.row.course_price != 0">¥ {{scope.row.course_price}}</span>
              <span class="course_price" v-else>免费</span>
            </template>
          </el-table-column>
          <el-table-column prop="course_thumb" label="Banner图" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.course_thumb" alt="" class="course_thumb">
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete" @click="DelTrainingCourse(scope.row.id)">删除</el-button>
              <el-button size="mini" type="warning" icon="el-icon-view" @click="seeCourseItem(scope.row)">查看课件</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页组件-->
        <!-- <pagination /> -->
      </el-card>
    </el-col>
    <!-- 新增弹窗 -->
    <DialogCourse :dialogMenu="dialogMenu" :formData="formData" @update='gettrainingCourse'></DialogCourse>
  </div>
</template>

<script>
import { gettrainingCourse, DelTrainingCourse } from "@/api/training";
export default {
  data() {
    return {
      loading: false,
      data: [],
      dialogMenu: {
        show: false,
        title: "",
        option: ""
      },
      formData: {
        type: [],
        course_price: "",
        sort: "",
        zhengshu_price: "",
        false_number: "",
        tuozhan_number: "",
        imgUrl: "",
      }
    }
  },
  methods: {
    // 创建课程
    handleAdd() {
      this.dialogMenu = {
        show: true,
        title: "创建课程",
        option: "add",
      };
      this.formData = {
        type_id: '',
        type: [],
        course_price: '',
        sort: "",
        zhengshu_price: "",
        false_number: "",
        tuozhan_number: "",
        imgUrl: "",
      }
    },
    // 刷新
    refresh() { },
    // 编辑课程
    handleEdit(row) {
      console.log(row);
      this.dialogMenu = {
        show: true,
        title: "编辑课程",
        option: "edit",
      };
      this.formData = {
        id: row.id,
        type_id: row.type_arr[2],
        type: row.type_arr,
        course_price: row.course_price,
        sort: row.sort,
        zhengshu_price: row.certificate_price,
        false_number: row.click_number,
        tuozhan_number: row.expand_number,
        imgUrl: row.course_thumb,
      }
    },
    // 查看课件
    seeCourseItem(row) {
      this.$router.push({
        path: "/training/courseitem",
        query: {
          id: row.id,
          type: row.type_name,
          thirdId:row.type_arr[2]
        }
      })
      localStorage.setItem("type", row.type_name);
      localStorage.setItem("thirdId", row.type_arr[2]);
    },
    //获取课程
    gettrainingCourse() {
      this.loading = true
      gettrainingCourse().then(res => {
        this.data = res.data.list
        this.loading = false
      })
    },
    //删除课程
    DelTrainingCourse(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DelTrainingCourse(id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.gettrainingCourse()
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
    this.gettrainingCourse();
  },
  components: {
    DialogCourse: resolve => {
      require(['@/components/Training/course/DialogCourse.vue'], resolve)
    },
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
  }
}
.course_price {
  font-weight: 600;
  background-color: #23b7e5;
  color: #ffffff;
  padding: 1px 8px;
  border-radius: 15px;
}
.course_thumb {
  width: 100px;
  border-radius: 3px;
}
</style>