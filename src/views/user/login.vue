<template>
  <div class="login">
    <div class="logo">
      <ZOOChat></ZOOChat>
    </div>
    <div class="form">
<!--      <van-form>-->
        <van-cell-group inset>
          <div class="field">
            <van-field
                v-model="form.account"
                name="账号"
                label="账号"
                placeholder="输入账号"
                :rules="[{ required: true, message: '请输入账号' }]"
            />
          </div>

          <div class="field">
            <van-field
                v-model="form.password"
                name="密码"
                label="密码"
                type="password"
                placeholder="输入密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />

          </div>
        </van-cell-group>
        <div class="submit" @click="onSubmit">
<!--          <span class="btn">提交</span>-->
<!--          <van-button color="#7232dd" class="btn" plain >打开</van-button>-->
          <div class="btn">
            <van-image width="20vw" :src="loginIcon" @click="onSubmit"></van-image>
          </div>

        </div>
<!--      </van-form>-->

    </div>
    <div class="bottom">

    </div>
    <div class="bottom">

    </div>
  </div>
</template>

<script>
import store from "@/store";
import router from "@/router";
import ZOOChat from '@/components/logo'
import {reactive} from "vue";
import pageConfig from "@/views/config/page.config";
export default {
  name: "login",
  components:{
    ZOOChat
  },
  setup() {
    const loginState = {
      loading: false,

    }
    let form = reactive({
      account: '',
      password: '',
    })
    const onSubmit = () => {
      // console.log('提交的数据', e)
      loginState.loading = true
      store.dispatch('Login', form).then(() => {
        console.log('登陆成功')
        router.push({path: '/'})
      }).finally(() => {
        loginState.loading = false
      })
    }


    return {
      onSubmit,
      form,
      loginIcon:pageConfig.image.earphone
    }
  }
}
</script>

<style scoped>


.login {
  height: 100vh;
  background: url("../../assets/background/5.jpg") no-repeat;
  background-size: 100% 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.logo{
  margin-top: 20px;
}
.form{
      margin-bottom: 20vh;

}
.field{
  height:auto;
  /*background-color: #42b983;*/
}
.submit{
  width: 100vw;
  height: 10vh;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  /*background-color: aliceblue;*/
}

.btn{
  font-size: 16px;
  width: 20vw;
  height: 20vw;
  border-radius: 25%;
  padding: 0 0 5px 5px;
  color: #2c3e50;
  /*border-radius: 5px;*/
  background-color: aliceblue;
}
</style>
