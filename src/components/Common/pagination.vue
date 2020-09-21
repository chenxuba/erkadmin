<template>
  <div class="pagination">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[1,5, 10, 20, 30, 40, 50]" :layout="layout"
                   :current-page.sync="page" :page-size="page_size" :total="total" :background="background" small>
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "pagination",
  data() {
    return {
      page: 1
    }
  },
  props: {
    // 避免直接改变prop属性
    // 'currentPage': {
    //   required: false,
    //   default: 1
    // },
    'layout': {
      required: false,
      default: 'total, prev, pager, next, sizes'
    },
    'total': {
      required: false,
      default: 0
    },
    'page_size': {
      required: false,
      default: 10
    },
    'background': {
      required: false,
      type: Boolean,
      default: false
    }
  },
  watch: {
    currentPage(val) {
      // 改变这个值并不会触发 handleCurrentChange
      if (typeof val === "number") {
        // console.log('prop currentPage!!!');
        this.currentPage = val;
      }
    },
  },
  methods: {
    // 当前页变化
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
    // size变化
    handleSizeChange(val) {
      this.currentPage = 1;
      this.$emit('handleSizeChange', val);
    },
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  margin: 20px 0 0 0;
  text-align: right;
}
::v-deep .el-pagination .el-select .el-input {
  margin-top: -3px;
}
::v-deep .el-pagination.is-background .el-pager li {
  border-radius: 50%;
}
::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #38a4bd;
}
::v-deep .el-pagination.is-background.el-pagination--small .btn-prev {
  border-radius: 50%;
}
::v-deep .el-pagination.is-background.el-pagination--small .btn-next {
  border-radius: 50%;
}
</style>
