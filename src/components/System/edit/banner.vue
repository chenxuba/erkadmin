<template>
  <div class="main">
    <!-- data -->
    <el-card style="margin-top:15px">
      <el-row>
        <el-col>
          <el-button type="success" plain>添加广告图</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%;margin-top:10px">
        <el-table-column prop="id" label="ID" width="55" />
        <el-table-column prop="location" label="广告图位置" align="center" />
        <el-table-column prop="img" label="缩略图" align="center">
          <template slot-scope="scope">
            <img v-if="scope.row.img != ''" :src="scope.row.img" alt="" class="img">
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="link" label="跳转链接" width="180" align="center" />
        <el-table-column prop="sort" label="排序" align="center" width="60" />
        <el-table-column prop="type" label="是否显示" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.type" active-color="#13ce66" active-value="1" inactive-value="0">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="创建时间" align="center" width="140" />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="warning" size="mini">编辑</el-button>
            <el-button @click="handleDel(scope.row)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { id: '1', location: '首页', img: 'http://zsvideo.86itn.cn/62ce7201911191636202705.png', link: 'http://school.ybc365.com/', sort: '1', linkType: '站外链接', location: '顶部导航', type: '1', time: '2019-12-13 17:23:14' },
        { id: '2', location: '商城', img: 'http://erkong.ybc365.com/98f5b202003182113351714.png', link: '/house', sort: '2', linkType: '站内链接', location: '菜单导航', type: '1', time: '2019-12-14 17:23:14' },
      ]
    }
  },
  methods: {
    handleChange() {

    },
    // 编辑
    handleEdit() {

    },
    //删除
    handleDel() {

    }
  },
}
</script>

<style lang="scss" scoped>
.main {
  margin: 10px;
  .img {
    width: 70px;
    height: 30px;
    object-fit: cover;
  }
}
</style>