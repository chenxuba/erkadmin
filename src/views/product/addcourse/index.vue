<template>
  <div class="main">
    <el-card>
      <!-- 温馨提示 -->
      <el-collapse accordion>
        <el-collapse-item>
          <template slot="title">
            <i class="header-icon el-icon-info"></i>温馨提示
          </template>
          <div>1.课程封面图,图片大小建议:《750*460》</div>
          <div>2.可推荐到《分享收益》栏目进行单独分佣设置,此设置高于三级分佣</div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <el-card style="margin-top: 10px;">
      <el-form ref="form" :model="formData" :rules="rules" label-width="120px" label-position="left">
        <div class="module-title first">
          <div class="title-line"></div>
          <div class="title-words ET3">
            基本信息
          </div>
        </div>
        <!-- 所属分类  type_id -->
        <el-form-item label="所属分类" prop="type">
          <el-cascader v-model="formData.type" :options="options" :props='props' style="width:300px;" placeholder="请选择课件分类" @change="handleChange">
          </el-cascader>
        </el-form-item>
        <!-- 课程名称 course_name -->
        <el-form-item label="课程名称" prop="course_name">
          <el-input v-model="formData.course_name" placeholder='课程名称' style="width: 500px;" />
          <span class="tishi">请输入课程名称</span>
        </el-form-item>
        <!-- 副标题 sub_title -->
        <el-form-item label="课程副标题" prop="sub_title">
          <el-input v-model="formData.sub_title" placeholder='课程副标题' style="width: 500px;" />
          <span class="tishi">请输入课程副标题</span>
        </el-form-item>
        <!-- 简介 course_introduction -->
        <el-form-item label="视频简介" prop="course_introduction">
          <el-input v-model="formData.course_introduction" placeholder='课程简介' type="textarea" :rows="1" style="width: 500px;" />
          <span class="tishi">请输入课程简介</span>
          <el-button type="text">查看示例<i class="el-icon-question"></i></el-button>
        </el-form-item>
        <!-- 封面图 course_thumb -->
        <uploadImage @uploadSuccessImg='uploadSuccessImg' accept='image/*' ref="course_thumb" checking='course_thumb' name='上传封面'></uploadImage>
        <!-- 视频文件 -->
        <!-- <uploadVideo @uploadSuccess='uploadSuccess' accept='video/*' checking='video'></uploadVideo> -->
        <!-- 视频详情  message-->
        <div class="wrap">
          <el-form-item label="课程详情" prop="content" ref="content">
            <div class="ueditor">
              <vue-ueditor-wrap v-model="formData.content" :config="myConfig"></vue-ueditor-wrap>
            </div>
            <div class="box">
              <div v-html="formData.content"></div>
            </div>
          </el-form-item>
        </div>
        <!-- 片段试看 TryTime -->
        <el-form-item label="片段试看" prop="try_time">
          <el-checkbox v-model="formData.checkedTryTime" :disabled="formData.payType != 1">开启片段试看</el-checkbox>
          <span class="tishi">为用户提供一段时间的试看内容，刺激用户购买。</span>
          <div class="setting-wrapper" v-if="formData.checkedTryTime">
            试看设置
            <div class="ipt-box">视频前
              <input type="text" placeholder="0" v-model="formData.try_time" class="minute-ipt inputDefault">秒为试看范围
            </div>
            <!---->
          </div>
        </el-form-item>
        <!-- 商品信息 -->
        <div class="module-title">
          <div class="title-line"></div>
          <div class="title-words ET3">
            商品信息
          </div>
        </div>
        <!-- 支付方式 payType 价格 course_price 密码 code-->
        <el-form-item label="支付方式" prop="payType">
          <el-radio-group v-model="formData.payType">
            <el-radio label="1">付费
              <el-input-number v-if="formData.payType == 1" v-model.number="formData.course_price" placeholder='请填写价格' :min="0"
                               controls-position="right" style="width: 200px;" />
            </el-radio>
            <el-radio label="2">免费</el-radio>
            <el-radio label="3">密码
              <el-input v-if="formData.payType == 3" v-model="formData.code" placeholder='请填写密码(六位以内字符或数字组合)' maxlength="6" style="width: 260px;" />
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- vip折扣 is_vip -->
        <el-form-item label="VIP折扣" prop="is_vip">
          <el-radio-group v-model="formData.is_vip">
            <el-radio label="0" :disabled="formData.payType != 1">是
            </el-radio>
            <el-radio label="1">否</el-radio>
            <el-radio label="2" :disabled="formData.payType != 1">免费
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- svip折扣 is_svip -->
        <el-form-item label="SVIP折扣" prop="is_svip">
          <el-radio-group v-model="formData.is_svip">
            <el-radio label="0" :disabled="formData.payType != 1">是
            </el-radio>
            <el-radio label="1">否</el-radio>
            <el-radio label="2" :disabled="formData.payType != 1">免费
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 类型 course_type -->
        <el-form-item label="类型" prop="course_type">
          <el-radio-group v-model="formData.course_type">
            <el-radio label="0">视频</el-radio>
            <el-radio label="1">音频</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 商品配置 -->
        <div class="module-title">
          <div class="title-line"></div>
          <div class="title-words ET3">
            商品配置
          </div>
        </div>
        <!-- 选择导师 teacher_name -->
        <el-form-item label="选择导师" prop="teacher_name">
          <el-select v-model="formData.teacher_name" filterable clearable placeholder="请选择" style="width: 200px;">
            <el-option v-for="item in teacherArr" :key="item.id" :label="item.teacher_name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 虚拟购买人数 virtual_stock-->
        <el-form-item label="虚拟人数" prop="virtual_stock">
          <el-input-number v-model="formData.virtual_stock" placeholder='请输入虚拟购买人数' style="width: 200px;" :min="0" />
          <span class="tishi">请输入虚拟购买人数</span>
        </el-form-item>
        <!-- 抽成比例 proportion-->
        <el-form-item label="抽成比例" prop="proportion">
          <el-input-number v-model="formData.proportion" :min="0" :max="100" :disabled="formData.payType != 1" placeholder='请输入抽成比例'
                           style="width: 200px;" />
          <span class="tishi">上级抽取下级,与平台或机构协商设置（单位%）</span>
        </el-form-item>
        <!-- 排序 -->
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model.number="formData.sort" placeholder='数字越大越靠前' :min="0" style="width: 200px;" />
          <span class="tishi">数字越大越靠前</span>
        </el-form-item>
        <!-- 上架设置 -->
        <div class="module-title">
          <div class="title-line"></div>
          <div class="title-words ET3">
            上架设置
          </div>
        </div>
        <!-- 推荐分享收益 is_recommend-->
        <el-form-item label="推荐分享收益" prop="is_recommend">
          <el-radio-group v-model="formData.is_recommend">
            <el-radio label="1" :disabled="formData.payType != 1">是
            </el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
          <div class="setting-wrapper" v-if="formData.is_recommend == 1">
            直推收益
            <div class="ipt-box">用户分享该课程达成交易可获得
              <input type="text" v-model="formData.recommend_price" placeholder="0" class="minute-ipt inputDefault">元
            </div>
            <!---->
          </div>
        </el-form-item>
        <!-- 是否上架 disabled-->
        <el-form-item label="是否上架" prop="disabled">
          <el-radio-group v-model="formData.disabled">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 推荐到首页 is_index -->
        <el-form-item label="推荐首页" prop="is_index">
          <el-radio-group v-model="formData.is_index">
            <el-radio label="1">是
            </el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 引导加群 -->
        <div class="module-title">
          <div class="title-line"></div>
          <div class="title-words ET3">
            引导加群
          </div>
        </div>
        <el-form-item label="引导加群">
          <el-switch v-model="addgroup">
          </el-switch>
          <span class="tishi">引导用户加微信群、微信个人号或公众号等</span>
          <el-button type="text">查看示例<i class="el-icon-question"></i></el-button>
        </el-form-item>
        <div class="addqun" v-if="addgroup">
          <!-- 导师二维码 wxcode_img-->
          <uploadImage @uploadSuccessImg='uploadSuccessQrImg' accept='image/*' ref="wxcode_img" checking='wxcode_img' name='二维码上传'></uploadImage>
          <!-- 二维码提示语 wxcode_text-->
          <el-form-item label="提示语" prop="wxcode_text">
            <el-input v-model="formData.wxcode_text" placeholder='可输入群名称' style="width: 300px;" maxlength="30" />
            <span class="tishi">显示二维码底部的提示语</span>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="warning" style="width:150px" @click="resetForm('form')">重置</el-button>
          <el-button type="primary" style="width:150px" @click="submitForm('form')">确认提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
