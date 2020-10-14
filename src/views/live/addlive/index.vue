<template>
  <div class="main" style="margin:10px;">
    <el-card>
      <el-row>
        <el-col :span="14">
          <el-form ref="form" :rules="rules" :model="form" label-width="100px">
            <!-- 直播名称 -->
            <el-form-item label="直播名称" prop="name">
              <el-input v-model="form.name" style="width:70%;" placeholder="请输入直播间名称"></el-input>
            </el-form-item>
            <!-- 直播简介 -->
            <el-form-item label="直播简介" prop="desc">
              <el-input type="textarea" v-model="form.desc" style="width:70%;" placeholder="请输入直播间简介"></el-input>
            </el-form-item>
            <!-- 开播时间 -->
            <el-form-item label="开播时间" prop="time">
              <el-date-picker v-model="form.time" style="width:70%;" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"
                              :picker-options="expireTimeOption" :default-time="['12:00:00', '08:00:00']" type="datetimerange" range-separator="至"
                              start-placeholder="开始时间" end-placeholder="结束时间">
              </el-date-picker>
            </el-form-item>
            <!-- 封面图 course_thumb -->
            <uploadImage @uploadSuccessImg='uploadSuccessImg' accept='image/*' ref="thumb" checking='thumb' name='直播封面'></uploadImage>
            <!-- 支付方式 -->
            <el-form-item label="支付方式">
              <el-radio-group v-model="form.pay_type">
                <el-radio :label="1">付费</el-radio>
                <el-radio :label="2">免费</el-radio>
                <el-radio :label="0">密码</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 输入框 -->
            <el-form-item label="收费价格" v-if='form.pay_type == 1' prop="price">
              <el-input-number v-model="form.price" style="width:25%;" :precision="2" :min="1" controls-position="right" placeholder="请输入价格">
              </el-input-number>
            </el-form-item>
            <el-form-item label="房间密码" v-if='form.pay_type == 3' prop="pwd">
              <el-input v-model="form.pwd" onkeyup="value=value.replace(/[^\d]/g,'')" style="width:40%;" :maxlength="8" placeholder="请输入8位内的数字密码">
              </el-input>
            </el-form-item>
            <!-- 划线价格 -->
            <el-form-item label="划线价格" v-if='form.pay_type != 3' prop="line_price">
              <el-input-number v-model="form.line_price" style="width:25%;" :min="0" controls-position="right" placeholder="请输入划线价格">
              </el-input-number>
            </el-form-item>
            <!-- 引导文字 -->
            <el-form-item label="引导文字">
              <el-input v-model="form.text" style="width:50%;" placeholder="请输入15个字符内的引导文字" :maxlength="15"></el-input>
            </el-form-item>
            <!-- 导师二维码 wxcode_img-->
            <uploadImage @uploadSuccessImg='uploadSuccessQrImg' accept='image/*' ref="wxcode_img" checking='wxcode_img' name='二维码上传'></uploadImage>
            <!-- 打赏开关 -->
            <el-form-item label="打赏开关">
              <el-radio-group v-model="form.off">
                <el-radio :label="1">开</el-radio>
                <el-radio :label="2">关</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 虚拟人数 -->
            <el-form-item label="虚拟人数" prop="falseNum">
              <el-input-number v-model="form.falseNum" style="width:25%;" :min="0" controls-position="right" placeholder="请输入虚拟人数">
              </el-input-number>
            </el-form-item>
            <!-- 排序 -->
            <el-form-item label="排序" prop="sort">
              <el-input-number v-model="form.sort" style="width:25%;" controls-position="right" placeholder="请输入排序序号">
              </el-input-number>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="10">
          <div class="ueditor">
            <p>直播详情</p>
            <VueUeditorWrap v-model="form.content" :config="myConfig"></VueUeditorWrap>
          </div>
        </el-col>
      </el-row>
      <div class="btn" style="text-align:center;padding:50px 0;">
        <el-button type="success" @click="hanldSubmit('form')">提交审核</el-button>
        <el-button type="danger">重置表单</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
