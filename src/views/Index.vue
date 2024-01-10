<template>
  <div class="switch-view" v-if="layout==='switch'">
    <div class="top">
      <div class="version">{{version}}</div>
<!--      <div v-for="page in pageList" :key="page.name">-->
<!--        <span class="index-title" :ref="`${page.name}-title`" @click="switchTab(page)">{{ page.title }}</span>-->
<!--      </div>-->
          <span class="index-title">{{ currentPage.title }}</span>
    </div>
    <touch-listen delta="100" @scrollRight="swipeRight" @scrollLeft="swipeLeft">
      <div class="body">
        <!--    <div class="body">-->
        <!--      <router-view>-->
        <!--      </router-view>-->
        <transition name="change">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </touch-listen>

    <div class="things">
        <div class="fun">
          <div class="icon" v-for="item in funList" :key="item.name">
            <div class="icon-image" @click="toFun(item)">
              <van-image width="100%"
              height="100%"
              fit="cover" :src="item.icon"></van-image>
            </div>
<!--            <div class="icon-name">{{item.name}}</div>-->
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import 'vant/lib/index.css'
// import Mail from "@/views/Mail.vue";
// import Microphone from "@/views/Microphone.vue";
// import More from "@/views/more.vue";
import store from "@/store";
import PageConfig from '@/views/config/page.config'
// Import Swiper styles
// import 'swiper/css';
// import 'swiper/swiper-bundle.css'
import 'swiper/dist/css/swiper.css'
import {onMounted, reactive, ref} from "vue";
import router from "@/router";
import {showToast} from "vant";
// import Mail from "@/views/mail/Mail";
// import Microphone from "@/views/microphone/Microphone";
import TouchListen from "@/components/touch/touch-listen";
import pageConfig from "@/views/config/page.config";

export default {
  name: "Index",
  components: {
    TouchListen,
    // Mail, Microphone
  },
  setup() {

    const {index, pageList,funList} = PageConfig
    const version=ref(pageConfig.version)
    let IndexPage=PageConfig.getPageInfoByName(index)
    let currentPage = reactive({
      title:IndexPage.title,
      name:IndexPage.name,
      path:IndexPage.path
    })
    router.push({name: currentPage.name})
    let swipeLeft = () => {
      let objPage=pageConfig.getNextPageByName(currentPage.name)
      switchTab(objPage)
      // console.log('左滑', pageConfig.getPrevPageByName(currentPage.name))
    }
    let swipeRight = () => {
      let objPage= pageConfig.getPrevPageByName(currentPage.name)
      switchTab(objPage)
      // console.log('右滑', pageConfig.getNextPageByName(currentPage.name))

    }
    const switchTab = (page) => {
      currentPage.name = page.name
      currentPage.title = page.title
      currentPage.path = page.path
      router.push({path:currentPage.path})
    }
    const toFun=(item)=>{
      if(item.isOpen){
        // currentPage.ti
        router.push({path:item.path})
      }
      else {
        showToast(item.status)
      }
    }
    onMounted(() => {

    })
    return {
      layout: store.getters.layout,
      indexPage: index,
      pageList: pageList,
      funList: funList,
      currentPage,
      swipeLeft,
      swipeRight,
      switchTab,
      toFun,
      version
    }
  }
}
</script>

<style scoped>
.top {
  /*background: aqua;*/
  height: 10vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 0 0 10px 10px;
  /*background-color: rgba(177, 241, 132, 0.5);*/
  /*background:linear-gradient(-135deg, #2ff5c9, rgba(165, 217, 129, 0.9),#5FFBF1);*/
  background-color: #97d5d4;
}
.version{
  position: absolute;
  right: 0;
  top: 0;
  /*word-space: 0.5em;*/
  padding-right: 10px;
  /*height: 100%;*/
  line-height: 10vh;
  font-size: 14px;
  font-weight: 700;
  color: #FEFEBE;
}

.body {
  /*background: #42b983;*/
  height: 80vh;
  /*width: 100vw;*/
}

.index-title {
  font-size: 24px;
  font-weight: 400;
  /*margin-bottom: 2vh;*/
  color: #4b4a4a;
}


.things {
  background:url("../assets/background/bottom.jpg") no-repeat bottom;
  background-size:  100% auto;
  /*background-position: ;*/
  height: 10vh;
  width: 100vw;
  border-radius: 10px 10px 0 0;
}
.fun{
  width: 100%;
  height: 100%;
  backdrop-filter: blur(2px) drop-shadow(0px 0px 10px #ffffff);;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.icon{
  height: 15vw;
  width: 15vw;
  background-color:rgba(255,255,255,0.3) ;
  border-radius: 5px;
}
#app{
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  position: absolute;
}

.change-enter {
    opacity: 0;
    transform: translateX(100%);
  }
.change-enter-active {
  transition: all 0.5s;
  position: absolute;
  z-index: 1;
  height:100%;
  background:#ececec;
}
.change-leave-active {
  transition: all 0s;
  transition-delay: 0.5s;
  position: absolute;
  z-index: -1;
}
.change-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

  .change-enter {
    transform: translateX(-100%);
  }
.change-leave-to {
  transform: translateX(100%);
}
.change-enter-active {
  transition: all 0s;
  position: absolute;
  z-index: -1;
}
.change-leave-active {
  transition: all .5s;
  position: absolute;
  z-index: 2;
  height: 100%;
  background:#ececec;
}


</style>
