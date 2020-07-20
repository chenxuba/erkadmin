<template>
  <div class="main">
    <el-card>
      <div class="type">
        <h2>{{type}}</h2>
      </div>
    </el-card>
    <el-card style="margin-top: 10px;">
      <el-form ref="form" :model="formData" :rules="rules" label-width="80px">
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
       <uploadImage @uploadSuccessImg='uploadSuccessImg' accept='image/*' checking='imgUrl'></uploadImage>
        <!-- 排序 -->
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model.number="formData.sort" placeholder='数字越大越靠前' :min="0" :max="999" controls-position="right" style="width: 200px;" />
          <span class="tishi">数字越大越靠前</span>
        </el-form-item>
        <!-- 是否上架 -->
        <el-form-item label="是否上架" prop="is_up">
          <el-radio-group v-model="formData.is_up">
            <el-radio label="1">是</el-radio>
            <el-radio label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 类型 -->
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="formData.type">
            <el-radio label="1">视频</el-radio>
            <el-radio label="2">音频</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 选择导师 -->
        <el-form-item label="选择导师" prop="teacher">
          <el-select v-model="formData.teacher" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 视频上传 -->
        <uploadVideo @uploadSuccess='uploadSuccess' accept='video/*' checking='video'></uploadVideo>
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
export default {
  data() {
    return {
      key: 'file',
      imgFlag: false,
      percent: 0,
      type: this.$route.query.type,
      formData: {
        imgUrl: "",
        video: ""
      },
      rules: {
        menu: [{ required: true, message: '请选择课件分类', trigger: 'change' }],
        title: [{ required: true, message: '请输入课程名称', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入课程简介', trigger: 'blur' }],
        imgUrl: [{ required: true, message: '请上传封面图', trigger: 'blur' }],
        sort: [{ required: true, message: '请排序', trigger: 'blur' }],
        is_up: [{ required: true, message: '请选择是否上下架', trigger: 'change' }],
        type: [{ required: true, message: '请选择资源类型', trigger: 'change' }],
        teacher: [{ required: true, message: '请选择所属导师', trigger: 'change' }],
        video: [{ required: true, message: '请上传视频', trigger: 'blur' }],
      },
      options: [{ value: '1', label: '基础课程' }, { value: '2', label: '拓展课程' }],
    }
  },
  methods: {
    //视频上传成功回调
    uploadSuccess(url) {
      this.formData.video = url
    },
    uploadSuccessImg(url){
      this.formData.imgUrl = url
    },
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.formData);

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