<template>
  <div class="main">
    <div class="type">
      <h2>所属试卷：{{type}}</h2>
    </div>
    <el-card>
      <el-button type="warning" @click="hanldAdd">新增试题</el-button>
      <el-divider></el-divider>
      <el-table :data="tableData" v-loading='loading' style="width: 100%" :max-height="tableHeight">
        <el-table-column prop="id" label="ID" width="55" />
        <el-table-column prop="problem_title" label="题目" width="400" :show-overflow-tooltip="false">
          <template slot-scope="scope">
            <span v-html="scope.row.problem_title"></span>
          </template>
        </el-table-column>
        <el-table-column prop="problem_type" label="题目类型" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.problem_type == 1" size="mini" effect='dark'>单选题</el-tag>
            <el-tag v-if="scope.row.problem_type == 2" size="mini" type="warning" effect='dark'>多选题</el-tag>
            <el-tag v-if="scope.row.problem_type == 3" size="mini" type="danger" effect='dark'>判断题</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" align="center" />
        <el-table-column prop="create_user" label="创建人" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.create_user}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="success" @click="hanldEdit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="hanldDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="fenye" style="margin-top:20px;">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="10"
                       layout="total, prev, pager, next,sizes" :total="total">
        </el-pagination>
      </div>
    </el-card>
    <!-- dialog -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%" @close='closeDialog'>
      <div style="margin-top: -15px;text-align: center">
        <el-radio-group v-model="dialogRadio" @change='hanldChang' :disabled="option == 'edit'">
          <el-radio-button label="1">单选题</el-radio-button>
          <el-radio-button label="2">多选题</el-radio-button>
          <el-radio-button label="3">判断题</el-radio-button>
        </el-radio-group>
      </div>
      <!-- 试题题干 -->
      <div class="tigan">
        <h1>试题题干</h1>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" style="width:100%;" v-model="tiganText">
        </el-input>
        <!-- 答案选项 -->
        <h1 class="top">答案选项</h1>
        <el-form ref="form" :model="form" v-show="dialogRadio != 3">
          <el-form-item label="(A)">
            <el-input v-model="A" placeholder="请输入选项内容" style="width:100%;"></el-input>
          </el-form-item>
          <el-form-item label="(B)">
            <el-input v-model="B" placeholder="请输入选项内容" style="width:100%;"></el-input>
          </el-form-item>
          <el-form-item label="(C)">
            <el-input v-model="C" placeholder="请输入选项内容" style="width:100%;"></el-input>
          </el-form-item>
          <el-form-item label="(D)">
            <el-input v-model="D" placeholder="请输入选项内容" style="width:100%;"></el-input>
          </el-form-item>
        </el-form>
        <el-form ref="form" :model="form" v-show="dialogRadio == 3">
          <el-form-item label="真项">
            <el-input v-model="yes" placeholder="请输入选项内容" style="width:100%;"></el-input>
          </el-form-item>
          <el-form-item label="假项">
            <el-input v-model="no" placeholder="请输入选项内容" style="width:100%;"></el-input>
          </el-form-item>
        </el-form>
        <!-- 正确答案 -->
        <h1>正确答案</h1>
        <div v-show="dialogRadio == 1">
          <el-radio-group v-model="danxuanDaAn">
            <el-radio-button label="a">A</el-radio-button>
            <el-radio-button label="b">B</el-radio-button>
            <el-radio-button label="c">C</el-radio-button>
            <el-radio-button label="d">D</el-radio-button>
          </el-radio-group>
        </div>
        <div v-show="dialogRadio == 2">
          <el-checkbox-group v-model="duoxuanDaAn">
            <el-checkbox-button label="a">A</el-checkbox-button>
            <el-checkbox-button label="b">B</el-checkbox-button>
            <el-checkbox-button label="c">C</el-checkbox-button>
            <el-checkbox-button label="d">D</el-checkbox-button>
          </el-checkbox-group>
        </div>
        <div v-show="dialogRadio == 3">
          <el-radio-group v-model="panuanDaAn">
            <el-radio-button label="1">真</el-radio-button>
            <el-radio-button label="0">假</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getProblems, DelProblems, AddProblems, PutProblems } from "@/api/training";
