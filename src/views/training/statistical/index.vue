<template>
  <div class="main">
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i> 学习记录</span>
        <el-tabs>
          <el-tab-pane label="言语培训课">
            <!--工具栏-->
            <div class="head-container" style="margin-bottom:10px;">
              <div style="display: flex;">
                <!-- 搜索 -->
                <el-input clearable  v-model="search" placeholder="输入会员名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery" />
                <el-date-picker :default-time="['00:00:00','23:59:59']" type="daterange" range-separator=":"  class="date-item" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期" />
                <el-button type="success"  icon="el-icon-search">搜索</el-button>
                <el-button type="primary"  icon="el-icon-refresh-left">重置</el-button>
                <el-button type="warning"  icon="el-icon-download">导出</el-button>
              </div>
            </div>
            <el-table :data="tableData1" style="width: 100%"  height="400">
              <el-table-column prop="id" label="ID" width="100">
              </el-table-column>
              <el-table-column prop="username" :show-overflow-tooltip="true" label="用户名">
              </el-table-column>
              <el-table-column prop="phone" :show-overflow-tooltip="true" label="手机号码">
              </el-table-column>
              <el-table-column prop="teacher" label="讲师">
              </el-table-column>
              <el-table-column prop="studyVideo" :show-overflow-tooltip="true" label="所学课时">
              </el-table-column>
              <el-table-column prop="videoType" :show-overflow-tooltip="true" label="课时分类">
              </el-table-column>
              <el-table-column prop="studyType" label="学习状态" width="100">
              </el-table-column>
              <el-table-column prop="stydyTime" :show-overflow-tooltip="true" label="入学时间">
              </el-table-column>
            </el-table>
            <!--分页-->
            <div class="fenye" style="margin-top:10px;">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, prev, pager, next,sizes" :total="40">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="感统培训课">
            <!--工具栏-->
            <div class="head-container" style="margin-bottom:10px;">
              <div>
                <!-- 搜索 -->
                <el-input clearable  v-model="search" placeholder="输入会员名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery" />
                <el-date-picker :default-time="['00:00:00','23:59:59']" type="daterange" range-separator=":"  class="date-item" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期" />
                <el-button type="success"  icon="el-icon-search">搜索</el-button>
                <el-button type="primary"  icon="el-icon-refresh-left">重置</el-button>
                <el-button type="warning"  icon="el-icon-download">导出</el-button>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="课程分析">课程分析</el-tab-pane>
      <el-tab-pane label="试卷分析">试卷分析</el-tab-pane>
      <el-tab-pane label="结算分析">
        <!--工具栏-->
        <div class="head-container" style="margin-bottom:10px;">
          <div>
            <!-- 搜索 -->
            <el-input clearable  v-model="search" placeholder="输入会员名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery" />
            <el-date-picker :default-time="['00:00:00','23:59:59']" type="daterange" range-separator=":"  class="date-item" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期" />
            <el-button type="success"  icon="el-icon-search">搜索</el-button>
            <el-button type="primary"  icon="el-icon-refresh-left">重置</el-button>
            <el-button type="warning"  icon="el-icon-download">导出</el-button>
          </div>
        </div>
        <el-table :data="tableData2.filter(data => !search || data.teacher.toLowerCase().includes(search.toLowerCase()))" show-summary :summary-method="getSummaries" style="width: 100%"  height="450">
          <el-table-column prop="id" label="ID" width="100">
          </el-table-column>
          <el-table-column prop="username" :show-overflow-tooltip="true" label="用户名">
          </el-table-column>
          <el-table-column prop="teacher" label="讲师">
          </el-table-column>
          <el-table-column prop="studyVideo" :show-overflow-tooltip="true" label="所学课时">
          </el-table-column>
          <el-table-column prop="videoType" :show-overflow-tooltip="true" label="课时分类">
          </el-table-column>
          <el-table-column prop="studyType" label="学习状态" width="100">
          </el-table-column>
          <el-table-column prop="proportion" label="分成比例" width="100">
          </el-table-column>
          <el-table-column prop="stydyTime" :show-overflow-tooltip="true" label="入学时间">
          </el-table-column>
          <el-table-column prop="teacherIncome" label="导师所得" width="100">
            <template slot-scope="scope">
              <el-tag type="danger">{{scope.row.teacherIncome}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <div class="fenye" style="margin-top:10px;">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, prev, pager, next,sizes" :total="40">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      total: '4050',
      tableData1: [
        {
          id: '12987122',
          username: '子非鱼，安知鱼之乐',
          teacher: '张倩',
          phone: "17601251736",
          studyVideo: '口肌训练（二）',
          videoType: '中级认证/基础课程',
          studyType: '100%',
          stydyTime: '2020-06-29 09:27:38'
        },
        {
          id: '12987122',
          username: '子非鱼，安知鱼之乐',
          teacher: '张倩',
          phone: "17601251736",
          studyVideo: '口肌训练（二）',
          videoType: '中级认证/基础课程',
          studyType: '100%',
          stydyTime: '2020-06-29 09:27:38'
        },
        {
          id: '12987122',
          username: '子非鱼，安知鱼之乐',
          teacher: '张倩',
          phone: "17601251736",
          studyVideo: '口肌训练（二）',
          videoType: '中级认证/基础课程',
          studyType: '100%',
          stydyTime: '2020-06-29 09:27:38'
        },
        {
          id: '12987122',
          username: '子非鱼，安知鱼之乐',
          teacher: '张倩',
          phone: "17601251736",
          studyVideo: '口肌训练（二）',
          videoType: '中级认证/基础课程',
          studyType: '100%',
          stydyTime: '2020-06-29 09:27:38'
        },
      ],
      tableData2: [
        {
          id: '12987122',
          username: '子非鱼，安知鱼之乐',
          teacher: '刘倩',
          studyVideo: '口肌训练（二）',
          videoType: '中级认证/基础课程',
          studyType: '100%',
          proportion: '100%',
          teacherIncome: '25',
          stydyTime: '2020-06-29 09:27:38'
        }
      ]
    };
  },
  methods: {
    handleSizeChange() { },
    handleCurrentChange() { },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';    //这里就是显示你要写的啥名字,是合计还是汇总什么 
          return;
        }
        switch (column.property) {  //column.property是prop="highQuality" prop里面的东西,实在不知道可以打印出来是什么
          case "teacherIncome":
            sums[index] = this.total
            break;
          default:
            break;
        }
      });
      return sums;
    }
  }
};
</script>
<style lang="scss" scoped>
.main {
  margin: 10px;
  .filter-item,.date-item{
    margin-right: 10px;
  }
}
</style>