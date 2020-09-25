<template>
  <div>
    <el-dialog title="配置价格区间" :visible.sync="dialogPrice.show" width="50%" :close-on-click-modal='false' :show-close='false' @open='openFun'
               destroy-on-close>
      <div class="btn">
        <el-button @click="handleAdd()" type="primary" size="mini">添加</el-button>
      </div>
      <el-table :data="formData" style="width: 100%" v-loading='loading'>
        <el-table-column prop="id" label="ID" align="center">
        </el-table-column>
        <el-table-column prop="title" label="标题" align="center">
        </el-table-column>
        <!-- <el-table-column prop="type" label="应用区域" align="center">
        </el-table-column> -->
        <el-table-column prop="min_value" label="价格区间 align=" center"">
        </el-table-column>
        <el-table-column prop="sort" label="排序" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="delPricesQu(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPrice.show = false">取 消</el-button>
        <el-button type="primary" @click="dialogPrice.show = false">确 定</el-button>
      </span>
      <el-dialog width="30%" title="添加价格区间" :visible.sync="innerVisible" append-to-body destroy-on-close @close='closeFun'>
        <el-form ref="form" :model="form" label-width="100px" label-position="left">
          <el-form-item label="标题" required>
            <el-input v-model="form.title" placeholder="请输入前端展示的标题" style="width:80%"></el-input>
          </el-form-item>
          <el-form-item label="最小区间值" required>
            <el-input-number v-model="form.min_value" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="最大区间值" required>
            <el-input-number v-model="form.max_value" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="排序" required>
            <el-input-number v-model="form.sort"></el-input-number>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="addPricesQu()" v-if="option  != 'edit'">确 定</el-button>
          <el-button type="primary" @click="editPricesQu()" v-if="option  == 'edit'">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>

  </div>
</template>

<script>
import { getpricesQu, addPricesQu, editPricesQu, delPricesQu } from "@/api/product";
export default {
  props: ['dialogPrice'],
  data() {
    return {
      loading: false,
      option: "",
      innerVisible: false,
      formData: [],
      form: {
        title: "",
        min_value: "",
        max_value: "",
        sort: 0,
        type: 1
      }
    }
  },
  methods: {
    //打开弹窗触发
    openFun() {
      this.loading = true
      getpricesQu().then(res => {
        this.formData = res.data.list
        this.loading = false
      })
    },
    //添加按钮触发
    handleAdd() {
      this.innerVisible = true
    },
    closeFun() {
      this.form = {}
    },
    //提交添加请求
    addPricesQu() {
      if (this.form.title == '') {
        this.$message.error("标题不能为空！")
      } else
        if (this.form.min_value + '' == '') {
          this.$message.error("最小值不能为空！")
        } else
          if (this.form.max_value + '' == '') {
            this.$message.error("最大值不能为空！")
          } else
            if (this.form.sort + '' == '') {
              this.$message.error("排序不能为空！")
            } else {
              addPricesQu(this.form).then(res => {
                this.$message.success("添加成功！")
                this.innerVisible = false
                this.loading = true
                getpricesQu().then(res => {
                  this.formData = res.data.list
                  this.loading = false
                })
              })
            }

    },
    //编辑按钮触发
    handleEdit(row) {
      row.type = 1
      this.innerVisible = true
      this.form = row
      this.option = 'edit'
    },
    //提交编辑请求
    editPricesQu() {
      editPricesQu(this.form, this.form.id).then(res => {
        this.$message.success("编辑成功！")
        this.innerVisible = false
        this.loading = true
        getpricesQu().then(res => {
          this.formData = res.data.list
          this.loading = false

        })
      })
    },
    //删除按钮触发
    delPricesQu(row) {
      this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delPricesQu(row.id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.innerVisible = false
          this.loading = true
          getpricesQu().then(res => {
            this.formData = res.data.list
            this.loading = false
          })
        })
      }).catch((err) => {
        console.log(err);

        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
}
</script>

<style lang="scss" scoped>
.btn {
  position: absolute;
  top: 18px;
  right: 10px;
}
</style>