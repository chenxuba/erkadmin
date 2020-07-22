<template>
  <div class="main">
    <!-- 操作提示 -->
    <el-collapse @change="handleChange">
      <el-collapse-item title="操作提示" name="1">
        <li>菜单导航图标:图标建议大小60*60</li>
        <li>底部导航图标:图标建议大小54*54</li>
        <li>除顶部导航外其他导航标题建议长度不超过4个;底部导航不超过2个</li>
      </el-collapse-item>
    </el-collapse>
    <!-- data -->
    <el-card style="margin-top:15px">
      <el-row>
        <el-col>
          <el-button type="success" plain @click="addTopNav">添加顶部导航</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%;margin-top:10px">
        <el-table-column prop="id" label="ID" width="55" />
        <el-table-column prop="iconTitle" label="图标名称" align="center" />
        <el-table-column prop="img" label="缩略图" align="center">
          <template slot-scope="scope">
            <img v-if="scope.row.img != ''" :src="scope.row.img" alt="" class="img">
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="link" label="跳转链接" width="180" align="center" />
        <el-table-column prop="sort" label="排序" align="center" width="60" />
        <el-table-column prop="linkType" label="链接类型" align="center">
          <template slot-scope="scope">
            <el-tag>{{scope.row.linkType}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="location" label="导航位置" align="center">
          <template slot-scope="scope">
            <el-tag type="danger">{{scope.row.location}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="状态" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.type" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="创建时间" align="center" width="140" />
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="warning" size="mini">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加导航 -->
    <el-drawer :title="title" :visible.sync="drawer" direction="rtl" :before-close="handleClose">
      <el-form ref="form" :model="form" label-position="left" label-width="100px" style="padding:0 15px;">
        <el-form-item label="图标名称:">
          <el-input v-model="form.iconTitle" placeholder="请输入导航菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="选择图片" v-if="option == 'edit'">
          <uploadIcon></uploadIcon>
        </el-form-item>
        <el-form-item label="底部选中图片" v-if="option == 'edit'">
          <uploadIcon></uploadIcon>
        </el-form-item>
        <el-form-item label="跳转链接:">
          <el-input v-model="form.link1" placeholder="请输入跳转链接，H5、小程序端使用"></el-input>
        </el-form-item>
        <el-form-item label="APP跳转链接:">
          <el-input v-model="form.link2" placeholder="APP端导航链接"></el-input>
        </el-form-item>
        <el-form-item label="链接:">
          <el-radio-group v-model="form.type">
            <el-radio label="1">内链</el-radio>
            <el-radio label="2">外链</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序:">
          <el-input-number type="textarea" v-model="form.sort"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即添加</el-button>
          <el-button @click="drawer = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      title: '',
      option:'',
      form: {
        iconTitle: "",
        link: "",
        link2: "",
        linkType: "1",
        sort: "",
      },
      tableData: [
        { id: '1', iconTitle: '机构列表', 
        img: '', link: 'http://school.ybc365.com/', sort: '2', 
        linkType: '2', location: '顶部导航', type: '1', time: '2019-12-13 17:23:14' },
        { id: '2', iconTitle: '直播大厅', img: 'http://erkong.ybc365.com/7e231202003142159468613.png', link: '/house', sort: '2', linkType: '1', location: '菜单导航', type: '1', time: '2019-12-14 17:23:14' },
      ]
    }
  },
  methods: {
    handleChange() {
      
    },
    // 编辑
    handleEdit(row) {
      console.log(row);
      
      this.option = 'edit'
      this.drawer = true
      this.title = '编辑导航'
      this.form.iconTitle = row.iconTitle
      this.form.link1 = row.link
      this.form.link2 = ''
      this.form.type = row.linkType
      this.form.sort = row.sort
    },
    // 添加
    addTopNav() {
      this.drawer = true
      this.option = 'add'
      this.title = '添加导航'
      this.form = {}
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    onSubmit() {
      console.log('submit!');
    }
  },
  components: {
    uploadIcon: resolve => {
      require(['@/components/Common/uploadIcon.vue'], resolve)
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  margin: 10px;
  .img {
    width: 45px;
    height: 45px;
  }
  /deep/ .el-drawer__header {
    span {
      outline: none;
    }
  }
}
</style>