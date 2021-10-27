<template>
    <!-- 定义后台欢迎页面 -->
    <div>
      <tr><td></td>
          <td><el-button type="primary" @click="addPatientBtn">治疗方案</el-button></td>
          <td><el-button type="warning" @click="resetPatient">信息重置</el-button></td>
      </tr>
      <el-table :data="treatmentDrugsList" border stripe>
                 <el-table-column prop="drugsname" label="药品名称" ></el-table-column>
                 <el-table-column prop="boxes" label="数量/盒" ></el-table-column>
                 <el-table-column prop="cost" label="费用" ></el-table-column>
                 <el-table-column label="操作">
                   <template slot-scope="scope">
                      <el-button type="primary" icon="el-icon-edit" size="small" @click="updateTreatmentBtn(scope.row)"></el-button>
                      <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteTreatmentBtn(scope.row)"></el-button>
                   </template>

                 </el-table-column>
             </el-table>

             <!-- 定义修改页面 当对话框关闭时,将表格数据重置-->
             <el-dialog title="治疗方案信息" :visible.sync="addDialogVisible" width="100%" @close="closeAddDialog">
               <!-- 定义用户提交表单数据-->
               <el-form :model="treatment" :rules="rules" ref="addTreatmentRef" label-width="100px">
                 <table>
                   <tr>
                     <td><el-autocomplete  v-model="treatment.drugsname" :fetch-suggestions="querySearchAsync" placeholder="请输入药品名称" >
                         <i slot="suffix" class="el-input__icon el-icon-close" @click="treatment.drugsname=''"></i></el-autocomplete></td>
                     <td><el-form-item label="盒数" prop="boxes">
                         <el-input v-model="treatment.boxes" type="text"></el-input></el-form-item></td>
                     <td><el-form-item label="费用" prop="cost">
                         <el-input v-model="treatment.cost" type="text"></el-input></el-form-item></td>
                     <td><el-form-item label="品类" prop="category">
                         <el-input v-model="treatment.category" type="text"></el-input></el-form-item></td>
                   </tr>
                   <tr>
                     <td><el-autocomplete  v-model="treatment1.drugsname" :fetch-suggestions="querySearchAsync1" placeholder="请输入药品名称" >
                         <i slot="suffix" class="el-input__icon el-icon-close" @click="treatment1.drugsname=''"></i></el-autocomplete></td>
                     <td><el-form-item label="盒数" prop="boxes">
                         <el-input v-model="treatment1.boxes" type="text"></el-input></el-form-item></td>
                     <td><el-form-item label="费用" prop="cost">
                         <el-input v-model="treatment1.cost" type="text"></el-input></el-form-item></td>
                     <td><el-form-item label="品类" prop="category">
                         <el-input v-model="treatment1.category" type="text"></el-input></el-form-item></td>
                   </tr>
                   <tr>
                     <td><el-autocomplete  v-model="treatment2.drugsname" :fetch-suggestions="querySearchAsync2" placeholder="请输入药品名称" >
                         <i slot="suffix" class="el-input__icon el-icon-close" @click="treatment2.drugsname=''"></i></el-autocomplete></td>
                     <td><el-form-item label="盒数" prop="boxes">
                         <el-input v-model="treatment2.boxes" type="text"></el-input></el-form-item></td>
                     <td><el-form-item label="费用" prop="cost">
                         <el-input v-model="treatment2.cost" type="text"></el-input></el-form-item></td>
                     <td><el-form-item label="品类" prop="category">
                         <el-input v-model="treatment2.category" type="text"></el-input></el-form-item></td>
                   </tr>
                   <tr>
                     <td ><el-select v-model="treatment3.drugsname" slot="prepend" placeholder="请选择使用的技术">
                         <el-option label="针灸" value="针灸"></el-option>
                         <el-option label="包扎" value="包扎"></el-option>
                         <el-option label="正骨" value="正骨"></el-option>
                         <el-option label="艾灸" value="艾灸"></el-option></el-select></td>
                     <td><el-form-item label="次数" prop="boxes">
                         <el-input v-model="treatment3.boxes" type="text"></el-input></el-form-item></td>
                     <td><el-form-item label="费用" prop="cost">
                         <el-input v-model="treatment3.cost" type="text"></el-input></el-form-item></td>
                     <td><el-form-item label="品类" prop="category">
                         <el-input v-model="treatment3.category" disabled type="text"></el-input></el-form-item></td>
                   </tr>
                 </table>
               </el-form>

               <span slot="footer" class="dialog-footer">
                 <el-button type="primary" @click="addTreatment">确 定</el-button>
                 <el-button @click="addDialogVisible = false" >取 消</el-button>
               </span>
             </el-dialog>
             
             <!-- 定义修改页面 当对话框关闭时,将表格数据重置-->
             <el-dialog title="治疗方案信息" :visible.sync="addDialogVisible" width="100%" @close="closeAddDialog">
               <!-- 定义用户提交表单数据-->
               <el-form :model="treatment" :rules="rules" ref="addTreatmentRef" label-width="100px">
                 <table>
                   <tr>
                     <td><el-autocomplete  v-model="treatment.drugsname" :fetch-suggestions="querySearchAsync" placeholder="请输入药品名称" >
                         <i slot="suffix" class="el-input__icon el-icon-close" @click="treatment.drugsname=''"></i></el-autocomplete></td>
                     <td><el-form-item label="盒数" prop="boxes">
                         <el-input v-model="treatment.boxes" type="text"></el-input></el-form-item></td>
                     <td><el-form-item label="费用" prop="cost">
                         <el-input v-model="treatment.cost" type="text"></el-input></el-form-item></td>
                     <td><el-form-item label="品类" prop="category">
                         <el-input v-model="treatment.category" type="text"></el-input></el-form-item></td>
                   </tr>
                   <tr>
                     <td><el-autocomplete  v-model="treatment1.drugsname" :fetch-suggestions="querySearchAsync1" placeholder="请输入药品名称" >
                         <i slot="suffix" class="el-input__icon el-icon-close" @click="treatment1.drugsname=''"></i></el-autocomplete></td>
                     <td><el-form-item label="盒数" prop="boxes">
                         <el-input v-model="treatment1.boxes" type="text"></el-input></el-form-item></td>
                     <td><el-form-item label="费用" prop="cost">
                         <el-input v-model="treatment1.cost" type="text"></el-input></el-form-item></td>
                     <td><el-form-item label="品类" prop="category">
                         <el-input v-model="treatment1.category" type="text"></el-input></el-form-item></td>
                   </tr>
                   <tr>
                     <td><el-autocomplete  v-model="treatment2.drugsname" :fetch-suggestions="querySearchAsync2" placeholder="请输入药品名称" >
                         <i slot="suffix" class="el-input__icon el-icon-close" @click="treatment2.drugsname=''"></i></el-autocomplete></td>
                     <td><el-form-item label="盒数" prop="boxes">
                         <el-input v-model="treatment2.boxes" type="text"></el-input></el-form-item></td>
                     <td><el-form-item label="费用" prop="cost">
                         <el-input v-model="treatment2.cost" type="text"></el-input></el-form-item></td>
                     <td><el-form-item label="品类" prop="category">
                         <el-input v-model="treatment2.category" type="text"></el-input></el-form-item></td>
                   </tr>
                   <tr>
                     <td ><el-select v-model="treatment3.drugsname" slot="prepend" placeholder="请选择使用的技术">
                         <el-option label="针灸" value="针灸"></el-option>
                         <el-option label="包扎" value="包扎"></el-option>
                         <el-option label="正骨" value="正骨"></el-option>
                         <el-option label="艾灸" value="艾灸"></el-option></el-select></td>
                     <td><el-form-item label="次数" prop="boxes">
                         <el-input v-model="treatment3.boxes" type="text"></el-input></el-form-item></td>
                     <td><el-form-item label="费用" prop="cost">
                         <el-input v-model="treatment3.cost" type="text"></el-input></el-form-item></td>
                     <td><el-form-item label="品类" prop="category">
                         <el-input v-model="treatment3.category" disabled type="text"></el-input></el-form-item></td>
                   </tr>
                 </table>
               </el-form>
             
               <span slot="footer" class="dialog-footer">
                 <el-button type="primary" @click="addTreatment">确 定</el-button>
                 <el-button @click="addDialogVisible = false" >取 消</el-button>
               </span>
             </el-dialog>
      <!-- 定义修改页面 当对话框关闭时,将表格数据重置-->
              <el-dialog title="修改治疗方案信息" :visible.sync="updateDialogVisible" width="50%" @close="closeUpdateDialog">
                <!-- 定义用户提交表单数据-->
                <el-form :model="updateTreatmentModel" ref="updateTreatmentRef" label-width="100px">
                  <el-form-item label="药品名称" prop="drugsname">
                    <el-input v-model="updateTreatmentModel.drugsname"  type="text"></el-input>
                  </el-form-item>
                  <el-form-item label="数量" prop="boxes">
                    <el-input v-model="updateTreatmentModel.boxes"  type="number"></el-input>
                  </el-form-item>
                  <el-form-item label="费用" prop="cost">
                    <el-input v-model="updateTreatmentModel.cost"  type="text"></el-input>
                  </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="updateTreatment">确 定</el-button>
                  <el-button @click="updateDialogVisible = false" >取 消</el-button>
                </span>
              </el-dialog>
    </div>
