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
        <el-table ref="table" v-loading="loading" size='small' lazy :load="getMenus" :data="data" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="id" @select="selectChange" @select-all="selectAllChange" @selection-change="selectionChangeHandler">
          <!-- <el-table-column type="selection" width="55" /> -->
          <el-table-column type="index" width="55" label="#" />
          <el-table-column :show-overflow-tooltip="true" label="菜单标题" width="125px" prop="meta.title" />
          <el-table-column prop="icon" label="图标" align="center" width="60px">
            <template slot-scope="scope">
              <svg-icon :icon-class="scope.row.meta.icon" v-if="scope.row.meta.icon" />
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="menuSort" align="center" label="排序">
            <template slot-scope="scope">
              {{ scope.row.sort }}
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="permission" label="权限标识">
            <template slot-scope="scope">
              {{ scope.row.permission == '' ? '-' : scope.row.permission }}
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="component" label="组件路径">
            <template slot-scope="scope">
              {{ scope.row.component == '' ? '-' : scope.row.component }}
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
    <DialogMenu :dialogMenu="dialogMenu" :formData="formData" @addOk='getAntRouter'></DialogMenu>
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
    this.getAntRouter()
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
      this.getAntRouter()
    },
    // 获取子节点数据
    getMenus(tree, treeNode, resolve) {
      const params = { pid: tree.id, type: 2 }
      setTimeout(() => {
        getAntRouter(params).then(res => {
          console.log(res);
          resolve(res.data.list)
        })
      }, 100)
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
        title: row.meta.title,
        type: row.type,
        icon: row.meta.icon,
        path: row.path,
        componentName: row.name,
        component: row.component,
        permission: row.permission,
        pid: row.pid,
        menuSort: row.sort,
        // ptitle: row.ptitle,
      };
    },
    // 获取菜单列表
    getAntRouter() {
      this.loading = true
      getAntRouter({ pid: 0 }).then(res => {
        if (res.code == 0) {
          this.data = res.data.list
          this.loading = false
        }
      })
    }
  },
  components: {
    DialogMenu: resolve => {
      require(['@/components/menu/DialogMenu.vue'], resolve)
    },
  },
  computed: {

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
