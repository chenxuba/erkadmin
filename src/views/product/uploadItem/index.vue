<template>
  <div class="main" style="margin:10px;">
    <el-button type="primary" @click="handleAdd" style="margin:0 0 10px 0;">添加视频</el-button>
    <el-card>
      <!-- 操作提示 -->
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <i class="header-icon el-icon-info"></i>操作提示
          </template>
          <div>视频格式只支持 <span style="color:red;">MP4</span> 格式，建议用chrome或者360极速模式浏览器上传</div>
          <div>排序序号越小越靠前</div>
          <div>文件大小如果过大建议剪辑成多个视频</div>
        </el-collapse-item>
      </el-collapse>
      <div class="type">
        <h2>{{course_name}}</h2>
      </div>
    </el-card>
    <el-card style="margin:10px 0 10px 0;padding-bottom:20px;">
      <el-table :data="tableData" style="width: 100%" v-loading='loading'>
        <el-table-column prop="id" label="上传编号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="video_name" label="视频名称" align="center" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="sort" label="排序" align="center">
        </el-table-column>
        <el-table-column prop="create_time" label="上传时间" align="center">
        </el-table-column>
        <el-table-column prop="create_time" label="预览" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="preview(scope.row)">预览</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="delVideo(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <pagination :page="page" :total="total" :page_size="page_size" :background="true" @handleCurrentChange="handleCurrentChange"
                  @handleSizeChange="handleSizeChange" />
      <el-dialog title="预览" :visible.sync="dialogPreview" width="30%" @close='closeFun'>
        <video :src="videoUrl" controls width="100%" ref="video"></video>
      </el-dialog>
      <!-- videodialog -->
      <el-dialog :title="dialogVideo.title" :visible.sync="dialogVideo.show" width="40%" destroy-on-close>
        <el-form ref="form" :model="formData" :rules="rules" label-width="80px">
          <!-- 视频标题 -->
          <el-form-item label="视频标题" prop="video_name">
            <el-input v-model="formData.video_name" style="width:70%;" placeholder="请输入视频标题"></el-input>
          </el-form-item>
          <!-- 附件上传 -->
          <uploadVideo @uploadSuccess='uploadSuccess' accept='video/mp4' checking='link_url' ref="video"></uploadVideo>
          <el-form-item v-if="showLink_url">
            <el-input disabled v-model="formData.link_url" style="width:70%;"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input v-model="formData.sort" style="width:70%;" placeholder="请排序"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVideo.show = false">取 消</el-button>
          <el-button type="primary" @click="submit('form')" v-if="dialogVideo.option == 'add'">确 定</el-button>
          <el-button type="primary" @click="submitEdit('form')" v-if="dialogVideo.option == 'edit'">修 改</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getCourseDetail, getVideoList, addVideo, delVideo, editVideo } from "@/api/product/index";
import pagination from "@/components/Common/pagination"
import uploadVideo from "@/components/Common/uploadVideo";

export default {
  data() {
    return {
      showLink_url: false,
      loading: false,
      dialogPreview: false,
      videoUrl: "",
      id: this.$route.params.id,
      activeNames: [],
      course_name: "",
      tableData: [],
      page: 1,
      page_size: 5,
      total: 0,
      dialogVideo: {
        show: false,
        title: ""
      },
      formData: {},
      rules: {
        video_name: [{ required: true, message: '请输入视频标题', trigger: 'blur' }],
        link_url: [{ required: true, message: '请上传视频', trigger: 'blur' }],
        sort: [{ required: true, message: '请排序', trigger: 'blur' }]
      }
    }
  },
  methods: {
    //获取课程名字
    getCourseDetail() {
      getCourseDetail(this.id).then(res => {
        this.course_name = res.data.course_name
      })
    },
    // 翻页，第几页
    handleCurrentChange(val) {
      this.page = val;
      this.getVideoList()
    },
    //翻页，一页显示条数
    handleSizeChange(val) {
      this.page_size = val;
      this.page = 1;
      this.getVideoList()
    },
    //获取视频列表
    getVideoList() {
      this.loading = true
      getVideoList(this.id, { page: this.page, page_size: this.page_size }).then(res => {
        this.tableData = res.data.list
        this.total = res.data.count
        this.loading = false
      })
    },
    //视频预览
    preview(row) {
      this.videoUrl = row.link_url
      this.dialogPreview = true
    },
    //关闭dialog暂停播放视频
    closeFun() {
      let vid = this.$refs.video
      if (!vid.paused) {
        vid.pause()
      }
    },
    //新增视频
    handleAdd() {
      this.dialogVideo = {
        show: true,
        title: "新增视频",
        option: "add"
      }
      this.formData = {
        course_id: this.id,
        link_url: "",
        video_name: "",
        sort: ""
      }
      this.showLink_url = false
    },
    //视频上传成功的回调
    uploadSuccess(url) {
      this.formData.link_url = url
      this.$refs.video.$refs.link_url.clearValidate() //上传成功后去除校验
      this.showLink_url = false
    },
    //提交新增
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addVideo(this.formData, this.id).then(res => {
            this.$message.success('新增成功！')
            this.dialogVideo.show = false
            this.getVideoList()
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //提交编辑
    submitEdit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editVideo(this.formData, this.formData.id).then(res => {
            this.$message.success('编辑成功！')
            this.dialogVideo.show = false
            this.getVideoList()
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //删除视频
    delVideo(row) {
      this.$confirm('此操作将删除该视频, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delVideo(row.id).then(res => {
          this.$message.success('删除成功！')
          this.getVideoList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //编辑视频
    handleEdit(row) {
      this.dialogVideo = {
        show: true,
        title: "修改视频",
        option: "edit"
      }
      this.formData = {
        id: row.id,
        video_name: row.video_name,
        sort: row.sort,
        link_url: row.link_url
      }
      this.showLink_url = true
    }
  },
  mounted() {
    this.getCourseDetail();
    this.getVideoList()
  },
  components: {
    pagination,
    uploadVideo
  },
}
</script>

<style lang="scss" scoped>
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
</style>