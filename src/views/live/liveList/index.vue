<template>
  <div class="main">
    <el-card>
      <!-- 温馨提示 -->
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
          <el-input clearable  placeholder="输入直播名称" style="width: 200px;" class="filter-item" />
          <el-date-picker :default-time="['00:00:00','23:59:59']" type="daterange" range-separator=":"  class="date-item" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期" />
          <el-button type="success"  icon="el-icon-search">搜索</el-button>
          <el-button type="primary"  icon="el-icon-refresh-left">重置</el-button>
          <el-button type="warning"  icon="el-icon-edit" @click="handleAdd">新建</el-button>
        </div>
      </div>
      <!-- 表格渲染 -->
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style='margin-top: 10px;'>
        <!--表格渲染-->
        <el-card style="margin:10px 0;">
          <el-table ref="table" :data="data" style="width: 100%;" >
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
                <el-button type="warning" v-if="scope.row.is_huikan == 1" >上传回放</el-button>
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
                <el-button @click="handleClick(scope.row)"  type="primary">修改</el-button>
                <el-button  type="danger" @click="showLiveConfig(scope.row)">配置</el-button>
                <el-popover placement="top" v-model="visible">
                  <el-button type="primary"  @click="showShoplist(scope.row)">直播带货</el-button>
                  <el-button type="success"  @click="showViplist(scope.row)">会员列表</el-button>
                  <br>
                  <br>
                  <el-button type="warning"  @click="showTealist(scope.row)">导师助教</el-button>
                  <el-button type="danger"  @click="visible = false">删除房间</el-button>
                  <el-button slot="reference" type="warning"  style="margin-left:10px">更多</el-button>
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
    <!-- 会员列表 -->
    <el-dialog title="会员列表" :visible.sync="dialogViplist" width="60%">
      <el-collapse accordion>
        <el-collapse-item>
          <template slot="title">
            <i class="header-icon el-icon-info"></i>温馨提示
          </template>
          <div>1.直播房间的会员列表</div>
          <div>2.可以通过该列表实现会员的禁言</div>
        </el-collapse-item>
      </el-collapse>
      <!--工具栏-->
      <div class="head-container1" style="margin-top: 10px;">
        <div>
          <!-- 搜索 -->
          <span>
            <el-input  clearable placeholder="输入名称或者描述搜索" style="width: 200px;" class="filter-item" />
            <span class='filter-item'>
              <el-button  type="success" icon="el-icon-search">搜索</el-button>
              <el-button  type="warning" icon="el-icon-refresh-left">重置</el-button>
            </span>
          </span>
          <span>
            <el-button-group>
              <el-button icon="el-icon-search" ></el-button>
              <el-button icon="el-icon-refresh" ></el-button>
            </el-button-group>
          </span>
        </div>
      </div>
      <el-table :data="tableviplist" style="width: 100%;margin-top:10px;" >
        <el-table-column prop="name" label="会员昵称" align="center">
        </el-table-column>
        <el-table-column prop="time" label="加入直播间时间" align="center">
        </el-table-column>
        <el-table-column prop="car" label="身份" align="center">
        </el-table-column>
        <el-table-column prop="type" label="状态" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.type" active-value="1" inactive-value="0">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="fenye" style="margin-top:20px;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, prev, pager, next,sizes" :total="40">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogViplist = false" >取 消</el-button>
        <el-button type="primary" @click="dialogViplist = false" >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 直播带货 -->
    <el-dialog title="直播带货" :visible.sync="dialogShoplist" width="70%">
      <!--工具栏-->
      <div class="head-container1" style="margin: -20px 0 10px 0;">
        <div>
          <!-- 搜索 -->
          <span>
            <el-input  clearable placeholder="输入名称或者描述搜索" style="width: 200px;" class="filter-item" />
            <span class='filter-item'>
              <el-button  type="success" icon="el-icon-search">搜索</el-button>
              <el-button  type="warning" icon="el-icon-refresh-left">重置</el-button>
            </span>
          </span>
          <span>
            <el-button-group>
              <el-button icon="el-icon-search" ></el-button>
              <el-button icon="el-icon-refresh" ></el-button>
            </el-button-group>
          </span>
        </div>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClickTabs">
        <el-tab-pane label="视频" name="first">
          <el-table :data="tableshoplist" style="width: 100%;margin-top:10px;" >
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="id" label="ID" align="center">
            </el-table-column>
            <el-table-column prop="shopimg" label="商品缩略图" align="center">
            </el-table-column>
            <el-table-column prop="title" label="标题" align="center">
            </el-table-column>
            <el-table-column prop="price" label="价格" align="center">
            </el-table-column>
          </el-table>
          <!--分页-->
          <div class="fenye" style="margin-top:20px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, prev, pager, next,sizes" :total="40">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="音频" name="second">
          <el-table :data="tableshoplist" style="width: 100%;margin-top:10px;" >
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="id" label="ID" align="center">
            </el-table-column>
            <el-table-column prop="shopimg" label="商品缩略图" align="center">
            </el-table-column>
            <el-table-column prop="title" label="标题" align="center">
            </el-table-column>
            <el-table-column prop="price" label="价格" align="center">
            </el-table-column>
          </el-table>
          <!--分页-->
          <div class="fenye" style="margin-top:20px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, prev, pager, next,sizes" :total="40">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="图文" name="third">
          <el-table :data="tableshoplist" style="width: 100%;margin-top:10px;" >
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="id" label="ID" align="center">
            </el-table-column>
            <el-table-column prop="shopimg" label="商品缩略图" align="center">
            </el-table-column>
            <el-table-column prop="title" label="标题" align="center">
            </el-table-column>
            <el-table-column prop="price" label="价格" align="center">
            </el-table-column>
          </el-table>
          <!--分页-->
          <div class="fenye" style="margin-top:20px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, prev, pager, next,sizes" :total="40">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="专栏" name="fourth">
          <el-table :data="tableshoplist" style="width: 100%;margin-top:10px;" >
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="id" label="ID" align="center">
            </el-table-column>
            <el-table-column prop="shopimg" label="商品缩略图" align="center">
            </el-table-column>
            <el-table-column prop="title" label="标题" align="center">
            </el-table-column>
            <el-table-column prop="price" label="价格" align="center">
            </el-table-column>
          </el-table>
          <!--分页-->
          <div class="fenye" style="margin-top:20px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, prev, pager, next,sizes" :total="40">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogShoplist = false" >取 消</el-button>
        <el-button type="primary" @click="dialogShoplist = false" >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 直播配置 -->
    <el-dialog title="直播配置" :visible.sync="dialogLiveConfig" width="60%">
      <el-collapse accordion>
        <el-collapse-item>
          <template slot="title">
            <i class="header-icon el-icon-info"></i>温馨提示
          </template>
          <div>1.请严格按照直播配置说明进行直播推流</div>
          <div>2.推荐比特率（码率）设置为 1500 Kbps 为最佳，高于1500会导致部分手机端播放不流畅。</div>
          <div>3.点击OBS软件中“设置” > “输出”页面，将“视频比特率”设置为 1500</div>
        </el-collapse-item>
      </el-collapse>
      <!-- 配置 -->
      <el-row :gutter="20" style="margin-top:10px;">
        <el-col :span="16">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="t">OBS直播推流</span>
            </div>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>电脑PC端OBS推流配置</span>
              </div>
              <p class="p1 p">请将下列信息配置到OBS中</p>
              <p class="p2 p">URL:</p>
              <p class="p3 p">rtmp://79255.livepush.myqcloud.com/live
                <el-button type="success"  v-clipboard:copy="text1" v-clipboard:success="onCopy" v-clipboard:error="onError">点击复制</el-button>
              </p>
              <p class="p4 p">流密钥:</p>
              <p class="p5 p">live_room61?txSecret=43ed1ae82c13c4a42f3af06a75ff9e19&txTime=5EF88D48
                <el-button type="success"  v-clipboard:copy="text2" v-clipboard:success="onCopy" v-clipboard:error="onError">点击复制</el-button>
              </p>
            </el-card>
            <!-- 小程序推流配置 -->
            <el-card class="box-card" style="margin-top:10px;">
              <div slot="header" class="clearfix">
                <span class="t">小程序推流配置</span>
              </div>
              <el-card class="box-card" style="text-align: center;">
                <div slot="header" class="clearfix">
                  <span class="t">推流二维码</span>
                </div>
                <img src="http://qr.topscan.com/api.php?text=rtmp%3A%2F%2F79255.livepush.myqcloud.com%2Flive%2Flive_room61%3FtxSecret%3D43ed1ae82c13c4a42f3af06a75ff9e19%26txTime%3D5EF88D48" alt="" width="150px">
              </el-card>
              <el-card class="box-card" style="text-align: center;margin-top:10px;">
                <div slot="header" class="clearfix">
                  <span class="t">播放二维码</span>
                </div>
                <img src="http://qr.topscan.com/api.php?text=rtmp%3A%2F%2F79255.livepush.myqcloud.com%2Flive%2Flive_room61%3FtxSecret%3D43ed1ae82c13c4a42f3af06a75ff9e19%26txTime%3D5EF88D48" alt="" width="150px">
              </el-card>
            </el-card>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="t">OBS推流软件下载及配置指导</span>
            </div>
            <div class="a1">
              <h1>OBS软件下载地址</h1>
              <el-button  round>Windows</el-button>
              <el-button  round>Mac</el-button>
            </div>
            <div class="a1" style="margin-top:20px;">
              <h1>OBS操作文档</h1>
              <el-button  round>操作文档</el-button>
            </div>
          </el-card>
          <!-- 小程序推流客户端 -->
          <el-card class="box-card" style="margin-top:30px;">
            <div slot="header" class="clearfix">
              <span class="t">小程序推流客户端</span>
            </div>
            <div class="a1" style="margin-top:20px;">
              <h1>微信扫码打开小程序</h1>
              <img src="http://erkong.ybc365.com/00a38202003231630022677.jpg" alt="" width="130px">
            </div>
          </el-card>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogLiveConfig = false" >取 消</el-button>
        <el-button type="primary" @click="dialogLiveConfig = false" >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 导师助教 -->
    <el-dialog title="导师助教" :visible.sync="dialogTealist" width="60%">
      <el-table :data="tableTealist" style="width: 100%;margin-top:10px;" >
        <el-table-column prop="img" label="头像" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.img" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="name" label="嘉宾名称" align="center">
        </el-table-column>
        <el-table-column prop="tag" label="标签设置" align="center">
        </el-table-column>
        <el-table-column prop="give" label="接受用户打赏" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.type" active-value="1" inactive-value="0">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="center">
        <el-button type="warning" plain  style="width:100px">添加嘉宾</el-button>
        <el-button type="danger" plain  style="width:100px">确 定</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTealist = false" >取 消</el-button>
        <el-button type="primary" @click="dialogTealist = false" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      text1: "rtmp://79255.livepush.myqcloud.com/live",
      text2: "live_room61?txSecret=43ed1ae82c13c4a42f3af06a75ff9e19&txTime=5EF88D48",
      visible: false,
      dialogViplist: false,
      dialogShoplist: false,
      dialogLiveConfig: false,
      dialogTealist: false,
      tableviplist: [],
      tableshoplist: [],
      tableTealist: [],
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
      this.$router.push('/live/editlive/' + row.id)
    },
    handleAdd() {
      this.$router.push('/live/addlive')
    },
    showViplist(row) {
      this.dialogViplist = true
    },
    showShoplist() {
      this.dialogShoplist = true
    },
    showLiveConfig() {
      this.dialogLiveConfig = true
    },
    handleSizeChange() { },
    handleCurrentChange() { },
    handleClickTabs() { },
    onCopy() {
      this.$notify({
        title: '成功',
        message: '复制成功',
        type: 'success'
      });
    },
    onError() {
      this.$notify.error({
        title: '错误',
        message: '复制出错'
      });
    },
    // 移除
    deleteRow(row) { },
    showTealist() {
      this.dialogTealist = true
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
  // 工具栏
  .head {
    &-container1 {
      text-indent: -10px;
      > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        > span {
          display: flex;
          align-items: center;
        }
        .filter {
          &-item {
            margin-left: 10px;
          }
        }
      }
    }
  }
  .p {
    font-size: 14px;
    margin-bottom: 10px;
  }

  .p3 {
    &:hover {
      color: #fe8130;
      cursor: pointer;
    }
  }

  .p5 {
    line-height: 20px;
    &:hover {
      color: #fe8130;
      cursor: pointer;
    }
  }
  .a1 {
    width: 100%;
    background: #dcedf6;
    border-radius: 5px;
    padding: 20px;
    box-sizing: border-box;
    h1 {
      font-weight: 800;
      color: #45738f;
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
  .t {
    font-size: 15px;
    font-weight: 600;
  }
  .center{
    text-align: center;
    margin-top: 20px;
  }
}
</style>