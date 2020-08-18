<template>
  <div class="main">
    <el-card>
      <div class="type">
        <h2>{{type}}</h2>
      </div>
    </el-card>
    <el-card style="margin-top: 10px;">
      <el-form ref="form" :model="formData" :rules="rules" label-width="80px">
        <!-- 课件分类 type_id -->
        <el-form-item label="课件分类" prop="type_id">
          <el-select v-model="formData.type_id" placeholder="请选择">
            <el-option v-for="item in options" :key="item.id" :label="item.type_name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 课程名称 course_name -->
        <el-form-item label="课程名称" prop="course_name">
          <el-input v-model="formData.course_name" placeholder='课程名称' style="width: 500px;" />
          <span class="tishi">请输入课程名称</span>
        </el-form-item>
        <!-- 简介 course_desc -->
        <el-form-item label="课程简介" prop="course_desc">
          <el-input v-model="formData.course_desc" placeholder='课程简介' type="textarea" :rows="3" style="width: 500px;" />
          <span class="tishi">请输入课程简介</span>
          <el-button type="text">查看示例<i class="el-icon-question"></i></el-button>
        </el-form-item>
        <!-- 封面图 imgUrl -->
        <uploadImage @uploadSuccessImg='uploadSuccessImg' ref="childImage" name='封面图' accept='image/png,image/jpg,image/jpeg,' checking='imgUrl'></uploadImage>
        <!-- 排序 sort -->
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model.number="formData.sort" placeholder='数字越大越靠前' :min="0" :max="999" controls-position="right" style="width: 200px;" />
          <span class="tishi">数字越大越靠前</span>
        </el-form-item>
        <!-- 是否上架  disabled -->
        <el-form-item label="是否上架" prop="disabled">
          <el-radio-group v-model="formData.disabled">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 类型 course_type -->
        <el-form-item label="类型" prop="course_type">
          <el-radio-group v-model="formData.course_type">
            <el-radio label="0">视频</el-radio>
            <el-radio label="1">音频</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 选择导师 teacher_name -->
        <el-form-item label="选择导师" prop="teacher_name">
          <el-select v-model="formData.teacher_name" placeholder="请选择" filterable>
            <el-option v-for="item in teachers" :key="item.id" :label="item.teacher_name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 视频上传 video -->
        <uploadVideo @uploadSuccess='uploadSuccess' ref="childVideo" accept='video/*' checking='video'></uploadVideo>
        <el-form-item>
          <el-button type="primary" style="width:200px" @click="submitForm('form')">确认提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import uploadVideo from "@/components/Common/uploadVideo";
import uploadImage from "@/components/Common/uploadImage";
import { getChild, addtrainingCourse,getteachers } from "@/api/training";
export default {
  data() {
    return {
      key: 'file',
      imgFlag: false,
      percent: 0,
      type: this.$route.query.type || localStorage.getItem("type"),
      thirdId: this.$route.query.thirdId || localStorage.getItem("thirdId"),
      formData: {
        course_id: this.$route.query.id,//课程ID
        type_id: '',//课件分类
        course_name: "",//课程名称
        course_desc: "",//简介
        disabled: "",//是否上架
        course_type: "",//类型
        imgUrl: "",//封面
        video: "",//视频链接
        teacher_name: "",//导师ID

      },
      rules: {
        type_id: [{ required: true, message: '请选择课件分类', trigger: 'change' }],
        course_name: [{ required: true, message: '请输入课程名称', trigger: 'blur' }],
        course_desc: [{ required: true, message: '请输入课程简介', trigger: 'blur' }],
        imgUrl: [{ required: true, message: '请上传封面图', trigger: 'blur' }],
        sort: [{ required: true, message: '请排序', trigger: 'blur' }],
        disabled: [{ required: true, message: '请选择是否上下架', trigger: 'change' }],
        course_type: [{ required: true, message: '请选择资源类型', trigger: 'change' }],
        teacher_name: [{ required: true, message: '请选择所属导师', trigger: 'change' }],
        video: [{ required: true, message: '请上传视频', trigger: 'blur' }],
      },
      options: [],
      teachers:[]
    }
  },
  methods: {
    //视频上传成功回调
    uploadSuccess(url) {
      this.formData.video = url
    },
    uploadSuccessImg(url) {
      this.formData.imgUrl = url
    },
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addtrainingCourse({
            course_id: this.formData.course_id,
            type_id: this.formData.type_id,
            course_name: this.formData.course_name,
            course_thumb: this.formData.imgUrl,
            course_desc: this.formData.course_desc,
            disabled: this.formData.disabled,
            course_type: this.formData.course_type,
            teacher_name: this.formData.teacher_name,
            link_url:this.formData.video
          }).then(res => {
            console.log(res);
            this.$message.success('创建成功！')
            this.$refs[formName].resetFields();
            this.$refs.childImage.uploaderInfos.imageUrl = ''
            this.$refs.childVideo.uploaderInfos.videoUrl = ''
            this.$refs.childImage.uploaderInfos.progress = 0
            this.$refs.childVideo.uploaderInfos.progress = 0
            this.$refs.childImage.showupType = false
            this.$refs.childVideo.showupType = false
            this.$store.dispatch('tagsView/delView', this.$route); //关闭当前tabview
            this.$router.go(-1)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  components: {
    uploadVideo,
    uploadImage
  },
  mounted() {
    getChild(this.thirdId).then(res => {
      console.log(res);
      this.options = res.data
    });
    getteachers().then(res=>{
      this.teachers = res.data.list
    })
  },
}
</script>
<style lang="scss" scoped>
.main {
  margin: 10px;
  .type {
    color: #31708f;
    background-color: #d9edf7;
    border-color: #bce8f1;
    padding: 15px;
    border: 1px solid transparent;
    border-radius: 4px;
    box-sizing: border-box;
    h2 {
      margin: 0;
      margin-left: 10px;
      font-weight: 300;
      font-size: 24px;
    }
  }
  .tishi {
    color: #999;
    font-size: 12px;
    margin-left: 10px;
    margin-right: 15px;
  }
  .imgUrl {
    width: 150px;
    height: 80px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px solid #eee;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .video-avatar {
    width: 200px;
    height: 100px;
  }
  .video-btn {
    margin-bottom: 10px;
  }
}
</style>