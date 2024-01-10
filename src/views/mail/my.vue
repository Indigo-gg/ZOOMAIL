<template>
  <div class="my">
    <div class="top">
      <div class="back">
        <van-image :src="back" width="40px" @click="goBack"></van-image>

      </div>
    <div class="head-title">{{title}}🚀</div>
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
          <div class="toDate">
            {{item.date}}
          </div>
          <div class="to">{{item.receiver}}
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
import { getMyMail} from "@/api/api";
import {showToast} from "vant";
import {READING} from "@/store/constant";
import pageConfig from "@/views/config/page.config";
import dayjs from "dayjs";
// import AyuLogo from "../../components/ayuLogo.vue";
// import './list.css'


export default {
  name: "mail-list",
  setup() {
    let mailList = reactive({
      list: []
    })
    getMyMail().then(res=>{
      // console.log(res.data)
      mailList.list=res.data.sort((a,b)=>{
        let at=new Date(a.date).getTime()
        let bt=new Date(b.date).getTime()
        console.log('拿到的时间',at,bt)
        return  bt-at
      })
      mailList.list.forEach(i=>{
        i.date = dayjs(i.date).format('YY-MM-DD')
      })
    }).catch(()=>{
      showToast('无法获取邮件')
    })
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
      title:'已投放',
      mailList,
      getImgById:function (id){
        console.log(id)
        let no=id%pageConfig.image.BGImgSize
        return pageConfig.image.getImgByNo(no)
      },
      goBack: () => {
        router.go(-1)
      },
      back: pageConfig.image.back,
      my:pageConfig.image.flower
    }
  }
}
</script>


<style scoped>
.my{
  width: 100vw;
  min-height:100vh;
  height: auto!important;
  /*height: 100vh;*/
  /*background-color: #86A8E7;*/

}
.top{
  display: flex;
  justify-content: center;
  /*flex-direction: column;*/
  height: 10vh;
  width: 100vw;
  position: fixed;
  z-index: 111;
  background-color: #fff;
}
.head-title{
  padding: 20px;
  color: #4b4a4a;
  text-align: center;
  font-size: 24px;
  font-family: '华文楷体'
}
</style>
<style src="@/views/mail/list.css" scoped>

</style>





<!--<template>-->
<!--<div class="my">-->
<!--  <div class="top">-->
<!--    <go-back class="back"></go-back>-->
<!--    <div class="title">{{title}}🚀</div>-->
<!--  </div>-->
<!--  <div class="content">-->
<!--    <div class="mail">-->
<!--      <div class="mail" v-for="item in mailList">-->
<!--        -->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</div>-->
<!--</template>-->

<!--<script>-->
<!--import goBack from '@/components/goBack/index'-->
<!--export default {-->
<!--  name: "my",-->
<!--  components:{-->
<!--    goBack-->
<!--  },-->
<!--  setup(){-->
<!--    const mailList={}-->
<!--    return{-->
<!--      title:'已投放',-->
<!--      mailList-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.top{-->
<!--  padding: 5vw;-->
<!--  text-align: center;-->
<!--}-->
<!--.title{-->
<!--  text-align: center;-->
<!--}-->
<!--.back{-->
<!--  float: left;-->
<!--}-->
<!--</style>-->
