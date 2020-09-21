<template>
  <div class="main">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <!--工具栏-->
      <div class="head-container">
        <el-cascader filterable v-model="courseTypeArr" style="margin:0 10px;width:350px" placeholder="请选择课程类别" clearable :props='props'
                     :options="courseType" @change="handleChangeCourseType"></el-cascader>
        <el-button type="primary" style="width:100px;" size="mini" @click="hanldSearch">筛 选</el-button>
        <el-button type="warning" style="width:100px;" size="mini" @click="reset">重 置</el-button>
      </div>
      <!--表格渲染-->
      <el-card style="margin-top:10px;">
        <el-table ref="table" v-loading="loading" :data="tableData" style="width: 100%;" :max-height="tableHeight">
          <el-table-column type="index" width="55" label="编号" align="center" />
          <el-table-column :show-overflow-tooltip="true" prop="real_name" label="真实姓名" width="80" align="center" />
          <el-table-column :show-overflow-tooltip="true" prop="thumb" label="照片" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.thumb" alt="" width="60" height="80">
            </template>
          </el-table-column>
          <el-table-column prop="id_card_number" label="身份证号" align="center" />
          <el-table-column :show-overflow-tooltip="true" prop="phone" label="联系方式" align="center" />
          <el-table-column :show-overflow-tooltip="true" prop="address" label="邮寄地址" align="center" />
          <el-table-column :show-overflow-tooltip="true" prop="type_name" label="课程类别" align="center" />
          <el-table-column :show-overflow-tooltip="true" prop="course_type" label="初/中/高" align="center" />
          <el-table-column :show-overflow-tooltip="true" prop="is_vip" label="用户身份" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.is_vip == 0" type="success" effect="dark">普通会员</el-tag>
              <el-tag v-if="scope.row.is_vip == 1" type="warning" effect="dark">VIP会员</el-tag>
              <el-tag v-if="scope.row.is_vip == 2" type="danger" effect="dark">SVIP会员</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="申请时间" align="center" />
          <el-table-column prop="ems" label="快递单号" align="center">
            <template slot-scope="scope">
              <el-button type="primary" v-if="scope.row.courier_number == ''" :disabled="scope.row.status == 1 ? false:true"
                         @click="entryEms(scope.row)">录入单号</el-button>
              <span v-else>{{scope.row.courier_number}}</span>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="status" label="审核状态" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status == -1" type="info" effect="dark">审核失败</el-tag>
              <el-tag v-if="scope.row.status == 1" type="danger" effect="dark">审核成功</el-tag>
              <template v-if="scope.row.status == 0">
                <el-button @click="handleAdopt(scope.row)" type="success" size="mini">通过</el-button>
                <div class="line" style="margin:5px 0;"></div>
                <el-button type="danger" size="mini" @click="reject(scope.row)">驳回</el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <div class="fenye" style="margin-top:20px;">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]"
                         :page-size="10" layout="total, prev, pager, next,sizes" :total="total">
          </el-pagination>
        </div>
      </el-card>
    </el-col>
    <!-- 驳回理由dialog -->
    <el-dialog title="请填写驳回理由" :visible.sync="dialogVisible" width="30%">
      <el-input type="textarea" :rows="4" placeholder="请填写驳回理由" v-model="rejectMsg">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 填写单号dialog -->
    <el-dialog title="请填写快递单号" :visible.sync="dialogVisible2" width="30%">
      <el-input type="text" :rows="4" placeholder="请填写快递单号" v-model="number">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureNumber">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCertificate_order, getcourseType, putCertificate_order, submitNumber } from "@/api/training";
