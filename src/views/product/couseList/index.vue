<template>
  <div class="main">
    <el-card style="margin-top:10px;">
      <!--工具栏-->
      <div class="head-container">
        <div>
          <!-- 搜索 -->
          <el-input clearable placeholder="输入课程名称搜索" style="width: 150px;" class="filter-item" />
          <!-- 选择导师 -->
          <el-select v-model="teacher" placeholder="请选择导师">
            <el-option v-for="item in teacherArr" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker :default-time="['00:00:00','23:59:59']" type="daterange" range-separator=":" class="date-item" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期" />
          <el-button type="success" icon="el-icon-search">搜索</el-button>
          <el-button type="primary" icon="el-icon-refresh-left">重置</el-button>
          <el-button type="warning" icon="el-icon-edit" @click="handleAdd">新建课程</el-button>
        </div>
      </div>
      <!-- 表格渲染 -->
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style='margin-top: 10px;'>
        <!--表格渲染-->
        <el-card style="margin:10px 0;">
          <el-table ref="table" :data="data" style="width: 100%;">
            <el-table-column :show-overflow-tooltip="true" prop="id" label="ID" width="40" />
            <!-- 标题 title -->
            <el-table-column :show-overflow-tooltip="true" prop="title" label="标题" width="140" align="center" />
            <!-- 封面图片 img -->
            <el-table-column prop="img" label="封面图片" align="center">
              <template slot-scope="scope">
                <img :src="scope.row.img" width="100%" alt="">
              </template>
            </el-table-column>
            <!-- 所属分类 category -->
            <el-table-column :show-overflow-tooltip="true" prop="category" label="所属分类" align="center" />
            <!-- 媒体类型 type -->
            <el-table-column :show-overflow-tooltip="true" prop="type" label="媒体类型" align="center">
              <template slot-scope="scope">
                <el-tag type="danger">{{scope.row.type}}</el-tag>
              </template>
            </el-table-column>
            <!-- 课程归属 from -->
            <el-table-column :show-overflow-tooltip="true" prop="from" label="课程归属" align="center" />
            <!-- 价格/密码 pwdOrPrice -->
            <el-table-column :show-overflow-tooltip="true" prop="pwdOrPrice" label="价格/密码" align="center" />
            <!-- VIP折扣 vip -->
            <el-table-column :show-overflow-tooltip="true" prop="vip" label="VIP折扣" align="center">
              <template slot-scope="scope">
                <el-tag effect="dark" type="success">{{scope.row.vip}}</el-tag>
              </template>
            </el-table-column>
            <!-- SVIP折扣 svip -->
            <el-table-column :show-overflow-tooltip="true" prop="svip" label="SVIP折扣" align="center">
              <template slot-scope="scope">
                <el-tag effect="dark" type="warning">{{scope.row.svip}}</el-tag>
              </template>
            </el-table-column>
            <!-- 分享收益 share -->
            <el-table-column :show-overflow-tooltip="true" prop="share" label="分享收益" align="center">
              <template slot-scope="scope">
                <el-tag>{{scope.row.share}}</el-tag>
              </template>
            </el-table-column>
            <!-- 创建时间 createTime  -->
            <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建时间" align="center" />
            <el-table-column label="操作" width="200" align="center">
              <template slot-scope="scope">
                <div class="flex">
                  <el-button @click="handleClick(scope.row)" type="primary">编辑课程</el-button>
                  <el-button type="success">上传课时</el-button>
                  <el-button type="danger" class="btn">删除课程</el-button>
                  <el-button type="warning">查看评论</el-button>
                </div>
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
      teacher: "",
      teacherArr: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      data: [
        {
          id: "1",
          title: "四步走，让感统训练更有效",
          img: "http://erkong.ybc365.com/04093202006221440435272.jpg",
          category: "自闭症",
          type: "视频",
          from: "周永福",
          pwdOrPrice: "20.00",
          vip: "会员免费",
          svip: "会员免费",
          share: "推荐/1.00",
          createTime: "2020-02-02 12:00"
        }
      ]
    }
  },
  methods: {
    handleClick(row) {
    },
    handleAdd() {
      this.$router.push('/product/addcourse')
    },
    handleSizeChange() { },
    handleCurrentChange() { },
    handleClickTabs() { },
  },
}
</script>

<style lang="scss" scoped>
.main {
  margin: 10px;
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
  .flex {
    display: flex;
    flex-wrap: wrap;
    .el-button {
      margin-bottom: 5px;
    }
    .btn {
      margin-left: 0;
    }
  }
}
</style>