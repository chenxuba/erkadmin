<template>
  <div>
    <el-row class="row">
      <el-col :span="3" v-for="(o,index) in data" :key="index" class="col">
        <el-card :body-style="{ padding: '13px' }">
          <div slot="header" class="clearfix">
            <span>{{o.title}}</span>
            <el-button style="float: right; padding: 0" type="text" @click="preview(o)">预览</el-button>
          </div>
          <div>
            <img :src="o.imgUrl" class="image">
          </div>
          <div class="center">
            <el-radio v-model="radio" :label="o.option">{{o.title}}</el-radio>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="btn">
      <el-button type="primary">确认提交</el-button>
    </div>
    <!-- dialog -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="25%" :show-close='false' top='15px'>
      <img :src="previewUrl" alt="" width="100%">
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: 'optuon1',
      dialogVisible: false,
      title: "",
      previewUrl: "",
      data: [
        { title: '通用版', imgUrl: 'http://qt.86itn.com/video6.0.-1.png', option: 'optuon1' },
        { title: '教育版', imgUrl: 'http://qt.86itn.com/video6-01.png', option: 'optuon2' },
        { title: '简约版', imgUrl: 'http://qt.86itn.com/video6-02.png', option: 'optuon3' },
        { title: '美食版', imgUrl: 'http://qt.86itn.com/video6-03.png', option: 'optuon4' },
        { title: '文雅版', imgUrl: 'http://qt.86itn.com/video6-04.png', option: 'optuon5' },
        { title: '旗舰版', imgUrl: 'http://qt.86itn.com/s_template6.png', option: 'optuon6' },
        { title: '唯美版', imgUrl: 'http://qt.86itn.com/s_template6.png', option: 'optuon7' },
      ]
    };
  },
  methods: {
    preview(o) {
      this.dialogVisible = true
      this.previewUrl = o.imgUrl
      this.title = o.title
    }
  },
}
</script>

<style lang="scss" scoped>
.button {
  padding: 0;
  float: right;
}
.image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border: 1px solid #eee;
  padding: 10px;
}
.center {
  padding-top: 12px;
  text-align: center;
}
::v-deep .el-card__header {
  padding: 12px 20px !important;
  font-size: 14px;
  background: #f5f5f5;
  font-weight: bold;
}
.col {
  margin-right: 10px;
  margin-bottom: 30px;
  position: relative;
}
.btn {
  margin-bottom: 30px;
  text-align: center;
  button {
    width: 140px;
    height: 35px;
  }
}
.row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>