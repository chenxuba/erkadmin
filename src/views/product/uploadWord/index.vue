<template>
  <div class="main" style="margin:10px;">
    <el-button type="primary" @click="handleAdd" style="margin:0 0 10px 0;">新增图文</el-button>
    <el-card>
      <div class="type">
        <h2>{{course_name}}</h2>
      </div>
    </el-card>
    <el-card style="margin:10px 0 10px 0;padding-bottom:20px;">
      <el-table :data="tableData" style="width: 100%" v-loading='loading'>
        <el-table-column prop="id" label="上传编号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="title" label="文章名称" align="center" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="thumb" label="封面图" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.thumb" alt="" width="100" height="50">
          </template>
        </el-table-column>
        <el-table-column prop="click_num" label="点击量" align="center">
        </el-table-column>
        <el-table-column prop="sort" label="排序" align="center">
        </el-table-column>
        <el-table-column prop="create_time" label="上传时间" align="center">
        </el-table-column>
        <el-table-column prop="create_time" label="预览" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="preview(scope.row)">预览</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="delWord(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <pagination :page="page" :total="total" :page_size="page_size" :background="true" @handleCurrentChange="handleCurrentChange"
                  @handleSizeChange="handleSizeChange" />
      <!-- 预览 -->
      <el-dialog title="预览" :visible.sync="dialogPreview" width="30%">
        <p v-html="content" class="previewWord"></p>
      </el-dialog>
      <!-- videodialog -->
      <el-dialog :title="dialogWord.title" :visible.sync="dialogWord.show" width="40%" destroy-on-close>
        <el-form ref="form" :model="formData" :rules="rules" label-width="80px">
          <!-- 文章标题 -->
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="formData.title" style="width:90%;" placeholder="请输入文章标题"></el-input>
          </el-form-item>
          <!-- 封面图 -->
          <uploadImage @uploadSuccessImg='uploadSuccessImg' accept='image/*' ref="thumb" checking='thumb' name='上传封面'></uploadImage>
          <el-form-item v-if="dialogWord.option == 'edit' && showPreview">
            <img :src="formData.thumb" alt="" width="120" height="60">
          </el-form-item>
          <!-- 富文本 -->
          <el-form-item label="撰写文章" prop="content" ref="content">
            <vue-ueditor-wrap v-model="formData.content" :config="myConfig"></vue-ueditor-wrap>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input v-model="formData.sort" style="width:90%;" placeholder="请排序"></el-input>
          </el-form-item>
        </el-form>
        <!-- <pre>
          {{formData}}
        </pre> -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogWord.show = false">取 消</el-button>
          <el-button type="primary" @click="submit('form')" v-if="dialogWord.option == 'add'">确 定</el-button>
          <el-button type="primary" @click="submitEdit('form')" v-if="dialogWord.option == 'edit'">修 改</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
import uploadImage from "@/components/Common/uploadImage";
import { getCourseDetail, getWordList, addWord, delWord, editWord } from "@/api/product/index";
import pagination from "@/components/Common/pagination"
export default {
  data() {
    return {
      showPreview: true,//封面图显示与否
      loading: false,
      dialogPreview: false,
      content: "",
      id: this.$route.params.id,
      course_name: "",//文章大标题
      tableData: [],
      page: 1,
      page_size: 5,
      total: 0,
      dialogWord: {
        show: false,
        title: ""
      },
      formData: {},
      rules: {
        title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
        thumb: [{ required: true, message: '请上传封面图', trigger: 'blur' }],
        sort: [{ required: true, message: '请排序', trigger: 'blur' }],
        content: [{ required: true, message: '请撰写文章', trigger: 'blur' }],
      },
      myConfig: {
        toolbars: [
          [
            'fullscreen',//全屏
            'source',//源码
            'undo', //撤销
            'redo', //前进
            'justifyleft', //居左对齐
            'justifycenter', //居中对齐
            'justifyright', //居右对齐

            'insertimage',
          ]
        ],
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 500,
        // 初始容器宽度
        initialFrameWidth: '90%',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: 'https://muyue.ybc365.com/newadmin/UEditor/php/controller.php',
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        // UEDITOR_HOME_URL: '/newadmin/UEditor/'
        UEDITOR_HOME_URL: process.env.NODE_ENV == 'development' ? '/UEditor/' : '/newadmin/UEditor/'
        // UEDITOR_HOME_URL: '/UEditor/'
      },//编辑器配置
    }
  },
  methods: {
    //获取课程名字
    getCourseDetail() {
      getCourseDetail(this.id).then(res => {
        this.course_name = res.data.course_name
      })
    },
    // 翻页，第几页
    handleCurrentChange(val) {
      this.page = val;
      this.getWordList()
    },
    //翻页，一页显示条数
    handleSizeChange(val) {
      this.page_size = val;
      this.page = 1;
      this.getWordList()
    },
    //获取文章列表
    getWordList() {
      this.loading = true
      getWordList(this.id, { page: this.page, page_size: this.page_size }).then(res => {
        this.tableData = res.data.list
        this.total = res.data.count
        this.loading = false
      })
    },
    //文章预览
    preview(row) {
      this.content = row.content
      this.dialogPreview = true
    },
    //新增文章
    handleAdd() {
      this.dialogWord = {
        show: true,
        title: "新增文章",
        option: "add"
      }
      this.formData = {
        course_id: this.id,
        title: "",
        thumb: "",
        sort: "",
        content: "",
      }
    },
    //提交新增
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addWord(this.formData, this.id).then(res => {
            this.$message.success('新增成功！')
            this.dialogWord.show = false
            this.getWordList()
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //提交编辑
    submitEdit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editWord(this.formData, this.formData.id).then(res => {
            this.$message.success('编辑成功！')
            this.dialogWord.show = false
            this.getWordList()
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //删除文章
    delWord(row) {
      this.$confirm('此操作将删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delWord(row.id).then(res => {
          this.$message.success('删除成功！')
          this.getWordList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //编辑文章
    handleEdit(row) {
      this.dialogWord = {
        show: true,
        title: "修改文章",
        option: "edit"
      }
      this.formData = {
        id: row.id,
        title: row.title,
        thumb: row.thumb,
        sort: row.sort,
        content: row.content,
      }
      this.showPreview = true
    },
    //图片上传完成回调函数
    uploadSuccessImg(url) {
      this.formData.thumb = url
      this.$refs.thumb.$refs.imgUrl.clearValidate() //上传成功后去除校验
      this.showPreview = false
    },
  },
  mounted() {
    this.getCourseDetail();
    this.getWordList()
  },
  components: {
    pagination,
    VueUeditorWrap,
    uploadImage
  },
  watch: {
    'formData.content'() {
      if (this.formData.content != '') {
        this.$refs.content.clearValidate()
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.type {
  color: #31708f;
  background-color: #d9edf7;
  border-color: #bce8f1;
  padding: 15px;
  border: 1px solid transparent;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 15px;
  h2 {
    margin: 0;
    margin-left: 10px;
    font-weight: 300;
    font-size: 24px;
  }
}
.previewWord {
  ::v-deep img {
    max-width: 100%;
  }
}
</style>