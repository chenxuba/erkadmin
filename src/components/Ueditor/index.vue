<template>
  <div>
      <vue-neditor-wrap v-model="content" :config="myConfig" :destroy="false"></vue-neditor-wrap>
  </div>
</template>

<script>
import VueNeditorWrap from 'vue-neditor-wrap'
export default {
  components: {
    VueNeditorWrap
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
          'dialog'//秀米
        ]],
        // 如果需要上传功能,找后端小伙伴要服务器接口地址
        serverUrl: '',
        // 你的UEditor资源存放的路径,相对于打包后的index.html
        UEDITOR_HOME_URL: '/NEditor/',
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 340,
        // 初始容器宽度
        initialFrameWidth: '80%',
        // 关闭自动保存
        enableAutoSave: false
      },
      content: '',
    }
  },
  watch: {
    content(newValue, oldValue) {
      this.$emit('change',newValue)
    }
  },
}
</script>

<style lang="scss" scoped>
</style>