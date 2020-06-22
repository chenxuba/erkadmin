<template>
  <el-dialog :title="dialogMenu.title" :visible.sync="dialogMenu.show" width="60%" @close='hanldclose'>
    <el-form ref="form" :model="formData" :rules="rules" size="small" label-width="80px">
      <!-- 课件分类 -->
      <el-form-item label="课件分类" prop="menu">
        <el-select v-model="formData.menu" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 课程名称 -->
      <el-form-item label="课程名称" prop="title">
        <el-input v-model="formData.title" placeholder='课程名称' style="width: 200px;" />
        <span class="tishi">请输入课程名称</span>
      </el-form-item>
      <!-- 简介 -->
      <el-form-item label="课程简介" prop="desc">
        <el-input v-model="formData.desc" placeholder='课程简介' type="textarea" :rows="3" style="width: 400px;" />
        <span class="tishi">请输入课程简介</span>
      </el-form-item>
      <!-- 封面图 -->
      <el-form-item label="封面图" prop="imgUrl">
        <el-upload class="avatar-uploader" action="http://aoaoe.ybc365.com/api/upImg" :show-file-list="false" :name="key" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="formData.imgUrl" :src="formData.imgUrl" class="imgUrl">
          <el-button type="primary" v-else>点击上传</el-button>
          <span class="tishi block">建议尺寸《750*460》</span>
        </el-upload>
      </el-form-item>
      <!-- 排序 -->
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model.number="formData.sort" placeholder='数字越大越靠前' :min="0" :max="999" controls-position="right" style="width: 200px;" />
        <span class="tishi">数字越大越靠前</span>
      </el-form-item>
      <!-- 是否上架 -->
      <el-form-item label="是否上架" prop="is_up">
        <el-radio v-model="formData.is_up" label="1" border>是</el-radio>
        <el-radio v-model="formData.is_up" label="2" border>否</el-radio>
      </el-form-item>
      <!-- 类型 -->
      <el-form-item label="类型" prop="type">
        <el-radio v-model="formData.type" label="1" border>视频</el-radio>
        <el-radio v-model="formData.type" label="2" border>音频</el-radio>
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
        <el-upload class="avatar-uploader el-upload--text" :action="uploadUrl" :show-file-list="false" accept=".mp4" :on-success="handleVideoSuccess" :before-upload="beforeUploadVideo" :on-progress="uploadVideoProcess">
          <video v-if="formData.video !='' && !videoFlag" :src="formData.video" class="avatar video-avatar" controls="controls">您的浏览器不支持视频播放</video>
          <i v-else-if="formData.video =='' && !videoFlag" class="el-icon-plus avatar-uploader-icon"></i>
          <el-progress v-if="videoFlag == true" type="circle" :percentage="videoUploadPercent" style="margin-top:30px;"></el-progress>
          <el-button class="video-btn" slot="trigger" size="small" v-if="isShowUploadVideo || formData.video !==''" type="primary">选取文件</el-button>
        </el-upload>
        <P v-if="isShowUploadVideo" class="text">请保证视频格式正确，且不超过20M</P>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size='small' style="width:200px">确认提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      key: 'file',
      rules: {
        menu: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        imgUrl: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        is_up: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        teacher: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        video: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
      },
      options: [
        {
          value: '1',
          label: '基础课程'
        }, {
          value: '2',
          label: '拓展课程'
        }],
      
      uploadUrl: "http://aoaoe.ybc365.com/api/upImg",//你要上传视频到你后台的地址
      videoFlag: false, //是否显示进度条
      videoUploadPercent: "", //进度条的进度，
      isShowUploadVideo: false //显示上传按钮
    }
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    hanldclose() {
      this.formData.type = []
    },
    handleAvatarSuccess(res, file, fileList) {
      this.formData.imgUrl = res.data.url;
    },
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
    beforeUploadVideo(file) {
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (['video/mp4'].indexOf(file.type) == -1) { //'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'
        this.$message.error('请上传正确的视频格式');
        return false;
      }
      if (!isLt20M) {
        this.$message.error('上传视频大小不能超过20MB哦!');
        return false;
      }
      this.isShowUploadVideo = false;
    },
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },
    handleVideoSuccess(res, file) {
      this.isShowUploadVideo = true;
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      if (res.status == 0) {
        this.formData.video = res.data.url;
      } else {
        this.$message.error('视频上传失败，请重新上传！');
      }
    }
  },
  props: {
    dialogMenu: Object,
    formData: Object
  },
  mounted() {
  },
}
</script>

<style lang="scss" scoped>
/deep/ .el-cascader {
  width: 380px;
}
.tishi {
  color: #999;
  font-size: 12px;
  margin-left: 10px;
}
.block {
  display: block;
}
.imgUrl {
  width: 200px;
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
.video-btn{
  margin-bottom: 10px;
}

</style>