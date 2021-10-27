<template>
  <div>

    <!-- 1.定义面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>患者管理</el-breadcrumb-item>
      <el-breadcrumb-item>患者信息</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 2.定义卡片视图 -->
    <el-card class="box-card">

       <!-- 3.定义栅格的一行 :gutter="20"定义行间距   :span="9" 占位符  -->
       <el-row :gutter="20">
         <el-col :span="8">
            <!-- 3.定义搜索框 -->
            <el-input placeholder="请输入患者姓名" v-model="queryInfo.query1" clearable  @clear="getAllPatientList">
                <el-button slot="append" icon="el-icon-search" @click="getAllPatientList"></el-button>
            </el-input>
         </el-col>
         <el-col :span="8">
            <!-- 3.定义搜索框 -->
            <el-input placeholder="请输入患者电话" v-model="queryInfo.query2" clearable  @clear="getAllPatientList">
                <el-button slot="append" icon="el-icon-search" @click="getAllPatientList"></el-button>
            </el-input>
         </el-col>

       </el-row>

       <!-- 药品数据表格展现  border 边框线属性  -->
       <el-table :data="patientList" border stripe>
           <el-table-column type="index" label="序号"></el-table-column>
           <el-table-column prop="patientname" label="患者姓名"></el-table-column>
           <el-table-column prop="gender" label="性别"></el-table-column>
           <el-table-column prop="phone" label="电话"></el-table-column>
           <el-table-column prop="age" label="年龄"></el-table-column>
           <el-table-column prop="address" label="地址"></el-table-column>
           <el-table-column prop="history" label="既往史"></el-table-column>
           <el-table-column prop="allergy" label="过敏史"></el-table-column>
           <el-table-column label="操作">
             <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="small" @click="updatePatientBtn(scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="small" @click="deletePatient(scope.row)"></el-button>
             </template>
           </el-table-column>
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
        <!-- 定义修改页面 当对话框关闭时,将表格数据重置-->
        <el-dialog title="患者信息修改" :visible.sync="updateDialogVisible" width="50%" @close="closeUpdateDialog">
          <!-- 定义药品提交表单数据-->
          <el-form :model="updatePatientModel"  ref="updatePatientRef" label-width="100px">
            <table>
              <tr>
                <td><el-form-item label="姓名" prop="patientname">
              <el-input v-model="updatePatientModel.patientname" disabled type="text"></el-input>
            </el-form-item></td>
                <td><el-form-item label="性别" prop="gender">
              <el-input v-model="updatePatientModel.gender" type="text"></el-input>
            </el-form-item></td>
              </tr>
              <tr>
                <td><el-form-item label="电话" prop="phone">
              <el-input v-model="updatePatientModel.phone" disabled type="number"></el-input>
            </el-form-item></td>
                <td><el-form-item label="年龄" prop="age">
               <el-input v-model="updatePatientModel.age" type="number"></el-input>
            </el-form-item></td>
              </tr>
              <tr>
                <td><el-form-item label="地址" prop="address">
               <el-input v-model="updatePatientModel.address" type="text"></el-input>
              </el-form-item></td>
                 <td><el-form-item label="既往史" prop="history">
               <el-input v-model="updatePatientModel.history" type="text"></el-input>
             </el-form-item></td>
              </tr>
              <tr>
                 <td><el-form-item label="过敏史" prop="allergy">
                <el-input v-model="updatePatientModel.allergy" type="text" ></el-input>
             </el-form-item></td>

                </tr>
            </table>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="updatePatient">确 定</el-button>
            <el-button @click="updateDialogVisible = false" >取 消</el-button>
          </span>
        </el-dialog>

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
        updateDialogVisible: false,
        //定义修改药品数据封装
        updatePatientModel: {
        }
      }
    },
    methods: {
      async getAllPatientList(){
        const {data: result} = await this.$http.get('/patient/getAllPatientList',{
           params: this.queryInfo
        })
        if(result.status !== 200) return this.$message.error("患者列表查询失败")
        this.patientList = result.data.rows
        this.total = result.data.total
        console.log("总记录数:"+this.total)
      },
      handleSizeChange(pageSize){
        //console.log("每页展现的条数"+pageSize)
        this.queryInfo.pageSize = pageSize
        this.getAllPatientList()
      },
      handleCurrentChange(pageNum){
        //console.log("页数:"+pageNum)
        this.queryInfo.pageNum = pageNum
        this.getAllPatientList()
      },
      async updatePatientBtn(patient){
        this.updateDialogVisible = true
        const {data: result} = await this.$http.get("/patient/"+patient.phone)
        if(result.status !== 200) return this.$message.error("患者查询失败")
        this.updatePatientModel = result.data[0]
      },
      closeUpdateDialog(){
        //重置表格数据
        this.$refs.updatePatientRef.resetFields()
      },
      updatePatient(){
        //1.预校验数据
        this.$refs.updatePatientRef.validate(async valid => {
           if(!valid)  return this.$message.error("表单验证没有通过")
           //根据接口文档要求封装数据
           let patient = {}
           patient.patientname = this.updatePatientModel.patientname
           patient.gender = this.updatePatientModel.gender
           patient.phone = this.updatePatientModel.phone
           patient.age = this.updatePatientModel.age
           patient.address = this.updatePatientModel.address
           patient.history = this.updatePatientModel.history
           patient.allergy = this.updatePatientModel.allergy

           const {data: result} = await this.$http.put(`/patient/updatePatient`,patient)
           if(result.status !== 200) return this.$message.error("患者信息修改失败")
           this.$message.success("患者信息更新成功")
           this.updateDialogVisible = false
           this.getAllPatientList()
        })
      },
      async deletePatient(patient){
         //1.消息确认框
         const result =  await this.$confirm('此操作将永久删除 '+patient.patientname+', 是否继续?', '提示', {
                   confirmButtonText: '确定',
                   cancelButtonText: '取消',
                   type: 'warning'
                 }).catch(error => error)

         //如果确认  confirm  如果取消 cancel
         if(result !== 'confirm'){
            return this.$message.info("删除取消")
         }
         const {data: result2} = await this.$http.delete(`/patient/${patient.patientname}/${patient.phone}`)
         if(result2.status !== 200) return this.$message.error("删除失败")
         this.$message.success("删除成功")
         //重新加载 数据
         this.getAllPatientList()
      }
    },
    //利用钩子函数实现数据查询
    mounted(){
      this.getAllPatientList()
    }
  }
</script>


<style lang="less" scoped>

</style>