</template>

<script>
  data : {
    treatmentDrugsList: [],
    patientOne: {},
    addDialogVisible: false,
    updateDialogVisible: false,
    updateTreatmentModel: {},
  }
  async addPatientBtn(){
    this.$refs.addPatientRef.validate(async valid => {
      //如果校验失败 则停止数据
      if(!valid) return alert("请先完善患者信息")
    localStorage.setItem("patientname",this.patientModel.patientname)
    localStorage.setItem("phone",this.patientModel.phone)
    localStorage.setItem("diagnosis",this.patientModel.diagnosis)
    this.addDialogVisible = true
    const {data: result} = await this.$http.post("/patient/addPatient",this.patientModel)
    if(result.status !== 200) return this.$message.error("系统问题请联系厂家")
    })
  },
  closeAddDialog(){
    //重置表格数据
    this.$refs.addTreatmentRef.resetFields()
  },
  async getPatient(){
    let patientname = localStorage.getItem("patientname")
    let phone = localStorage.getItem("phone")
    let diagnosis = localStorage.getItem("diagnosis")
    //console.log(patientname)
    //console.log(phone)
    //console.log(diagnosis)
    const {data: result} = await this.$http.get(`/patient/getPatient/${patientname}/${phone}/${diagnosis}`)
    if(result.status !== 200) return
    this.patientModel = result.data
    return this.patientModel
  },
  addTreatment(){
    this.$refs.addTreatmentRef.validate(async valid => {
      //如果校验失败 则停止数据
      if(!valid) return
      this.patientOne = await this.getPatient()
       let treatment = {}
       treatment.patientid = this.patientOne.patientid
       treatment.diagnosistimes = this.patientOne.diagnosistimes
       treatment.drugsname = this.treatment.drugsname
       treatment.boxes = this.treatment.boxes
       treatment.cost = this.treatment.cost
       treatment.category = this.treatment.category

       let treatment1 = {}
       treatment1.patientid = this.patientOne.patientid
       treatment1.diagnosistimes = this.patientOne.diagnosistimes
       treatment1.drugsname = this.treatment1.drugsname
       treatment1.boxes = this.treatment1.boxes
       treatment1.cost = this.treatment1.cost
       treatment1.category = this.treatment1.category

       let treatment2 = {}
       treatment2.patientid = this.patientOne.patientid
       treatment2.diagnosistimes = this.patientOne.diagnosistimes
       treatment2.drugsname = this.treatment2.drugsname
       treatment2.boxes = this.treatment2.boxes
       treatment2.cost = this.treatment2.cost
       treatment2.category = this.treatment2.category

       let treatment3 = {}
       treatment3.patientid = this.patientOne.patientid
       treatment3.diagnosistimes = this.patientOne.diagnosistimes
       treatment3.drugsname = this.treatment3.drugsname
       treatment3.boxes = this.treatment3.boxes
       treatment3.cost = this.treatment3.cost
       treatment3.category = this.treatment3.category

       let treatmentList = []
       treatmentList.push(treatment)
       treatmentList.push(treatment1)
       treatmentList.push(treatment2)
       treatmentList.push(treatment3)

       const {data: result} = await this.$http.post(`/treatment/addTreatment`,treatmentList)
       if(result.status !== 200) return this.$message.error("系统问题请联系厂家")
       this.addDialogVisible = false

       let treatment4 = {}
       treatment4.patientid = this.patientOne.patientid
       treatment4.diagnosistimes = this.patientOne.diagnosistimes
       const {data: result1} = await this.$http.get(`/treatment/getTreatmentList`,treatment4)
       if(result.status !== 200) return this.$message.error("系统问题请联系厂家")
       this.treatmentDrugsList = result1.data
       //this.getTreatmentList(treatment4)
    })
  },
  // async getTreatmentList(treatment4){
  //   //debugger
  //   let treatment = {}
  //   treatment = treatment4
  //   console.log(treatment)
  //   const {data: result} = await this.$http.get('/treatment/getTreatmentList',treatment)
  //   if(result.status !== 200) return this.$message.error("系统问题请联系厂家")
  //   this.treatmentDrugsList = result.data
  // },
  async updateTreatmentBtn(treatment){
    this.updateDialogVisible = true
    const {data: result} = await this.$http.get("/treatment/"+treatment.id)
    if(result.status !== 200) return this.$message.error("设置更改失败")
    this.updateTreatmentModel = result.data
  },
  closeUpdateDialog(){
    //重置表格数据
    this.$refs.updateTreatmentRef.resetFields()
  },
  async updateTreatment(){
       //根据接口文档要求封装数据
       let treatment = {}
       treatment.id = this.updateTreatmentModel.id
       treatment.inventory = this.updateTreatmentModel.inventory
       const {data: result} = await this.$http.put(`/treatment/updateTreatment`,treatment)
       if(result.status !== 200) return this.$message.error("修改失败")
       this.updateDialogVisible = false
  },
  resetPatient(){
    //重置表格数据
    this.$refs.addPatientRef.resetFields()
  },
  async deleteTreatmentBtn(treatment){
     //1.消息确认框
     const result =  await this.$confirm('此操作将删除 '+treatment.drugsname+', 是否继续?', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
             }).catch(error => error)

     //如果确认  confirm  如果取消 cancel
     if(result !== 'confirm'){
        return this.$message.info("删除取消")
     }
     const {data: result2} = await this.$http.delete(`/treatment/${treatment.id}`)
     if(result2.status !== 200) return this.$message.error("删除失败")
     this.$message.success("删除成功")
     //重新加载 数据
     this.getDrugsList()
  },
</script>

<style>
</style>
