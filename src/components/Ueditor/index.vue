<template>
  <div>
    <el-card>
      <vue-ueditor-wrap v-model="msg" :config="myConfig"></vue-ueditor-wrap>
    </el-card>
  </div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
  components: {
    VueUeditorWrap
  },
  data() {
    return {
      myConfig: {
        toolbars: [[
          'source', //源代码
          'undo', //撤销
          'redo', //重做
          'bold', //加粗
          'indent', //首行缩进
          'underline', //下划线
          'strikethrough', //删除线
          'forecolor', //字体颜色
          'formatmatch', //格式刷
          'blockquote', //引用
          'selectall', //全选
          'preview', //预览
          'horizontal', //分隔线
          'removeformat', //清除格式
          'unlink', //取消链接
          'fontsize', //字号
          'paragraph', //段落格式
          'simpleupload', //单图上传
          'link', //超链接
          'emotion', //表情
          'spechars', //特殊字符
          'fontborder', //字符边框
          'insertvideo', //视频
          'justifyleft', //居左对齐
          'justifyright', //居右对齐
          'justifycenter', //居中对齐
          'justifyjustify', //两端对齐
          'backcolor', //背景色
          'fullscreen', //全屏
          'imagecenter', //居中
          'lineheight', //行间距
          'edittip ', //编辑提示
        ]],
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 500,
        // 初始容器宽度
        initialFrameWidth: '30%',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: 'http://35.201.165.115:8000/controller.php',
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: '/UEditor/'
      },
      msg: ' <h2><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/>Vue + UEditor + v-model双向绑定</h2>'
    }
  },
}
</script>

<style lang="scss" scoped>
</style>