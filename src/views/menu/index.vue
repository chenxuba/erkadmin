<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div>
        <!-- 搜索 -->
        <span>
          <el-input v-model="rolesName" size="small" clearable placeholder="输入名称或者描述搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery" />
          <span class='filter-item'>
            <el-button size="mini" type="success" icon="el-icon-search">搜索</el-button>
            <el-button size="mini" type="warning" icon="el-icon-refresh-left">重置</el-button>
            <el-button size="mini" type="primary" icon="el-icon-plus" @click="handleAdd()">新增</el-button>
          </span>
        </span>
        <span>
          <el-button-group>
            <el-button icon="el-icon-search" size="mini"></el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="refresh"></el-button>
          </el-button-group>
        </span>
      </div>
    </div>
    <!--菜单管理-->
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin-top: 20px">
      <el-card class="box-card" shadow="never">
        <el-table ref="table" v-loading="loading" lazy :load="getMenus" :data="data" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="id" @select="selectChange" @select-all="selectAllChange" @selection-change="selectionChangeHandler">
          <!-- <el-table-column type="selection" width="55" /> -->
          <el-table-column type="index" width="55" label="#" />
          <el-table-column :show-overflow-tooltip="true" label="菜单标题" width="125px" prop="meta.title" />
          <el-table-column prop="icon" label="图标" align="center" width="60px">
            <template slot-scope="scope">
              <svg-icon :icon-class="scope.row.meta.icon ? scope.row.meta.icon : ''" />
            </template>
          </el-table-column>
          <el-table-column prop="menuSort" align="center" label="排序">
            <template slot-scope="scope">
              {{ scope.row.sort }}
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="permission" label="权限标识">
            <template slot-scope="scope">
              {{ scope.row.permission == null ? '-' : scope.row.permission }}
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="component" label="组件路径">
            <template slot-scope="scope">
              {{ scope.row.component == null ? '-' : scope.row.component }}
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="创建日期">
            <template slot-scope="scope">
              <span>{{ (scope.row.create_time) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页组件-->
        <!-- <pagination /> -->
      </el-card>
    </el-col>
    <!-- 新增弹窗 -->
    <DialogMenu :dialogMenu="dialogMenu" :formData="formData"></DialogMenu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAntRouter } from "@/api/user";
export default {
  name: 'roles',
  data() {
    return {
      data: [],//顶级菜单数据
      rolesName: "",
      loading: false,
      dialogMenu: {
        show: false,
        title: "",
        option: "edit"
      },
      formData: {},
    }
  },

  mounted() {
    getAntRouter().then(res => {

      this.data = res.data.list
    })
  },
  methods: {
    //搜索角色
    toQuery() {
    },
    selectionChangeHandler() {
    },
    selectChange() { },
    selectAllChange() { },
    handleCurrentChange() {
    },
    //刷新
    refresh() {
    },
    getMenus(tree, treeNode, resolve) {
      const params = { pid: tree.id }
      console.log(params);
      // setTimeout(() => {
      //   resolve([
      //     {
      //       id: 31,
      //       date: '2016-05-01',
      //       name: '王小虎',
      //       address: '上海市普陀区金沙江路 1519 弄'
      //     }, {
      //       id: 32,
      //       date: '2016-05-01',
      //       name: '王小虎',
      //       address: '上海市普陀区金沙江路 1519 弄'
      //     }
      //   ])
      // }, 100)
    },
    // 新增
    handleAdd() {
      this.dialogMenu = {
        show: true,
        title: "新增菜单",
        option: "add"
      };
      this.formData = {
        title: "",
        type: "1",
        icon: "",
        path: "",
        componentName: "",
        component: "",
        permission: "",
        pid: "",
        menuSort: "",
        hidden: '1'
      };
    },
    // 编辑
    handleEdit(row) {
      this.dialogMenu = {
        show: true,
        title: "编辑菜单",
        option: "edit"
      };
      this.formData = {
        title: row.title,
        type: row.type,
        icon: row.icon,
        path: row.path,
        componentName: row.componentName,
        component: row.component,
        permission: row.permission,
        pid: row.pid,
        menuSort: row.menuSort,
        ptitle: row.ptitle,
      };
    }
  },
  components: {
    DialogMenu: resolve => {
      require(['@/components/menu/DialogMenu.vue'], resolve)
    },
  },
  computed: {
    // ...mapGetters([
    //   'menus'
    // ])
  },
}
</script>

<style lang="scss" scoped>
// 工具栏
.head {
  &-container {
    text-indent: -10px;
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      > span {
        display: flex;
        align-items: center;
      }
      .filter {
        &-item {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
