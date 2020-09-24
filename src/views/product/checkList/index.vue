<template>
  <div class="main">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane name="first">
        <span slot="label">
          <i>课程审核列表</i>
          <el-badge :value="num1" size="mini" class="item" :max='99' />
          <el-badge :value="num" class="item" :max='99' type="success" />
        </span>
        <courseList @badge='badge' @badge1='badge1'></courseList>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label">
          <i>课时审核列表</i>
          <el-badge :value="num2" size="mini" :max='99' class="item" />
          <el-badge :value="num3" class="item" :max='99' type="success" />
        </span>
        <classList @badge2='badge2' @badge3='badge3'></classList>
      </el-tab-pane>
      <el-tab-pane disabled>
      </el-tab-pane>
      <el-tab-pane disabled>
      </el-tab-pane>
      <el-tab-pane disabled>
      </el-tab-pane>
      <el-tab-pane disabled>
        <span slot="label" style="padding: 8px;display:flex;">
          <span>
            <el-badge is-dot class="item" />
            代表有若干个被驳回的资源
          </span>
          <span style="margin-left:50px;">
            <el-badge is-dot class="item" type="success" />
            代表有若干个待审核的资源
          </span>
        </span>
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
      num: 0,
      num3: 0,
    }
  },
  methods: {
    badge(data) {
      this.num1 = data
    },
    badge2(data) {
      this.num2 = data
    },
    badge1(data) {
      this.num = data
    },
    badge3(data) {
      this.num3 = data
    }
  },
  components: {
    courseList,
    classList
  },
}
</script>

<style lang="scss" scoped>
::v-deep .el-badge__content.is-dot {
  width: 15px;
  height: 15px;
}
</style>