<template>
  <div class="main">
    <el-card style="margin-top: 10px;">
      <el-form ref="form" :model="formData" :rules="rules" size="small" label-width="100px">
        <!-- 选择课件 -->
        <el-form-item label="选择课件" prop="menu">
          <el-cascader style="width: 60%;" filterable size="small" v-model="value" placeholder="请选择课件进行筛选" clearable :props='props' :options="options" @change="handleChange"></el-cascader>
        </el-form-item>
        <!-- 试卷名称 -->
        <el-form-item label="课程名称" prop="title">
          <el-input v-model="formData.title" placeholder='建议和课件名称相同方便区分' style="width: 500px;" />
          <span class="tishi">请输入课程名称</span>
        </el-form-item>
        <!-- 封面图 -->
        <el-form-item label="封面图" prop="imgUrl">
          <el-upload class="avatar-uploader" action="http://aoaoe.ybc365.com/api/upImg" :show-file-list="false" :name="key" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-progress='onProgress'>
            <img v-if="formData.imgUrl" :src="formData.imgUrl" class="imgUrl">
            <el-button v-else size="mini">点击上传<i class="el-icon-upload el-icon--right"></i></el-button>
            <span class="tishi block">建议尺寸《750*460》</span>
            <el-progress v-show="imgFlag == true" :percentage="percent"></el-progress>
          </el-upload>
        </el-form-item>
        <!-- 考场规则 -->
        <div class="wrap">
          <el-form-item label="考场规则" prop="guize">
            <div class="ueditor">
              <vue-ueditor-wrap v-model="msg" :config="myConfig"></vue-ueditor-wrap>
            </div>
            <div class="box">
              <div v-html="msg"></div>
            </div>
          </el-form-item>
        </div>
        <!-- 考试时长 -->
        <el-form-item label="考试时长" prop="sort">
          <el-input-number v-model.number="formData.sort" placeholder='请填写考试时长' :min="0" :max="999" controls-position="right" style="width: 200px;" />
          <span class="tishi">考试时长限制;填写0不限制时长;单位分钟</span>
        </el-form-item>
        <!-- 考试次数 -->
        <el-form-item label="考试次数" prop="sort">
          <el-input-number v-model.number="formData.sort" placeholder='请填写考试次数' :min="0" :max="999" controls-position="right" style="width: 200px;" />
          <span class="tishi">考试次数;填写0不限制次数</span>
        </el-form-item>
        <!-- 及格分数 -->
        <el-form-item label="及格分数" prop="sort">
          <el-input-number v-model.number="formData.sort" placeholder='请填写及格分数' :min="0" :max="999" controls-position="right" style="width: 200px;" />
          <span class="tishi">填写0表示没有不及格分数</span>
        </el-form-item>
        <!-- 单选题分数 -->
        <el-form-item label="单选题分数" prop="sort">
          <el-input-number v-model.number="formData.sort" placeholder='请填写单选题分数' :min="0" :max="999" controls-position="right" style="width: 200px;" />
          <span class="tishi">单选题每道题的分数</span>
        </el-form-item>
        <!-- 单选题分数 -->
        <el-form-item label="多选题分数" prop="sort">
          <el-input-number v-model.number="formData.sort" placeholder='请填写多选题分数' :min="0" :max="999" controls-position="right" style="width: 200px;" />
          <span class="tishi">多选题每道题的分数</span>
        </el-form-item>
        <!-- 单选题分数 -->
        <el-form-item label="判断题分数" prop="sort">
          <el-input-number v-model.number="formData.sort" placeholder='请填写判断题分数' :min="0" :max="999" controls-position="right" style="width: 200px;" />
          <span class="tishi">判断题每道题的分数</span>
        </el-form-item>
        <!-- 是否上架 -->
        <el-form-item label="是否上架" prop="is_up">
          <el-radio v-model="formData.is_up" label="1">是</el-radio>
          <el-radio v-model="formData.is_up" label="2">否</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size='small' style="width:200px" @click="submitForm('form')">确认提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
  data() {
    return {
      value: "",
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
      options: [
        {
          "id": "1",
          "label": "康复训练师",
          "children": [{
            "id": "2",
            "label": "言语-语言职业认证课程",
            "children": [{
              "id": "3",
              "label": "初级认证",
              "children": [{
                "id": "4",
                "label": "基础课程",
                "children": [{
                  "id": "9",
                  "label": "第一讲 言语-语言 康复训练概述"
                },
                {
                  "id": "10",
                  "label": "第二讲 呼吸系统概述及训练方法"
                }
                ]
              },
              {
                "id": "5",
                "label": "拓展课程",
                "children": [{
                  "id": "11",
                  "label": "婴幼儿认知功能发育"
                },
                {
                  "id": "12",
                  "label": "脑性瘫痪儿童的言语训练"
                }
                ]
              }
              ]
            },
            {
              "id": "6",
              "label": "中级认证",
              "children": [{
                "id": "7",
                "label": "基础课程",
                "children": [{
                  "id": "13",
                  "label": "儿童语言发育迟缓概述和评估"
                },
                {
                  "id": "14",
                  "label": "儿童康复概论"
                }
                ]
              },
              {
                "id": "8",
                "label": "拓展课程",
                "children": [{
                  "id": "15",
                  "label": "面对儿童语言康复及言语康复的 脑瘫儿童"
                },
                {
                  "id": "16",
                  "label": "认知能力与语言技巧(一)"
                }
                ]
              }
              ]
            }
            ]
          }]
        }
      ]
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
    handleChange(){}
  },
  components: {
    VueUeditorWrap
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