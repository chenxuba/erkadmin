<template>
  <div class="main">
    <!--工具栏-->
    <div class="head-container">
      <div>
        <!-- 搜索 -->
        <el-input clearable v-model='search' placeholder="输入会员名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery" />
        <!-- <el-date-picker :default-time="['00:00:00','23:59:59']" type="daterange" range-separator=":" class="date-item" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期" /> -->
        <el-button type="success" icon="el-icon-search" @click='toQuery'>搜索</el-button>
        <el-button type="primary" icon="el-icon-refresh-left" @click='chongzhi'>重置</el-button>
        <el-button type="warning" icon="el-icon-download" @click="outexport">导出</el-button>
      </div>
    </div>
    <el-card>
      <el-table :data="tableData" style="width: 100%" v-loading='loading'>
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
        <el-table-column label="所属机构" prop="org_name" :show-overflow-tooltip="true" />
        <el-table-column label="从业年限" prop="entire_period" align="center" />
        <el-table-column label="视频展示" align="center">
          <template slot-scope="scope">
            <el-button type="warning" icon="el-icon-search" round @click="preview(scope.row)">预览</el-button>
          </template>
        </el-table-column>
        <el-table-column label="是否上下架" width="150" align="center" prop="status">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="1" :inactive-value="0">
            </el-switch>
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
  </div>
</template>

<script>
import { gettbeauty, search, outexport } from "@/api/activity";
import axios from "axios";
export default {
  data() {
    return {
      loading:false,
      dialogVideo: false,
      videoUrl: "",
      tableData: [],
      search: ""
    }
  },
  methods: {
    //获取审核列表
    gettbeauty() {
      this.loading = true
      gettbeauty(1).then(res => {
        console.log(res);
        this.tableData = res.data.list
        this.loading = false
      })
    },
    hanldEdit(row) {

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
    },
    toQuery() {
      search(this.search).then(res => {
        this.tableData = res.data.list
      })
    },

    //重置
    chongzhi() {
      this.gettbeauty()
      this.search = ''
    },
    //导出
    outexport() {
      this.$confirm('此操作将导出文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '导出成功!'
        });
        window.location.href = process.env.VUE_APP_BASE_API + '/beauty/export'
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消导出'
        });
      });


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
    max-height: 450px;
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
}
</style>