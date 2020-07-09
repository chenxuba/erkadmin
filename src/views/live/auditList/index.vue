<template>
  <div class="main">
    <el-card>
      <el-collapse accordion>
        <el-collapse-item>
          <template slot="title">
            <i class="header-icon el-icon-info"></i>温馨提示
          </template>
          <div>1.添加图片的尺寸为 1920*1080 1366*768 等横屏壁纸。切勿上传竖屏照片</div>
          <div>2.直播结束后,修改信息无效,如果想开新直播请重新创建直播</div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <el-card style="margin-top:10px;">
      <!-- 表格渲染 -->
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <!--表格渲染-->
        <el-card style="margin:10px 0;">
          <el-table ref="table" :data="data" style="width: 100%;" >
            <el-table-column :show-overflow-tooltip="true" prop="id" label="ID" width="55" />
            <el-table-column :show-overflow-tooltip="true" prop="title" label="直播名称" width="205" align="center" />
            <el-table-column prop="img" label="直播封面" align="center">
              <template slot-scope="scope">
                <img :src="scope.row.img" width="100%" alt="">
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="type" label="审核状态" align="center">
              <template slot-scope="scope">
                <el-tag type="danger" >{{scope.row.type}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="from" label="直播归属" align="center" />
            <el-table-column :show-overflow-tooltip="true" prop="pwdOrPrice" label="价格/密码" align="center" />
            <el-table-column :show-overflow-tooltip="true" prop="startTime" label="开播时间" align="center" width="180" />
            <el-table-column label="操作" width="220" align="center">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)"  type="primary">通过</el-button>
                <el-button  type="danger" @click="bohui">驳回</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <div class="fenye" style="margin-top:20px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, prev, pager, next,sizes" :total="40">
            </el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible:false,
      data: [
        {
          id: "1",
          title: "四步走，让感统训练更有效",
          img: "http://erkong.ybc365.com/04093202006221440435272.jpg",
          sort: "1",
          type: "待审核",
          from: "张倩",
          pwdOrPrice: "免费",
          startTime: "2020-06-28 18:55:00",
          is_huikan: "1",
          xunirenshu: "1000",
          is_up: "1"
        }
      ]
    }
  },
  methods: {
    handleClick(row) {
    },
    handleAdd(){
      this.$router.push('/live/addlive')
    },
    handleSizeChange(){},
    handleCurrentChange(){},
    // 驳回
    bohui(){

    }
  },
}
</script>

<style lang="scss" scoped>
.main {
  margin: 10px;
  .liuliang {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    span {
      width: 32%;
      border-radius: 6px;
      color: #dcf2f8;
      text-align: center;
      background-color: #23b7e5;
      padding-bottom: 20px;
      padding-top: 10px;
      .num {
        color: #fff;
        font-size: 34px;
        margin-top: 20px;
        margin-bottom: 10px;
        font-weight: 600;
      }
      .txt {
        color: #dddce4;
        font-size: 14px;
      }
    }
  }
}
</style>