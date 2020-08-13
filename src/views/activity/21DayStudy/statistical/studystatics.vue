<template>
  <div class="main">
    <div class="shuju">
      <el-tag>
        生成海报: {{detail.build_poster}}
      </el-tag>
      <el-tag>
        打卡专区: {{detail.clock_in}}
      </el-tag>
      <el-tag>
        合作机构专区: {{detail.cooper_org}}
      </el-tag>
      <el-tag>
        课程问卷:{{detail.course_feedback}}
      </el-tag>
      <el-tag>
        购买vip: {{detail.purchase_vip}}
      </el-tag>
      <el-tag>
        VIP专区: {{detail.vip}}
      </el-tag>
      <el-tag>
        参与用户: {{detail.members}}
      </el-tag>
    </div>
    <div class="wenjuan">
      <el-table :data="wenjuan" style="width: 100%"  border :height="height">
        <el-table-column prop="id" label="#" width="55" align="center">
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.nickname">{{scope.row.nickname}}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="headimg" label="头像" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.headimg" width="50px" height="50px" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="course_name" label="视频名称" align="center">
        </el-table-column>
        <el-table-column prop="score" label="课程评分" align="center">
        </el-table-column>
        <el-table-column prop="help_grade" label="帮助程度" align="center">
        </el-table-column>
        <el-table-column prop="help_reason" label="无帮助原因" :show-overflow-tooltip="true" align="center">
        </el-table-column>
        <el-table-column prop="favor_course" label="喜爱的课程" :show-overflow-tooltip="true" align="center">
        </el-table-column>
        <el-table-column prop="teacher_name" label="喜爱的老师" align="center">
        </el-table-column>
        <el-table-column prop="suggestions" label="建议" :show-overflow-tooltip="true" align="center">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: ['detail', 'wenjuan', 'loading'],
  data() {
    return {
       height: document.documentElement.clientHeight - 340
    }
  },
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
.shuju {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
.wenjuan {
  margin-top: 15px;
}
</style>