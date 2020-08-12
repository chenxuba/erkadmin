<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div>
        <!-- 搜索 -->
        <span>
          <el-input v-model="rolesName" clearable placeholder="输入名称或者描述搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery" />
          <span class='filter-item'>
            <el-button type="success" icon="el-icon-search">搜索</el-button>
            <el-button type="warning" icon="el-icon-refresh-left">重置</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="handleAdd()" v-permission="['add']">新增</el-button>
          </span>
        </span>
        <span>
          <el-button-group>
            <el-button icon="el-icon-search"></el-button>
            <el-button icon="el-icon-refresh" @click="refresh"></el-button>
          </el-button-group>
        </span>
      </div>
    </div>
    <!--菜单管理-->
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin-top: 20px">
      <el-card class="box-card" shadow="never">
        <el-table ref="table" v-loading="loading" lazy :load="getMenus" :data="data" :tree-props="{children: 'children', hasChildren: 'has_children'}" row-key="id" @select="selectChange" @select-all="selectAllChange" @selection-change="selectionChangeHandler">
          <!-- <el-table-column type="selection" width="55" /> -->
          <el-table-column type="index" width="55" label="#" />
          <el-table-column :show-overflow-tooltip="true" label="菜单标题" width="125px" prop="meta.title" />
          <el-table-column prop="icon" label="图标" align="center" width="50px">
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
          <el-table-column :show-overflow-tooltip="true" prop="permission" label="权限标识" width="100">
            <template slot-scope="scope">
              {{ scope.row.permission == '' ? '-' : scope.row.permission }}
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="component" label="组件路径" width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.component == 'Layout'">-</span>
              <span v-else>{{ scope.row.component == '' ? '-' : scope.row.component }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="($route.meta.roles).indexOf('menutype') >=0 ? true : false" :show-overflow-tooltip="true" prop="component" label="菜单类型" align="center">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.type == 1">目录</el-tag>
              <el-tag type="warning" v-if="scope.row.type == 2">菜单</el-tag>
              <el-tag type="danger" v-if="scope.row.type == 3">按钮</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="hidden" label="是否可见" align="center">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.hidden" active-value="1" active-text="是" inactive-value="0" inactive-text="否">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="创建日期" :show-overflow-tooltip="true" width="140">
            <template slot-scope="scope">
              <span>{{ (scope.row.create_time) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="200px">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)" v-permission="['edit']">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" v-permission="['delete']">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页组件-->
        <!-- <pagination /> -->
      </el-card>
    </el-col>
    <!-- 新增弹窗 -->
    <DialogMenu :dialogMenu="dialogMenu" :formData="formData" @addok='getAntRouter' @refreshChilden='refreshChilden'></DialogMenu>
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
      colum: true
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
        id: row.id,
        hidden: row.hidden,
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
    },
    //刷新子节点
    refreshChilden(value) {
      getAntRouter({ pid: value, type: 2 }).then(res => {
        this.$set(this.$refs.table.store.states.lazyTreeNodeMap, value, res.data.list)
      })
    }
  },
  components: {
    DialogMenu: resolve => {
      require(['@/components/System/menu/DialogMenu.vue'], resolve)
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
::v-deep .el-switch__label--left {
  position: relative;
  left: 44px;
  color: #fff;
  z-index: -1111;
  span {
    font-size: 12px !important;
  }
}
::v-deep .el-switch__label--right {
  position: relative;
  right: 44px;
  color: #fff;
  span {
    font-size: 12px !important;
  }
  z-index: -1111;
}
::v-deep .el-switch__label--right.is-active {
  z-index: 1111;
  font-size: 12px !important;
  color: #fff !important;
}
::v-deep .el-switch__label--left.is-active {
  z-index: 1111;
  font-size: 12px !important;
  color: #9c9c9c !important;
}
</style>
