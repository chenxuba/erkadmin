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
    <!-- 流量统计 -->
    <div class="liuliang">
      <span>
        <p class="num">3130555.25MB</p>
        <p class="txt">本月已使用流量</p>
      </span>
      <span>
        <p class="num">3</p>
        <p class="txt">正在推流数量</p>
      </span>
      <span>
        <p class="num">30</p>
        <p class="txt">直播间数量</p>
      </span>
    </div>
    <el-card style="margin-top:10px;">
      <!--工具栏-->
      <div class="head-container">
        <div>
          <!-- 搜索 -->
          <el-input clearable size="small" placeholder="输入直播名称" style="width: 200px;" class="filter-item" />
          <el-date-picker :default-time="['00:00:00','23:59:59']" type="daterange" range-separator=":" size="small" class="date-item" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期" />
          <el-button type="success" size="mini" icon="el-icon-search">搜索</el-button>
          <el-button type="primary" size="mini" icon="el-icon-refresh-left">重置</el-button>
          <el-button type="warning" size="mini" icon="el-icon-edit" @click="handleAdd">新建</el-button>
        </div>
      </div>
      <!-- 表格渲染 -->
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style='margin-top: 10px;'>
        <!--表格渲染-->
        <el-card style="margin:10px 0;">
          <el-table ref="table" :data="data" style="width: 100%;" size='mini'>
            <el-table-column :show-overflow-tooltip="true" prop="id" label="ID" width="55" />
            <el-table-column :show-overflow-tooltip="true" prop="title" label="直播名称" />
            <el-table-column prop="img" label="直播封面" align="center">
              <template slot-scope="scope">
                <img :src="scope.row.img" width="100%" alt="">
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="sort" label="排序" width="55" align="center" />
            <el-table-column :show-overflow-tooltip="true" prop="type" label="直播状态" align="center" />
            <el-table-column :show-overflow-tooltip="true" prop="from" label="直播归属" align="center" />
            <el-table-column :show-overflow-tooltip="true" prop="pwdOrPrice" label="价格/密码" align="center" />
            <el-table-column :show-overflow-tooltip="true" prop="startTime" label="开播时间" align="center" />
            <el-table-column :show-overflow-tooltip="true" prop="is_huikan" label="是否回看" align="center" width="110">
              <template slot-scope="scope">
                <el-button type="warning" v-if="scope.row.is_huikan == 1" size="mini">上传回放</el-button>
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="xunirenshu" label="观看人数" align="center" />
            <el-table-column :show-overflow-tooltip="true" prop="is_up" label="上下架" align="center">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.is_up" active-value="1" inactive-value="0">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="220" align="center">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" size="mini" type="primary">修改</el-button>
                <el-button size="mini" type="danger">配置</el-button>
                <el-popover placement="top"    v-model="visible">
                    <el-button type="primary" size="mini" @click="visible = false">直播带货</el-button>
                    <el-button type="success" size="mini" @click="visible = false">会员列表</el-button>
                    <br>
                    <br>
                    <el-button type="warning" size="mini" @click="visible = false">导师助教</el-button>
                    <el-button type="danger" size="mini" @click="visible = false">删除房间</el-button>
                  <el-button slot="reference" type="warning" size="mini" style="margin-left:10px">更多</el-button>
                </el-popover>
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
          type: "回播中",
          from: "平台",
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
      this.$router.push('/live/editlive/'+ row.id)
    },
    handleAdd(){
      this.$router.push('/live/addlive')
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