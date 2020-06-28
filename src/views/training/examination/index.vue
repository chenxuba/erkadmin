<template>
  <div class="main">
    <el-card>
      <el-row>
        <el-col>
          <el-cascader style="width: 60%;" filterable size="small" v-model="value" placeholder="请选择课件进行筛选" clearable :props='props' :options="options" @change="handleChange"></el-cascader>
          <el-button type="primary" size="mini" style="width:100px;">搜 索</el-button>
          <el-button type="warning" size="mini" style="width:100px;">重 置</el-button>
          <el-button type="success" size="mini" style="width:100px;" @click="addexamination">创建试卷</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top:20px;">
        <el-col>
          <el-table :data="tableData" size='small' style="width: 100%" >
            <el-table-column type="index" label="#" />
            <el-table-column prop="name" label="试卷名称" show-overflow-tooltip />
            <el-table-column prop="from" label="试卷归属" show-overflow-tooltip />
            <el-table-column prop="totalItem" label="总题目数" width="100" align="center"/>
            <el-table-column prop="totalscore" label="总分数"  width="100" align="center" />
            <el-table-column prop="testscore" label="合格分数"   width="100" align="center"/>
            <el-table-column prop="status" label="是否上架"  width="100" align="center">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.status"  active-value="1" inactive-value="0">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column  label="操作" width="280" align="center">
              <template slot-scope="scope">
                <el-button size="small" type="primary" @click="hanlEdit(scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="hanlDelete(scope.row)">删除</el-button>
                <el-button size="small" type="success" @click="hanlAdd(scope.row)">添加试题</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      tableData: [
        {
          "id": "1",
          "name": "第一讲 言语-语言 康复训练概述----华雯	",
          "from": "第一讲 言语-语言 康复训练概述",
          "totalItem": "20",
          "totalscore": "100",
          "testscore": "80",
          "status": "1",
        }
      ],
      props: {
        value: "id",
      },
      options: [
        {
          "id": "1",
          "label": "康复训练师",
          "children": [{
            "id": "2",
            "label": "言语-语言职业认证课程",
            "children": [{
              "id": "3",
              "label": "初级认证",
              "children": [{
                "id": "4",
                "label": "基础课程",
                "children": [{
                  "id": "9",
                  "label": "第一讲 言语-语言 康复训练概述"
                },
                {
                  "id": "10",
                  "label": "第二讲 呼吸系统概述及训练方法"
                }
                ]
              },
              {
                "id": "5",
                "label": "拓展课程",
                "children": [{
                  "id": "11",
                  "label": "婴幼儿认知功能发育"
                },
                {
                  "id": "12",
                  "label": "脑性瘫痪儿童的言语训练"
                }
                ]
              }
              ]
            },
            {
              "id": "6",
              "label": "中级认证",
              "children": [{
                "id": "7",
                "label": "基础课程",
                "children": [{
                  "id": "13",
                  "label": "儿童语言发育迟缓概述和评估"
                },
                {
                  "id": "14",
                  "label": "儿童康复概论"
                }
                ]
              },
              {
                "id": "8",
                "label": "拓展课程",
                "children": [{
                  "id": "15",
                  "label": "面对儿童语言康复及言语康复的 脑瘫儿童"
                },
                {
                  "id": "16",
                  "label": "认知能力与语言技巧(一)"
                }
                ]
              }
              ]
            }
            ]
          }]
        }
      ]
    }
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    // 编辑
    hanlEdit(row) { },
    // 删除
    hanlDelete(row) { },
    // 添加试题
    hanlAdd(row) { 
      this.$router.push({
        path:"/training/questions/"+row.id,
        query:{
          type:row.name
        }
      })
    },
    // 创建试卷
    addexamination(){
      this.$router.push('/training/addexamination')
    }
  },
}
</script>

<style lang="scss" scoped>
.main {
  margin: 10px;
}
</style>