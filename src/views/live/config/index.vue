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
              <el-button type="primary" style="width:200px" >确认提交</el-button>
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
                  <!-- <vue-ueditor-wrap v-model="msg" :config="myConfig"></vue-ueditor-wrap> -->
                  <Ueditor @change='changeContent'></Ueditor>
                </div>
              </el-form-item>
            </div>
            <el-form-item>
              <el-button type="primary" style="width:200px" >确认提交</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>

  </div>
</template>

<script>
// import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
  data() {
    return {
      activeName: 'first',
      form: {},
      msg: "",
     
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
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