<template>
  <div class="main">
    <div class="top">
      <van-image class="back" width="40px" :src="back" @click="goBack">
      </van-image>
      <van-image class="send" width="40px" :src="send" @click="sendMail">
      </van-image>
      <div>
        <van-cell-group class="cell-group" inset>
          <div class="input">
            <van-field label-align="center" label-width="3em" label="标题" v-model="formState.title"
                       placeholder="输入邮件标题">
            </van-field>
          </div>
          <div class="picker">
            <van-popover v-model:show="showPopover" :actions="actions" @select="onSelect">
              <template #reference>
                <van-tag plain round medium> <div style="font-size: 2vw">{{ formState.receiver === '' ? '收信人' : formState.receiver }}</div> </van-tag>
              </template>
            </van-popover>
          </div>
        </van-cell-group>
      </div>
      <!--      <span class="title">{{title}}</span>-->
    </div>
    <div class="form-box">
      <div class="text-box">
        <textarea v-model="formState.content" :cols="textCols" :rows="textRows" class="edit-area">
        </textarea>
      </div>
    </div>
  </div>
  <div class="preview-btn" @click="previewMail">
    <van-image width="40px" :src="preview">
    </van-image>
  </div>
  <div class="preview">
    <van-popup v-model:show="showPreview" round position="bottom" :style="{height:'80%'}">
      <read-page type="preview" :ori-mail="formState" :key="new Date().getTime()">
      </read-page>
    </van-popup>
  </div>
  <van-dialog v-model:show="showTip" @cancel="tipCancel" @confirm="tipConfirm" show-cancel-button>
    <div class="remark">
      <div class="tip-message">是否发送</div>
      <van-field style="font-size: 11px" label-align="center" label-width="3em" label="PS." v-model="formState.remark"
                                   placeholder="显示在信封上的备注(如果需要的话)">
      </van-field>
    </div>
  </van-dialog>

</template>
<script>
import {onMounted, reactive, ref, watch} from "vue";
import {sendMailText, getContact} from "@/api/write.js";
import {showToast} from "vant";
import pageConfig from "@/views/config/page.config";
import router from "@/router";
import store from "@/store/store";
import {SUCCESS_CODE, USER_INFO, WRITING} from "@/store/constant";
import readPage from "@/views/mail/readPage";

export default {
  name: "mail",
  components: {
    readPage
  },
  setup() {
    let date = new Date()
    let showPopover = ref(false)
    let showPreview = ref(false)
    let showTip=ref(false)
    const formState = reactive({
      id: 0,//0表示正在被编辑
      title: '',
      remark: '',
      content: '',
      author: store.get(USER_INFO).name,
      receiver: '',
      date: ''
      // remember: true,

    });
    let actions = [];
    const clear=()=>{
      formState.date=''
      formState.receiver=''
      formState.content=''
      formState.title=''
    }
    onMounted(() => {
      if (store.get(WRITING)) {
        let props=Object.keys(formState)
        let write=store.get(WRITING)
        props.forEach(p=>{
          formState[p]=write[p]
        })

      }
    })
    watch(formState, (newVal) => {
      store.set(WRITING, newVal)
      console.log(store.get(WRITING))
    })
    getContact().then(res => {
      // console.log('contact', res)
      res.data.forEach(item => {
        actions.push({text: item})
      })
    })
    // function setDateForMail(){
    //   formState.date=date.toLocaleString()
    // }



    const onFinish = values => {
      console.log('Success:', values);
      // setDateForMail()
      values.date = date.toLocaleString()
      // Object.assign(values,{status:HAS_SEND})
      let data = JSON.stringify(values)
      sendMailText(data).then(res => {
        console.log(res)
        if (res.code === SUCCESS_CODE) {
          // console.log(res.data)
          showToast("发送成功")
          router.push({path: '/my'})
        } else {
          showToast("发送失败")
        }
      })

    };


    //textArea
    let textCols = 20
    let textRows = 40


    const tipConfirm=()=>{
        if (formState.receiver === null || formState.receiver === '') {
          showToast('请填写收件人')
          return
        } else if (formState.title === '') {
          showToast('请输入标题')
          return

        } else if (formState.content === '') {
          showToast('发送空的信，对方会疑惑滴！')
          return
        }
        sendMailText(formState).then(res => {
          // console.log('发送邮件返回结果', res)
          if (res.code === SUCCESS_CODE) {
            // console.log(res.data)
            showToast("发送成功")
            clear()
          } else {
            showToast("发送失败")
          }
        })

    }
    const tipCancel=()=>{
      formState.remark=''
    }
    const sendMail = () => {
      showTip.value=true
    }
    const previewMail = () => {
      store.set(WRITING, formState)
      showPreview.value = !showPreview.value
    }
    const onSelect = (action) => {
      formState.receiver = action.text
    }


    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
    return {
      formState,
      onFinish,
      showPopover,
      actions,
      onSelect: onSelect,
      onFinishFailed,
      textCols,
      textRows,
      back: pageConfig.image.back,
      send: pageConfig.image.bottle,
      preview: pageConfig.image.mirror2,
      title: 'WRITE',
      goBack: () => {
        router.go(-1)
      },
      sendMail: sendMail,
      previewMail: previewMail,
      showPreview: showPreview,
      tipConfirm,
      showTip,
      tipCancel


    }
  },
}
</script>

<style scoped>
.main {
  height: 100vh;
  width: 100vw;
  /*background: url("../assets/background/paper.jpg") no-repeat;*/
  background-size: 100% 100%;
}

.top {
  /*padding: 10px;*/
  position: fixed;
  padding: 0 2vw;
  background-color: #fff;
  /*padding-top: 10px;*/
  top: 0;
  width: 96vw;
  height: 50px;
  /*height: 12vw;*/
  text-align: center;
  /*display: flex;*/
  /*justify-content: space-between;*/
  /*align-items: center;*/
}
.form-box{
  /*height: 50px;*/
  margin-top: 50px;
}

.picker {
  width: 40px;
  height: 40px;
}

.cell-group {
  display: flex;
  justify-content: space-between;
}

.back {
  margin-top: 10px;

  float: left;
  /*margin: 5px 0 0 5px;*/
}

.send {
  margin-top: 10px;
  float: right;
  /*margin: ;*/

}
.tip-message{
  padding: 10px;
  margin-top: 10px;
  font-size: 20px;
}

.preview {

}

.preview-btn {
  position: fixed;
  bottom: 20px;
  right: 10px;
}

.text-box {
  /*padding: 0 px;*/
  padding: 0;
  margin: 0;
}

.edit-area {
  width: 96vw;
  padding: 2vw;
  font-size: 16px;
  line-height: 1.5rem;
  font-family: PingFang SC, miui, Hiragino Sans GB, Microsoft Yahei,'迷你简细行楷', sans-serif;
  /*height: 80vh;*/
  border: hidden;
  background: url("../../assets/background/paper.jpg");
  background-size: 100% 100%;
}
</style>
