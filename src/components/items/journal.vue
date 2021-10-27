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

       <!-- 3.定义栅格的一行 :gutter="20"定义行间距   :span="9" 占位符  -->
       <el-row :gutter="20">
         <el-col :span="8">
            <!-- 3.定义搜索框 -->
            <el-input placeholder="请输入患者名字" v-model="queryInfo.query1" clearable  @clear="getPatientList">
                <el-button slot="append" icon="el-icon-search" @click="getPatientList"></el-button>
            </el-input>
         </el-col>
         <el-col :span="8">
            <!-- 3.定义搜索框 -->
            <el-input placeholder="请输入诊断信息" v-model="queryInfo.query2" clearable  @clear="getPatientList">
                <el-button slot="append" icon="el-icon-search" @click="getPatientList"></el-button>
            </el-input>
         </el-col>

       </el-row>

       <!-- 药品数据表格展现  border 边框线属性  -->
       <el-table :data="patientList" border stripe>
           <el-table-column type="index" label="序号"></el-table-column>
           <el-table-column prop="patientname" label="姓名"></el-table-column>
           <el-table-column prop="gender" label="性别"></el-table-column>
           <el-table-column prop="age" label="年龄"></el-table-column>
           <el-table-column prop="diagnosis" label="诊断"></el-table-column>
           <el-table-column prop="treatment" label="治疗信息"></el-table-column>
           <el-table-column prop="cost" label="费用"></el-table-column>
           <el-table-column prop="created" label="就诊日期"></el-table-column>
       </el-table>

       <!-- 定义分页组件 关于分页插件的属性说明
            1.@size-change 如果分页中每页实现的条数发生变化 则会触发这个该事件
            2.@current-change 当页数发生改变时,触发该函数
            3.current-page 当前选中的页
            4.page-sizes   页面数据展现的选项
            5.page-size    默认选中的页数
            6.layout    分页中展现的数据种类
            7.total     记录总数
       -->
        <el-pagination
             @size-change="handleSizeChange"
             @current-change="handleCurrentChange"
             :current-page="queryInfo.pageNum"
             :page-sizes="[5, 10, 20, 40]"
             :page-size="queryInfo.pageSize"
             layout="total, sizes, prev, pager, next, jumper"
             :total="total">
        </el-pagination>
    </el-card>

  </div>
</template>

<script>

  export default {
    data(){
      return {
        queryInfo: {
          query1: '',
          query2: '',
          pageNum: 1,
          pageSize: 5
        },
        patientList: [],
        //记录总数是数值类型
        total: 0,
      }
    },
    methods: {
      async getPatientList(){
        const {data: result} = await this.$http.get('/patient/getPatientlist',{
           params: this.queryInfo
        })
        if(result.status !== 200) return this.$message.error("库存表查询失败")
        this.patientList = result.data.rows
        console.log(this.patientList)
        this.total = result.data.total
        console.log("总记录数:"+this.total)
      },
      handleSizeChange(pageSize){
        //console.log("每页展现的条数"+pageSize)
        this.queryInfo.pageSize = pageSize
        this.getPatientList()
      },
      handleCurrentChange(pageNum){
        //console.log("页数:"+pageNum)
        this.queryInfo.pageNum = pageNum
        this.getPatientList()
      }
    },
    //利用钩子函数实现数据查询
    mounted(){
      this.getPatientList()
    }
  }
</script>


<style lang="less" scoped>

</style>
