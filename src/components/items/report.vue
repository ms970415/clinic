<template>
  <div>

    <!-- 1.定义面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>药房管理</el-breadcrumb-item>
      <el-breadcrumb-item>库存提醒</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 2.定义卡片视图 -->
    <el-card class="box-card">

       <el-table :data="nbs" border stripe>
           <el-table-column prop="inventory" label="当前报警库存数量" ></el-table-column>
<!--           <el-table-column prop="days" label="当前报警剩余天数"></el-table-column> -->
           <el-table-column label="操作">
             <template slot-scope="scope">
                <el-button type="success" @click="updateNumbersBtn(scope.row)">修改</el-button>
             </template>

           </el-table-column>
       </el-table>
       <!-- 药品数据表格展现  border 边框线属性  -->
       <el-table :data="drugsLists" border stripe>
           <el-table-column type="index" label="序号"></el-table-column>
           <el-table-column prop="drugsname" label="药品"></el-table-column>
           <el-table-column prop="category" label="品类"></el-table-column>
           <el-table-column prop="company" label="医药公司"></el-table-column>
           <el-table-column prop="purchaseprice" label="进货价"></el-table-column>
           <el-table-column prop="manufacture" label="生产日期"></el-table-column>
           <el-table-column prop="overdue" label="有效期"></el-table-column>
           <el-table-column prop="quantity" label="库存"></el-table-column>
<!--           <el-table-column prop="surplus" label="剩余天数"></el-table-column> -->

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

        <!-- 定义修改页面 当对话框关闭时,将表格数据重置-->
        <el-dialog title="修改药房报警信息" :visible.sync="updateDialogVisible" width="50%" @close="closeUpdateDialog">
          <!-- 定义用户提交表单数据-->
          <el-form :model="updateNumbersModel" ref="updateNumbersRef" label-width="100px">
            <el-form-item label="设置报警数量" prop="inventory">
              <el-input v-model="updateNumbersModel.inventory"  onkeyup="value=value.replace(/[^\d]/g,'').replace(/^0{1,}/g,'')"></el-input>
            </el-form-item>
<!--            <el-form-item label="设置剩余天数" prop="days">
              <el-input v-model="updateNumbersModel.days"  onkeyup="value=value.replace(/[^\d]/g,'').replace(/^0{1,}/g,'')"></el-input>
            </el-form-item> -->
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="updateNumbers">确 定</el-button>
            <el-button @click="updateDialogVisible = false" >取 消</el-button>
          </span>
        </el-dialog>

    </el-card>
  </div>
</template>

<script>

  export default {
    data(){
      return {
         //查询报警数据封装在集合内
        nbs: [],
        queryInfo: {
          inventory: '',
          //days: '',
          pageNum: 1,
          pageSize: 5
        },
        updateDialogVisible: false,
        drugsLists: [],
        //记录总数是数值类型
        total: 0,
        //定义修改药品数据封装
        updateNumbersModel: {
        }
      }
    },
    methods: {
      async getNumbers(){
        const {data: result} = await this.$http.get('/numbers/getNumbers')
        if(result.status !== 200) return this.$message.error("数据设置查询失败")
        this.nbs = result.data
        localStorage.setItem("inventory",result.data[0].inventory)
        //localStorage.setItem("days",result.data[0].days)
        this.getDrugsLists()
      },
      async getDrugsLists(){
        this.queryInfo.inventory = localStorage.getItem("inventory")
        //this.queryInfo.days = localStorage.getItem("days")
        const {data: result} = await this.$http.get('/drugs/getDrugsAlertLists',{
           params: this.queryInfo
        })
        if(result.status !== 200) return this.$message.error("库存表查询失败")
        this.drugsLists = result.data.rows
        this.total = result.data.total
        console.log("总记录数:"+this.total)
      },
      handleSizeChange(pageSize){
        //console.log("每页展现的条数"+pageSize)
        this.queryInfo.pageSize = pageSize
        this.getNumbers()
        this.getDrugsLists()
      },
      handleCurrentChange(pageNum){
        //console.log("页数:"+pageNum)
        this.queryInfo.pageNum = pageNum
        this.getNumbers()
        this.getDrugsLists()
      },
      async updateNumbersBtn(numbers){
        this.updateDialogVisible = true
        const {data: result} = await this.$http.get("/numbers/"+numbers.id)
        if(result.status !== 200) return this.$message.error("设置更改失败")
        this.updateNumbersModel = result.data
      },
      closeUpdateDialog(){
        //重置表格数据
        this.$refs.updateNumbersRef.resetFields()
      },
      async updateNumbers(){
           //根据接口文档要求封装数据
           let numbers = {}
           numbers.id = this.updateNumbersModel.id
           numbers.inventory = this.updateNumbersModel.inventory
           //numbers.days = this.updateNumbersModel.days
           const {data: result} = await this.$http.put(`/numbers/updateNumber`,numbers)
           if(result.status !== 200) return this.$message.error("数据修改失败")
           this.$message.success("数据更新成功")
           this.updateDialogVisible = false
           this.getNumbers()
           this.getDrugsLists()

        }
    },
    //利用钩子函数实现数据查询
    mounted(){
      this.getNumbers()
      this.getDrugsLists()
    }
  }
</script>


<style lang="less" scoped>
  .setNum {
    font-size: 20px;
  }
</style>
