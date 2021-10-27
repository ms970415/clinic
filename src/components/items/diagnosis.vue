<template>
  <div>

    <!-- 1.定义面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>日常事务</el-breadcrumb-item>
      <el-breadcrumb-item>患者诊疗</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 2.定义卡片视图 -->
    <el-card class="box-card" label-width="100%">
          <!-- 定义用户提交表单数据-->

          <el-form :model="patientModel"  :rules="rules" ref="addPatientRef" label-width="100px" class="demo-ruleForm">

            <table>
              <tr><th></th><th class="itemText">患者基本信息</th></tr>
              <tr>
                <td><el-form-item label="姓名" prop="patientname">
              <el-input v-model="patientModel.patientname" type="text"></el-input>
            </el-form-item></td>
                <td ><el-select v-model="patientModel.gender" slot="prepend" placeholder="选择性别">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option></el-select></td>
                <td><el-form-item label="电话" prop="phone">
              <el-input v-model="patientModel.phone" type="text"></el-input>
            </el-form-item></td>
              </tr>
              <tr>
                 <td><el-form-item label="年龄" prop="age">
                <el-input v-model="patientModel.age" type="number"></el-input>
              </el-form-item></td>
                 <td><el-form-item label="住址" prop="address">
                <el-input v-model="patientModel.address" type="text"></el-input>
              </el-form-item></td>
              <td><el-form-item label="诊次" prop="diagnosistimes">
                <el-input v-model="patientModel.diagnosistimes" type="number"></el-input>
              </el-form-item></td>
               </tr>
              <tr><th></th><th class="itemText">患者体征</th></tr>
                <tr>
                  <td><el-form-item label="身高/cm" prop="height">
                <el-input v-model="patientModel.height" type="text"></el-input>
              </el-form-item></td>
                  <td><el-form-item label="体重/kg" prop="weight">
                <el-input v-model="patientModel.weight" type="text"></el-input>
              </el-form-item></td>
                  <td><el-form-item label="血压" prop="pressure">
                <el-input v-model="patientModel.pressure" type="text"></el-input>
              </el-form-item></td>
                </tr>
               <tr>
                   <td><el-form-item label="血糖" prop="sugar">
                 <el-input v-model="patientModel.sugar" onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,1})?).*$/g, '$1').replace(/^0{1,}/g,'')"></el-input>
               </el-form-item></td>
                   <td><el-form-item label="既往史" prop="history">
                 <el-input v-model="patientModel.history" type="text"></el-input>
               </el-form-item></td>
                   <td><el-form-item label="过敏史" prop="allergy">
                 <el-input v-model="patientModel.allergy" type="text"></el-input>
               </el-form-item></td>
                 </tr>
                <tr><th></th><th class="itemText">患者病情</th></tr>
                  <tr>
                    <td><el-form-item label="主诉" prop="complaint">
                  <el-input v-model="patientModel.complaint" type="text"></el-input>
                </el-form-item></td>
                    <td><el-form-item label="症状" prop="symptom">
                  <el-input v-model="patientModel.symptom" type="text"></el-input>
                </el-form-item></td>
                    <td><el-form-item label="诊断" prop="diagnosis">
                  <el-input v-model="patientModel.diagnosis" type="text"></el-input>
                </el-form-item></td>
                  </tr>
                 <tr><td></td><th class="itemText">治疗方案</th></tr>
                 <tr>
                   <td><el-autocomplete  v-model="patientModel.drugsname" :fetch-suggestions="querySearchAsync" placeholder="请输入药品名称" >
                       <i slot="suffix" class="el-input__icon el-icon-close" @click="patientModel.drugsname=''"></i></el-autocomplete></td>
                   <td><el-form-item label="盒数" prop="boxes">
                       <el-input v-model="patientModel.boxes" type="text" onkeyup="value=value.replace(/[^\d]/g,'').replace(/^0{1,}/g,'')"></el-input></el-form-item></td>
                   <td><el-form-item label="费用" prop="cost">
                       <el-input v-model="patientModel.cost" type="text" onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1').replace(/^0{1,}/g,'')"></el-input></el-form-item></td>
                   <!-- <td><el-form-item label="品类" prop="category">
                       <el-input v-model="patientModel.category" type="text"></el-input></el-form-item></td> -->
                 </tr>
                 <tr>
                   <td><el-autocomplete  v-model="patientModel.drugsname1" :fetch-suggestions="querySearchAsync1" placeholder="请输入药品名称" >
                       <i slot="suffix" class="el-input__icon el-icon-close" @click="patientModel.drugsname1=''"></i></el-autocomplete></td>
                   <td><el-form-item label="盒数" prop="boxes1">
                       <el-input v-model="patientModel.boxes1" type="text" onkeyup="value=value.replace(/[^\d]/g,'').replace(/^0{1,}/g,'')"></el-input></el-form-item></td>
                   <td><el-form-item label="费用" prop="cost1">
                       <el-input v-model="patientModel.cost1" type="text" onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1').replace(/^0{1,}/g,'')"></el-input></el-form-item></td>
                   <!-- <td><el-form-item label="品类" prop="category1">
                       <el-input v-model="patientModel.category1" type="text"></el-input></el-form-item></td> -->
                 </tr>
                 <tr>
                   <td><el-autocomplete  v-model="patientModel.drugsname2" :fetch-suggestions="querySearchAsync2" placeholder="请输入药品名称" >
                       <i slot="suffix" class="el-input__icon el-icon-close" @click="patientModel.drugsname2=''"></i></el-autocomplete></td>
                   <td><el-form-item label="盒数" prop="boxes2">
                       <el-input v-model="patientModel.boxes2" type="text" onkeyup="value=value.replace(/[^\d]/g,'').replace(/^0{1,}/g,'')"></el-input></el-form-item></td>
                   <td><el-form-item label="费用" prop="cost2">
                       <el-input v-model="patientModel.cost2" type="text" onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1').replace(/^0{1,}/g,'')"></el-input></el-form-item></td>
                   <!-- <td><el-form-item label="品类" prop="category2">
                       <el-input v-model="patientModel.category2" type="text"></el-input></el-form-item></td> -->
                 </tr>
                 <tr>
                   <td ><el-select v-model="patientModel.drugsname3" slot="prepend" placeholder="请选择使用的技术">
                       <el-option label="针灸" value="针灸"></el-option>
                       <el-option label="包扎" value="包扎"></el-option>
                       <el-option label="正骨" value="正骨"></el-option>
                       <el-option label="艾灸" value="艾灸"></el-option>
                       <el-option label="" value=""></el-option></el-select></td>
                   <td><el-form-item label="次数" prop="boxes3">
                       <el-input v-model="patientModel.boxes3" type="text" onkeyup="value=value.replace(/[^\d]/g,'').replace(/^0{1,}/g,'')"></el-input></el-form-item></td>
                   <td><el-form-item label="费用" prop="cost3">
                       <el-input v-model="patientModel.cost3" type="text" onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1').replace(/^0{1,}/g,'')"></el-input></el-form-item></td>
                   <!-- <td><el-form-item label="品类" prop="category3">
                       <el-input v-model="patientModel.category3" type="text"></el-input></el-form-item></td> -->
                 </tr>
                 <tr>
                   <td></td><td><el-button type="primary" @click="addPatient">结算保存</el-button></td>
                   <td><el-button type="warning" @click="resetPatient">重置信息</el-button></td>
                 </tr>
            </table>
          </el-form>
    </el-card>
  </div>
