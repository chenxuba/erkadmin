<template>
  <div class="dashboard-container">
    <!-- 经营概况 -->
    <el-card>
      <h1>经营概况</h1>
      <ul>
        <li v-for="item in 8" :key="item">
          <p>
            <span>今日收入(元)</span>
            <span>
              <el-tooltip content="Top center" placement="top">
                <i class="el-icon-warning"></i>
              </el-tooltip>
            </span>
          </p>
          <div class="num">9</div>
        </li>
      </ul>
    </el-card>
    <!-- 常用模块 -->
    <el-card style="margin-top:20px;">
      <h1>常用模块</h1>
      <div class="ul">
        <el-button icon="el-icon-menu" size="small">类别管理</el-button>
        <el-button icon="el-icon-menu" size="small">类别管理</el-button>
        <el-button icon="el-icon-menu" size="small">类别管理</el-button>
        <el-button icon="el-icon-menu" size="small">类别管理</el-button>
        <el-button icon="el-icon-menu" size="small">类别管理</el-button>
        <el-button icon="el-icon-menu" size="small">类别管理</el-button>
        <el-button icon="el-icon-menu" size="small">类别管理</el-button>
        <el-button icon="el-icon-menu" size="small">类别管理</el-button>
      </div>
      <div class="ul two">
        <el-button icon="el-icon-menu" size="small">类别管理</el-button>
        <el-button icon="el-icon-menu" size="small">类别管理</el-button>
        <el-button icon="el-icon-menu" size="small">类别管理</el-button>
      </div>
    </el-card>
    <!-- 知识产品 -->
    <el-card style="margin-top:20px;">
      <h1>知识产品</h1>
      <div class="ul">
        <el-button icon="el-icon-menu" size="small">类别管理</el-button>
        <el-button icon="el-icon-menu" size="small">类别管理</el-button>
        <el-button icon="el-icon-menu" size="small">类别管理</el-button>
        <el-button icon="el-icon-menu" size="small">类别管理</el-button>
        <el-button icon="el-icon-menu" size="small">类别管理</el-button>
        <el-button icon="el-icon-menu" size="small">类别管理</el-button>
        <el-button icon="el-icon-menu" size="small">类别管理</el-button>
        <el-button icon="el-icon-menu" size="small">类别管理</el-button>
      </div>
    </el-card>
    <!-- 营销管理 -->
    <el-card style="margin-top:20px;">
      <h1>营销管理</h1>
      <div class="ul">
        <el-button icon="el-icon-menu" size="small">类别管理</el-button>
        <el-button icon="el-icon-menu" size="small">类别管理</el-button>
        <el-button icon="el-icon-menu" size="small">类别管理</el-button>
        <el-button icon="el-icon-menu" size="small">类别管理</el-button>
        <el-button icon="el-icon-menu" size="small">类别管理</el-button>
        <el-button icon="el-icon-menu" size="small">类别管理</el-button>
        <el-button icon="el-icon-menu" size="small">类别管理</el-button>
        <el-button icon="el-icon-menu" size="small">类别管理</el-button>
      </div>
      <div class="ul two">
        <el-button icon="el-icon-menu" size="small">类别管理</el-button>
        <el-button icon="el-icon-menu" size="small">类别管理</el-button>
        <el-button icon="el-icon-menu" size="small">类别管理</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {

    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 10px;
    h1 {
      font-size: 16px;
      margin: 0;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
      font-weight: 600;
    }
    ul {
      padding: 15px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 200px;
        height: 70px;
        border: 1px solid #ddd;
        border-radius: 5px;
        flex: 0 0 17.5%;
        margin-right: 2.5%;
        margin-bottom: 20px;
        padding: 10px 15px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #7e848b;
          font-weight: 500;
          i {
            cursor: pointer;
          }
        }
        .num {
          color: #2593fc;
          font-size: 20px;
          font-weight: 500;
        }
      }
    }
    .ul {
      padding: 15px;
      .el-button {
        margin-bottom: 20px;
      }
    }
    .two {
      padding-top: 0;
      margin-top: -10px;
    }
  }
}
</style>
