<template>
  <div class="main">
    <el-card>
      <el-row>
        <el-col>
          <el-cascader style="width: 60%;margin-right:10px;" filterable v-model="value" placeholder="请选择课件进行筛选" clearable :props='props' :options="options" @change="handleChange"></el-cascader>
          <el-button type="primary" style="width:100px;">搜 索</el-button>
          <el-button type="warning" style="width:100px;">重 置</el-button>
          <el-button type="success" style="width:100px;" @click="addexamination">创建试卷</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top:20px;">
        <el-col>
          <el-table :data="tableData" style="width: 100%" v-loading='loading'  :height="clientHeight">
            <el-table-column prop="id" label="ID" width="55"/>
            <el-table-column prop="title" label="试卷名称" show-overflow-tooltip align="center">
              <template slot-scope="scope">
                <el-tag>{{scope.row.title}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="courseware_name" label="所属课件" show-overflow-tooltip   align="center"/>
            <el-table-column prop="total_num" label="总题目数" width="70" align="center" />
            <el-table-column prop="total_score" label="总分数" width="70" align="center" />
            <el-table-column prop="pass_number" label="合格分数" width="70" align="center">
              <template slot-scope="scope">
                <el-tag size="small" type="danger">{{scope.row.pass_number}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="是否上架" width="100" align="center">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.disabled" active-value="1" inactive-value="0">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="280" align="center">
              <template slot-scope="scope">
                <el-button type="primary" @click="hanlEdit(scope.row)">编辑</el-button>
                <el-button type="danger" @click="hanlDelete(scope.row)">删除</el-button>
                <el-button type="success" @click="hanlAdd(scope.row)">添加试题</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>
    <!--分页-->
    <div class="fenye" style="margin-top:6px;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="page_size" layout="total, prev, pager, next,sizes" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getExamination } from "@/api/training";
export default {
  data() {
    return {
      loading: false,
      value: "",
      tableData: [],
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
      ],
      page_size: 10,
      page: 1,
      total:0,
      clientHeight: document.body.clientHeight - 260
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
        path: "/training/questions/" + row.id,
        query: {
          type: row.name
        }
      })
    },
    // 创建试卷
    addexamination() {
      this.$router.push('/training/addexamination')
    },
    // 获取列表
    getExamination() {
      this.loading = true
      getExamination({ page_size: this.page_size, page: this.page }).then(res => {
        this.loading = false
        this.tableData = res.data.list
        this.total = res.data.count
      })
    },
    handleSizeChange(v) {
      this.loading = true
      this.page_size = v
      getExamination({ page: this.page, page_size: this.page_size }).then(res => {
        this.tableData = res.data.list
        this.total = res.data.count
        this.loading = false
      }).catch(err => {
        console.log(err);
      })
    },
    //切换页码
    handleCurrentChange(v) {
      this.loading = true
      this.page = v
      getExamination({ page: this.page, page_size: this.page_size }).then(res => {
        this.tableData = res.data.list
        this.total = res.data.count
        this.loading = false
      }).catch(err => {
        console.log(err);
      })
    },
  },
  mounted() {
    this.getExamination();
  },
}
</script>

<style lang="scss" scoped>
.main {
  margin: 10px;
}
</style>