</template>

<script>

  export default {
    data(){
      //校验手机号的邮箱规则
      const checkPhone = (rule, value, callback) => {

        //定义校验手机号的正则语法
        const phoneRege = /^1[34578][0-9]{9}$/
        if (phoneRege.test(value)) {

          return callback()
        }
        callback(new Error('请填写正确的手机号'))

      }
      return {
        drugsList: [],
        patientOne: {},
        patientModel: {
          patientname:  '',
          gender: '',
          phone: '',
          age: '',
          address: '',
          diagnosistimes: '',
          height: '',
          weight: '',
          pressure: '',
          sugar: '',
          history: '',
          allergy: '',
          complaint: '',
          symptom: '',
          diagnosis: '',
          drugsname: '',
          boxes: '',
          cost: '',
          category: '',
          drugsname1: '',
          boxes1: '',
          cost1: '',
          category1: '',
          drugsname2: '',
          boxes2: '',
          cost2: '',
          category2: '',
          drugsname3: '',
          boxes3: '',
          cost3: '',
          category3: '医疗技术'
        },
        //数据校验规则
        rules: {
     patientname: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
          gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
           phone: [{ required: true, message: '请输入手机号', trigger: 'blur' },
                  { min: 11, max: 11, message: '长度在11个数字', trigger: 'blur' },
                  { validator: checkPhone , trigger: 'blur' }],
             age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
         address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
       complaint: [{ required: true, message: '请输入主诉', trigger: 'blur' }],
         symptom: [{ required: true, message: '请输入患者症状', trigger: 'blur' }],
       diagnosis: [{ required: true, message: '请输入诊断结果', trigger: 'blur' }],
         history: [{ required: true, message: '请输入既往史', trigger: 'blur' }],
         allergy: [{ required: true, message: '请输入过敏史', trigger: 'blur' }],
        }
       }
     },
    methods: {
      async loadAll() {
        let list = await this.getList()
        // console.log('hot list', list)
        return list
      },
      async querySearchAsync(subStr, cb) {
        if(this.patientModel.drugsname.length == 0){
          this.drugsList = await this.getList()
          //console.log(this.drugsList)
        }else {
          localStorage.setItem("value",subStr)
          this.getTreatmentDrugslist()
          this.drugsList = await this.getTreatmentDrugslist()
        }
        let results = []
        for (let i of  this.drugsList) {
          results.push({
            value: i['drugsname'],
            //id: i['id'],
          })
        }
        cb(results)
      },
      async querySearchAsync1(subStr, cb) {
        if(this.patientModel.drugsname1.length == 0){
          this.drugsList = await this.getList()
          //console.log(this.drugsList)
        }else {
          localStorage.setItem("value",subStr)
          this.getTreatmentDrugslist()
          this.drugsList = await this.getTreatmentDrugslist()
        }
        let results = []
        for (let i of  this.drugsList) {
          results.push({
            value: i['drugsname'],
            //id: i['id'],
          })
        }
        cb(results)
      },
      async querySearchAsync2(subStr, cb) {
        if(this.patientModel.drugsname2.length == 0){
          this.drugsList = await this.getList()
          //console.log(this.drugsList)
        }else {
          localStorage.setItem("value",subStr)
          this.getTreatmentDrugslist()
          this.drugsList = await this.getTreatmentDrugslist()
        }
        let results = []
        for (let i of  this.drugsList) {
          results.push({
            value: i['drugsname'],
            //id: i['id'],
          })
        }
        cb(results)
      },
      async getList(){
        const {data: result} = await this.$http.get(`/drugs/getList`)
        this.drugsList = result.data
        return this.drugsList
      },
      async getTreatmentDrugslist(){
        let subStr = localStorage.getItem("value")
        const {data: result} = await this.$http.get(`/drugs/getTreatmentDrugslist/${subStr}`)
        this.drugsList = result.data
        return this.drugsList
      },
      //校验用户数据
      addPatient(){
        this.$refs.addPatientRef.validate(async valid => {
          //如果校验失败 则停止数据
          if(!valid) return
          let drugsname = this.patientModel.drugsname
          //this.getDrugs(drugsname)

          let patient = {}
          patient.patientname = this.patientModel.patientname
          patient.gender = this.patientModel.gender
          patient.phone = this.patientModel.phone
          patient.age = this.patientModel.age
          patient.address = this.patientModel.address
          patient.diagnosistimes = this.patientModel.diagnosistimes
          patient.height = this.patientModel.height
          patient.weight = this.patientModel.weight
          patient.pressure = this.patientModel.pressure
          patient.sugar = this.patientModel.sugar
          patient.history = this.patientModel.history
          patient.allergy = this.patientModel.allergy
          patient.complaint = this.patientModel.complaint
          patient.symptom = this.patientModel.symptom
          patient.diagnosis = this.patientModel.diagnosis
          const {data: result} = await this.$http.post('/patient/addPatient',patient)
          if(result.status !== 200) return this.$message.error("系统异常请联系厂家")
          //重置表格数据
          let patientname = this.patientModel.patientname
          let phone = this.patientModel.phone
          let diagnosis = this.patientModel.diagnosis
          const {data: result1} = await this.$http.get(`/patient/getPatient/${patientname}/${phone}/${diagnosis}`)
          this.patientOne = result1.data

          let treatment = {}
          treatment.patientid = this.patientOne.patientid
          treatment.diagnosistimes = this.patientOne.diagnosistimes
          treatment.drugsname = this.patientModel.drugsname
          treatment.boxes = this.patientModel.boxes
          treatment.cost = this.patientModel.cost
          treatment.category = this.patientModel.category

          let treatment1 = {}
          treatment1.patientid = this.patientOne.patientid
          treatment1.diagnosistimes = this.patientOne.diagnosistimes
          treatment1.drugsname = this.patientModel.drugsname1
          treatment1.boxes = this.patientModel.boxes1
          treatment1.cost = this.patientModel.cost1
          treatment1.category = this.patientModel.category1

          let treatment2 = {}
          treatment2.patientid = this.patientOne.patientid
          treatment2.diagnosistimes = this.patientOne.diagnosistimes
          treatment2.drugsname = this.patientModel.drugsname2
          treatment2.boxes = this.patientModel.boxes2
          treatment2.cost = this.patientModel.cost2
          treatment2.category = this.patientModel.category2

          let treatment3 = {}
          treatment3.patientid = this.patientOne.patientid
          treatment3.diagnosistimes = this.patientOne.diagnosistimes
          treatment3.drugsname = this.patientModel.drugsname3
          treatment3.boxes = this.patientModel.boxes3
          treatment3.cost = this.patientModel.cost3
          treatment3.category = this.patientModel.category3

          let treatmentList = []
          treatmentList.push(treatment)
          treatmentList.push(treatment1)
          treatmentList.push(treatment2)
          treatmentList.push(treatment3)
          const {data: result2} = await this.$http.post(`/treatment/addTreatment`,treatmentList)
          if(result.status !== 200) return this.$message.error("系统异常请联系厂家")

           //1.消息确认框
           const result3 =  await this.$confirm('是否进行结算并保存?', '提示', {
                     cancelButtonText: '取消',
                     confirmButtonText: '确定',
                     type: 'warning'
                   }).catch(error => error)

           //如果确认  confirm  如果取消 cancel
           if(result3 !== 'confirm'){
             let patientname = this.patientModel.patientname
             let phone = this.patientModel.phone
             let diagnosis = this.patientModel.diagnosis
             const {data: result4} = await this.$http.delete(`/patient/deletePatient/${patientname}/${phone}/${diagnosis}`)
             let patientid = this.patientOne.patientid
             let diagnosistimes = this.patientOne.diagnosistimes
             const {data: result5} = await this.$http.delete(`/treatment/deleteTreatment/${patientid}/${diagnosistimes}`)
              return this.$message.info("取消结算")
           }
           let drugs = {}
           drugs.drugsname = this.patientModel.drugsname
           drugs.boxes = this.patientModel.boxes

           let drugs1 = {}
           drugs1.drugsname = this.patientModel.drugsname1
           drugs1.boxes = this.patientModel.boxes1

           let drugs2 = {}
           drugs2.drugsname = this.patientModel.drugsname2
           drugs2.boxes = this.patientModel.boxes2

           let updateDrugsList = []
           updateDrugsList.push(drugs)
           updateDrugsList.push(drugs1)
           updateDrugsList.push(drugs2)

           const {data: result6} = await this.$http.put(`/drugs/updateDrugsList`,updateDrugsList)
           if(result6.status !== 200) return this.$message.error("保存失败")
           this.$message.success("结算并保存成功")

          this.$refs.addPatientRef.resetFields()
        })
      },
      // async getDrugs(drugsname){
      //   const {data: result} = await this.$http.get(`/drugs/getDrugs/${drugsname}`)
      //   if(result.status !== 200) return
      //   this.patientModel.boxes = result.data.boxes
      //   this.patientModel.cost = result.data.cost
      //   this.patientModel.category = result.data.category
      //   console.log(this.patientModel)
      //   return this.patientModel
      // },
      resetPatient(){
        //重置表格数据
        this.$refs.addPatientRef.resetFields()
      }
    },
    mounted(){
      this.drugsList = this.loadAll();
    }
  }
</script>


<style lang="less" scoped>
  .box-card {
      span {
        margin-left: 40%;
      }
  }
  .itemText {
    font-size: 20px;
    color: #DD4A68;
  }
  .el-input {
    width: 200px;
    margin-left: 20px;
  }
  .demo-ruleForm {
      width: 100%;
      background-color: #EEEEEE;
  }
  .el-autocomplete {
    margin-left: 120px;
    margin-bottom: 25px;
    width: 200px;
  }
  .el-select {
    margin-left: 120px;
    width: 200px;
    margin-bottom: 20px;
  }
</style>