import uploadImage from "@/components/Common/uploadImage";
import { addLive } from "@/api/live";
export default {
  data() {
    return {
      expireTimeOption: {
        disabledDate(date) {
          //disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
          return date.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        }
      },
      form: {
        thumb: "",
        content: "",
        price: 1,
        line_price: 0,
        falseNum: 0,
        sort: 0,
        off: 1,//打赏开关
        pay_type: 1,//支付方式
      },
      myConfig: {
        toolbars: [
          [
            'fullscreen',//全屏
            'source',//源码
            'undo', //撤销
            'redo', //前进
            'bold', //加粗
            'fontsize', //字号
            'justifyleft', //居左对齐
            'justifycenter', //居中对齐
            'justifyright', //居右对齐
            'insertimage',
          ]
        ],
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 460,
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: 'https://muyue.ybc365.com/newadmin/UEditor/php/controller.php',
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        // UEDITOR_HOME_URL: '/newadmin/UEditor/'
        UEDITOR_HOME_URL: process.env.NODE_ENV == 'development' ? '/UEditor/' : '/newadmin/UEditor/'
        // UEDITOR_HOME_URL: '/UEditor/'
      },//编辑器配置
      rules: {
        name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        desc: [{ required: true, message: '不能为空', trigger: 'blur' }],
        time: [{ required: true, message: '不能为空', trigger: 'blur' }],
        pwd: [{ required: true, message: '不能为空', trigger: 'blur' }],
        text: [{ required: true, message: '不能为空', trigger: 'blur' }],
        falseNum: [{ required: true, message: '不能为空', trigger: 'blur' }],
        sort: [{ required: true, message: '不能为空', trigger: 'blur' }],
        price: [{ required: true, message: '不能为空', trigger: 'blur' }],
        line_price: [{ required: true, message: '不能为空', trigger: 'blur' }],
        content: [{ required: true, message: '不能为空', trigger: 'blur' }],
      }
    }
  },
  components: {
    VueUeditorWrap,
    uploadImage,
  },
  methods: {
    //确认提交
    hanldSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.content == '') {
            this.$message.error('请完善直播详情')
          } else if (this.form.thumb == '') {
            this.$message.error('请上传封面图')
          } else {
            addLive({
              broadcast_name: this.form.name,
              broadcast_desc: this.form.desc,
              broadcast_content: this.form.content,
              broadcast_img: this.form.thumb,
              support: 1,
              broadcast_sort: this.form.sort,
              broadcast_price: this.form.price,
              is_admission: this.form.pay_type,
              encryption: this.form.pwd,
              munber: this.form.falseNum,
              start_time: new Date(this.form.time[0]).getTime() / 1000,
              end_time: new Date(this.form.time[1]).getTime() / 1000,
              guide_text: this.form.text,
              guide_img: this.form.wxcode_img,
              guide_text: this.form.text,
              line_price: this.form.line_price
            }).then(res => {
              this.$message.success('新增成功！')
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
    //图片上传成功回调
    uploadSuccessImg(url) {
      this.form.thumb = url
      this.$refs.thumb.$refs.imgUrl.clearValidate() //上传成功后去除校验
    },
    //引导二维码回调
    uploadSuccessQrImg(url) {
      this.form.wxcode_img = url
      this.$refs.wxcode_img.$refs.imgUrl.clearValidate() //上传成功后去除校验
    }
  },
  watch: {
    'form.pay_type'(newValue, oldValue) {
      if (this.form.pay_type != 1) {
        this.form.price = ''
      }
      if (this.form.pay_type != 3) {
        this.form.pwd = ''
      } else {
        this.form.line_price = ''
      }
    }

  },
}
</script>

<style lang="scss" scoped>
.ueditor {
  width: 70%;
  p {
    text-align: center;
    background: #82d7d5;
    color: #fff;
    padding: 5px 0;
    margin-bottom: 10px;
    border-radius: 2px;
  }
}
</style>