import uploadImage from "@/components/Common/uploadImage";
import uploadVideo from "@/components/Common/uploadVideo";
import { getcourseCategory, getTeachersList, addCourse } from "@/api/product/index";
export default {
  data() {
    return {
      addgroup: false,//是否引导加群
      formData: {
        checkedTryTime: false, //是否开启试看
        type: "",
        type_id: "",//类别
        course_name: "", //标题
        sub_title: "",//副标题
        course_introduction: "",//简介
        content: "",//详情
        course_thumb: "",//封面图
        try_time: 0,//试看时间
        payType: "2",//支付方式
        course_price: "",//课程价格
        code: "",//密码
        is_vip: "1",//VIP折扣
        is_svip: "1",//sVIP折扣
        course_type: "0", //类型
        teacher_name: "",//选择导师
        virtual_stock: "",//虚拟人数
        proportion: "30", //抽成比例
        sort: "", //排序
        is_recommend: "0",//是否推荐分享
        recommend_price: "",//分享收益价格
        disabled: "1",//是否上架
        is_index: "0",//是否推荐到首页
        wxcode_img: "",//二维码
        wxcode_text: "",//二维码提示语
        // video: "",
      },
      rules: {
        type: [{ required: true, message: '请选择课件分类', trigger: 'change' }],//类别
        course_name: [{ required: true, message: '请输入课程标题', trigger: 'blur' }], //标题
        sub_title: [{ required: true, message: '请输入课程副标题', trigger: 'blur' }],//副标题
        course_introduction: [{ required: true, message: '请输入课程简介', trigger: 'blur' }],//简介
        content: [{ required: true, message: '请完善课程详情', trigger: 'blur' }],//详情
        payType: [{ required: true, message: '请选择支付方式', trigger: 'change' }],//支付方式
        password: [{ required: true, message: '请选择课件分类', trigger: 'blur' }],//密码
        is_vip: [{ required: true, message: '请选择是否折扣', trigger: 'change' }],//VIP折扣
        is_svip: [{ required: true, message: '请选择是否折扣', trigger: 'change' }],//sVIP折扣
        course_type: [{ required: true, message: '请选择资源类型', trigger: 'change' }], //类型
        teacher_name: [{ required: true, message: '请选择所属导师', trigger: 'blur' }],//选择导师
        virtual_stock: [{ required: true, message: '请填写虚拟人数', trigger: 'blur' }],//虚拟人数
        proportion: [{ required: true, message: '请填写抽成比例', trigger: 'blur' }], //抽成比例
        sort: [{ required: true, message: '请排序', trigger: 'blur' }], //排序
        is_recommend: [{ required: true, message: '请选择是否推荐分享', trigger: 'change' }],//分享收益
        disabled: [{ required: true, message: '请选择是否上架', trigger: 'change' }],//是否上架
        is_index: [{ required: true, message: '请选择是否推荐到首页', trigger: 'change' }],//是否推荐到首页
        wxcode_img: [{ required: true, message: '请上传二维码', trigger: 'blur' }],//二维码
        wxcode_text: [{ required: true, message: '请填写提示语', trigger: 'blur' }],//二维码提示语
        course_thumb: [{ required: true, message: '请上传封面图', trigger: 'blur' }],//二封面图
        // video: [{ required: true, message: '请上传视频', trigger: 'blur' }],//二封面图
      },
      options: [],//类别列表
      teacherArr: [],//老师列表
      myConfig: {
        toolbars: [
          [
            'fullscreen',//全屏
            'source',//源码
            'undo', //撤销
            'redo', //前进
            'bold', //加粗
            // 'italic', //斜体
            'underline', //下划线
            'strikethrough', //删除线
            'fontborder', //字符边框
            'formatmatch', //格式刷
            // 'fontfamily', //字体
            'fontsize', //字号
            'justifyleft', //居左对齐
            'justifycenter', //居中对齐
            'justifyright', //居右对齐
            // 'justifyjustify', //两端对齐
            'insertorderedlist', //有序列表
            'insertunorderedlist', //无序列表
            // 'lineheight',//行间距
            'insertimage',
          ]
        ],
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 200,
        // 初始容器宽度
        initialFrameWidth: '70%',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: 'https://muyue.ybc365.com/newadmin/UEditor/php/controller.php',
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        // UEDITOR_HOME_URL: '/newadmin/UEditor/'
        UEDITOR_HOME_URL: process.env.NODE_ENV == 'development' ? '/UEditor/' : '/newadmin/UEditor/'
        // UEDITOR_HOME_URL: '/UEditor/'
      },//编辑器配置
      props: {
        value: 'id',
        label: "type_name"
      }
    }
  },
  methods: {
    // uploadSuccess(url) {
    //   this.formData.video = url
    // },
    //图片上传完成回调函数
    uploadSuccessImg(url) {
      this.formData.course_thumb = url
      this.$refs.course_thumb.$refs.imgUrl.clearValidate() //上传成功后去除校验
    },
    //图片上传完成回调函数
    uploadSuccessQrImg(url) {
      this.formData.wxcode_img = url
      this.$refs.wxcode_img.$refs.imgUrl.clearValidate() //上传成功后去除校验
    },
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.formData.checkedTryTime == true && this.formData.try_time == '') {
            this.$message({
              message: '片段试听/试看设置时长不能为空',
              type: 'error',
            });
          } else if (this.formData.checkedTryTime == true && this.formData.try_time <= 0) {
            this.$message({
              message: '片段试听/试看设置时长需大于0',
              type: 'error',
            });
          } else if (this.formData.payType == 1 && this.formData.course_price == undefined) {
            this.$message({
              message: '付费价格不能为0或空！',
              type: 'error',
            });
          } else if (this.formData.payType == 1 && this.formData.course_price <= 0) {
            this.$message({
              message: '付费价格不能为0！',
              type: 'error',
            });
          } else if (this.formData.payType == 3 && this.formData.code == '') {
            this.$message({
              message: '支付方式为密码时，密码不能为空',
              type: 'error',
            });
          } else if (this.formData.is_recommend == 1 && this.formData.recommend_price == '') {
            this.$message({
              message: '分享直推收益金额不能为0或空！',
              type: 'error',
            });
          } else {
            addCourse(this.formData).then(res => {
              this.$message.success("新增成功！")
              this.$store.dispatch('tagsView/delView', this.$route); //关闭当前tabview
              this.$router.go(-1)
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange() { },
    //获取类别列表
    getcourseCategory() {
      getcourseCategory().then(res => {
        this.options = res.data.list
      })
    },
    //获取导师列表
    getTeachersList() {
      getTeachersList().then(res => {
        res.data.list.unshift({
          id: 0,
          teacher_name: '平台课程'
        })
        this.teacherArr = res.data.list
      })
    }
  },
  components: {
    VueUeditorWrap,
    uploadImage,
    uploadVideo
  },
  mounted() {
    this.getcourseCategory();
    this.getTeachersList()
  },
  watch: {
    'formData.payType'(newValue, oldValue) {
      if (this.formData.payType == 2) {
        this.formData.course_price = 0
        this.formData.code = ''
        this.formData.try_time = 0
        this.formData.checkedTryTime = false
        this.formData.is_recommend = '0'
        this.formData.recommend_price = ''
        this.formData.is_vip = '1'
        this.formData.is_svip = '1'
      } else if (this.formData.payType == 1) {
        this.formData.code = ''
      } else {
        this.formData.checkedTryTime = false
        this.formData.try_time = 0
        this.formData.is_vip = '1'
        this.formData.is_svip = '1'
        this.formData.is_recommend = '0'
        this.formData.recommend_price = 0
      }
    },
    'formData.is_recommend'() {
      if (this.formData.is_recommend == 0) {
        this.formData.recommend_price = ''
      }
    },
    'formData.type'() {
      if (this.formData.type != '') {
        this.formData.type_id = this.formData.type[this.formData.type.length - 1]
      }
    },
    'formData.content'() {
      if (this.formData.content != '') {
        this.$refs.content.clearValidate()
      }
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
    z-index: 9;
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
  .setting-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 700px;
    padding: 27px 20px;
    background: #f5f7fa;
    margin-top: 15px;
    .ipt-box {
      margin-left: 54px;
      margin-right: 20px;
      .minute-ipt {
        width: 120px;
        color: #353535;
        margin: 0 10px;
      }
      .inputDefault {
        height: 36px;
        line-height: 36px;
        padding: 0 0 0 8px;
        border: solid 1px #dcdcdc;
        border-radius: 2px;
        border-image: initial;
        outline: none;
      }
    }
  }
  .module-title {
    position: relative;
    width: 100%;
    height: 28px;
    margin-left: 12px;
    margin-bottom: 40px;
    margin-top: 40px;
    .title-line {
      position: absolute;
      width: 2px;
      height: 14px;
      left: -10px;
      top: 7px;
      background: #2a75ed;
    }
    .title-words {
      float: left;
      height: 28px;
      line-height: 28px;
      font-weight: 600;
    }
  }
  .first {
    margin-top: 0px;
  }
}
</style>