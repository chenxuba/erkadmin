<template>
  <div class="main">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane name="first">
        <span slot="label">
          <i>课程审核列表</i>
          <el-badge :value="num1" size="mini" class="item">
          </el-badge>
        </span>
        <courseList @badge='badge'></courseList>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label">
          <i>课时审核列表</i>
          <el-badge :value="num2" size="mini" class="item">
          </el-badge>
        </span>
        <classList @badge2='badge2'></classList>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import courseList from "@/components/Product/checkList/courseList"
import classList from "@/components/Product/checkList/classList"

export default {
  data() {
    return {
      activeName: 'first',
      num1: 0,
      num2: 0,
    }
  },
  methods: {
    badge(data) {
      this.num1 = data
    },
    badge2(data) {
      this.num2 = data
    }
  },
  components: {
    courseList,
    classList
  },
}
</script>

<style lang="scss" scoped>
</style>