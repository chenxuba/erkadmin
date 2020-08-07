<template>
  <div class="main" style="margin: 10px;">
    <!--工具栏-->
    <div class="head-container" style="margin-bottom: 10px;padding:0 2px;">
      <div style="display: flex;align-items: center;justify-content: space-between;">
        <span style="display: flex;align-items: center;">
          <el-input v-model="serachValue" size="small" clearable placeholder="输入视频名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery" />
          <span class='filter-item' style="margin-left: 15px;">
            <el-button size="mini" type="success" icon="el-icon-search">搜索</el-button>
            <el-button size="mini" type="warning" icon="el-icon-refresh-left">重置</el-button>
            <el-button size="mini" type="primary" icon="el-icon-plus" @click="hanldAdd">新增</el-button>
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
    <el-card>
      <el-table :data="tableData" style="width: 100%" v-loading='loading'>
        <el-table-column prop="id" label="ID" width="55">
        </el-table-column>
        <el-table-column prop="course_name" label="标题" width="300" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column prop="course_thumb" label="封面图" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.course_thumb" alt="" width="100" style="border-radius: 5px;">
          </template>
        </el-table-column>
        <el-table-column prop="course_desc" label="简介" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="video_url" label="视频" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="proview(scope.row.video_url)">预览</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" align="center" width="50">
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 预览dialog -->
    <el-dialog title="预览" :visible.sync="dialogProview" width="30%" destroy-on-close>
      <video :src="video_url" controls width="100%"></video>
    </el-dialog>
    <!-- 新增编辑dialog -->
    <el-dialog :title="title" :visible.sync="dialogAddEdit" width="50%" destroy-on-close @close='closeDialog'>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <!-- 视频标题 -->
        <el-form-item label="视频标题" prop="course_name">
          <el-input v-model="ruleForm.course_name" style="width:60%;" placeholder="请输入视频标题"></el-input>
        </el-form-item>
        <!-- 视频简介 -->
        <el-form-item label="视频简介" prop="course_desc">
          <el-input v-model="ruleForm.course_desc" type="textarea" style="width:60%;" placeholder="请输入视频简介"></el-input>
        </el-form-item>
        <!-- 封面 -->
        <uploadImage @uploadSuccessImg='uploadSuccessImg' accept='image/*' checking='course_thumb' name='上传封面'></uploadImage>
        <!-- 编辑时回显封面图 -->
        <el-form-item label="封面预览" prop="course_thumb" v-if="option == 'edit'">
          <img :src="ruleForm.course_thumb" alt="" width="160">
        </el-form-item>
        <!-- 是否传新视频 -->
        <el-form-item label="是否传新视频" prop="is_new">
          <el-radio-group v-model="ruleForm.is_new">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 表格 -->
        <el-table :data="videos" border height="140" style="width: 100%;margin-bottom: 20px;" v-loading='loading' v-if="ruleForm.is_new == 0">
          <el-table-column prop="id" label="ID" width="85" align="center">
          </el-table-column>
          <el-table-column prop="video_name" label="标题" show-overflow-tooltip align="center">
            <template slot-scope="scope">
              <el-tag>{{scope.row.video_name}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot="header">
              <input type="search" style="outline: none;height: 25px;padding: 0 10px;" v-model="searchVideoName" @blur="SearchVideoName" @change="SearchVideoName" placeholder="请输入标题关键字搜索">
            </template>
            <template slot-scope="scope">
              <el-button size="mini" :type="scope.row.link_url == ruleForm.video_url ? 'danger' : ''" @click="selectVideo(scope.row)">{{scope.row.link_url == ruleForm.video_url ? '已选择' : '选择'}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="fenye" style="margin:15px 0 ;" v-if="ruleForm.is_new == 0">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[2,5,10]" :page-size="page_size" layout="total, prev, pager, next,sizes" :total="total">
          </el-pagination>
        </div>
        <!-- 视频链接 -->
        <el-form-item label="视频链接" prop="video_url" v-if="ruleForm.is_new == 0 && ruleForm.video_url != ''">
          <video :src="ruleForm.video_url" controls width="30%" style="border-radius: 5px;outline: none；"></video>
        </el-form-item>
        <!-- 视频 -->
        <uploadVideo v-if="ruleForm.is_new == 1" @uploadSuccess='uploadSuccess' checking='video_url' accept='video/*'></uploadVideo>
        <!-- 编辑时回显视频 -->
        <el-form-item label="视频预览" prop="video_url" v-if="option == 'edit' && ruleForm.is_new == 1">
          <video :src="ruleForm.video_url" controls width="160" style="outline: none;" />
        </el-form-item>
        <!-- 排序  -->
        <el-form-item label="排序" prop="sort">
          <el-input v-model="ruleForm.sort" style="width:60%;" placeholder="排序默认为0" />
        </el-form-item>
        <!-- 发布时间 -->
        <el-form-item label="发布时间" prop="publish_date">
          <el-date-picker v-model="ruleForm.publish_date" :picker-options="pickerOptions0" type="date" value-format='yyyy-MM-dd' placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="执行操作">
          <el-button type="primary" @click="AddStudyCourses('ruleForm')" v-if="option !== 'edit'" :loading="btnloading">立即新增</el-button>
          <el-button type="primary" @click="EditStudyCourses('ruleForm')" v-if="option == 'edit'" :loading="btnloading">立即修改</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getVideos, getStudyCourses, AddStudyCourses, EditStudyCourses, DelStudyCourses } from "@/api/activity/21DayStudy";
import uploadImage from "@/components/Common/uploadImage";
import uploadVideo from "@/components/Common/uploadVideo";
export default {
  data() {
    return {
      pickerOptions0: { //限制不能选今天之前的日期
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;//如果没有后面的-8.64e7就是不可以选择今天的
        }
      },
      option: "",//控制编辑弹窗中相关属性
      searchVideoName: "",//新增编辑弹窗表格中搜索视频的关键字
      title: "",//弹窗title
      serachValue: "",//搜索关键字
      loading: false,
      tableData: [],
      videos: [],
      dialogProview: false,
      dialogAddEdit: false,
      btnloading: false,
      video_url: "",
      ruleForm: {
        is_new: 1,
        course_name: "",
        course_thumb: "",
        course_desc: "",
        video_url: "",
        publish_date: "",
        sort: 0,
      },
      rules: {
        course_name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        course_desc: [{ required: true, message: '不能为空', trigger: 'blur' }],
        is_new: [{ required: true, message: '不能为空', trigger: 'blur' }],
        course_thumb: [{ required: true, message: '不能为空', trigger: 'blur' }],
        video_url: [{ required: true, message: '不能为空', trigger: 'blur' }],
        publish_date: [{ required: true, message: '不能为空', trigger: 'change' }],
        sort: [{ required: true, message: '不能为空', trigger: 'blur' }],
      },
      page_size: 2,//翻页相关
      page: 1,//翻页相关
      total: 0, //翻页相关
      id: ""
    }
  },
  methods: {
    // 获取列表
    getStudyCourses() {
      this.loading = true
      getStudyCourses().then(res => {
        console.log(res);
        this.loading = false
        this.tableData = res.data.list
      })
      getVideos({ page_size: this.page_size, page: this.page }).then(res => {
        this.videos = res.data.list
        this.total = res.data.count
      })
    },
    // 新增视频弹窗
    hanldAdd() {
      this.title = '新增视频'
      this.dialogAddEdit = true
    },
    // 编辑
    handleEdit(row) {
      this.option = 'edit'
      this.dialogAddEdit = true
      this.ruleForm = row
      this.id = row.id
      this.title = '修改视频'
    },
    // 立即修改
    EditStudyCourses() {
      this.btnloading = true
      EditStudyCourses(this.ruleForm, this.id).then(res => {
        this.$message.success('修改成功')
        this.dialogAddEdit = false
        this.getStudyCourses()
        this.ruleForm = {
          is_new: 1,
          course_name: "",
          course_thumb: "",
          course_desc: "",
          video_url: "",
          publish_date: "",
          sort: 0,
        }
        this.btnloading = false
      })
    },
    // 删除
    handleDelete(row) {
      this.$confirm('您确定执行删除操作吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DelStudyCourses(row.id).then(res => {
          this.$message.success('删除成功')
          this.dialogAddEdit = false
          this.getStudyCourses()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    // 预览
    proview(url) {
      this.dialogProview = true
      this.video_url = url
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //立即新增
    AddStudyCourses(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.btnloading = true
          AddStudyCourses(this.ruleForm).then(res => {
            this.$message.success('新增成功')
            this.dialogAddEdit = false
            this.getStudyCourses()
            this.ruleForm = {
              is_new: 1,
              course_name: "",
              course_thumb: "",
              course_desc: "",
              video_url: "",
              publish_date: "",
              sort: 0,
            }
            this.btnloading = false
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 视频上传成功回调
    uploadSuccess(url) {
      this.ruleForm.video_url = url
      this.option = ''
    },
    // 图片上传成功回调
    uploadSuccessImg(url) {
      this.ruleForm.course_thumb = url
      this.option = ''
    },
    //选择视频
    selectVideo(row) {
      console.log(row);
      this.ruleForm.video_url = row.link_url
    },
    // 搜索弹窗内的视频
    SearchVideoName() {
      getVideos({ page_size: this.page_size, page: this.page, video_name: this.searchVideoName }).then(res => {
        this.videos = res.data.list
        this.total = res.data.count
      })
    },
    // 翻页
    handleSizeChange(v) {
      this.loading = true
      this.page_size = v
      if (this.searchVideoName) {
        getVideos({ page_size: this.page_size, page: this.page, video_name: this.searchVideoName }).then(res => {
          this.videos = res.data.list
          this.total = res.data.count
          this.loading = false
        })
      } else {
        getVideos({ page_size: this.page_size, page: this.page }).then(res => {
          this.videos = res.data.list
          this.total = res.data.count
          this.loading = false
        })
      }
    },
    // 翻页
    handleCurrentChange(v) {
      this.loading = true
      this.page = v
      if (this.searchVideoName) {
        getVideos({ page_size: this.page_size, page: this.page, video_name: this.searchVideoName }).then(res => {
          this.videos = res.data.list
          this.total = res.data.count
          this.loading = false
        })
      } else {
        getVideos({ page_size: this.page_size, page: this.page }).then(res => {
          this.videos = res.data.list
          this.total = res.data.count
          this.loading = false
        })
      }

    },
    // 关闭弹窗触发
    closeDialog() {
      this.option = ''
      this.ruleForm = {
        is_new: 1,
        course_name: "",
        course_thumb: "",
        course_desc: "",
        video_url: "",
        publish_date: "",
        sort: 0,
      }
    }
  },
  mounted() {
    this.getStudyCourses();
  },
  components: {
    uploadImage,
    uploadVideo,
  },
}
</script>

<style lang="scss" scoped>
</style>