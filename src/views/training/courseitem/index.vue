<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div>
        <!-- 搜索 -->
        <span>
          <el-input  clearable placeholder="输入名称或者描述搜索" style="width: 200px;" class="filter-item" />
          <span class='filter-item'>
            <el-button  type="success" icon="el-icon-search">搜索</el-button>
            <el-button  type="warning" icon="el-icon-refresh-left">重置</el-button>
            <el-button  type="primary" icon="el-icon-plus" @click="handleAdd()">创建课件</el-button>
          </span>
        </span>
        <span>
          <el-button-group>
            <el-button icon="el-icon-search" ></el-button>
            <el-button icon="el-icon-refresh"  @click="refresh"></el-button>
          </el-button-group>
        </span>
      </div>
      <div class="type">
        <h2>{{type}}</h2>
      </div>
    </div>
    <!--菜单管理-->
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin-top: 20px">
      <el-table ref="table" :data="data" >
        <el-table-column label="ID" prop="id" width="50" />
        <el-table-column prop="type_name" label="分类" align="center" />
        <el-table-column prop="course_title" label="课程名称" width="300" align="center">
          <template slot-scope="scope">
            <span class="course_title">{{scope.row.course_title}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="is_content" label="课程简介" align="center" />
        <el-table-column prop="course_thumb" label="封面图" align="center" width="130">
          <template slot-scope="scope">
            <img :src="scope.row.course_thumb" alt="" class="course_thumb">
          </template>
        </el-table-column>
        <el-table-column prop="teacher_name" label="导师名称" align="center" />
        <!-- 是否上架 -->
        <el-table-column prop="disabled" label="是否上架" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.disabled" active-value="1" inactive-value="0">
            </el-switch>
          </template>
        </el-table-column>
        <!-- 类型 -->
        <!-- <el-table-column prop="course_type" label="类型" /> -->
        <!-- 视频预览 -->
        <el-table-column prop="video" label="预览" align="center">
          <template slot-scope="scope">
            <!-- <video :src="scope.row.video" controls width="150px"></video> -->
            <el-button  type="danger" @click="seeVideo(scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button  type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button  type="danger" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <!-- <pagination /> -->
    </el-col>
    <!-- 视频预览弹窗 -->
    <el-dialog title="视频预览" :visible.sync="dialogVisible" width="50%" @close='closeVideo' :close-on-click-modal='false'>
      <div style="text-align: center;">
        <video :src="videoUrl" controls ref="video"></video>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      id: this.$route.query.id,
      type: this.$route.query.type,
      value: "0",
      videoUrl: "",
      data: [
        {
          "id": 1,
          "course_id": 1,
          "type_id": 4,
          "course_name": "第一讲 言语-语言 康复训练概述",
          "course_thumb": "http://erkong.ybc365.com/8be61202003142119171285.png",
          "content": "<p>1.言语产生的机制</p><p>2.言语和语言的区别</p><p>3.言语的产生和感知</p><p>4.言语产生的五大功能模块</p><p>5.常见的障碍类型</p><p>6.影响言语的主要相关疾病</p>",
          "virtual_stock": null,
          "sole_stock": 0,
          "sort": 0,
          "disabled": "1",
          "teacher_name": "华雯华雯",
          "course_type": "1",
          "link_url": "http://1301260560.vod2.myqcloud.com/d5afc5davodcq1301260560/37c9c3025285890799993292805/f0.mp4",
          "create_time": 1584327224,
          "course_desc": "1.言语产生的机制 2.言语和语言的区别 3.言语的产生和感知 4.言语产生的五大功能模块 5.常见的障6.影响言语的主要相关疾病",
          "live_time": "1570",
          "type_name": "基础课程",
          "is_content": "已填写",
          "course_title": "第三讲 发声与共鸣系统概述及训练方法",
          "video": "http://zsvideo.86itn.cn/140838423%20%282%29.mp4"
        },
      ],
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
      // this.dialogMenu = {
      //   show: true,
      //   title: "创建课件",
      //   option: "add",
      // };
      // this.formData = {
      //   menu: "",
      //   title: "",
      //   desc: "",
      //   imgUrl: "",
      //   sort: 0,
      //   is_up: "1",
      //   type: "1",
      //   teacher: "",
      //   video: ""
      // }
      this.$router.push({
        path: '/training/addCourseItem',
        query: {
          type: this.type
        }
      })
    },
    refresh() {

    },
    seeVideo(row) {
      this.dialogVisible = true
      this.videoUrl = row.video
    },
    //弹窗隐藏视频暂停播放
    closeVideo() {
      let vid = this.$refs.video;
      if (!vid.paused) {
        vid.pause()
      }
    },
    handleEdit(row) {
      // this.dialogMenu = {
      //   show: true,
      //   title: "编辑课件",
      //   option: "edit",
      // };
      // this.formData = {
      //   menu:row.type_name,
      //   title: row.course_name,
      //   desc: row.course_desc,
      //   imgUrl:row.course_thumb,
      //   sort: row.sort,
      //   is_up: row.disabled,
      //   type: row.course_type,
      //   teacher: row.teacher_name,
      //   video: row.link_url
      // }
      this.$router.push({
        path: '/training/editCourseItem/' + row.id,
        query: {
          type: this.type,
        }
      })
    },

  },
  components: {

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
  width: 100px;
}
</style>