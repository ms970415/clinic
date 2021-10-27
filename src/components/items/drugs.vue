<template>
  <div>

    <!-- 1.定义面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>药房管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加药品</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 2.定义卡片视图 -->
    <el-card class="box-card" label-width="100%">
          <!-- 定义用户提交表单数据-->

          <el-form :model="addDrugsModel"  :rules="rules" ref="addDrugsRef" label-width="100px" class="demo-ruleForm">
            <table>
              <tr>
                <td><el-form-item label="药品名称" prop="drugsname">
              <el-input v-model="addDrugsModel.drugsname" type="text"></el-input>
            </el-form-item></td>
                <td><el-form-item label="医药公司" prop="company">
              <el-input v-model="addDrugsModel.company" type="text"></el-input>
            </el-form-item></td>
              </tr>
              <tr>
                <td><el-form-item label="品类" prop="category">
              <el-input v-model="addDrugsModel.category" type="text"></el-input>
            </el-form-item></td>
                <td><el-form-item label="规格" prop="specifications">
               <el-input v-model="addDrugsModel.specifications" type="text"></el-input>
            </el-form-item></td>
              </tr>
              <tr>
                <td><el-form-item label="用法" prop="frequency">
               <el-input v-model="addDrugsModel.frequency" type="text"></el-input>
              </el-form-item></td>
                 <td><el-form-item label="用量" prop="consumption">
               <el-input v-model="addDrugsModel.consumption" type="text"></el-input>
             </el-form-item></td>
              </tr>
              <tr>
                 <td><el-form-item label="零售价" prop="unitprice">
                <el-input v-model="addDrugsModel.unitprice"  onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1').replace(/^0{1,}/g,'')"></el-input>
             </el-form-item></td>
                 <td><el-form-item label="进货价" prop="purchaseprice">
                <el-input v-model="addDrugsModel.purchaseprice"  onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1').replace(/^0{1,}/g,'')"></el-input>
             </el-form-item></td>
              </tr>
              <tr>
                 <td><el-form-item label="库存数量" prop="quantity">
                 <el-input v-model="addDrugsModel.quantity"  onkeyup="value=value.replace(/[^\d]/g,'').replace(/^0{1,}/g,'')"></el-input>
              </el-form-item></td>
                  <td><el-form-item label="默认使用数" prop="boxes" >
                 <el-input v-model="addDrugsModel.boxes"  onkeyup="value=value.replace(/[^\d]/g,'').replace(/^0{1,}/g,'')"></el-input>
              </el-form-item></td>
               </tr>
               <tr>
                  <td><el-form-item label="生产日期" prop="manufacture">
                  <el-input v-model="addDrugsModel.manufacture" type="date"></el-input>
               </el-form-item></td>
                   <td><el-form-item label="有效期" prop="overdue">
                  <el-input v-model="addDrugsModel.overdue" type="date"></el-input>
               </el-form-item></td>
                </tr>
            </table>
          </el-form>
          <span>
            <el-button type="primary" @click="addDrugsBtn">确 定</el-button>&nbsp;
            <el-button type="warning" @click="resetDrugs">重置</el-button>
          </span>
    </el-card>
  </div>
</template>

<script>

  export default {
    data(){
      return {
        addDrugsModel: {
          drugsname:  '',
          company: '',
          category: '',
          specifications: '',
          frequency: '',
          consumption: '',
          unitprice: '',
          purchaseprice: '',
          quantity: '',
          boxes: '',
          manufacture: '',
          overdue: '',
        },
        //数据校验规则
        rules: {
       drugsname: [{ required: true, message: '请输入药品名称', trigger: 'blur' }],
         company: [{ required: true, message: '请输入医药公司名称', trigger: 'blur' }],
        category: [{ required: true, message: '请输入药品类别:西药/中成药/等', trigger: 'blur' }],
  specifications: [{ required: true, message: '请输入药品规格', trigger: 'blur' }],
       frequency: [{ required: true, message: '请输入用法:口服/一日几次', trigger: 'blur' }],
     consumption: [{ required: true, message: '请输入用量', trigger: 'blur' }],
       unitprice: [{ required: true, message: '请输入零售价格', trigger: 'blur' }],
   purchaseprice: [{ required: true, message: '请输入进货价格', trigger: 'blur' }],
        quantity: [{ required: true, message: '请输入库存数量', trigger: 'blur' }],
           boxes: [{ required: true, message: '请输入请输入默认使用量', trigger: 'blur' }],
     manufacture: [{ required: true, message: '请输入生产日期', trigger: 'blur' }],
         overdue: [{ required: true, message: '请输入产品有效期', trigger: 'blur' }],
        }
      }
    },
    methods: {
      resetDrugs(){
        //重置表格数据
        this.$refs.addDrugsRef.resetFields()
      },
      //校验用户数据
      addDrugsBtn(){
        this.$refs.addDrugsRef.validate(async valid => {
          //如果校验失败 则停止数据
          if(!valid) return
          //console.log(this.addDrugsModel)
          const {data: result} = await this.$http.post('/drugs/addDrugs',this.addDrugsModel)
          if(result.status !== 200) return this.$message.error("药品入库失败")
          this.$message.success("药品入库成功")
          //重置表格数据
          this.$refs.addDrugsRef.resetFields()
        })
      }
    },
    mounted(){
    }
  }
</script>


<style lang="less" scoped>
  .box-card {
      span {
        margin-left: 40%;
      }
  }
  .el-input {
    width: 350px;
    margin-left: 20px;
  }
  .demo-ruleForm {
      width: 100%;
       background-color: #EEEEEE;
  }
</style>
