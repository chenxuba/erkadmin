<template>
  <div class="main">
    <!-- 流量统计 -->
    <div class="liuliang">
      <span>
        <p class="num">{{info.sum_flux || 0}}</p>
        <p class="txt">本月已使用流量</p>
      </span>
      <span>
        <p class="num">{{info.total_num || 0}}</p>
        <p class="txt">正在推流数量</p>
      </span>
      <span>
        <p class="num">{{total}}</p>
        <p class="txt">直播间数量</p>
      </span>
    </div>

    <el-card style="margin-top:10px;">
      <!--工具栏-->
      <div class="head-container">
        <div style="display:flex;align-item:center;">
          <!-- 搜索 -->
          <el-input clearable placeholder="输入直播名称" style="width: 200px;" class="filter-item" v-model="keyVal" />
          <el-date-picker :default-time="['00:00:00','23:59:59']" type="daterange" range-separator="至" class="date-item" style="margin:0 10px;"
                          value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期" v-model="seleteTime" />
          <el-button type="success" icon="el-icon-search" @click="search">搜索</el-button>
          <el-button type="primary" icon="el-icon-refresh-left" @click="resetting">重置</el-button>
          <el-button type="warning" icon="el-icon-edit" @click="handleAdd">新建</el-button>
        </div>
      </div>
      <!-- 表格渲染 -->
      <el-col style='margin-top: 10px;'>
        <!--表格渲染-->
        <el-card style="margin:10px 0;">
          <el-table ref="table" :data="data" style="width: 100%;" v-loading='loading' :max-height="tableHeight">
            <el-table-column :show-overflow-tooltip="true" prop="id" label="ID" width="55" />
            <el-table-column prop="broadcast_name" label="直播名称">
              <template slot-scope="scope">
                <span style="font-weight:900;">{{scope.row.broadcast_name}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="broadcast_img" label="直播封面" align="center">
              <template slot-scope="scope">
                <img :src="scope.row.broadcast_img" width="100%" alt="" height="50" style="object-fit:cover;">
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="broadcast_sort" label="排序" width="55" align="center" />
            <el-table-column :show-overflow-tooltip="true" prop="broadcast_status" label="状态" align="center">
              <template slot-scope="scope">
                <el-tag size="mini" v-if="scope.row.broadcast_status">回播中</el-tag>
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="teacher_name" label="直播归属" align="center" />
            <el-table-column :show-overflow-tooltip="true" prop="broadcast_price" label="价格/密码" align="center">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.broadcast_price == 0 && scope.row.is_admission == 1 || scope.row.is_admission == 2" size="mini">
                  {{scope.row.broadcast_price_text}}</el-tag>
                <el-tag v-if="scope.row.is_admission == 0" size="mini" type="danger">{{scope.row.is_admission_text}}
                </el-tag>
                <el-tag size="mini" v-else-if="scope.row.broadcast_price != 0" type="danger">{{scope.row.broadcast_price_text}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="start_time" label="开播时间">
              <template slot-scope="scope">
                <span>{{$formatDate(scope.row.start_time * 1000,'yyyy-MM-dd hh:mm:ss')}}</span>
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="support" label="是否回看" align="center" width="110">
              <template slot-scope="scope">
                <el-button type="warning" v-if="scope.row.support == 1">上传回放</el-button>
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="real_number" label="观看人数" align="center" />
            <el-table-column :show-overflow-tooltip="true" prop="commit_status" label="上下架" align="center">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.commit_status" @click.native="taggle(scope.row.id)" disabled :active-value="1" :inactive-value="0">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="220" align="center">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="primary">修改</el-button>
                <el-button type="danger" @click="showLiveConfig(scope.row)">配置</el-button>
                <el-popover placement="top">
                  <el-button type="primary" @click="showShoplist(scope.row)">直播带货</el-button>
                  <el-button type="success" @click="showViplist(scope.row)">会员列表</el-button>
                  <br>
                  <br>
                  <el-button type="warning" @click="showTealist(scope.row)">导师助教</el-button>
                  <el-button type="danger" @click="delRoom(scope.row.id)">删除房间</el-button>
                  <el-button slot="reference" type="warning" style="margin-left:10px">更多</el-button>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <pagination :page="page" :total="total" :page_size="page_size" :background="true" @handleCurrentChange="handleCurrentChange"
                      @handleSizeChange="handleSizeChange" />
        </el-card>
      </el-col>
    </el-card>

    <!-- 会员列表 -->
    <el-dialog title="会员列表" :visible.sync="dialogViplist" width="60%">
      <el-table :data="LiveMemberList" style="width: 100%;margin-top:10px;" v-loading='loading'>
        <el-table-column prop="nickname" label="会员昵称" align="center">
        </el-table-column>
        <el-table-column prop="create_time" label="加入直播间时间" align="center">
        </el-table-column>
        <el-table-column prop="is_vip" label="身份" align="center">
          <template slot-scope="scope">
            <el-tag size="mini" v-if="scope.row.is_vip == 0">普通用户</el-tag>
            <el-tag size="mini" v-else type="danger" effect='dark'>VIP会员</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="disabled" label="状态" align="center">
          <template slot-scope="scope">
            <el-switch disabled v-model="scope.row.disabled" :active-value="1" :inactive-value="0">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <pagination :page="page" :total="total" :page_size="page_size" :background="true" @handleCurrentChange="handleCurrentChange_memberList"
                  @handleSizeChange="handleSizeChange_memberList" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogViplist = false">取 消</el-button>
        <el-button type="primary" @click="dialogViplist = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 直播带货 -->
    <el-dialog title="直播带货" :visible.sync="dialogShoplist" width="70%">
      <!--工具栏-->
      <div class="head-container1" style="margin: -20px 0 10px 0;">
        <div>
          <!-- 搜索 -->
          <span>
            <el-input clearable placeholder="输入名称或者描述搜索" style="width: 200px;" class="filter-item" />
            <span class='filter-item'>
              <el-button type="success" icon="el-icon-search">搜索</el-button>
              <el-button type="warning" icon="el-icon-refresh-left">重置</el-button>
            </span>
          </span>
          <span>
            <el-button-group>
              <el-button icon="el-icon-search"></el-button>
              <el-button icon="el-icon-refresh"></el-button>
            </el-button-group>
          </span>
        </div>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClickTabs">
        <el-tab-pane v-for="(item,i) in tabs" :key="i" :label="item.label" :name="item.name" />
        <el-table :data="tableshoplist" ref='multipleTable' style="width: 100%;margin-top:10px;" v-loading='loading'
                  @selection-change="handleSelectionChange" :row-key="getRowKeys">
          <el-table-column type="selection" :reserve-selection="true" width="55" align="center">
          </el-table-column>
          <el-table-column prop="id" label="ID" align="center" width="55">
          </el-table-column>
          <el-table-column prop="course_thumb" label="商品缩略图" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.course_thumb" alt="" width="50" height="50" style="object-fit:cover;border-radius:50%;">
            </template>
          </el-table-column>
          <el-table-column prop="course_name" label="标题" align="center">
          </el-table-column>
          <el-table-column prop="course_price" label="价格" align="center">
            <template slot-scope="scope">
              <el-tag size="mini" v-if="scope.row.course_price == 0" effect='dark'>免费</el-tag>
              <el-tag size="mini" v-if="scope.row.course_price != 0" type="danger" effect='dark'>{{scope.row.course_price}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <pagination :page="page" :total="total" :page_size="page_size" :background="true" @handleCurrentChange="handleCurrentChange_liveGoods"
                    @handleSizeChange="handleSizeChange_liveGoods" />
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogShoplist = false">取 消</el-button>
        <el-button type="primary" @click="putliveWithGoods">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 直播配置 -->
    <el-dialog title="直播配置" :visible.sync="dialogLiveConfig" style="padding-bottom:30px;" width="60%">
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
              <p class="p3 p" v-if="showQr">{{config.obsUrl}}
                <el-button type="success" v-clipboard:copy="text1" v-clipboard:success="onCopy" v-clipboard:error="onError">点击复制</el-button>
              </p>
              <p class="p4 p">流密钥:</p>
              <p class="p5 p" v-if="showQr">{{config.obsKey}}
                <el-button type="success" v-clipboard:copy="text2" v-clipboard:success="onCopy" v-clipboard:error="onError">点击复制</el-button>
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
                <vue-qr v-if="showQr" logoSrc="http://erkong.ybc365.com/00a38202003231630022677.jpg" :text="config.obsUrl" :size="150"></vue-qr>
              </el-card>
              <el-card class="box-card" style="text-align: center;margin-top:10px;">
                <div slot="header" class="clearfix">
                  <span class="t">播放二维码</span>
                </div>
                <vue-qr v-if="showQr" logoSrc="http://erkong.ybc365.com/00a38202003231630022677.jpg" :text="config.obsKey" :size="150"></vue-qr>
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
              <el-button round>Windows</el-button>
              <el-button round>Mac</el-button>
            </div>
            <div class="a1" style="margin-top:20px;">
              <h1>OBS操作文档</h1>
              <el-button round>操作文档</el-button>
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
        <el-button @click="dialogLiveConfig = false">取 消</el-button>
        <el-button type="primary" @click="dialogLiveConfig = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 导师助教 -->
    <el-dialog title="导师助教" :visible.sync="dialogTealist" width="60%">
      <el-table :data="tableTealist" style="width: 100%;margin-top:10px;">
        <el-table-column prop="img" label="头像" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.headimg" alt="" width="40" height="40" style="border-radius:50%;">
            <img v-if="scope.row.headimg == '/upload/head/head.png'" width="40" height="40" style="border-radius:50%;"
                 src="https://muyue.ybc365.com/static/admin/img/header.png" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="nickname" :show-overflow-tooltip="true" label="嘉宾名称" align="center">
        </el-table-column>
        <el-table-column prop="tag" label="标签设置" align="center">
          <template slot-scope="scope">
            <el-input size="mini" v-model="Usertag[scope.$index]" disabled></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="UserOff" label="接受用户打赏" align="center">
          <template slot-scope="scope">
            <el-switch v-model="UserOff[scope.$index]" :active-value="1" :inactive-value="0">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.row,scope.$index)" type="text">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="center">
        <el-button type="warning" plain style="width:100px" @click="addJiabin">添加嘉宾</el-button>
        <el-button type="danger" plain style="width:100px" @click="submitAddJiabin">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 用户列表，导师助教用的 -->
    <el-dialog title="用户列表" :visible.sync="dialogUserlist" width="60%" :close-on-click-modal='false' :close-on-press-escape='false'
               :show-close='false'>
      <el-input placeholder="请输入用户名搜索，默认展示20条数据，请尽量详细搜索" v-model="userKey">
        <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
      </el-input>
      <el-table :data="Userlist" height='400' ref="multipleTableUserList" @selection-change="handleSelectionChangeUserList" style="width: 100%"
                v-if="showUserTab" v-loading='loading' @select="selectUser" @select-all="selectAllUser">
        <!-- 多选 -->
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column prop="member_id" label="ID" align="center" width="100" />
        <el-table-column prop="avatar" label="头像" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.headimg" alt="" width="40" height="40" style="border-radius:50%;">
            <img v-if="scope.row.headimg == '/upload/head/head.png'" width="40" height="40" style="border-radius:50%;"
                 src="https://muyue.ybc365.com/static/admin/img/header.png" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" align="center">
          <template slot-scope="scope">
            <el-tag size="mini" type="danger" effect='dark'>{{scope.row.nickname}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" v-if="!showUserTab" @click="dialogUserlist = false">取消并关闭</el-button>
        <el-button type="danger" v-if="showUserTab" @click="dialogUserlist = false">取消并关闭</el-button>
        <el-button type="primary" v-if="showUserTab" @click="submitUserList">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getLivetList, shenheLive, delRoom, getInfo, getLiveConfig, getLiveMemberList, getLiveGoods, putliveWithGoods, getLiveGuests, getmemberList, putliveWithGuest } from "@/api/live";
import vueQr from 'vue-qr'
export default {
  data() {
    return {
      Usertag: ['讲师', '助教'],
      UserOff: [1, 1],//接受打赏
      showQr: false,
      tableHeight: document.documentElement.clientHeight - 360 || document.body.clientHeight - 360,
      seleteTime: '',
      keyVal: "",//搜索关键词
      loading: false,
      page: 1,
      page_size: 5,
      total: 0,
      activeName: "0",
      text1: "1",
      text2: "2",
      dialogViplist: false,
      dialogShoplist: false,
      dialogLiveConfig: false,
      dialogTealist: false,
      dialogUserlist: false,
      showUserTab: false,
      Userlist: [],//用户列表
      multipleSelectionUserList: [],//多选用户列表
      userKey: "",//搜索的key
      tableshoplist: [],
      tableTealist: [],
      data: [],//直播列表
      info: {},
      config: {},//直播间配置
      LiveMemberList: [],//直播间会员列表
      liveId: "",//当前直播间id
      tabs: [
        { label: '视频', name: '0' },
        { label: '音频', name: '1' },
        { label: '图文', name: '2' },
      ],
      multipleSelection: [],//直播带货勾选的商品
    }
  },
  methods: {
    //复选用
    getRowKeys(row) {
      return row.id;
    },
    // 编辑直播间跳转页面
    handleClick(row) {
      this.$router.push('/live/editlive/' + row.id)
    },
    //新增直播间跳转页面
    handleAdd() {
      this.$router.push('/live/addlive')
    },
    //会员列表
    showViplist(row) {
      this.liveId = row.id
      this.loading = true
      getLiveMemberList(row.id, { page: this.page, page_size: this.page_size }).then(res => {
        this.LiveMemberList = res.data.list
        this.total = res.data.count
        this.dialogViplist = true
        this.loading = false

      })
    },
    //获取直播带货商品列表
    getLiveGoods(type) {
      this.loading = true
      getLiveGoods({ course_type: type, page_size: this.page_size, page: this.page }).then(res => {
        this.tableshoplist = res.data.list
        this.total = res.data.count
        this.loading = false
      })
    },
    //直播带货
    showShoplist(row) {
      this.liveId = row.id
      this.activeName = '0'
      this.getLiveGoods(this.activeName)
      this.dialogShoplist = true
    },
    // 直播间配置
    showLiveConfig(row) {
      getLiveConfig(row.id).then(res => {
        this.config = res.data
        this.text1 = res.data.obsUrl
        this.text2 = res.data.obsKey
        this.showQr = true
      })
      this.dialogLiveConfig = true
    },
    //列表分页
    handleCurrentChange(val) {
      this.page = val
      this.getLivetList()
    },
    //列表分页
    handleSizeChange(val) {
      this.page_size = val
      this.getLivetList()
    },
    //直播带货切换tab触发
    handleClickTabs() {
      this.$refs.multipleTable.clearSelection();
      this.getLiveGoods(this.activeName)
    },
    //复制成功回调
    onCopy() {
      this.$notify({
        title: '成功',
        message: '复制成功',
        type: 'success'
      });
    },
    //复制失败回调
    onError() {
      this.$notify.error({
        title: '错误',
        message: '复制出错'
      });
    },
    //重置
    resetting() {
      this.seleteTime = ''
      this.keyVal = ''
      this.getLivetList()
    },
    // 移除
    deleteRow(row) { },
    // 导师助教
    showTealist(row) {
      this.liveId = row.id
      this.getLiveGuests(row.id)
      this.dialogTealist = true
    },
    //获取嘉宾列表
    getLiveGuests(id) {
      this.loading = true
      getLiveGuests(id).then(res => {
        this.tableTealist = res.data.list
        this.loading = false
      })
    },
    //获取直播列表
    getLivetList() {
      this.loading = true
      this.data = []
      getLivetList({ page: this.page, page_size: this.page_size, broadcast_name: this.keyVal, start_time: this.start_time, end_time: this.end_time }).then(res => {
        this.data = res.data.list
        this.total = res.data.count
        this.loading = false
      }).catch(err => {
        console.log(err);
        this.loading = false
      })
    },
    //搜索
    search() {
      this.getLivetList()
    },
    //下架
    taggle(id) {
      this.$confirm('确定要下架吗？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        shenheLive(id, 0).then(res => {
          this.$message({
            type: 'success',
            message: '下架成功!'
          });
          this.getLivetList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消下架'
        });
      });
    },
    //删除房间
    delRoom(id) {
      this.$confirm('确定要删除该房间吗？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delRoom(id, 0).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getLivetList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //获取流量，推流数量
    getInfo() {
      getInfo().then(res => {
        this.info = res.data
      })
    },
    //会员列表分页
    handleCurrentChange_memberList(val) {
      this.page = val
      this.loading = true
      getLiveMemberList(this.liveId, { page: this.page, page_size: this.page_size }).then(res => {
        this.total = res.data.count
        this.LiveMemberList = res.data.list
        this.loading = false

      })
    },
    //会员列表分页
    handleSizeChange_memberList(val) {
      this.page_size = val
      this.loading = true
      getLiveMemberList(this.liveId, { page: this.page, page_size: this.page_size }).then(res => {
        this.total = res.data.count
        this.LiveMemberList = res.data.list
        this.loading = false
      })
    },
    //直播带货分页
    handleCurrentChange_liveGoods(val) {
      this.page = val
      this.getLiveGoods(this.activeName)
    },
    //直播带货分页
    handleSizeChange_liveGoods(val) {
      this.page_size = val
      this.getLiveGoods(this.activeName)
    },
    // 勾选数组
    handleSelectionChange(val) {
      this.multipleSelection = val;//勾选放在multipleSelection数组中
    },
    //提交直播带货数组
    putliveWithGoods() {
      const arr = []
      this.multipleSelection.forEach(item => {
        arr.push(item.id)
      })
      putliveWithGoods(this.liveId, { shop_id: arr, index: this.activeName }).then(res => {
        console.log(res);
        this.$message.success('添加成功！')
        this.$refs.multipleTable.clearSelection();
        this.dialogShoplist = false
        this.getLivetList()
      })
    },
    //添加嘉宾触发，展示用户列表
    addJiabin() {
      this.showUserTab = false
      this.userKey = ""
      this.dialogUserlist = true
    },
    //搜索用户
    searchUser() {
      this.loading = true
      this.showUserTab = true
      getmemberList({ nickname: this.userKey }).then(res => {
        this.Userlist = res.data.list
        this.loading = false
      }).catch(err => {
        console.log(err);
      })
    },
    //多选用户列表触发
    handleSelectionChangeUserList(val) {
      this.multipleSelectionUserList = val
    },
    // 限制只能选择两个用户
    selectUser(selection, row) {
      if (selection.length > 2) {
        let del_row = selection.shift();
        // console.log('把数组的第一个元素从其中删除后', selection);
        this.$refs.multipleTableUserList.toggleRowSelection(del_row, false); // 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
      }
    },
    selectAllUser(selection) {
      if (selection.length > 2) {
        selection.length = 2;
        this.$refs.multipleTableUserList.clearSelection()
      }
    },
    //点击用户列表内的确定触发
    submitUserList() {
      this.dialogUserlist = false
      this.tableTealist = this.multipleSelectionUserList
    },
    // 点击导师助教弹窗内的确定触发
    submitAddJiabin() {
      console.log(this.tableTealist);
      let obj = {}
      let arr = []
      this.tableTealist.forEach((item, index) => {
        item.identity_name = this.Usertag[index]
        item.is_exceptional = this.UserOff[index]
        delete item.nickname
        delete item.headimg
        delete item.phone
        delete item.disabled
        delete item.create_time
        delete item.is_vip_text
        delete item.is_agent_name
        delete item.is_write_text
        delete item.is_teacher_text
        delete item.consume_amount
        delete item.phone_text
        delete item.vip_end_time
        arr.push(item)
      })
      obj.guest = arr
      console.log(obj);
      putliveWithGuest(obj, this.liveId).then(res => {
        this.$message.success("添加成功")
        this.dialogTealist = false
      })
    },
    //移除
    deleteRow(row, index) {
      this.tableTealist.splice(index, 1)
    }
  },
  mounted() {
    this.getLivetList();
    this.getInfo()
  },
  computed: {
    start_time() {
      if (this.seleteTime == '' || this.seleteTime == null) {
        return ""
      } else {
        return (new Date(this.seleteTime[0]).getTime()) / 1000
      }
    },
    end_time() {
      if (this.seleteTime == '' || this.seleteTime == null) {
        return ""
      } else {
        return (new Date(this.seleteTime[1]).getTime()) / 1000
      }
    },
  },
  components: {
    vueQr
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
      padding-bottom: 10px;
      .num {
        color: #fff;
        font-size: 34px;
        margin-top: 10px;
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
  .center {
    text-align: center;
    margin-top: 20px;
  }
  ::v-deep .el-switch.is-checked .el-switch__core {
    &:hover {
      cursor: pointer;
    }
  }
  ::v-deep .el-switch.is-disabled {
    opacity: 1;
  }
}
</style>