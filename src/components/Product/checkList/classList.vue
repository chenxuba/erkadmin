<template>
  <div>
    <el-card style="margin-top:10px;padding-bottom:20px;">
      <!--工具栏-->
      <div class="head-container">
        <div>
          <!-- 搜索 -->
          <el-input clearable v-model="course_name" placeholder="输入课程名称搜索" style="width: 150px;margin-right:10px;" class="filter-item" />
          <!-- 选择导师 -->
          <el-date-picker :default-time="['00:00:00','23:59:59']" style="margin:0 10px;" type="daterange" range-separator="至" class="date-item"
                          value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期" v-model="seleteTime" />
          <el-button type="success" icon="el-icon-search" @click="search">搜索</el-button>
          <el-button type="primary" icon="el-icon-refresh-left" @click="resetting">重置</el-button>
        </div>
      </div>
      <!-- 表格渲染 -->
      <el-col style='margin-top: 10px;'>
        <!--表格渲染-->
        <el-table ref="table" :data="data" style="width: 100%;" v-loading='loading' :max-height="tableHeight" border>
          <el-table-column type="index" label="#" width="45" align="center" />
          <!-- 标题 title -->
          <el-table-column :show-overflow-tooltip="true" prop="video_name" label="标题" align="center" />
          <!-- 封面图片 img -->
          <!-- <el-table-column prop="video_thumb" label="封面图片" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.video_thumb" width="75" height="40" alt="">
            </template>
          </el-table-column> -->
          <!-- 所属课程 category -->
          <el-table-column :show-overflow-tooltip="true" prop="course_name" label="所属课程" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.course_name}}</span>
            </template>
          </el-table-column>
          <!-- 审核状态 -->
          <el-table-column :show-overflow-tooltip="true" prop="commit_status" label="审核状态" align="center">
            <template slot-scope="scope">
              <el-tag type="success" size="small" effect="dark" v-if="scope.row.commit_status == 0">待审核</el-tag>
              <el-tooltip class="item" effect="dark" :content="scope.row.reject_reason" placement="top">
                <el-tag type="danger" size="small" effect="dark" v-if="scope.row.commit_status == 2">已驳回</el-tag>
              </el-tooltip>
            </template>
            </el-form-item>
          </el-table-column>
          <el-table-column label="预览" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="preview(scope.row)">预览</el-button>
            </template>
          </el-table-column>
          <!-- 创建时间 createTime  -->
          <el-table-column :show-overflow-tooltip="true" prop="create_time" label="创建时间" align="center" />
          <el-table-column label="操作" align="center" fixed="right" width="150">
            <template slot-scope="scope">
              <!-- 编辑 -->
              <el-tooltip content="编辑" placement="top">
                <el-button @click="handleEdit(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
              </el-tooltip>
              <!-- 审核 -->
              <el-tooltip content="审核" placement="top">
                <el-button icon="el-icon-success" v-if="scope.row.commit_status != 2" circle type="success" @click="checkOf(scope.row)">
                </el-button>
              </el-tooltip>
              <!-- 驳回 -->
              <el-tooltip content="驳回" placement="top">
                <el-popover placement="right" trigger="click">
                  <div style=" text-align:center;">
                    <p style="margin:5px 0 10px 0;">
                      <el-tag effect="dark">驳回原因</el-tag>
                    </p>
                    <el-input placeholder="请输入驳回原因" v-model="checkOfValue" style="width:200px;"></el-input>
                    <div style="margin-top:10px;">
                      <el-button size="mini" type="danger" @click="checkOfFalse(scope.row)">确认驳回</el-button>
                    </div>

                  </div>
                  <el-button type="danger" slot="reference" class="btn" icon="el-icon-error" v-if="scope.row.commit_status != 2" circle>
                  </el-button>
                </el-popover>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <pagination :page="page" :total="total" :page_size="page_size" :background="true" @handleCurrentChange="handleCurrentChange"
                    @handleSizeChange="handleSizeChange" />
      </el-col>
    </el-card>
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
  </div>
</template>

<script>
import { getVideoCommitList, getTeachersList, chenkOfcommitStatus3, chenkOfcommitStatus4, editVideo } from "@/api/product/index";
import pagination from "@/components/Common/pagination"
import uploadVideo from "@/components/Common/uploadVideo";
export default {
  data() {
    return {
      showLink_url: false,
      checkOfValue: "",//拒绝原因
      activeName: 'first',
      loading: false,
      tableHeight: document.documentElement.clientHeight - 260 || document.body.clientHeight - 260,
      teacher: "",//选择导师筛选
      teacherArr: [],//导师列表
      data: [],
      page: 1,
      page_size: 5,
      total: 0,
      course_name: "",
      seleteTime: "",//选择时间筛选
      checkFalseArr: [],
      videoUrl: "",
      dialogPreview: false,
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
    // 去编辑页面
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
    },
    // 翻页
    handleCurrentChange(val) {
      this.page = val;
      this.getVideoCommitList();
    },
    // 翻页
    handleSizeChange(val) {
      this.page_size = val;
      this.page = 1;
      this.getVideoCommitList();
    },
    handleClickTabs() { },
    // 获取视频列表
    getVideoCommitList() {
      this.loading = true
      this.data = []
      getVideoCommitList({ page_size: this.page_size, page: this.page, video_name: this.video_name, start_time: this.start_time, end_time: this.end_time }).then(res => {
        this.data = res.data.list
        this.loading = false
        this.total = res.data.count
        this.data.forEach(element => {
          if (element.commit_status == 2) {
            this.checkFalseArr.push(element)
            this.$emit('badge2', this.checkFalseArr.length)
          }
        });
      }).catch(err => {
        console.log(err);
        this.loading = false
      })
    },
    //搜索
    search() {
      this.getVideoCommitList()
    },

    //重置
    resetting() {
      this.seleteTime = ''
      this.course_name = ''
      this.teacher = ''
      this.checkFalseArr = []
      this.getVideoCommitList()
    },

    //审核
    checkOf(row) {
      this.$confirm('您确认要审核通过吗?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        chenkOfcommitStatus3(row.id).then(res => {
          this.$message.success('审核成功')
          this.getVideoCommitList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    //驳回
    checkOfFalse(row) {
      if (this.checkOfValue == '') {
        this.$message.error('请填写驳回原因！')
        return false
      }
      chenkOfcommitStatus4(row.id, { reject_reason: this.checkOfValue }).then(res => {
        this.$message.success("驳回成功")
        this.getVideoCommitList()
        this.checkOfValue = ""
      })
    },
    //预览
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
    //提交编辑
    submitEdit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editVideo(this.formData, this.formData.id).then(res => {
            this.$message.success('编辑成功！')
            this.dialogVideo.show = false
            this.getVideoCommitList()
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //视频上传成功的回调
    uploadSuccess(url) {
      this.formData.link_url = url
      this.$refs.video.$refs.link_url.clearValidate() //上传成功后去除校验
      this.showLink_url = false
    },
  },
  mounted() {
    this.getVideoCommitList();
  },
  components: {
    pagination,
    uploadVideo
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
  .flex {
    display: flex;
  }
}
</style>