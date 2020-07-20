<template>
  <div class="main">
    <el-card>
      <el-form :model="ruleForm" label-width="100px" label-position="left" ref="ruleForm" class="demo-ruleForm">
        <uploadVideo @uploadSuccess='uploadSuccess' accept='video/*'></uploadVideo>
        <uploadImage @uploadSuccessImg='uploadSuccessImg' accept='image/*'></uploadImage>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getsign } from "@/api/common";
import TcVod from 'vod-js-sdk-v6'
import uploadVideo from "@/components/Common/uploadVideo";
import uploadImage from "@/components/Common/uploadImage";
export default {
  data() {
    return {
      ruleForm: {},
      formData: {
        videoUrl: '',
        videoImg: '',//视频封面
      }
    }
  },
  methods: {
    //上传成功回调
    uploadSuccess(url) {
      this.formData.videoUrl = url
    },
    //上传成功回调
    uploadSuccessImg(url) {
      this.formData.videoImg = url
    }
  },

  components: {
    uploadVideo,
    uploadImage
  },
}
</script>

<style lang="scss" scoped>
.main {
  margin: 10px;
}
</style>