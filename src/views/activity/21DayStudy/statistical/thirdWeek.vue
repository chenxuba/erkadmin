<template>
  <div class="main">
    <el-table :data="tableData" style="width: 100%" v-loading='loading' border>
      <el-table-column type="index" label="#" width="55" align="center">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" align="center">
      </el-table-column>
      <el-table-column prop="headimg" label="头像" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.headimg" width="50px" height="50px" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="course_name" label="视频名称" align="center">
      </el-table-column>
      <el-table-column prop="view_number" label="浏览次数" align="center">
      </el-table-column>
      <el-table-column prop="view_time" label="观看时长" align="center">
        <template slot-scope="scope">
          <el-tag> {{formatSeconds(scope.row.view_time)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="view_date" label="观看时间" align="center">
      </el-table-column>
      <el-table-column prop="org_name" label="所属机构/医院" align="center">
      </el-table-column>
    </el-table>
    
  </div>
</template>

<script>
export default {
  props: ['tableData','loading'],
  methods: {
    // 秒转换时分秒
    formatSeconds(value) {
      let result = parseInt(value)
      let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600)
      let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60))
      let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60))
      return result = `${h}时${m}分${s}秒`
    },
    
  },
}
</script>

<style lang="scss" scoped>
</style>