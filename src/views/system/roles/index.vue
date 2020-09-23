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
            <el-button type="primary" icon="el-icon-plus" @click="hanldAdd" v-permission="['add']">新增</el-button>
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
    <!--角色管理-->
    <el-col style="margin-top: 20px">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <span class="role-span">角色列表</span>
        </div>
        <el-table ref="table" v-loading="loading" highlight-current-row style="width: 100%;" :data="data" @selection-change="selectionChangeHandler"
                  @current-change="handleCurrentChange">
          <el-table-column type="expand" width="55">
            <template slot-scope="scope">
              <el-row :class="['bdbottom','vcenter',index === 0 ? 'bdtop' : '']" v-for="(item1,index) in scope.row.children" :key="index">
                <!-- 渲染一级权限 -->
                <el-col :span="5">
                  <el-tag>{{item1.title}}
                    <el-popconfirm title="确定删除此权限吗？" @onConfirm='removeById(scope.row,item1)'>
                      <i class="el-icon-close" slot="reference"></i>
                    </el-popconfirm>
                  </el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <!-- 渲染二三级权限 -->
                <el-col :span="19">
                  <el-row v-for="(item2,i) in item1.children" :key="i" :class="['vcenter',i === 0 ? '': 'bdtop']">
                    <!-- 二级 -->
                    <el-col :span="6">
                      <el-tag type="success">{{item2.title}}
                        <el-popconfirm title="确定删除此权限吗？" @onConfirm='removeById(scope.row,item2)'>
                          <i class="el-icon-close" slot="reference"></i>
                        </el-popconfirm>
                      </el-tag>
                      <i class="el-icon-caret-right"></i>
                    </el-col>
                    <!-- 三级 -->
                    <el-col :span="18">
                      <el-tag v-for="(item3,j) in item2.children" :key="j" type="warning">{{item3.title}}
                        <el-popconfirm title="确定删除此权限吗？" @onConfirm='removeById(scope.row,item3)'>
                          <i class="el-icon-close" slot="reference"></i>
                        </el-popconfirm>
                      </el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column type="index" width="55" label="#" />
          <el-table-column prop="title" label="名称" />
          <el-table-column :show-overflow-tooltip="true" prop="desc" label="描述" />
          <el-table-column :show-overflow-tooltip="true" prop="desc" label="是否启用">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status" @change='hanldChange(scope.row)' :active-value="1" :inactive-value="0" active-color="#13ce66"
                         inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="create_time" label="创建日期">
            <template slot-scope="scope">
              <span>{{ (scope.row.create_time) }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" fixed="right" width="300">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" @click="hanldEdit(scope.row)" v-permission="['edit']">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" v-permission="['delete']">删除</el-button>
              <el-button type="warning" icon="el-icon-s-tools" v-permission="['give']" @click="showSetRolesDialog(scope.row)">分配权限</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页组件-->
        <!-- <pagination /> -->
      </el-card>
    </el-col>
    <!-- 分配权限dialog -->
    <el-dialog title="分配权限" :visible.sync="rolesDialogVisible" width="20%" @close="colseDialog">
      <!-- 树形控件 -->
      <el-tree :data="rolesList" show-checkbox :props="treeProps" node-key="id" default-expand-all :default-checked-keys='defKeys' ref='treeRef'>
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rolesDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="PostAuthorize">确 定</el-button>
      </span>
    </el-dialog>
    <DialogRoles :dialogRoles="dialogRoles" :formData="formData" @addOk="getRoles"></DialogRoles>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getRole, getAntRouter, PutRoleStatus, PostAuthorize, DeleteAuthorize } from "@/api/system/index";
export default {
  name: 'roles',
  data() {
    return {
      data: [],//角色列表
      rolesList: [],//所有权限的数据
      rolesName: "",
      loading: false,
      rolesDialogVisible: false,
      treeProps: {
        label: function(data, node) {
          return data.meta.title;
        },
        children: "children"
      },
      defKeys: [],
      dialogRoles: {
        show: false
      },
      formData: {},
      roleId: "",//当前要分配权限的角色id
    }
  },

  mounted() {
    this.getRoles()
  },
  methods: {
    //搜索角色
    toQuery() { },
    selectionChangeHandler() { },
    handleCurrentChange() { },
    //根据id删除对应的权限（包括子节点）
    removeById(row, node) {
      let roles = [node.id]
      if (row.children) {
        row.children.map(item => {
          if (node.id == item.id) {
            if (item.children) {
              item.children.map(item2 => {
                roles.push(item2.id)
                if (item2.children) {
                  item2.children.map(item3 => {
                    roles.push(item3.id)
                  })
                }
              })
            }
          }
          if (item.children) {
            item.children.map(items => {
              if (node.id == items.id) {
                if (items.children) {
                  items.children.map(items2 => {
                    roles.push(items2.id)
                  })
                }
              }
            })
          }
        })
      }
      DeleteAuthorize(row.id, { rules: roles.join(",") }).then(res => {
        if (res.code == 0) {
          this.$message.success('删除权限成功')
          this.getRoles()
        }
      })

    },
    // 展示分配权限的弹窗
    showSetRolesDialog(role) {
      this.rolesDialogVisible = true
      this.roleId = role.id
      getAntRouter({ type: 2 }).then(res => {
        if (res.code == 0) {
          this.rolesList = res.data.list;
          // this.defKeys = (role.rules).split(',')
          // console.log(this.defKeys);

        }
      })
      //递归获取三级节点的id
      // console.log(this.defKeys);

      this.getLeafKeys(role, this.defKeys)
    },
    //通过递归的形式，获取角色下多有三级权限的id，并保存到defkeys 数组中
    getLeafKeys(node, arr) {
      //如果当前node节点不包含children 属性，则是三级节点
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => {
        this.getLeafKeys(item, arr)
      });

    },
    // 关闭分配权限弹窗触发
    colseDialog() {
      this.defKeys = []
    },
    // 刷新
    refresh() {
      this.getRoles()
    },
    // 增加
    hanldAdd() {
      this.dialogRoles = {
        show: true,
        title: "新增角色",
        option: "add"
      };
      this.formData = {
        name: "",
        desc: "",
        status: 1,//默认开启
        tag: ""
      };
    },
    //获取列表
    getRoles() {
      this.loading = true
      getRole().then(res => {
        if (res.code == 0) {
          this.data = res.data.list
          this.loading = false
        }
      })
    },
    //是否启用
    hanldChange(row) {
      PutRoleStatus(row.id, row.status).then(res => {
        if (res.code == 0) {
          this.$message.warning('切换状态成功')
        }
      })
    },
    //分配权限
    PostAuthorize() {
      const keys = [...this.$refs.treeRef.getCheckedKeys(), ...this.$refs.treeRef.getHalfCheckedKeys()];
      const idStr = keys.join(",")
      console.log(idStr);
      PostAuthorize(this.roleId, { rules: idStr }).then(res => {
        console.log(res);
        if (res.code == 0) {
          this.$message.success("分配权限成功")
          this.rolesDialogVisible = false
          this.getRoles()
        }
      })
    },
    //编辑角色
    hanldEdit(row) {
      this.dialogRoles = {
        show: true,
        title: "编辑角色",
        option: "edit"
      };
      this.formData = {
        id: row.id,
        name: row.title,
        desc: row.desc,
        status: row.status,
        tag: row.tag
      };
    }
  },
  components: {
    DialogRoles: resolve => {
      require(['@/components/System/roles/DialogRoles.vue'], resolve)
    },
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
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
.el-icon-close {
  &:hover {
    color: #fff;
    background: red;
  }
}
</style>
