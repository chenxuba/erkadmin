<template>
  <div class="main">
    <el-card>
      <div class="type">
        <h2>{{type}}</h2>
      </div>
    </el-card>
    <el-card style="margin-top: 10px;">
      <el-form ref="form" :model="formData" :rules="rules"  label-width="80px">
        <!-- 课件分类 -->
        <el-form-item label="课件分类" prop="menu">
          <el-select v-model="formData.menu" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 课程名称 -->
        <el-form-item label="课程名称" prop="title">
          <el-input v-model="formData.title" placeholder='课程名称' style="width: 500px;" />
          <span class="tishi">请输入课程名称</span>
        </el-form-item>
        <!-- 简介 -->
        <el-form-item label="课程简介" prop="desc">
          <el-input v-model="formData.desc" placeholder='课程简介' type="textarea" :rows="3" style="width: 500px;" />
          <span class="tishi">请输入课程简介</span>
          <el-button type="text">查看示例<i class="el-icon-question"></i></el-button>
        </el-form-item>
        <!-- 封面图 -->
        <el-form-item label="封面图" prop="imgUrl">
          <el-upload class="avatar-uploader" action="http://aoaoe.ybc365.com/api/upImg" :show-file-list="false" :name="key" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-progress='onProgress'>
            <img v-if="formData.imgUrl" :src="formData.imgUrl" class="imgUrl">
            <el-button v-else >点击上传<i class="el-icon-upload el-icon--right"></i></el-button>
            <span class="tishi block">建议尺寸《750*460》</span>
            <el-progress v-show="imgFlag == true" :percentage="percent"></el-progress>
          </el-upload>
        </el-form-item>
        <!-- 排序 -->
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model.number="formData.sort" placeholder='数字越大越靠前' :min="0" :max="999" controls-position="right" style="width: 200px;" />
          <span class="tishi">数字越大越靠前</span>
        </el-form-item>
        <!-- 是否上架 -->
        <el-form-item label="是否上架" prop="is_up">
          <el-radio v-model="formData.is_up" label="1">是</el-radio>
          <el-radio v-model="formData.is_up" label="2">否</el-radio>
        </el-form-item>
        <!-- 类型 -->
        <el-form-item label="类型" prop="type">
          <el-radio v-model="formData.type" label="1">视频</el-radio>
          <el-radio v-model="formData.type" label="2">音频</el-radio>
        </el-form-item>
        <!-- 选择导师 -->
        <el-form-item label="选择导师" prop="teacher">
          <el-select v-model="formData.teacher" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 视频上传 -->
        <el-form-item label="视频上传" prop="video">
          <el-upload class="avatar-uploader" accept=".mp4" action="http://aoaoe.ybc365.com/api/upImg" :show-file-list="false" :name="key" :on-success="handleVideoSuccess" :before-upload="beforeUploadVideo" :on-progress='uploadVideoProcess'>
            <span v-if="formData.video">{{videoName}}</span>
            <el-button v-else >点击上传<i class="el-icon-upload el-icon--right"></i></el-button>
            <span class="tishi">请上传mp4格式的视频,且大小不能超过200M</span>
            <el-progress v-show="videoFlag == true" :percentage="videoUploadPercent"></el-progress>
            <span class="tishi" v-show="videoFlag == true">视频处理中,请稍后<i class="el-icon-loading"></i></span>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  style="width:200px" @click="submitForm('form')">确认提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      key: 'file',
      imgFlag: false,
      percent: 0,
      type: this.$route.query.type,
      videoFlag: false, //是否显示进度条
      videoUploadPercent: 0, //进度条的进度，
      isShowUploadVideo: false, //显示上传按钮
      videoName: "",//视频的名字
      formData: {
        imgUrl: "",
        video: ""
      },
      rules: {
        menu: [{ required: true, message: '请选择课件分类', trigger: 'blur' }],
        title: [{ required: true, message: '请输入课程名称', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入课程简介', trigger: 'blur' }],
        imgUrl: [{ required: true, message: '请上传封面图', trigger: 'blur' }],
        sort: [{ required: true, message: '请排序', trigger: 'blur' }],
        is_up: [{ required: true, message: '请选择是否上下架', trigger: 'blur' }],
        type: [{ required: true, message: '请选择资源类型', trigger: 'blur' }],
        teacher: [{ required: true, message: '请选择所属导师', trigger: 'blur' }],
        video: [{ required: true, message: '请选择所属导师', trigger: 'blur' }],
      },
      options: [{ value: '1', label: '基础课程' }, { value: '2', label: '拓展课程' }],
    }
  },
  methods: {
    //上传封面图成功回调
    handleAvatarSuccess(res, file, fileList) {
      this.imgFlag = false;
      this.percent = 0;
      this.formData.imgUrl = res.data.url;
    },
    // 上传封面图前校验
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error('上传图片只能是JPG或者PNG格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return (isJPG || isPNG) && isLt2M;
    },
    // 上传中的钩子
    onProgress(event, file, fileList) {
      console.log(file);
      this.imgFlag = true;
      console.log(event.percent);
      this.percent = Math.floor(event.percent);
    },
    // 视频上传前的钩子
    beforeUploadVideo(file) {
      const isLt200M = file.size / 1024 / 1024 < 200;
      if (['video/mp4'].indexOf(file.type) == -1) { //'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'
        this.$message.error('请上传正确的视频格式');
        return false;
      }
      if (!isLt200M) {
        this.$message.error('上传视频大小不能超过200MB哦!');
        return false;
      }
      this.isShowUploadVideo = false;
    },
    // 视频上传中的钩子
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = Math.floor(event.percent);
    },
    // 视频上传后的钩子
    handleVideoSuccess(res, file) {
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      if (res.status == 0) {
        this.formData.video = res.data.url;
        this.videoName = file.name
        this.$message.success("视频上传成功")
      } else {
        this.$message.error('视频上传失败，请重新上传！');
      }
    },
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
       console.log( this.formData);
        
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
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