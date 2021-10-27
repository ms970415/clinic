<template>
  <div>

    <!-- 1.定义面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>门诊日志</el-breadcrumb-item>
      <el-breadcrumb-item>日志信息</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 2.定义卡片视图 -->
    <el-card class="box-card">
      <el-form label-width="100px" class="demo-ruleForm">
        <br />
        <br />
         <table>
           <tr>
             <th>&nbsp;请输入查询开始日期</th>
                  <!-- 3.定义搜索框 -->
             <td><el-input v-model="queryInfo.query1" clearable type="date" @clear="getPatientList" >
                  <el-button slot="append" icon="el-icon-search" @click="getPatientList"></el-button></el-input></el-col></td>
             <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请输入查询截止日期</th>
                  <!-- 3.定义搜索框 -->
             <td><el-input v-model="queryInfo.query2" clearable type="date" @clear="getPatientList">
                  <el-button slot="append" icon="el-icon-search" @click="getPatientList"></el-button></el-input></el-col></td>
           </tr>
        </table>
       <br />
       <br />
       <!-- 药品数据表格展现  border 边框线属性  -->
       <el-table :data="statistics" border stripe>
           <el-table-column prop="profit" label="盈利"></el-table-column>
           <el-table-column prop="expenditure" label="支出"></el-table-column>
           <el-table-column prop="totals" label="总收入"></el-table-column>
           <el-table-column prop="chineses" label="中成药收入"></el-table-column>
           <el-table-column prop="western" label="西药收入"></el-table-column>
           <el-table-column prop="injection" label="注射剂收入"></el-table-column>
           <el-table-column prop="apply" label="贴敷收入"></el-table-column>
           <el-table-column prop="technology" label="技术收入"></el-table-column>
       </el-table>
       <br />
       <br />
       <br />
       <br />

       <table>
         <tr>
            <th>&nbsp;&nbsp;门诊数量是:</th><td></td> <h1 v-text="numb"></h1>
         </tr>
       </table>

        <br />
        <br />
        </el-form>
    </el-card>

  </div>
</template>

<script>

  export default {
    data(){
      return {
        queryInfo: {
          query1: '',
          query2: ''
        },
        statistics: [],
        numb: ''
      }
    },
    methods: {
      async getPatientList(){
        const {data: result} = await this.$http.get('/treatment/getStatistics',{
           params: this.queryInfo
        })
        if(result.status !== 200) return this.$message.error("库存表查询失败")
        this.statistics = result.data.rows
        this.numb = result.data.numb
      }
    },
    //利用钩子函数实现数据查询
    mounted(){
      this.getPatientList()
    }
  }
</script>


<style lang="less" scoped>
  .demo-ruleForm {
      width: 100%;
      background-color: #EEEEEE;
  }
  .table {
    width: 100%;
  }
  .th {
    margin-left: 20px;
  }
  .el-input {
    margin-left: 20px;
    margin-right: 20px;
  }
</style>
