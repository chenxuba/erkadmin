<template>
  <div>
    <div class="ueditor">
      <Ueditor></Ueditor>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Ueditor: resolve => {
      require(['@/components/Ueditor/index'], resolve)
    },
  },
}
</script>

<style lang="scss" scoped>

</style>