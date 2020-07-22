<template>
  <div class="main">
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="模版选择" name="template">
          <Template></Template>
        </el-tab-pane>
        <el-tab-pane label="自定义导航" name="navigation">
          <Navigation></Navigation>
        </el-tab-pane>
        <el-tab-pane label="自定义海报" name="poster">自定义海报</el-tab-pane>
        <el-tab-pane label="广告图" name="banner">
          <Banner></Banner>
        </el-tab-pane>
        <el-tab-pane label="个人中心海报" name="centerposter">个人中心海报</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'template'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  components: {
    Template: resolve => {
      require(['@/components/System/edit/template.vue'], resolve)
    },
    Navigation: resolve => {
      require(['@/components/System/edit/navigation.vue'], resolve)
    },
    Banner: resolve => {
      require(['@/components/System/edit/banner.vue'], resolve)
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  margin: 10px;
}
</style>
