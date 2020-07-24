<template>
  <div class="dialogmenu">
    <el-dialog :title="dialogMenu.title" :visible.sync="dialogMenu.show" @open='openDialog' :close-on-click-modal="false" :close-on-press-escape="false" :modal-append-to-body="false">
      <el-form ref="form" :inline="true" :model="formData" :rules="rules" label-width="80px">
        <!-- 菜单类型 type -->
        <el-form-item label="菜单类型" prop="type">
          <el-radio-group v-model="formData.type" style="width: 178px">
            <el-radio-button label="1">目录</el-radio-button>
            <el-radio-button label="2">菜单</el-radio-button>
            <el-radio-button label="3">按钮</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <!-- 点击选择图标 icon -->
        <el-form-item v-if="formData.type != '3'" label="菜单图标" prop="icon">
          <el-popover placement="bottom-start" width="450" trigger="click" @show="$refs['iconSelect'].reset()">
            <IconSelect ref="iconSelect" @selected="selected" />
            <el-input slot="reference" v-model="formData.icon" style="width: 450px;" placeholder="点击选择图标" readonly>
              <svg-icon v-if="formData.icon" slot="prefix" :icon-class="formData.icon" class="el-input__icon" style="height: 32px;width: 16px;" />
              <i v-else slot="prefix" class="el-icon-search el-input__icon" />
            </el-input>
          </el-popover>
        </el-form-item>
        <!-- 菜单是否可见 hidden -->
        <el-form-item v-if="formData.type != '3'" label="菜单可见" prop="hidden">
          <el-radio-group v-model="formData.hidden">
            <el-radio-button label="1">是</el-radio-button>
            <el-radio-button label="0">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <!-- 菜单标题  title -->
        <el-form-item v-if="formData.type != '3'" label="菜单标题" prop="title">
          <el-input v-model="formData.title" :style="formData.type == '0' ? 'width: 450px' : 'width: 178px'" placeholder="菜单标题" />
        </el-form-item>
        <!-- 按钮名称 title -->
        <el-form-item v-if="formData.type == '3'" label="按钮名称" prop="title">
          <el-input v-model="formData.title" placeholder="按钮名称" style="width: 178px;" />
        </el-form-item>
        <!-- 权限标识 permission -->
        <el-form-item v-if="formData.type == '3'" label="权限标识" prop="permission">
          <el-input v-model="formData.permission" placeholder="权限标识" style="width: 178px;" />
        </el-form-item>
        <!-- 路由地址 path -->
        <el-form-item v-if="formData.type != '3'" label="路由地址" prop="path">
          <el-input v-model="formData.path" placeholder="路由地址（/:path）" style="width: 178px;" />
        </el-form-item>
        <!-- 菜单排序  menuSort-->
        <el-form-item label="菜单排序" prop="menuSort">
          <el-input-number v-model.number="formData.menuSort" placeholder='数字越大越靠前' :min="0" :max="999" controls-position="right" style="width: 178px;" />
        </el-form-item>
        <!-- 组件名称 componentName-->
        <el-form-item v-if="formData.type == '2'" label="组件名称" prop="componentName">
          <el-input v-model="formData.componentName" style="width: 178px;" placeholder="匹配组件内Name字段" />
        </el-form-item>
        <!-- 组件路径 component-->
        <el-form-item v-if="formData.type == '2'" label="组件路径" prop="component">
          <el-input v-model="formData.component" style="width: 178px;" placeholder="组件路径（path/path）" />
        </el-form-item>
        <!-- 选择上级类目 pid 这里注意 formData.ptitle -->
        <el-form-item label="上级类目" prop="pid">
          <SelectTree :options='options' @getValue='getValue' :label='ptitle'></SelectTree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { addmenu, getAntRouter } from "@/api/user";
import { editmenu, getAntRouter, addmenu } from "@/api/system/index";
import { mapGetters } from 'vuex'
export default {
  name: 'dialogmenu',
  props: {
    dialogMenu: Object,
    formData: Object
  },
  data() {
    return {
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        path: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        icon: [{ required: true, message: '请选择图标', trigger: 'change' }],
        componentName: [{ required: true, message: '请输入组件名称', trigger: 'blur' }],
        component: [{ required: true, message: '请输入组件路径', trigger: 'blur' }],
        ptitle: [{ required: true, message: '请选择上级类目', trigger: 'blur' }],
        permission: [{ required: true, message: '请输入权限标识', trigger: 'blur' }],
      },
      options: [],
      ptitle: "",//上级类目的名字
    }
  },
  methods: {
    // 选中图标
    selected(name) {
      console.log(name);

      this.formData.icon = name
    },
    // 改变上级菜单的id
    getValue(id) {
      this.formData.pid = id
    },
    // 提交请求
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            type: this.formData.type,
            permission: this.formData.permission,
            icon: this.formData.icon,
            hidden: this.formData.hidden,
            title: this.formData.title,
            path: this.formData.path,
            component: this.formData.component == '' && this.formData.type == 1 ? 'Layout' : this.formData.component,
            sort: this.formData.menuSort,
            name: this.formData.componentName,
            pid: this.formData.pid,
          }
          if (this.dialogMenu.option == 'add') {
            addmenu(data).then(res => {
              this.$notify({
                title: '成功',
                message: '添加成功',
                type: 'success'
              });
              this.dialogMenu.show = false
              this.$emit("addok")
              this.$emit("refreshChilden", this.formData.pid)
              this.$refs[formName].resetFields();
            })
          } else {
            editmenu(this.formData.id, data).then(res => {
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success'
              });
              this.dialogMenu.show = false
              this.$emit("addok")
              this.$emit("refreshChilden", this.formData.pid)
              this.$refs[formName].resetFields();
            })
          }

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 取消
    cancel(formName) {
      this.$refs[formName].resetFields();
      this.dialogMenu.show = false
    },
    // 打开弹窗触发的方法，渲染上级类目的名字
    openDialog() {
      this.options.map(item => {
        if (this.formData.pid == item.id) {
          this.ptitle = item.authName
        }
        if (item.children) {
          item.children.map(items => {
            if (this.formData.pid == items.id) {
              this.ptitle = items.authName
            }
          })
        }

      })
    }
  },
  components: {
    IconSelect: resolve => {
      require(['@/components/IconSelect/index.vue'], resolve)
    },
    SelectTree: resolve => {
      require(['@/components/System/menu/SelectTree.vue'], resolve)
    },
  },
  mounted() {
    getAntRouter().then(res => {
      res.data.list.map(item => {
        let obj = {}
        obj.id = item.id,
          obj.authName = item.meta.title,
          obj.pid = item.pid
        obj.children = []
        if (item.children) {
          item.children.map(value => {
            let obj2 = {}
            obj2.id = value.id
            obj2.pid = value.pid
            obj2.authName = value.meta.title
            obj.children.push(obj2)
          })
        }
        this.options.push(obj)

      })
      let arr = { id: 0, authName: '顶级目录' }
      this.options.unshift(arr)
      this.ptitle = '顶级目录'
      this.formData.pid = 0
    })
  },
  computed: {

  },
}
</script>

<style lang="scss" scoped>
.dialogmenu {
  ::v-deep .el-dialog {
    overflow: hidden;
  }
}
</style>