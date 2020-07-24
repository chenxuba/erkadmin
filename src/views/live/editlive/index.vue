<template>
  <div class="main">
    <el-card style="margin-top: 10px;">
      <el-form ref="form" :model="formData" :rules="rules"  label-width="100px">
        <!-- 直播名称 -->
        <el-form-item label="直播名称" prop="menu">
          <el-input v-model="formData.title" placeholder='请输入直播间名称' style="width: 500px;" />
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
        <!-- 直播简介 -->
        <el-form-item label="直播简介" prop="title">
          <el-input v-model="formData.title" placeholder='请输入直播简介' style="width: 500px;" />
          <span class="tishi">请输入直播简介</span>
        </el-form-item>
        <!-- 直播开始时间 -->
        <el-form-item label="直播开始时间" prop="guize">
          <el-date-picker v-model="value1" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间" :default-time="['12:00:00']">
          </el-date-picker>
          <span class="tishi">直播开始结束时间;结束时间设定后,时间到期直播会自动结束</span>
        </el-form-item>
        <!-- 支付方式 -->
        <el-form-item label="支付方式" prop="is_up">
          <el-radio v-model="formData.is_up" label="1">付费
            <el-input-number v-if="formData.is_up == 1" v-model.number="formData.sort" placeholder='请填写价格' :min="0" controls-position="right" style="width: 200px;" />
          </el-radio>
          <el-radio v-model="formData.is_up" label="2">免费</el-radio>
          <el-radio v-model="formData.is_up" label="3">密码
            <el-input v-if="formData.is_up == 3" v-model="formData.sort" placeholder='请填写密码' :min="0" style="width: 200px;" />
          </el-radio>
        </el-form-item>
        <!-- 划线价格 -->
        <el-form-item label="划线价格" prop="menu">
          <el-input-number v-model.number="formData.sort" placeholder='请填写划线价格' :min="0" controls-position="right" style="width: 200px;" />
        </el-form-item>
        <!-- 引导文字 -->
        <el-form-item label="引导文字" prop="menu">
          <el-input v-model="formData.title" placeholder='请输入引导文字' style="width: 500px;" />
          <span class="tishi">直播详情界面引导文字;15字以内效果更好</span>
        </el-form-item>
        <!-- 引导图片 -->
        <el-form-item label="引导图片" prop="imgUrl">
          <el-upload class="avatar-uploader" action="http://aoaoe.ybc365.com/api/upImg" :show-file-list="false" :name="key" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-progress='onProgress'>
            <img v-if="formData.imgUrl" :src="formData.imgUrl" class="imgUrl">
            <el-button v-else >点击上传<i class="el-icon-upload el-icon--right"></i></el-button>
            <span class="tishi block">建议上传正方形二维码</span>
            <el-progress v-show="imgFlag == true" :percentage="percent"></el-progress>
          </el-upload>
        </el-form-item>
        <!-- 虚拟观看人数 -->
        <el-form-item label="虚拟人数" prop="menu">
          <el-input-number v-model.number="formData.sort" placeholder='请填写虚拟人数' :min="0" controls-position="right" style="width: 200px;" />
          <span class="tishi">划线价格;可以不填,不填默认不显示</span>
        </el-form-item>
        <!-- 排序 -->
        <el-form-item label="排序" prop="menu">
          <el-input-number v-model.number="formData.sort" placeholder='请排序' :min="0" controls-position="right" style="width: 200px;" />
        </el-form-item>

        <!-- 是否支持回看 -->
        <el-form-item label="是否可回看" prop="is_up">
          <el-radio v-model="formData.is_up" label="1">是</el-radio>
          <el-radio v-model="formData.is_up" label="2">否</el-radio>
        </el-form-item>
        <!-- 是否上架 -->
        <el-form-item label="是否上架" prop="is_up">
          <el-radio v-model="formData.is_up" label="1">是</el-radio>
          <el-radio v-model="formData.is_up" label="2">否</el-radio>
        </el-form-item>
        <!-- 打赏开关 -->
        <el-form-item label="打赏开关" prop="is_up">
          <el-radio v-model="formData.is_up" label="1">开</el-radio>
          <el-radio v-model="formData.is_up" label="2">关</el-radio>
        </el-form-item>
        <!-- 直播详情 -->
        <div class="wrap">
          <el-form-item label="直播详情" prop="guize">
            <div class="ueditor">
              <!-- <vue-ueditor-wrap v-model="msg" :config="myConfig"></vue-ueditor-wrap> -->
                  <Ueditor @change='changeContent'></Ueditor>
            </div>
            <div class="box">
              <div v-html="msg"></div>
            </div>
          </el-form-item>
        </div>

        <el-form-item>
          <el-button type="primary"  style="width:200px" @click="submitForm('form')">确认提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
  data() {
    return {
      value: "",
      value1: "",
      msg: "",
     
      props: {
        value: "id",
      },
      key: 'file',
      imgFlag: false,
      percent: 0,
      formData: {
        imgUrl: "",
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
    },
    handleChange() { },
    changeContent(v){
      this.msg = v
    }
  },
  components: {
    // VueUeditorWrap
     Ueditor: resolve => {
      require(['@/components/Ueditor/index'], resolve)
    },
  },
}
</script>
<style lang="scss" scoped>
.main {
  margin: 10px;
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
  .wrap {
    width: 100%;
    position: relative;
  }
  .ueditor {
    width: 80%;
  }
  .box {
    width: 375px;
    height: 750px;
    position: absolute;
    right: 0;
    top: 0;
    background: url("http://erkong.ybc365.com/0211120200624132601137.png");
    background-size: 100% 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    transform: scale(0.7);
    margin-top: -100px;
    > div {
      height: 660px;
      width: 375px;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 0 25px;
      box-sizing: border-box;
      transform: scale(0.95);
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>