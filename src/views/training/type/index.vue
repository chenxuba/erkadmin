<template>
  <div class="main">
    <el-card>
      <el-row>
        <el-col class="col">
          <el-button size="mini" type="primary" icon="el-icon-plus" @click="hanldAddOne">添加顶级类别</el-button>
          <el-button size="mini" type="warning" icon="el-icon-download" @click="unFoldAll">全部展开</el-button>
          <el-button size="mini" type="success" icon="el-icon-upload2" @click="foldAll">全部收起</el-button>
          <el-button size="mini" type="danger" icon="el-icon-refresh">刷新</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" size='small' style="width: 100%;margin-bottom: 20px;" row-key="id" border :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :row-class-name="tableRowClassName" v-if="isShowTable">
        <el-table-column type="index" label="#" width="50">
        </el-table-column>
        <el-table-column prop="id" label="分类ID">
        </el-table-column>
        <el-table-column prop="type_name" label="分类名称">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" :disabled="scope.row.label == 4" type="primary" @click="hanldAdd(scope.$index, scope.row)">添加子类别</el-button>
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加分类弹窗 -->
    <DialogMenu :dialogMenu="dialogMenu" :formData='formData' @addok='getcourseType'></DialogMenu>
  </div>
</template>

<script>
import { getcourseType, AddcourseType, DelcourseType } from "@/api/training";
export default {
  name: "type",
  data() {
    return {
      dialogMenu: {},//添加分类弹窗是否显示
      formData: {},
      // 默认true
      isShowTable: true,
      tableData: [],
    }
  },
  methods: {
    // 编辑
    handleEdit(index, row) {
      console.log(row);
      this.dialogMenu = {
        show: true,
        title: "编辑分类",
        option: "edit",
      };
      this.formData = {
        id: row.id,
        p_id: row.p_id,
        title: row.type_name,
        type_name: row.type_name,
        imgUrl: row.thumb,
        is_platform: row.is_platform + '',//转成字符串
        sort: row.sort,
        is_course: row.is_course,
        label: row.label,
      }
    },
    // 删除
    handleDelete(row) {
      DelcourseType({ id: row.id }).then(res => {
        console.log(res);
        if (res.code == 0) {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success'
          });
          this.getcourseType()
        }
      })
    },
    // 添加类别
    hanldAdd(index, row) {
      console.log(row);
      this.dialogMenu = {
        show: true,
        title: "添加分类",
        option: "add",
      };
      this.formData = {
        p_id: row.id,
        title: row.type_name,
        type_name: "",
        imgUrl: "",
        is_platform: "0",
        sort: "0",
        is_course: "",
        label: row.label,
      }
    },
    //添加顶级类别
    hanldAddOne() {
      this.dialogMenu = {
        show: true,
        title: "添加分类",
        option: "add",
      };
      this.formData = {
        p_id: 0, //上级id
        title: "顶级分类", //上级分类title
        type_name: "", // 分类名称
        imgUrl: "", //封面图
        is_platform: "0", //是否是平台课程
        sort: "0", //排序
        is_course: '1', //是否是拓展课程
        // label: "1"
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
      this.$nextTick(function () {
        this.isShowTable = true
        let _this = this
        window.setTimeout(function () {
          _this.expandAll()
        }, 10)
      })
    },
    /**
     * 收起所有下级
     */
    foldAll() {
      this.isShowTable = false
      this.$nextTick(function () {
        this.isShowTable = true
      })
    },
    //获取类别
    getcourseType() {
      getcourseType().then(res => {
        res.data.list.map((item) => {
          item.label = '1'
          if (item.children) {
            item.children.map(item => {
              item.label = '2'
              if (item.children) {
                item.children.map(item => {
                  item.label = '3'
                  if (item.children) {
                    item.children.map(item => {
                      item.label = '4'
                    })
                  }
                })
              }
            })
          }
        })
        if (res.code == 0) {
          this.tableData = res.data.list
          console.log(this.tableData);
        }
      })
    },


  },

  watch: {
    tableDate: function () {
      this.$nextTick(() => {
        this.expandAll()
      })
    }
  },
  components: {
    DialogMenu: resolve => {
      require(['@/components/Training/type/DialogMenu.vue'], resolve)
    },
  },
  mounted() {
    this.getcourseType();
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