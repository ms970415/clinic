<template>
  <div>

    <!-- 1.定义面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>密码修改</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 2.定义卡片视图 -->
    <el-card class="box-card" label-width="100%">
          <!-- 定义用户提交表单数据-->

          <el-form :model="updatePasswordModel" :rules="rules" ref="updatePasswordRef" label-width="100px" class="demo-ruleForm">
            <el-form-item label="电话号码" prop="phone">
              <el-input v-model="updatePasswordModel.phone"></el-input>
            </el-form-item>
            <el-form-item label="原密码" prop="password">
              <el-input v-model="updatePasswordModel.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="新确认" prop="password1">
              <el-input v-model="updatePasswordModel.password1" type="password"></el-input>
            </el-form-item>
            <el-form-item label="新密码确认" prop="password2">
              <el-input v-model="updatePasswordModel.password2" type="password"></el-input>
            </el-form-item>
          </el-form>

          <span>
            <el-button type="primary" @click="updatePasswordBtn">确 定</el-button>
            <el-button @click="resetUpdate">重置</el-button>
          </span>
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

      const checkPassword = (rule, value, callback) => {
        if(this.updatePasswordModel.password1 !== value) return callback(new Error('2次密码输入不一致'))
        //否则校验成功
        callback()
      }

      return {
        updatePasswordModel: {
          phone:  '',
          password: '',
          password1: '',
          password2: '',
        },
        //数据校验规则
        rules: {
          phone: [
                  { required: true, message: '请输入手机号', trigger: 'blur' },
                  { min: 11, max: 11, message: '长度在11个数字', trigger: 'blur' },
                  { validator: checkPhone , trigger: 'blur' }
                ],
          password: [
                  { required: true, message: '请输入密码', trigger: 'blur' },
                  { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
                ],
          password1: [
                  { required: true, message: '请输入新密码', trigger: 'blur' },
                  { min: 3, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
                ],
          password2: [
                  { required: true, message: '请确认新密码', trigger: 'blur' },
                  { min: 3, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' },
                  { validator: checkPassword , trigger: 'blur' }
                ]
        }
      }

    },
    methods: {
      resetUpdate(){
        //重置表格数据
        this.$refs.updatePasswordRef.resetFields()
      },
      //校验用户数据
      updatePasswordBtn(){
        this.$refs.updatePasswordRef.validate(async valid => {
          //如果校验失败 则停止数据
          if(!valid) return
          //console.log(this.updatePasswordModel)
          const {data: result} = await this.$http.put('/user/updatePassword',this.updatePasswordModel)
          if(result.msg == "数据库不允许操作") return this.$message.error("手机号或密码不正确,请重新输入")
          if(result.status !== 200) return this.$message.error("密码修改失败")
          this.$message.success("密码修改成功")
          this.$router.push("/home")
        })
      }
    }
  }
</script>


<style lang="less" scoped>
  .box-card {
    background-image: url(../../assets/images/17.jpg);
    background-size: 100%;
      height: 450px;
      span {
        margin-left: 40%;
      }
  }
  .demo-ruleForm {
      margin-left: 250px;
      width: 50%;
      margin-top: 70px;
  }
</style>
