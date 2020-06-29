<template>
  <div class="main">
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="直播配置" name="first">
          <el-collapse accordion>
            <el-collapse-item>
              <template slot="title">
                <i class="header-icon el-icon-info"></i>温馨提示
              </template>
              <div>1.添加图片的尺寸为 1920*1080 1366*768 等横屏壁纸。切勿上传竖屏照片</div>
              <div>2.直播结束后,修改信息无效,如果想开新直播请重新创建直播</div>
            </el-collapse-item>
          </el-collapse>
          <!-- 表单渲染 -->
          <el-form ref="form" :model="form" label-width="120px" style="margin-top:10px;">
            <el-form-item label="播放域名">
              <el-input v-model="form.name" style="width:400px" placeholder="请输入播放域名"></el-input>
            </el-form-item>
            <el-form-item label="播放API Key">
              <el-input v-model="form.name" style="width:400px" placeholder="请输入播放API Key"></el-input>
            </el-form-item>
            <el-form-item label="推流域名">
              <el-input v-model="form.name" style="width:400px" placeholder="请输入推流域名"></el-input>
            </el-form-item>
            <el-form-item label="推流API Key">
              <el-input v-model="form.name" style="width:400px" placeholder="请输入推流API Key"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width:200px" size="small">确认提交</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="直播须知" name="second">
          <el-collapse accordion>
            <el-collapse-item>
              <template slot="title">
                <i class="header-icon el-icon-info"></i>温馨提示
              </template>
              <div>1.添加图片的尺寸为 1920*1080 1366*768 等横屏壁纸。切勿上传竖屏照片</div>
              <div>2.直播结束后,修改信息无效,如果想开新直播请重新创建直播</div>
            </el-collapse-item>
          </el-collapse>
          <!-- 表单渲染 -->
          <el-form ref="form" :model="form" label-width="120px" style="margin-top:10px;">
            <div class="wrap">
              <el-form-item label="直播须知" prop="guize">
                <div class="ueditor">
                  <vue-ueditor-wrap v-model="msg" :config="myConfig"></vue-ueditor-wrap>
                </div>
              </el-form-item>
            </div>
            <el-form-item>
              <el-button type="primary" style="width:200px" size="small">确认提交</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>

  </div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
  data() {
    return {
      activeName: 'first',
      form: {},
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
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
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