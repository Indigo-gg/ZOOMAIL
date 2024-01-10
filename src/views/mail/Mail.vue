<template>
<div class="mail">
  <div class="date">
    <date></date>
  </div>
<div class="mail-box">
  <div class="mail-title">{{mailTitle}}</div>
  <div class="mail-quote" @click="clickQuote">{{quote}}</div>
  <div class="mail-img" @click="intoMailPage">
    <van-image :src="mailImage">
    </van-image>
  </div>
</div>
  <van-popup  v-model:show="showQuote" round :style="{ padding: '64px' }" >
   <div class="quote">{{quote}}</div>
  </van-popup>
</div>
</template>

<script>
import store from "@/store/store";
import pageConfig from "@/views/config/page.config";
import router from "@/router";
// import {getMailList} from "@/api/api";
import {USER_INFO} from "@/store/constant";
import {ref} from "vue";
import {handleQuote} from "@/utils/handeDate";
import date from '@/components/date/date'
export default {
  name: "mail",
  components:{
    date
  },
  setup(){
    handleQuote()
    let mailInfo=store.get(USER_INFO)
    console.log(mailInfo)
    let showQuote=ref(false)
    function clickQuote(){
      showQuote.value=!showQuote.value
    }
    return{
      intoMailPage:()=>{
        router.push({path:'/mailList'})
      },
      clickQuote,
      mailTitle:mailInfo.title,
      quote:mailInfo.quote,
      mailImage:pageConfig.image.mail,
      showQuote
    }
  }
}
</script>

<style scoped>
.mail{
  /*background-color: blue;*/
  height: 100%;
  width: 100%;
  background: url("../../assets/background/14.jpg") no-repeat;
  background-size: 100% auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.date{
  width: 80vw;
}
.quote{
  float: left;
  text-align: left;
  text-indent: 2em;
  color: #4b4a4a;
  font-size: 16px;
  line-height: 1.5em;
  width: 100%;
  height: 100%;
}

.mail-box{
  border-radius: 10px;
  width: 60vw;
  height: 60vw;
  background-color: rgba(196, 93, 151, 0.45);
  margin-bottom: 15vh;
}
.mail-title{
  /*height: 30%;*/
  padding: 10px;
  font-size: 24px;
}
.mail-quote{
  padding: 0 5px;
  height: 2em;
  color: #4b4a4a;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /*background-color: #2c3e50;*/
}
.mail-img{
  height: 40%;
}


</style>
