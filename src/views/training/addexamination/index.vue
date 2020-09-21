<template>
  <div class="main">
    <el-card style="margin-top: 10px;">
      <el-form ref="form" :model="formData" :rules="rules" label-width="100px">
        <!-- 课件分类 courseType -->
        <el-form-item label="课件分类" prop="courseType">
          <el-cascader style="width: 60%;" filterable v-model="courseTypeArr" placeholder="请选择课件进行筛选" clearable :props='props' :options="courseType"
                       @change="handleChangeCourseType"></el-cascader>
        </el-form-item>
        <!-- 选择课件 courseItem -->
        <el-form-item label="选择课件" prop="courseItem" ref="courseItem">
          <el-select v-model="formData.courseItem" filterable placeholder="请选择课件" style="width: 60%;">
            <el-option v-for="item in courseItemArr" :key="item.id" :label="item.course_name" :value="item.id">
              <span style="float: left">{{ item.course_name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.teacher_title }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 试卷名称 title -->
        <el-form-item label="试卷名称" prop="title">
          <el-input v-model="formData.title" placeholder='建议和课件名称相同方便区分' style="width: 60%;" />
          <span class="tishi">请输入课程名称</span>
        </el-form-item>
        <!-- 封面图 imgUrl -->
        <el-form-item label="封面图" ref="childImage" prop="imgUrl">
          <uploadImage @uploadSuccessImg='uploadSuccessImg' accept='image/*'></uploadImage>
        </el-form-item>
        <!-- 考场规则 content -->
        <div class="wrap">
          <el-form-item label="考场规则" prop="content" ref="content">
            <div class="ueditor">
              <vue-ueditor-wrap v-model="formData.content" :config='myConfig' @ready="ready" @before-init="addCustomButtom"></vue-ueditor-wrap>
            </div>
            <div class="box">
              <div v-html="formData.content"></div>
            </div>
          </el-form-item>
        </div>
        <!-- 考试时长 examination_time -->
        <el-form-item label="考试时长" prop="examination_time">
          <el-input-number v-model.number="formData.examination_time" placeholder='请填写考试时长' :min="0" :max="999" controls-position="right"
                           style="width: 200px;" />
          <span class="tishi">考试时长限制;填写0不限制时长;单位：分钟</span>
        </el-form-item>
        <!-- 考试次数 examination_number -->
        <el-form-item label="考试次数" prop="examination_number">
          <el-input-number v-model.number="formData.examination_number" placeholder='请填写考试次数' :min="0" :max="999" controls-position="right"
                           style="width: 200px;" />
          <span class="tishi">考试次数;填写0不限制次数</span>
        </el-form-item>
        <!-- 及格分数 pass_number -->
        <el-form-item label="及格分数" prop="pass_number">
          <el-input-number v-model.number="formData.pass_number" placeholder='请填写及格分数' :min="0" :max="999" controls-position="right"
                           style="width: 200px;" />
          <span class="tishi">填写0表示没有不及格分数</span>
        </el-form-item>
        <!-- 单选题分数 radio_number -->
        <el-form-item label="单选题分数" prop="radio_number">
          <el-input-number v-model.number="formData.radio_number" placeholder='请填写单选题分数' :min="0" :max="999" controls-position="right"
                           style="width: 200px;" />
          <span class="tishi">单选题每道题的分数</span>
        </el-form-item>
        <!-- 多选题分数 checkbox_number -->
        <el-form-item label="多选题分数" prop="checkbox_number">
          <el-input-number v-model.number="formData.checkbox_number" placeholder='请填写多选题分数' :min="0" :max="999" controls-position="right"
                           style="width: 200px;" />
          <span class="tishi">多选题每道题的分数</span>
        </el-form-item>
        <!-- 判断题分数 judge_number -->
        <el-form-item label="判断题分数" prop="judge_number">
          <el-input-number v-model.number="formData.judge_number" placeholder='请填写判断题分数' :min="0" :max="999" controls-position="right"
                           style="width: 200px;" />
          <span class="tishi">判断题每道题的分数</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:200px" @click="submitForm('form')">确认提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script>
import uploadImage from "@/components/Common/uploadImage";
import { AddExamination, getcourseType, getCourseWare } from "@/api/training";
import VueUeditorWrap from 'vue-ueditor-wrap'

export default {
  data() {
    return {
      courseItemArr: [],//课件数组
      props: {
        value: "id",
        label: 'type_name'
      },
      formData: {
        courseType: "",//课程分类id
        courseItem: "",//课件id
        title: "",//试卷名称
        imgUrl: "",//封面图
        content: "",//考场规则
        examination_time: 0,//考试时长
        examination_number: 0,//考试次数
        pass_number: 60,//及格分数
        radio_number: 0,//单选题分数
        checkbox_number: 0,//多选题分数
        judge_number: 0,//判断题分数
      },
      rules: {
        courseType: [{ required: true, message: '不能为空', trigger: 'change' }],
        courseItem: [{ required: true, message: '不能为空', trigger: 'change' }],
        title: [{ required: true, message: '不能为空', trigger: 'blur' }],
        imgUrl: [{ required: true, message: '不能为空', trigger: 'change' }],
        content: [{ required: true, message: '不能为空', trigger: 'blur' }],
        examination_time: [{ required: true, message: '不能为空', trigger: 'blur' }],
        examination_number: [{ required: true, message: '不能为空', trigger: 'blur' }],
        pass_number: [{ required: true, message: '不能为空', trigger: 'blur' }],
        radio_number: [{ required: true, message: '不能为空', trigger: 'blur' }],
        checkbox_number: [{ required: true, message: '不能为空', trigger: 'blur' }],
        judge_number: [{ required: true, message: '不能为空', trigger: 'blur' }],
      },
      courseTypeArr: [],//选中的课程分类id数组
      courseType: [],//课程分类数组
      myConfig: {
        toolbars: [
          [
            'fullscreen',//全屏
            'source',//源码
            'undo', //撤销
            'redo', //前进
            'bold', //加粗
            'italic', //斜体
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
          ]
        ],
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 200,
        // 初始容器宽度
        initialFrameWidth: '70%',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: 'http://35.201.165.105:8000/controller.php',
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: '/newadmin/UEditor/'
        // UEDITOR_HOME_URL: '/UEditor/'
      },
    }
  },
  methods: {
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          AddExamination({
            type_id: this.formData.courseType,
            courseware_id: this.formData.courseItem,
            title: this.formData.title,
            thumb: this.formData.imgUrl,
            content: this.formData.content,
            examination_time: this.formData.examination_time,
            examination_number: this.formData.examination_number,
            pass_number: this.formData.pass_number,
            radio_number: this.formData.radio_number,
            checkbox_number: this.formData.checkbox_number,
            judge_number: this.formData.judge_number
          }).then(res => {
            if (res.code == 0) {
              this.$message.success('创建试卷成功！')
              this.$store.dispatch('tagsView/delView', this.$route); //关闭当前tabview
              this.$router.go(-1)
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 富文本触发
    changeContent(html) {
      this.formData.content = html
      this.$refs['content'].clearValidate()
    },
    //图片成功回调
    uploadSuccessImg(url) {
      this.formData.imgUrl = url
      this.$refs['childImage'].clearValidate()
    },
    // 获取课件类别
    getcourseType() {
      getcourseType().then(res => {
        this.courseType = res.data.list
      })
    },
    // 选择课件分类触发
    handleChangeCourseType(value) {
      this.formData.courseType = value[3]
      this.formData.courseItem = ''
      getCourseWare(this.formData.courseType).then(res => {
        this.courseItemArr = res.data
      })
    },
    ready() { }
  },
  components: {
    uploadImage,
    VueUeditorWrap
  },
  mounted() {
    this.getcourseType();
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
    transform: scale(0.45);
    margin-top: -200px;
    > div {
      height: 660px;
      width: 375px;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 0 25px;
      box-sizing: border-box;
      transform: scale(0.94);
      ::v-deep img {
        width: 100%;
      }
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>