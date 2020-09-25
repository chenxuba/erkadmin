<template>
  <div class="main">
    <el-card>
      <el-row>
        <el-col class="col">
          <el-button type="primary" icon="el-icon-plus" @click="hanldAddOne">添加类别</el-button>
          <el-button type="warning" icon="el-icon-download" @click="unFoldAll">全部展开</el-button>
          <el-button type="success" icon="el-icon-upload2" @click="foldAll">全部收起</el-button>
          <el-button type="danger" icon="el-icon-refresh" @click="refresh">刷新</el-button>
          <el-button type="danger" icon="el-icon-s-operation" @click="settingPrice">配置价格区间</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" v-loading="loading" style="width: 100%;margin-bottom: 20px;" row-key="id" border
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :row-class-name="tableRowClassName" v-if="isShowTable">
        <el-table-column type="index" label="#" width="50">
        </el-table-column>
        <el-table-column prop="id" label="分类ID">
        </el-table-column>
        <el-table-column prop="type_name" label="分类名称">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="hanldAdd(scope.$index, scope.row)" :disabled="scope.row.p_id != 0">添加子类别</el-button>
            <el-button @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加分类弹窗 -->
    <Dialogcategory :Dialogcategory="Dialogcategory" :formData='formData' @addok='getcourseCategory'></Dialogcategory>
    <!-- 价格区间配置弹窗 -->
    <DialogPrice :dialogPrice='dialogPrice'></DialogPrice>
  </div>
</template>

<script>
import { getcourseCategory, DelcourseCategory } from "@/api/product";
import DialogPrice from "@/components/Product/dialogPrice";
export default {
  name: "category",
  data() {
    return {
      dialogPrice: {
        show: false,
        title: ""
      },
      Dialogcategory: {},
      formData: {},
      // 默认true
      isShowTable: true,
      tableData: [],
      loading: false
    }
  },
  methods: {
    // 编辑
    handleEdit(index, row) {
      console.log(row);
      this.Dialogcategory = {
        show: true,
        title: "编辑分类",
        option: "edit",
      };
      this.formData = {
        id: row.id,
        p_id: row.p_id,
        title: row.type_name,
        type_name: row.type_name,
        disabled: row.disabled,
        is_index: row.is_index,
        sort: row.sort
      }
    },
    // 删除
    handleDelete(row) {
      this.$confirm('此操作将删除该类别, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DelcourseCategory(row.id).then(res => {
          if (res.code == 0) {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            });
            this.getcourseCategory()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    // 添加类别
    hanldAdd(index, row) {
      console.log(row);
      this.Dialogcategory = {
        show: true,
        title: "添加分类",
        option: "add",
      };
      this.formData = {
        p_id: row.id,
        title: row.type_name,
        type_name: "",
        disabled: 1,
        is_index: 0,
        sort: 0
      }
    },
    //添加顶级类别
    hanldAddOne() {
      this.Dialogcategory = {
        show: true,
        title: "添加分类",
        option: "add",
      };
      this.formData = {
        p_id: 0, //上级id
        title: "顶级分类", //上级分类title
        type_name: "", // 分类名称
        disabled: 1,
        is_index: 0,
        sort: 0
      }
    },
    //隔行变色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 !== 1) {
        return 'warning-row'
      }
    },
    /**
     * 触发所有展开图标的click事件
     */
    expandAll() {
      // 获取点击的箭头元素
      let els = document.getElementsByClassName('el-table__expand-icon')
      for (let i = 0; i < els.length; i++) {
        els[i].click()
      }
    },
    /**
     * 展开所有下级
     */
    unFoldAll() {
      this.isShowTable = false
      this.$nextTick(function() {
        this.isShowTable = true
        let _this = this
        window.setTimeout(function() {
          _this.expandAll()
        }, 10)
      })
    },
    /**
     * 收起所有下级
     */
    foldAll() {
      this.isShowTable = false
      this.$nextTick(function() {
        this.isShowTable = true
      })
    },
    //获取类别
    getcourseCategory() {
      this.loading = true
      getcourseCategory().then(res => {
        console.log(res);
        if (res.code == 0) {
          this.tableData = res.data.list
          this.loading = false
        }
      })

    },
    //刷新
    refresh() {
      this.getcourseCategory()
    },
    //配置价格区间
    settingPrice() {
      this.dialogPrice = {
        show: true,
        title: '配置价格区间'
      }
    }

  },

  watch: {
    tableDate: function() {
      this.$nextTick(() => {
        this.expandAll()
      })
    }
  },
  components: {
    Dialogcategory: resolve => {
      require(['@/components/Product/category/Dialogcategory.vue'], resolve)
    },
    DialogPrice
  },
  mounted() {
    this.getcourseCategory();
  },
}
</script>

<style lang="scss" scoped>
.main {
  margin: 10px;
}
.col {
  margin-bottom: 15px;
}
</style>