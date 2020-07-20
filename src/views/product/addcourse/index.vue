<template>
  <div class="main">
    <el-card>
      <!-- 温馨提示 -->
      <el-collapse accordion>
        <el-collapse-item>
          <template slot="title">
            <i class="header-icon el-icon-info"></i>温馨提示
          </template>
          <div>1.添加图片的尺寸为 1920*1080 1366*768 等横屏壁纸。切勿上传竖屏照片</div>
          <div>2.直播结束后,修改信息无效,如果想开新直播请重新创建直播</div>
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
        <!-- 所属分类  category -->
        <el-form-item label="所属分类" prop="category">
          <el-cascader v-model="formData.category" :options="options" style="width:200px;" placeholder="请选择课件分类" @change="handleChange"></el-cascader>
        </el-form-item>
        <!-- 课程名称 title -->
        <el-form-item label="视频名称" prop="title">
          <el-input v-model="formData.title" placeholder='课程名称' style="width: 500px;" />
          <span class="tishi">请输入视频名称</span>
        </el-form-item>
        <!-- 简介 desc -->
        <el-form-item label="视频简介" prop="desc">
          <el-input v-model="formData.desc" placeholder='课程简介' type="textarea" :rows="3" style="width: 500px;" />
          <span class="tishi">请输入视频简介</span>
          <el-button type="text">查看示例<i class="el-icon-question"></i></el-button>
        </el-form-item>
        <!-- 封面图 imgUrl -->
        <uploadImage @uploadSuccessImg='uploadSuccessImg' accept='image/*' checking='imgUrl' name='上传封面' ></uploadImage>
        <!-- 视频文件 -->
        <uploadVideo @uploadSuccess='uploadSuccess' accept='video/*' checking='video'></uploadVideo>
        <!-- 视频详情  message-->
        <div class="wrap">
          <el-form-item label="视频详情" prop="message">
            <div class="ueditor">
              <vue-ueditor-wrap v-model="formData.message" :config="myConfig"></vue-ueditor-wrap>
            </div>
            <div class="box">
              <div v-html="formData.message"></div>
            </div>
          </el-form-item>
        </div>
        <!-- 片段试看 TryTime -->
        <el-form-item label="片段试看" prop="TryTime">
          <el-checkbox v-model="formData.checkedTryTime">开启片段试看</el-checkbox>
          <span class="tishi">为用户提供一段时间的试看内容，刺激用户购买。</span>
          <div class="setting-wrapper" v-if="formData.checkedTryTime">
            试看设置
            <div class="ipt-box">视频前
              <input type="text" placeholder="0" v-model="formData.TryTime" class="minute-ipt inputDefault">秒为试看范围
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
        <!-- 支付方式 payType 价格 price 密码 password-->
        <el-form-item label="支付方式" prop="payType">
          <el-radio-group v-model="formData.payType">
            <el-radio label="1">付费
              <el-input-number v-if="formData.payType == 1" v-model.number="formData.price" placeholder='请填写价格' :min="1" controls-position="right" style="width: 200px;" />
            </el-radio>
            <el-radio label="2">免费</el-radio>
            <el-radio label="3">密码
              <el-input v-if="formData.payType == 3" v-model="formData.password" placeholder='请填写密码(六位以内字符或数字组合)' maxlength="6" style="width: 260px;" />
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- vip折扣 vipdiscount -->
        <el-form-item label="VIP折扣" prop="vipdiscount">
          <el-radio-group v-model="formData.vipdiscount">
            <el-radio label="1">是
            </el-radio>
            <el-radio label="2">否</el-radio>
            <el-radio label="3">免费
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- svip折扣 svipdiscount -->
        <el-form-item label="VIP折扣" prop="svipdiscount">
          <el-radio-group v-model="formData.svipdiscount">
            <el-radio label="1">是
            </el-radio>
            <el-radio label="2">否</el-radio>
            <el-radio label="3">免费
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 类型 type -->
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="formData.type">
            <el-radio label="1">视频</el-radio>
            <el-radio label="2">音频</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 商品配置 -->
        <div class="module-title">
          <div class="title-line"></div>
          <div class="title-words ET3">
            商品配置
          </div>
        </div>
        <!-- 选择导师 teacher -->
        <el-form-item label="选择导师" prop="teacher">
          <el-select v-model="formData.teacher" placeholder="请选择" style="width: 200px;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 虚拟购买人数 falsepeople-->
        <el-form-item label="虚拟人数" prop="falsepeople">
          <el-input-number v-model="formData.falsepeople" placeholder='请输入虚拟购买人数' style="width: 200px;" :min="0" />
          <span class="tishi">请输入虚拟购买人数</span>
        </el-form-item>
        <!-- 抽成比例 proportion-->
        <el-form-item label="抽成比例" prop="proportion">
          <el-input-number v-model="formData.proportion" :min="0" :max="100" placeholder='请输入抽成比例' style="width: 200px;" />
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
        <!-- 推荐分享收益 share-->
        <el-form-item label="推荐分享收益" prop="share">
          <el-radio-group v-model="formData.share">
            <el-radio label="1">是
            </el-radio>
            <el-radio label="2">否</el-radio>
          </el-radio-group>
          <div class="setting-wrapper" v-if="formData.share == 1">
            直推收益
            <div class="ipt-box">用户分享该课程达成交易可获得
              <input type="text" v-model="formData.sharePrice" placeholder="0" class="minute-ipt inputDefault">元
            </div>
            <!---->
          </div>
        </el-form-item>
        <!-- 是否上架 is_up-->
        <el-form-item label="是否上架" prop="is_up">
          <el-radio-group v-model="formData.is_up">
            <el-radio label="1">是</el-radio>
            <el-radio label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 推荐到首页 recommend -->
        <el-form-item label="推荐首页" prop="recommend">
          <el-radio-group v-model="formData.recommend">
            <el-radio label="1">是
            </el-radio>
            <el-radio label="2">否</el-radio>
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
          <el-switch v-model="value">
          </el-switch>
          <span class="tishi">引导用户加微信群、微信个人号或公众号等</span>
          <el-button type="text">查看示例<i class="el-icon-question"></i></el-button>
        </el-form-item>
        <div class="addqun" v-if="value">
          <!-- 导师二维码 QRcode-->
           <uploadImage @uploadSuccessImg='uploadSuccessQrImg' accept='image/*' checking='imgUrl' name='二维码上传' ></uploadImage>
          <!-- 二维码提示语 qrmsg-->
          <el-form-item label="提示语" prop="qrmsg">
            <el-input v-model="formData.qrmsg" placeholder='可输入群名称' style="width: 300px;" maxlength="30" />
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
export default {
  data() {
    return {
      value: false,
      msg: "",
      myConfig: {
        toolbars: [[
          'source', //源代码
          'undo', //撤销
          'redo', //重做
          'bold', //加粗
          'underline', //下划线
          'strikethrough', //删除线
          'forecolor', //字体颜色
          'preview', //预览
          'horizontal', //分隔线
          'simpleupload', //单图上传
          'link', //超链接
          'spechars', //特殊字符
          'justifyleft', //居左对齐
          'justifyright', //居右对齐
          'justifycenter', //居中对齐
          'justifyjustify', //两端对齐
          'fullscreen', //全屏
          'imagecenter', //居中
        ]],
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 400,
        // 初始容器宽度
        initialFrameWidth: '80%',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: 'http://35.201.165.115:8000/controller.php',
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: '/UEditor/'
      },
      formData: {
        checkedTryTime: false, //是否开启试看
        category: "",//类别
        title: "", //标题
        desc: "",//简介
        message: "",//详情
        imgUrl: "",//封面图
        TryTime: "",//试看时间
        payType: "",//支付方式
        price: "",//价钱
        password: "",//密码
        vipdiscount: "",//VIP折扣
        svipdiscount: "",//sVIP折扣
        type: "", //类型
        teacher: "",//选择导师
        falsepeople: "",//虚拟人数
        proportion: "", //抽成比例
        sort: "", //排序
        share: "",//分享收益
        sharePrice: "",
        is_up: "",//是否上架
        recommend: "",//是否推荐到首页
        QRcode: "",//二维码
        qrmsg: "",//二维码提示语
        video:"",
      },
      rules: {
        category: [{ required: true, message: '请选择课件分类', trigger: 'blur' }],//类别
        title: [{ required: true, message: '请输入课程标题', trigger: 'blur' }], //标题
        desc: [{ required: true, message: '请输入课程简介', trigger: 'blur' }],//简介
        message: [{ required: true, message: '请完善课程详情', trigger: 'blur' }],//详情
        payType: [{ required: true, message: '请选择支付方式', trigger: 'change' }],//支付方式
        password: [{ required: true, message: '请选择课件分类', trigger: 'blur' }],//密码
        vipdiscount: [{ required: true, message: '请选择是否折扣', trigger: 'change' }],//VIP折扣
        svipdiscount: [{ required: true, message: '请选择是否折扣', trigger: 'change' }],//sVIP折扣
        type: [{ required: true, message: '请选择资源类型', trigger: 'change' }], //类型
        teacher: [{ required: true, message: '请选择所属导师', trigger: 'blur' }],//选择导师
        falsepeople: [{ required: true, message: '请填写虚拟人数', trigger: 'blur' }],//虚拟人数
        proportion: [{ required: true, message: '请填写抽成比例', trigger: 'blur' }], //抽成比例
        sort: [{ required: true, message: '请排序', trigger: 'blur' }], //排序
        share: [{ required: true, message: '请选择是否推荐分享', trigger: 'change' }],//分享收益
        is_up: [{ required: true, message: '请选择是否上架', trigger: 'change' }],//是否上架
        recommend: [{ required: true, message: '请选择是否推荐到首页', trigger: 'change' }],//是否推荐到首页
        QRcode: [{ required: true, message: '请上传二维码', trigger: 'blur' }],//二维码
        qrmsg: [{ required: true, message: '请填写提示语', trigger: 'blur' }],//二维码提示语
        imgUrl: [{ required: true, message: '请上传封面图', trigger: 'blur' }],//二封面图
        video: [{ required: true, message: '请上传视频', trigger: 'blur' }],//二封面图
      },
      options: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
            }
          ]
        },
        {
          value: 'zhinan1',
          label: '指南1',
        }
      ],
    }
  },
  methods: {
    uploadSuccess(url){
      this.formData.video = url
    },
    uploadSuccessImg(url) {
      this.formData.imgUrl = url
    },
    uploadSuccessQrImg(url){
      this.formData.QRcode = url
    },
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.formData.checkedTryTime == true && this.formData.TryTime == '') {
            this.$message({
              message: '片段试听/试看设置时长需大于0',
              type: 'error',
            });
          } else if (this.formData.payType == 1 && this.formData.price == undefined) {
            this.$message({
              message: '付费价格不能为0或空！',
              type: 'error',
            });
          } else if (this.formData.payType == 3 && this.formData.password == '') {
            this.$message({
              message: '支付方式为密码时，密码不能为空',
              type: 'error',
            });
          } else if (this.formData.share == 1 && this.formData.sharePrice == '') {
            this.$message({
              message: '分享直推收益金额不能为0或空！',
              type: 'error',
            });
          } else {
            console.log(this.formData);
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
  },
  components: {
    VueUeditorWrap,
    uploadImage,
    uploadVideo
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