export default {
  data() {
    return {
      timuID: "",
      loading: true,
      type: this.$route.query.type,
      id: this.$route.params.id,
      tableData: [],
      dialogVisible: false,
      dialogTitle: "新增试题",
      dialogRadio: '1',
      tiganText: "",
      form: {},
      A: "",
      B: "",
      C: "",
      D: "",
      danxuanDaAn: "",
      duoxuanDaAn: [],
      panuanDaAn: "",
      yes: "对",
      no: "错",
      page_size: 10,
      page: 1,
      total: 0,
      tableHeight: document.documentElement.clientHeight - 350,
      option: "",
    }
  },
  methods: {
    // 编辑
    hanldEdit(row) {
      this.timuID = row.id
      this.dialogVisible = true
      this.dialogTitle = '编辑试题'
      this.option = 'edit'
      console.log(row);
      this.tiganText = row.problem_title
      this.dialogRadio = row.problem_type
      if (this.dialogRadio == 3) {
        this.yes = row.option_list[0]
        this.no = row.option_list[1]
        this.panuanDaAn = row.answer
      }
      if (this.dialogRadio == 2) {
        this.A = row.option_list[0]
        this.B = row.option_list[1]
        this.C = row.option_list[2]
        this.D = row.option_list[3]
        this.duoxuanDaAn = row.answer
      }
      if (this.dialogRadio == 1) {
        this.A = row.option_list[0]
        this.B = row.option_list[1]
        this.C = row.option_list[2]
        this.D = row.option_list[3]
        this.danxuanDaAn = row.answer
      }
    },
    //新增
    hanldAdd() {
      this.dialogVisible = true
      this.dialogTitle = '新增试题'
      this.option = 'add'
    },
    hanldChang(value) {
      console.log(value);

    },
    // 获取列表数据
    getProblems() {
      this.loading = true
      getProblems(this.id, { page_size: this.page_size, page: this.page }).then(res => {
        console.log(res);
        if (res.code == 0) {
          this.tableData = res.data.list
          this.total = res.data.count
          this.loading = false
        }
      })
    },
    handleSizeChange(v) {
      console.log('每页显示xxx条 触发');
      this.loading = true
      this.page_size = v
      getProblems(this.id, { page_size: this.page_size, page: this.page }).then(res => {
        this.tableData = res.data.list
        this.total = res.data.count
        this.loading = false
      })
    },
    handleCurrentChange(v) {
      console.log('切换页码触发');
      this.loading = true
      this.page = v

      getProblems(this.id, { page_size: this.page_size, page: this.page }).then(res => {
        this.tableData = res.data.list
        this.total = res.data.count
        this.loading = false
      })
    },
    // 删除
    hanldDel(row) {
      this.$confirm('删除？是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DelProblems(row.id).then(res => {
          if (res.code == 0) {
            this.$message.error('删除成功')
            this.getProblems()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    //确定
    sure() {
      if (this.tiganText == '') this.$message.error('题干不能为空')
      else if (this.dialogRadio != 3 && this.A == '') this.$message.error('答案A不能为空')
      else if (this.dialogRadio != 3 && this.B == '') this.$message.error('答案B不能为空')
      else if (this.dialogRadio != 3 && this.C == '') this.$message.error('答案C不能为空')
      else if (this.dialogRadio != 3 && this.D == '') this.$message.error('答案D不能为空')
      else if (this.dialogRadio == 1 && this.danxuanDaAn == '') this.$message.error('正确答案不能为空')
      else if (this.dialogRadio == 2 && this.duoxuanDaAn == '') this.$message.error('正确答案不能为空')
      else if (this.dialogRadio == 3 && this.panuanDaAn == '') this.$message.error('正确答案不能为空')
      else {
        if (this.option == 'add') {
          let answer;
          if (this.dialogRadio == 1) {
            answer = this.danxuanDaAn
          } else if (this.dialogRadio == 2) {
            answer = this.duoxuanDaAn
          } else {
            answer = this.panuanDaAn
          }
          AddProblems(this.id, {
            problem_type: this.dialogRadio,
            problem_title: this.tiganText,
            option_list: this.dialogRadio == 3 ? [this.yes, this.no] : [this.A, this.B, this.C, this.D],
            answer: answer,
          }).then(res => {
            console.log(res);
            this.$message.success('新增成功')
            this.dialogVisible = false
            this.getProblems()
          })
        } else {
          let answer;
          if (this.dialogRadio == 1) {
            answer = this.danxuanDaAn
          } else if (this.dialogRadio == 2) {
            answer = this.duoxuanDaAn
          } else {
            answer = this.panuanDaAn
          }
          PutProblems(this.timuID, {
            problem_type: this.dialogRadio,
            problem_title: this.tiganText,
            option_list: this.dialogRadio == 3 ? [this.yes, this.no] : [this.A, this.B, this.C, this.D],
            answer: answer,
          }).then(res => {
            this.$message.success('编辑成功')
            this.dialogVisible = false
            this.getProblems()
          })
        }
      }
    },
    closeDialog() {
      this.tiganText = '',
        this.A = "",
        this.B = "",
        this.C = "",
        this.D = "",
        this.danxuanDaAn = "",
        this.duoxuanDaAn = [],
        this.panuanDaAn = "",
        this.yes = "对",
        this.no = "错"
      this.dialogVisible = false
    }
  },
  mounted() {
    this.getProblems();
  },
}
</script>

<style lang="scss" scoped>
.main {
  margin: 10px;
  .type {
    color: #31708f;
    background-color: #d9edf7;
    border-color: #bce8f1;
    padding: 15px;
    border: 1px solid transparent;
    border-radius: 4px;
    box-sizing: border-box;
    margin-bottom: 10px;
    h2 {
      margin: 0;
      margin-left: 10px;
      font-weight: 300;
      font-size: 24px;
    }
  }
  .tigan {
    margin-top: 20px;
    h1 {
      font-size: 16px;
      color: #333;
      margin-bottom: 10px;
      &::before {
        display: inline-block;
        content: "";
        width: 3px;
        height: 12px;
        background-color: #fe8130;
        margin-right: 5px;
      }
    }
    .top {
      margin-top: 15px;
      margin-bottom: 20px;
    }
  }
  ::v-deep .el-radio-button__orig-radio:disabled:checked + .el-radio-button__inner {
    background-color: #409eff;
    color: #fff;
  }
}
</style>