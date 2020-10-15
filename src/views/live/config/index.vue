<template>
  <div class="main">
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="直播配置" name="first">
          <!-- 表单渲染 -->
          <el-form ref="form" :model="config" label-width="120px" style="margin-top:10px;">
            <el-form-item label="播放域名">
              <el-input v-model="config.b_url" style="width:400px" placeholder="请输入播放域名"></el-input>
            </el-form-item>
            <el-form-item label="播放API Key">
              <el-input v-model="config.b_secretKey" style="width:400px" placeholder="请输入播放API Key"></el-input>
            </el-form-item>
            <el-form-item label="推流域名">
              <el-input v-model="config.t_url" style="width:400px" placeholder="请输入推流域名"></el-input>
            </el-form-item>
            <el-form-item label="推流API Key">
              <el-input v-model="config.t_key" style="width:400px" placeholder="请输入推流API Key"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width:200px" @click="update">确认提交</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="直播须知" name="second">
          <!-- 表单渲染 -->
          <el-form ref="form" :model="form" label-width="120px" style="margin-top:10px;">
            <div class="wrap">
              <el-form-item label="直播须知" prop="guize">
                <div class="ueditor">
                  <vue-ueditor-wrap v-model="form.content" :config="myConfig"></vue-ueditor-wrap>
                </div>
              </el-form-item>
            </div>
            <el-form-item>
              <el-button type="primary" style="width:200px" @click="edit">确认提交</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>

  </div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
import { getConfig, putConfig } from "@/api/live";
export default {
  data() {
    return {
      activeName: 'first',
      form: {
        content: ""
      },
      msg: "",
      kong: "",
      config: {
        b_url: "",
        b_secretKey: "",
        t_url: "",
        t_key: "",
      },
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
        serverUrl: 'http://muyue.ybc365.com/newadmin/UEditor/php/controller.php',
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        // UEDITOR_HOME_URL: '/newadmin/UEditor/'
        UEDITOR_HOME_URL: process.env.NODE_ENV == 'development' ? '/UEditor/' : '/newadmin/UEditor/'
      },//编辑器配置
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    changeContent(v) {
      this.msg = v
    },
    //获取直播配置
    getConfig() {
      getConfig({ name: 'live' }).then(res => {
        this.config = JSON.parse(res.data)
      })
      getConfig({ name: 'bro_shenq' }).then(res => {
        this.form.content = res.data
      })
    },
    update() {
      putConfig({ name: 'live', value: this.config }).then(res => {
        this.$message.success('成功！')
        this.getConfig()
      })
    },
    edit() {
      putConfig({ name: 'bro_shenq', value: this.form.content }).then(res => {
        this.$message.success('成功！')
        this.getConfig()
      })
    }
  },
  mounted() {
    this.getConfig();
  },
  components: {
    VueUeditorWrap
  },
};
</script>

<style lang="scss" scoped>
.main {
  margin: 10px;
  .wrap {
    width: 100%;
    position: relative;
  }
  .ueditor {
    width: 100%;
  }
}
</style>