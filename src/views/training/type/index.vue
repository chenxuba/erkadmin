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
        <el-table-column prop="name" label="分类名称">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary"  @click="hanldAdd(scope.$index, scope.row)">添加子类别</el-button>
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加分类弹窗 -->
    <DialogMenu :dialogMenu="dialogMenu" :formData='formData'></DialogMenu>
  </div>
</template>

<script>
export default {
  name: "type",
  data() {
    return {
      dialogMenu: {},//添加分类弹窗是否显示
      formData: {},
      // 默认true
      isShowTable: true,
      tableData: [
        {
          "id": 1,
          "type_name": "康复训练师",
          "sort": 0,
          "disabled": 1,
          "create_time": 1584190848,
          "update_time": 1584190848,
          "p_id": 0,
          "is_index": 0,
          "thumb": "http://erkong.ybc365.com/47795202003142100445649.png",
          "is_platform": 0,
          "view_number": 2,
          "is_course": "1",
          "pid": 0,
          "name": "康复训练师",
          "children": [
            {
              "id": 2,
              "type_name": "言语-语言 职业认证课程",
              "sort": 0,
              "disabled": 1,
              "create_time": 1584190891,
              "update_time": 1584190988,
              "p_id": 1,
              "is_index": 0,
              "thumb": "http://erkong.ybc365.com/311a3202003142101288658.png",
              "is_platform": 0,
              "view_number": 16576,
              "is_course": "1",
              "pid": 1,
              "name": "言语-语言 职业认证课程",
              "children": [
                {
                  "id": 3,
                  "type_name": "初级认证",
                  "sort": 0,
                  "disabled": 1,
                  "create_time": 1584191078,
                  "update_time": 1584191078,
                  "p_id": 2,
                  "is_index": 0,
                  "thumb": "http://erkong.ybc365.com/ebc05202003142104354864.png",
                  "is_platform": 0,
                  "view_number": 0,
                  "is_course": "1",
                  "pid": 2,
                  "name": "初级认证",
                  "children": [
                    {
                      "id": 4,
                      "type_name": "基础课程",
                      "sort": 0,
                      "disabled": 1,
                      "create_time": 1584191111,
                      "update_time": 1584191111,
                      "p_id": 3,
                      "is_index": 0,
                      "thumb": "",
                      "is_platform": 0,
                      "view_number": 0,
                      "is_course": "0",
                      "pid": 3,
                      "name": "基础课程",
                      "children": [

                      ]
                    },
                    {
                      "id": 5,
                      "type_name": "拓展课程",
                      "sort": 0,
                      "disabled": 1,
                      "create_time": 1584191124,
                      "update_time": 1584191124,
                      "p_id": 3,
                      "is_index": 0,
                      "thumb": "",
                      "is_platform": 0,
                      "view_number": 0,
                      "is_course": "1",
                      "pid": 3,
                      "name": "拓展课程",
                      "children": [

                      ]
                    }
                  ]
                },
                {
                  "id": 10,
                  "type_name": "中级认证",
                  "sort": 0,
                  "disabled": 1,
                  "create_time": 1584694170,
                  "update_time": 1584694170,
                  "p_id": 2,
                  "is_index": 0,
                  "thumb": "http://erkong.ybc365.com/1ad60202003201649197750.png",
                  "is_platform": 0,
                  "view_number": 0,
                  "is_course": "1",
                  "pid": 2,
                  "name": "中级认证",
                  "children": [
                    {
                      "id": 11,
                      "type_name": "基础课程",
                      "sort": 0,
                      "disabled": 1,
                      "create_time": 1584694229,
                      "update_time": 1584694229,
                      "p_id": 10,
                      "is_index": 0,
                      "thumb": "http://erkong.ybc365.com/0c6cc202003201650162729.png",
                      "is_platform": 0,
                      "view_number": 0,
                      "is_course": "0",
                      "pid": 10,
                      "name": "基础课程",
                      "children": [

                      ]
                    },
                    {
                      "id": 12,
                      "type_name": "拓展课程",
                      "sort": 0,
                      "disabled": 1,
                      "create_time": 1584694311,
                      "update_time": 1584694311,
                      "p_id": 10,
                      "is_index": 0,
                      "thumb": "http://erkong.ybc365.com/a03de202003201651406606.png",
                      "is_platform": 0,
                      "view_number": 0,
                      "is_course": "1",
                      "pid": 10,
                      "name": "拓展课程",
                      "children": [

                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
      ],
    }
  },
  methods: {
    // 编辑
    handleEdit(index,row) {
      this.dialogMenu = {
        show: true,
        title: "编辑分类",
        option: "edit",
      };
      this.formData = {
        pid: row.pid,
        label: row.pid == 0 ? '顶级分类' : row.type_name,
        type_name: row.type_name,
        imgUrl: row.thumb,
        is_platform: row.is_platform + '',//转成字符串
        sort:row.sort
      }
    },
    handleDelete() {

    },
    // 添加类别
    hanldAdd(index, row) {
      this.dialogMenu = {
        show: true,
        title: "添加分类",
        option: "add",
      };
      this.formData = {
        pid: row.pid,
        label: row.type_name,
        type_name: "",
        imgUrl: "",
        is_platform: "0",
        sort: ""
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
        pid: 0,
        label: "顶级分类",
        type_name: "",
        imgUrl: "",
        is_platform: "0",
        sort: ""
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
    }
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