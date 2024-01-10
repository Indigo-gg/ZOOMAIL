<template>
  <div class="main">
    <div class="back" v-show="!type">
      <go-back></go-back>
    </div>
    <div class="main-box preview-box" ref="main">
      <div class="title">
        {{ mail.title }}
      </div>
      <div class="tag">
        <van-tag color="cyan" plain round>{{ mail.author }}</van-tag>
        TO
        <van-tag color="orange" plain round>{{ mail.receiver }}</van-tag>
      </div>

      <div class="content" ref="content">
      </div>
      <div class="footer" v-show="type!==PREVIEW">
        <div class="remark">
          {{ mail.remark }}
        </div>
        <div class="upTime" id="upTime">
          {{ date }}
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import {onMounted, ref} from 'vue'
import router from "@/router";
import goBack from "@/components/goBack";
import {getHTMLByMd} from "@/utils/convert.js";
import storage from "@/store/store";
import {PREVIEW, READING,} from "@/store/constant";
import {getAMail} from "@/api/api";
// import store from "@/store/store";
import pageConfig from "@/views/config/page.config";
// import store from "@/store/store";
import {timestampToTime} from "@/utils/DateUtils";
import dayjs from "dayjs";

export default {
  name: "readPage",
  components: {
    goBack
  },
  props: ['type', 'oriMail'],
  setup(props) {
    let content = ref(null)
    let main = ref(null)
    // let mail = reactive({
    //   id: '',
    //   title: '',
    //   remark: '',
    //   content: '',
    //   author: storage.get(USER_INFO).name,
    //   receiver: '',
    //   date: ''
    // })
    let mail = {}
    let html = ''
    // onMounted(() => {
    if (props.type === PREVIEW) {
      // eslint-disable-next-line vue/no-setup-props-destructure
      mail = props.oriMail
      console.log('AMail-preview', mail)

    } else {
      mail = storage.get(READING)
      getAMail({id: mail.id}).then(res => {
        // mail=res.data[0]
        Object.keys(res.data[0]).forEach(i => {
          mail[i] = res.data[0][i]
        })
        console.log('AMail', mail)
      })
    }
    onMounted(() => {
      html = getHTMLByMd(mail.content)
      content.value.innerHTML = html
      mail.date = dayjs(mail.date).format('YY-MM-DD hh:mm:ss')
    })

    // })

    return {
      content,
      main,
      mail,
      PREVIEW: PREVIEW,
      goBack: () => {
        router.go(-1)
      },
      back: pageConfig.image.back,
      date: timestampToTime(mail.date)
    }
  },
}
</script>

<style scoped>
.main {
  /*width: 90vw;*/
  /*padding: 0 5vw;*/
  /*height: auto;*/
  min-height: 100vh;
  background-color: #fff2e2;
  /*background-size: 100% 100%;*/
}

.back {
  /*padding: 10px 0 0 10px;*/
  /*padding: 10px;*/
  width: 100%;
  text-align: left;
  position: relative;
  height: 2em;
  /*left: 10px;*/
  top: 10px;

}

.main-box {
  padding: 20px 10px;
}

.title {
  /*margin-top: 20px;*/
  padding: 20px 10px;
  font-size: 24px;
  font-weight: bold;
}

.tag {
  /*padding: 10px 10px;*/
  float: right;
  font-size: 12px;
  /*padding: 10px 0;*/
}

.remark {
  /*float: left;*/
  /*font-size: 12px;*/
  /*font-weight: lighter;*/
  text-align: center;
  color: #999999;
  margin: 2vw;
  border-radius: 5px;
  padding: 1vw;
  background-color: rgba(144, 238, 144, 0.2);
}

.content {
  font-size: 16px;
  margin-top: 30px;
  text-align: left;
  line-height: 1.5em;
  font-family: PingFang SC, miui, Hiragino Sans GB, Microsoft Yahei, '迷你简细行楷', sans-serif;
  color: #494c49;
  /*font-family: "流畅书写体";*/
  /*font-family: '罗西钢笔行楷';*/
}

.upTime {
  color: #4b4a4a;
  text-align: right;
  font-size: 14px;
  font-family: PingFang SC, miui, Hiragino Sans GB, Microsoft Yahei, '迷你简细行楷', sans-serif;
}

image, img {
  max-width: 100vw;
  overflow: scroll;

}
</style>