export default {
  data() {
    return {
      id: "",//要驳回的id
      rejectMsg: "",//驳回理由
      number: "",//快递单号
      dialogVisible: false,
      dialogVisible2: false,
      loading: false,
      tableData: [],
      tableHeight: document.documentElement.clientHeight - 250,
      page_size: 10,
      page: 1,
      total: 0,
      courseType: [],//课件分类数组
      courseTypeArr: [],
      courseType_id: "",//最后一级的分类id
      props: {
        value: "id",
        label: 'type_name'
      },
    }
  },
  methods: {
    handleSizeChange(v) {
      console.log('每页显示xxx条 触发');
      this.loading = true
      this.page_size = v
      if (this.courseType_id) {
        getCertificate_order({ page_size: this.page_size, page: this.page, type_id: this.courseType_id }).then(res => {
          this.tableData = res.data.list
          this.total = res.data.count
          this.loading = false
        })
      } else {
        getCertificate_order({ page_size: this.page_size, page: this.page }).then(res => {
          this.tableData = res.data.list
          this.total = res.data.count
          this.loading = false
        })
      }
    },
    handleCurrentChange(v) {
      console.log('切换页码触发');
      this.loading = true
      this.page = v
      if (this.courseType_id) {
        getCertificate_order({ page_size: this.page_size, page: this.page, type_id: this.courseType_id }).then(res => {
          this.tableData = res.data.list
          this.total = res.data.count
          this.loading = false
        })
      } else {
        getCertificate_order({ page_size: this.page_size, page: this.page }).then(res => {
          this.tableData = res.data.list
          this.total = res.data.count
          this.loading = false
        })
      }
    },
    //录入单号
    entryEms(row) {
      this.dialogVisible2 = true
      this.id = row.id
    },
    // 获取列表
    getCertificate_order() {
      this.loading = true
      getCertificate_order({ page_size: this.page_size, page: this.page }).then(res => {
        if (res.code == 0) {
          this.tableData = res.data.list
          this.loading = false
          this.total = res.data.count
        }
      })
    },
    handleChangeCourseType(value) {
      console.log(value);
      this.courseType_id = value[2]
    },
    // 筛选
    hanldSearch() {
      if (this.courseTypeArr == '') {
        this.$message.error('请选择类别后筛选')
        return false
      }
      this.loading = true
      getCertificate_order({ page_size: this.page_size, page: this.page, type_id: this.courseType_id }).then(res => {
        this.tableData = res.data.list
        this.total = res.data.count
        this.loading = false
      })
    },
    //重置
    reset() {
      this.getCertificate_order()
      this.courseTypeArr = []
    },
    // 获取课件类别
    getcourseType() {
      getcourseType().then(res => {
        let obj = {}
        res.data.list.map(item => {
          obj.id = item.id
          obj.type_name = item.type_name
          obj.children = []
          if (item.children) {
            item.children.map(item => {
              let obj2 = {}
              obj2.id = item.id
              obj2.type_name = item.type_name
              obj2.children = []
              obj.children.push(obj2)
              if (item.children) {
                item.children.map(item => {
                  let obj3 = {}
                  obj3.id = item.id
                  obj3.type_name = item.type_name
                  obj2.children.push(obj3)
                })
              }
            })
          }
        })
        this.courseType.push(obj)
      })
    },
    // 通过
    handleAdopt(row) {
      this.$confirm('通过？是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        putCertificate_order(row.id, 1).then(res => {
          console.log(res);
          if (res.code == 0) {
            this.$message.success('审核通过')
            this.getCertificate_order()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    // 驳回
    reject(row) {
      this.dialogVisible = true
      this.id = row.id
    },
    sure() {
      if (this.rejectMsg == '') {
        this.$message.error('请填写驳回理由')
        return false
      }
      putCertificate_order(this.id, 0, { note: this.rejectMsg }).then(res => {
        if (res.code == 0) {
          this.$message.error('已驳回')
          this.getCertificate_order()
          this.dialogVisible = false
          this.rejectMsg = ''
        }
      })
    },
    sureNumber() {
      submitNumber({ courier_number: this.number }, this.id).then(res => {
        if (res.code == 0) {
          this.$message.success('录入单号成功！')
          this.dialogVisible2 = false
          this.getCertificate_order()
        }
      })
    }
  },
  mounted() {
    this.getCertificate_order();
    this.getcourseType()
  },
}
</script>

<style lang="scss" scoped>
.main {
  margin: 10px 15px;
  img {
    object-fit: cover;
    border-radius: 4px;
  }
}
</style>