<template>
  <div>

    <!-- 1.定义面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>药房管理</el-breadcrumb-item>
      <el-breadcrumb-item>库存列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 2.定义卡片视图 -->
    <el-card class="box-card">

       <!-- 3.定义栅格的一行 :gutter="20"定义行间距   :span="9" 占位符  -->
       <el-row :gutter="20">
         <el-col :span="8">
            <!-- 3.定义搜索框 -->
            <el-input placeholder="请输入药品名称" v-model="queryInfo.query1" clearable  @clear="getDrugsList">
                <el-button slot="append" icon="el-icon-search" @click="getDrugsList"></el-button>
            </el-input>
         </el-col>
         <el-col :span="8">
            <!-- 3.定义搜索框 -->
            <el-input placeholder="请输入医药公司" v-model="queryInfo.query2" clearable  @clear="getDrugsList">
                <el-button slot="append" icon="el-icon-search" @click="getDrugsList"></el-button>
            </el-input>
         </el-col>
         <el-col :span="8">
            <!-- 3.定义搜索框 -->
            <el-input placeholder="请输入类型:西药/中成药/注射剂等" v-model="queryInfo.query3" clearable  @clear="getDrugsList">
                <el-button slot="append" icon="el-icon-search" @click="getDrugsList"></el-button>
            </el-input>
         </el-col>

       </el-row>

       <!-- 药品数据表格展现  border 边框线属性  -->
       <el-table :data="drugsList" border stripe>
           <el-table-column type="index" label="序号"></el-table-column>
           <el-table-column prop="drugsname" label="药品"></el-table-column>
           <el-table-column prop="specifications" label="规格"></el-table-column>
           <el-table-column prop="category" label="品类"></el-table-column>
           <el-table-column prop="company" label="医药公司"></el-table-column>
           <el-table-column prop="unitprice" label="零售价"></el-table-column>
           <el-table-column prop="purchaseprice" label="进货价"></el-table-column>
           <el-table-column prop="quantity" label="库存"></el-table-column>
           <el-table-column label="操作">
             <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="small" @click="updateDrugsBtn(scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteDrugs(scope.row)"></el-button>
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
        <el-dialog title="修改药品信息" :visible.sync="updateDialogVisible" width="50%" @close="closeUpdateDialog">
          <!-- 定义药品提交表单数据-->
          <el-form :model="updateDrugsModel"  ref="updateDrugsRef" label-width="100px">
            <table>
              <tr>
                <td><el-form-item label="药品名称" prop="drugsname">
              <el-input v-model="updateDrugsModel.drugsname" type="text"></el-input>
            </el-form-item></td>
                <td><el-form-item label="医药公司" prop="company">
              <el-input v-model="updateDrugsModel.company" type="text"></el-input>
            </el-form-item></td>
              </tr>
              <tr>
                <td><el-form-item label="品类" prop="category">
              <el-input v-model="updateDrugsModel.category" type="text"></el-input>
            </el-form-item></td>
                <td><el-form-item label="规格" prop="specifications">
               <el-input v-model="updateDrugsModel.specifications" type="text"></el-input>
            </el-form-item></td>
              </tr>
              <tr>
                <td><el-form-item label="用法" prop="frequency">
               <el-input v-model="updateDrugsModel.frequency" type="text"></el-input>
              </el-form-item></td>
                 <td><el-form-item label="用量" prop="consumption">
               <el-input v-model="updateDrugsModel.consumption" type="text"></el-input>
             </el-form-item></td>
              </tr>
              <tr>
                 <td><el-form-item label="零售价" prop="unitprice">
                <el-input v-model="updateDrugsModel.unitprice" type="text" onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1').replace(/^0{1,}/g,'')"></el-input>
             </el-form-item></td>
                 <td><el-form-item label="进货价" prop="purchaseprice">
                <el-input v-model="updateDrugsModel.purchaseprice" type="text" onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1').replace(/^0{1,}/g,'')"></el-input>
             </el-form-item></td>
              </tr>
              <tr>
                 <td><el-form-item label="库存数量" prop="quantity">
                 <el-input v-model="updateDrugsModel.quantity" type="text" onkeyup="value=value.replace(/[^\d]/g,'').replace(/^0{1,}/g,'')"></el-input>
              </el-form-item></td>
                  <td><el-form-item label="默认使用数" prop="boxes" >
                 <el-input v-model="updateDrugsModel.boxes" type="text" onkeyup="value=value.replace(/[^\d]/g,'').replace(/^0{1,}/g,'')"></el-input>
              </el-form-item></td>
               </tr>
               <tr>
                  <td><el-form-item label="生产日期" prop="manufacture">
                  <el-input v-model="updateDrugsModel.manufacture" ></el-input>
               </el-form-item></td>
                   <td><el-form-item label="有效期" prop="overdue">
                  <el-input v-model="updateDrugsModel.overdue" ></el-input>
               </el-form-item></td>
                </tr>
            </table>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="updateDrugs">确 定</el-button>
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
          query3: '',
          pageNum: 1,
          pageSize: 5
        },
        drugsList: [],
        //记录总数是数值类型
        total: 0,
        updateDialogVisible: false,
        //定义修改药品数据封装
        updateDrugsModel: {
        }
      }
    },
    methods: {
      async getDrugsList(){
        const {data: result} = await this.$http.get('/drugs/getDrugslist',{
           params: this.queryInfo
        })
        if(result.status !== 200) return this.$message.error("库存表查询失败")
        this.drugsList = result.data.rows
        this.total = result.data.total
        console.log("总记录数:"+this.total)
      },
      handleSizeChange(pageSize){
        //console.log("每页展现的条数"+pageSize)
        this.queryInfo.pageSize = pageSize
        this.getDrugsList()
      },
      handleCurrentChange(pageNum){
        //console.log("页数:"+pageNum)
        this.queryInfo.pageNum = pageNum
        this.getDrugsList()
      },
      async updateDrugsBtn(drugs){
        this.updateDialogVisible = true
        const {data: result} = await this.$http.get("/drugs/"+drugs.id)
        if(result.status !== 200) return this.$message.error("药品查询失败")
        this.updateDrugsModel = result.data
      },
      closeUpdateDialog(){
        //重置表格数据
        this.$refs.updateDrugsRef.resetFields()
      },
      updateDrugs(){
        //1.预校验数据
        this.$refs.updateDrugsRef.validate(async valid => {
           if(!valid)  return this.$message.error("表单验证没有通过")
           //根据接口文档要求封装数据
           let drugs = {}
           drugs.id = this.updateDrugsModel.id
           drugs.drugsname = this.updateDrugsModel.drugsname
           drugs.company = this.updateDrugsModel.company
           drugs.category = this.updateDrugsModel.category
           drugs.specifications = this.updateDrugsModel.specifications
           drugs.frequency = this.updateDrugsModel.frequency
           drugs.consumption = this.updateDrugsModel.consumption
           drugs.unitprice = this.updateDrugsModel.unitprice
           drugs.purchaseprice = this.updateDrugsModel.purchaseprice
           drugs.quantity = this.updateDrugsModel.quantity
           drugs.boxes = this.updateDrugsModel.boxes
           drugs.manufacture = this.updateDrugsModel.manufacture
           drugs.overdue = this.updateDrugsModel.overdue
           const {data: result} = await this.$http.put(`/drugs/updateDrugs`,drugs)
           if(result.status !== 200) return this.$message.error("药品信息修改失败")
           this.$message.success("药品信息更新成功")
           this.updateDialogVisible = false
           this.getDrugsList()
        })
      },
      async deleteDrugs(drugs){
         //1.消息确认框
         const result =  await this.$confirm('此操作将永久删除 '+drugs.drugsname+', 是否继续?', '提示', {
                   confirmButtonText: '确定',
                   cancelButtonText: '取消',
                   type: 'warning'
                 }).catch(error => error)

         //如果确认  confirm  如果取消 cancel
         if(result !== 'confirm'){
            return this.$message.info("删除取消")
         }
         const {data: result2} = await this.$http.delete(`/drugs/${drugs.id}`)
         if(result2.status !== 200) return this.$message.error("删除失败")
         this.$message.success("删除成功")
         //重新加载 数据
         this.getDrugsList()
      }
    },
    //利用钩子函数实现数据查询
    mounted(){
      this.getDrugsList()
    }
  }
</script>


<style lang="less" scoped>

</style>
