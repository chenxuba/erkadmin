<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div>
        <!-- 搜索 -->
        <span>
          <el-input size="small" clearable placeholder="输入名称或者描述搜索" style="width: 200px;" class="filter-item" />
          <span class='filter-item'>
            <el-button size="mini" type="success" icon="el-icon-search">搜索</el-button>
            <el-button size="mini" type="warning" icon="el-icon-refresh-left">重置</el-button>
            <el-button size="mini" type="primary" icon="el-icon-plus" @click="handleAdd()">创建课程</el-button>
            <el-button size="mini" type="primary" icon="el-icon-plus" @click="handleAdd()">创建须知</el-button>
          </span>
        </span>
        <span>
          <el-button-group>
            <el-button icon="el-icon-search" size="mini"></el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="refresh"></el-button>
          </el-button-group>
        </span>
      </div>
    </div>
    <!--菜单管理-->
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin-top: 20px">
      <el-card class="box-card" shadow="never">
        <el-table ref="table" :data="data">
          <el-table-column label="ID" prop="id" width="100" />
          <el-table-column prop="type_name" label="类别">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.type_name" placement="top">
                <span style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.type_name}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="course_price" label="价格">
            <template slot-scope="scope">
              <span class="course_price">¥ {{scope.row.course_price}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="course_thumb" label="Banner图">
            <template slot-scope="scope">
              <img :src="scope.row.course_thumb" alt="" class="course_thumb">
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
              <el-button size="mini" type="warning" icon="el-icon-view" @click="seeCourseItem(scope.row)">查看课件</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页组件-->
        <!-- <pagination /> -->
      </el-card>
    </el-col>
    <!-- 新增弹窗 -->
    <DialogCourse :dialogMenu="dialogMenu" :formData="formData"></DialogCourse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          "id": 1,
          "type_id": 3,
          "course_price": "900",
          "sort": "0",
          "course_thumb": "http://erkong.ybc365.com/a8421202003142111179409.png",
          "create_time": 1584191486,
          "view_number": 45,
          "certificate_price": "20.00",
          "click_number": 0,
          "expand_number": 8,
          "type_name": "康复训练师/言语-语言职业认证课程/初级认证",
          "thumb": "<img src='http://erkong.ybc365.com/a8421202003142111179409.png' width='68'>"
        },
        {
          "id": 3,
          "type_id": 10,
          "course_price": "1100",
          "sort": "0",
          "course_thumb": "http://erkong.ybc365.com/940a4202003201655408246.png",
          "create_time": 1584694610,
          "view_number": 50,
          "certificate_price": "20.00",
          "click_number": 0,
          "expand_number": 11,
          "type_name": "康复训练师/言语-语言职业认证课程/中级认证",
          "thumb": "<img src='http://erkong.ybc365.com/940a4202003201655408246.png' width='68'>"
        }
      ],
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
    handleAdd() {
      this.dialogMenu = {
        show: true,
        title: "创建课程",
        option: "add",
      };
      this.formData = {
        type: [],
        course_price: '',
        sort: "",
        zhengshu_price: "",
        false_number: "",
        tuozhan_number: "",
        imgUrl: "",
      }
    },
    refresh() {

    },
    handleEdit(row) {
      this.dialogMenu = {
        show: true,
        title: "编辑课程",
        option: "edit",
      };
      this.formData = {
        type: [],
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
          type:row.type_name
        }
      })
    }
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
  width: 120px;
}
</style>