<template>
  <div class="main">
    <!--工具栏-->
    <!-- <div class="head-container">
      <div>
        <el-input clearable placeholder="输入会员名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery" />
       
        <el-button type="success" icon="el-icon-search">搜索</el-button>
        <el-button type="primary" icon="el-icon-refresh-left">重置</el-button>
        <el-button type="warning" icon="el-icon-download">导出</el-button>
      </div>
    </div> -->
    <el-card>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="座右铭">
                <span>{{ props.row.motto }}</span>
              </el-form-item>
              <el-form-item label="成长经历">
                <span>{{ props.row.experience }}</span>
              </el-form-item>
              <el-form-item label="康复故事">
                <span>{{ props.row.story }}</span>
              </el-form-item>
              <el-form-item label="图片展示" class="zhanshi" v-if="props.row.album !== ''" />
              <img v-for="(item,index) in props.row.album.split(',')" :key="index" :src="item" alt="" class="img_zhanshi">
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index" width="55" />
        <el-table-column label="头像" prop="headimg">
          <template slot-scope="scope">
            <img :src="scope.row.headimg" alt="" class="avatar">
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="full_name" />
        <el-table-column label="联系方式" prop="phone" />
        <el-table-column label="擅长" prop="skills" />
        <!-- <el-table-column label="所属区域" /> -->
        <el-table-column label="所属机构" prop="org_name" />
        <el-table-column label="从业年限" prop="entire_period" align="center" />
        <el-table-column label="审核状态" prop="status" align="center">
          <el-tag type="danger">待审核</el-tag>
        </el-table-column>
        <el-table-column label="视频展示" align="center">
          <template slot-scope="scope">
            <el-button type="warning" icon="el-icon-video-play" round @click="preview(scope.row)">预览</el-button>
          </template>
        </el-table-column>
        <el-table-column label="审核" width="150" align="center">
          <template slot-scope="scope">
            <el-button type="success" @click="shenhe(scope.row)">通过</el-button>
            <el-button type="danger" @click="bohui(scope.row)">驳回</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="fenye" style="margin-top:20px;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, prev, pager, next,sizes" :total="40">
        </el-pagination>
      </div>
    </el-card>
    <!-- 视频预览弹窗 -->
    <el-dialog title="视频预览" :visible.sync="dialogVideo" width="50%" @close='closeDialogVideo'>
      <video :src="videoUrl" ref="video" controls class="video"></video>
    </el-dialog>
    <!-- 驳回弹窗 -->
    <el-dialog title="驳回理由" :visible.sync="showDialog" width="50%" :close-on-click-modal='false'>
      <el-input type="textarea" placeholder="请认真填写驳回理由" v-model="desc"></el-input>
      <div class="bohui_btn">
        <el-button type="warning" @click="showDialog = false">取消驳回</el-button>
        <el-button type="danger" @click="bohuiOK">确认驳回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { gettbeauty, bohui, shenhe } from "@/api/activity";
import axios from "axios";
export default {
  data() {
    return {
      dialogVideo: false,
      videoUrl: "",
      tableData: [],
      showDialog: false,
      desc: "",
      iD: ""
    }
  },
  methods: {
    //获取审核列表
    gettbeauty() {
      gettbeauty({status:0}).then(res => {
        console.log(res);
        this.tableData = res.data.list
      })
    },
    //审核通过
    shenhe(row) {
      this.$confirm('您确认通过该参与者的申请吗, 是否继续?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(() => {
        shenhe(row.id).then(res => {
          this.$message.success("审核成功！")
          this.gettbeauty();
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });

    },
    bohui(row) {
      if (row.is_edit == 0) {
        this.$confirm('该参与者已修改过一次再次驳回将导致该用户无法申请 是否继续?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          this.$confirm('您确认驳回该参与者的申请吗, 是否继续?', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning'
          }).then(() => {
            setTimeout(() => {
              this.showDialog = true
              this.ID = row.id
            }, 300);
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      } else {
        this.$confirm('您确认驳回该参与者的申请吗, 是否继续?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          setTimeout(() => {
            this.showDialog = true
            this.ID = row.id
          }, 300);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }


    },
    bohuiOK() {
      bohui(this.ID, '您的申请被驳回，驳回理由:' + this.desc).then(res => {
        this.$message.warning("您驳回了参与者的申请")
        this.gettbeauty()
        this.showDialog = false
      })
    },
    //预览
    preview(row) {
      if (row.video == '') {
        this.$message.error("该参与者暂未上传视频")
      } else {
        this.dialogVideo = true
        this.videoUrl = row.video
      }
    },
    handleSizeChange() {
      console.log('每页显示xxx条 触发');
    },
    handleCurrentChange() {
      console.log('切换页码触发');
    },
    //关闭弹窗触发
    closeDialogVideo() {
      let vid = this.$refs.video;
      if (vid.play) {
        vid.pause()
      }
    }
  },
  mounted() {
    this.gettbeauty();
  },
}
</script>

<style lang="scss" scoped>
.main {
  margin: 10px;
  .head-container {
    padding-bottom: 10px;
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
  .video {
    width: 100%;
  }
  .demo-table-expand {
    font-size: 0;
  }
  /deep/.demo-table-expand label {
    width: 100px;
    color: red;
    font-weight: bold;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
  .img_zhanshi {
    width: 80px;
    height: 120px;
    object-fit: cover;
    border-radius: 5px;
    margin-right: 10px;
  }
  .bohui_btn {
    margin: 22px 0 0px 0;
    text-align: right;
  }
}
</style>