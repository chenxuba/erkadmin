<template>
  <div>
    <!-- 视频上传 -->
    <el-form-item label="视频上传" :prop='checking' :ref="checking">
      <el-button @click="vExampleAdd">点击上传<i class="el-icon-upload el-icon--right"></i></el-button>
      <span v-html="uploadLoading" v-if="showupType"></span>
      <form ref="vExample">
        <input type="file" :accept='accept' style="display:none;" ref="vExampleFile" @change="vExampleUpload" />
      </form>
    </el-form-item>
    <!-- 视频名称 -->
    <el-form-item label="视频名称" v-if="uploaderInfos.progress == 1" :prop='checking'>
      <span v-if="uploaderInfos.videoInfo.name != undefined">{{uploaderInfos.videoInfo.name + '.' + uploaderInfos.videoInfo.type}}</span>
      <span v-else>未命名.mp4</span>
      <span>
        <el-button type="text" style="margin-left: 15px;" @click="proview">预览</el-button>
      </span>
    </el-form-item>
    <!-- 上传进度 -->
    <el-form-item label="上传进度" v-if="uploaderInfos.progress != 0" :prop='checking'>
      <el-progress :percentage="uploaderInfos.progress * 100" class="progress" :text-inside="true" :stroke-width="15" />
      <el-button @click="resetUp" v-if="uploaderInfos.progress != 1 && uploaderInfos.progress != 0" v-show="showReBtn">取消上传<i
           class="el-icon-upload el-icon--right"></i></el-button>
    </el-form-item>
    <!-- 预览 -->
    <el-dialog title="预览" :visible.sync="dialogVisible" width="40%" destroy-on-close append-to-body>
      <video :src="uploaderInfos.videoUrl" style="width:100%;" controls></video>
    </el-dialog>
  </div>
</template>

<script>
import { getsign } from "@/api/common";
import TcVod from 'vod-js-sdk-v6'
export default {
  props: {
    accept: {
      type: String,
    },
    checking: {
      type: String,
    }
  },
  data() {
    return {
      showupType: false,
      dialogVisible: false,
      showReBtn: true,//取消上传后 改成false不显示显示按钮
      uploadLoading: "", //上传状态html
      ruleForm: {},
      uploader: {},//上传文件对象
      uploaderInfos: {
        videoInfo: "",//上传文件的name和type
        isVideoUploadSuccess: false, //是否上传成功，默认false
        isVideoUploadCancel: false,//是否取消上传 ，默认false
        progress: 0, //进度条 ，默认0
        videoUrl: '', //上传成功后videoUrl
      },//上传详情
    }
  },
  methods: {
    //点击上传视频按钮触发
    vExampleAdd() {
      this.$refs.vExampleFile.click()
    },
    //input change 事件
    vExampleUpload() {
      this.showupType = true
      this.uploadLoading = '<span class="span"><i class="el-icon-loading icon"></i>解析中...</span> '
      var self = this;
      var mediaFile = this.$refs.vExampleFile.files[0]
      if (mediaFile.size / 1024 > 1024000) {
        this.$message.error("上传大小限制1G以内，请剪辑后上传")
        this.uploadLoading = '<span class="span">上传文件过大</span> '
        return false
      }
      this.uploader = this.tcVod.upload({
        mediaFile: mediaFile,
      })
      // 视频上传进度
      this.uploader.on('media_progress', function(info) {
        self.uploadLoading = '<span class="span"><i class="el-icon-loading icon"></i>上传中...</span> '
        self.uploaderInfos.progress = info.percent;
      })
      // 视频上传完成时
      this.uploader.on('media_upload', function(info) {
        self.uploaderInfos.isVideoUploadSuccess = true;
        self.$message.success('上传成功')
        self.uploadLoading = '<span class="span">上传成功 <i class="el-icon-check"></i></span> '
      })

      self.uploaderInfos.videoInfo = this.uploader.videoInfo //用来展示视频的名字和type 例如：xxx.mp4

      this.uploader.done().then(function(doneResult) {
        self.uploaderInfos.videoUrl = doneResult.video.url
        self.$emit("uploadSuccess", self.uploaderInfos.videoUrl)
        self.$refs.vExample.reset();
      })
    },
    //取消上传
    resetUp() {
      this.uploaderInfos.isVideoUploadCancel = true;
      this.uploader.cancel()
      this.$message.error("您取消了上传！")
      this.uploadLoading = '已取消'
      this.$refs.vExample.reset() //避免选择相同文件不触发change事件
      this.showReBtn = false
      this.uploaderInfos.progress = 0
    },
    //预览
    proview() {
      this.dialogVisible = true
    }
  },
  created() {
    //获取签名
    function getSignature() {
      return getsign(JSON.stringify({
        "Action": "GetUgcUploadSign"
      })).then(function(response) {
        return response.data.sign
      })
    };
    this.tcVod = new TcVod({
      getSignature: getSignature
    });
  },
}
</script>

<style lang="scss" scoped>
.progress {
  display: inline-block;
  width: 400px;
}
::v-deep .icon {
  margin-right: 5px;
}
::v-deep .span {
  background-color: red;
  color: #fff;
  padding: 0px 8px;
  border-radius: 4px;
  margin-left: 10px;
}
</style>