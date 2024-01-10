<template>
  <div class="main">
    <div class="top">
      <van-image class="back" :src="back" width="40px" @click="goBack"></van-image>
      <div class="head-title">
        邮件列表📩
      </div>
      <van-image class="my-icon" width="40px" :src="my" @click="tomy"></van-image>
    </div>

    <div class="mail-box">
      <div class="mail-list-item"
           v-for="item in mailList.list"
           :key="item.id"
           :id="item.id"
           :style="{background:`url(${getImgById(item.id)}) no-repeat bottom`,backgroundSize:'100% auto'}"
           @click="goToMailPage(item.id)">
        <div class="content">
          <div class="title">
            {{item.title}}
          </div>
          <div class="date" v-text="getDate(item.date)">
          </div>
          <div class="from">{{item.author}}
          </div>
          <div class="remark" v-if="item.remark">{{item.remark}}
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store/store";
import {onMounted, reactive} from "vue";
import router from "@/router";
import dayjs from "dayjs";
import {getMailList} from "@/api/api";
import {showToast} from "vant";
import {READING} from "@/store/constant";
import pageConfig from "@/views/config/page.config";
// import './list.css'

export default {
  name: "mail-list",
  setup() {
    let mailList = reactive({
      list: []
    })
    getMailList().then(res=>{
      // console.log(res.data)
      mailList.list=res.data.sort((a,b)=>{
        let at=new Date(a.date).getTime()
        let bt=new Date(b.date).getTime()
        console.log('拿到的时间',at,bt)
        return  bt-at
      })
    }).catch(()=>{
      showToast('无法获取邮件')
    })
    function getDate(date){
      // mailList.list.forEach(i=>{
        return dayjs(date).format('YY-MM-DD')
      // })
    }
    let goToMailPage = (e) => {
      let id = e
      let mailData = mailList.list.find(item => {
        return id === item.id
      })

      store.set(READING,mailData)
      router.push({path: '/aMail'})
    }
    onMounted(() => {

    })
    return {
      goToMailPage,
      getDate,
      mailList,
      getImgById:function (id){
        console.log(id)
        let no=id%pageConfig.image.BGImgSize
        return pageConfig.image.getImgByNo(no)
      },
      goBack: () => {
        router.go(-1)
      },
      tomy:()=>{
        router.push({path:'/my'})
      },
      back: pageConfig.image.back,
      my:pageConfig.image.flower
    }
  }
}
</script>

<style scoped>
.main{
  width: 100vw;
  min-height:100vh;
  height: auto!important;
  /*height: 100vh;*/
  /*background-color: #86A8E7;*/

}

</style>

<style src="@/views/mail/list.css" scoped>

</style>
