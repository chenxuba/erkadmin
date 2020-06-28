<template>
  <div class="main">
    <div class="type">
      <h2>所属试卷：{{type}}</h2>
    </div>
    <el-card>
      <el-button type="warning" size="mini" @click="hanldAdd">新增试题</el-button>
      <el-divider></el-divider>
      <el-table :data="tableData" style="width: 100%" size='mini'>
        <el-table-column prop="id" label="ID" width="55" />
        <el-table-column prop="problem_title" label="题目" width="400" align="center" :show-overflow-tooltip="true" />
        <el-table-column prop="problem_type" label="题目类型" />
        <el-table-column prop="create_time" label="创建时间" />
        <el-table-column prop="create_user" label="创建人" />
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="hanldEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- dialog -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="70%">
      <div style="margin-top: -25px">
        <el-radio-group v-model="dialogRadio" size="mini" @change='hanldChang'>
          <el-radio-button label="1">单选题</el-radio-button>
          <el-radio-button label="2">多选题</el-radio-button>
          <el-radio-button label="3">判断题</el-radio-button>
        </el-radio-group>
      </div>
      <!-- 试题题干 -->
      <div class="tigan">
        <h1>试题题干</h1>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" style="width:80%;" v-model="tiganText">
        </el-input>
        <!-- 答案选项 -->
        <h1 class="top">答案选项</h1>
        <el-form ref="form" :model="form" v-show="dialogRadio != 3">
          <el-form-item label="(A)">
            <el-input v-model="A" placeholder="请输入选项内容" style="width:77%;"></el-input>
          </el-form-item>
          <el-form-item label="(B)">
            <el-input v-model="B" placeholder="请输入选项内容" style="width:77%;"></el-input>
          </el-form-item>
          <el-form-item label="(C)">
            <el-input v-model="C" placeholder="请输入选项内容" style="width:77%;"></el-input>
          </el-form-item>
          <el-form-item label="(D)">
            <el-input v-model="D" placeholder="请输入选项内容" style="width:77%;"></el-input>
          </el-form-item>
        </el-form>
        <el-form ref="form" :model="form" v-show="dialogRadio == 3">
          <el-form-item label="真项">
            <el-input v-model="yes" placeholder="请输入选项内容" style="width:77%;"></el-input>
          </el-form-item>
          <el-form-item label="假项">
            <el-input v-model="no" placeholder="请输入选项内容" style="width:77%;"></el-input>
          </el-form-item>
        </el-form>
        <!-- 正确答案 -->
        <h1>正确答案</h1>
        <div v-show="dialogRadio == 1">
          <el-radio-group v-model="danxuanDaAn" size="mini">
            <el-radio-button label="A"></el-radio-button>
            <el-radio-button label="B"></el-radio-button>
            <el-radio-button label="C"></el-radio-button>
            <el-radio-button label="D"></el-radio-button>
          </el-radio-group>
        </div>
        <div v-show="dialogRadio == 2">
          <el-checkbox-group v-model="duoxuanDaAn" size="mini">
            <el-checkbox-button label="A"></el-checkbox-button>
            <el-checkbox-button label="B"></el-checkbox-button>
            <el-checkbox-button label="C"></el-checkbox-button>
            <el-checkbox-button label="D"></el-checkbox-button>
          </el-checkbox-group>
        </div>
        <div v-show="dialogRadio == 3">
          <el-radio-group v-model="panuanDaAn" size="mini">
            <el-radio-button label="1">真</el-radio-button>
            <el-radio-button label="2">假</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: this.$route.query.type,
      tableData: [
        {
          "id": 1,
          "problem_title": "言语产生的五大功能模块分别为（ ）、发声、共鸣、（ ）和 （ ）。",
          "problem_type": "单选题",
          "create_time": "2020-03-14 21:42:35",
          "create_user": "admin"
        }
      ],
      dialogVisible: false,
      dialogTitle: "新增试题",
      dialogRadio: '1',
      tiganText: "",
      form: "",
      A: "",
      B: "",
      C: "",
      D: "",
      danxuanDaAn: "",
      duoxuanDaAn: [],
      panuanDaAn: "",
      yes:"对",
      no:"错"
    }
  },
  methods: {
    // 编辑
    hanldEdit() {
      this.dialogVisible = true
      this.dialogTitle = '编辑试题'
    },
    //新增
    hanldAdd() {
      this.dialogVisible = true
      this.dialogTitle = '新增试题'
    },
    hanldChang(value) {
      console.log(value);

    }
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
}
</style>