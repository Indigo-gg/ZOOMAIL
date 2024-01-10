<template>
  <div class="main">
    <div class="info">
      <div class="name">
        {{currentSong.name}}
      </div>
<!--      <div class="author-group">-->
<!--        <div class="author" v-for="author in currentSong.author" :key="author">-->
<!--          <van-tag plain color="#000">{{author}}</van-tag>-->
<!--        </div>-->
<!--      </div>-->
    </div>
    <div class="main-circle" :class="isPlay?'rotate':'not-rotate'" @click="handlePlay">
      <div class="circle" :style="`background-image:url(${currentSong.cover})`">
        <div class="circle-heart"></div>
      </div>
    </div>


  </div>

</template>

<script>
import {getSong} from "@/api/music";
import {reactive, onBeforeUnmount, defineExpose, watch, ref, onMounted} from "vue";

export default {
  name: "music-box",
  props:['song'],
  setup(props,ctx){
    let isPlay=ref(false)
    let currentSong=reactive({
      name:'',
      author:'',
      id:0,
      cover:'',
      url:''
    })
    let audio=new Audio()
    audio.loop=false
    const initSong=(song)=>{
      return new Promise(resolve => {
        currentSong.name=song.name
        currentSong.cover=song.al.picUrl
        currentSong.id=song.id
        console.log('init,song',song,currentSong)
        currentSong.author=getAuthor(song.ar)
        getSong({id:song.id}).then(res=>{
          console.log('song',res)
          currentSong.url=res.data[0].url
          audio.src=currentSong.url
          // cb()
          resolve()
        })
      })

    }
    const play=()=>{
      audio.play()
      isPlay.value=true
      console.log('paly',isPlay.value)
    }
    const pause=()=>{
      audio.pause()
      isPlay.value=false
    }

    const handlePlay=()=>{
      if(isPlay.value){
        pause()
      }
      else {
        play()
      }
    }
    const handleEnd=()=>{
      ctx.emit('handleEnd')
    }
    const getAuthor=(ar)=>{
      console.log('ar',ar)
      let list=[]
      for(let i=0;i<ar.length;i++){
        list.push(ar[i].name)
      }
      return list
    }
    onBeforeUnmount(()=>{
      audio.pause()
    })
    onMounted(()=>{
      watch(props.song,(newSong)=>{
        initSong(newSong).then(()=>{
          play()
        })
      },{immediate:false})
    })
    audio.addEventListener('ended',handleEnd)
    defineExpose({
      play,pause,initSong
    })
    // initSong(props.song)
    return{
      currentSong,
      play,
      pause,
      initSong,
      isPlay,
      handlePlay
    }
  }

}
</script>

<style scoped>
.main{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
.info{
  position: absolute;
  top: 10px;
  /*justify-self: flex-start;*/
  /*height: 20%;*/
  margin-bottom: 10px;
}
.name{
  /*margin: 10px;*/
  font-weight: 700;
  font-size: 24px;
  color: #2c3e50;
  /*justify-self: flex-start;*/
  /*height: 1.5em;*/

}
.author{
  margin: 0;
}
.main-circle{
  width: 200px;
  height: 200px;
  /*定义动画效果，对应的"infinite",动画无限次播放，对应的"linear",动画从头到尾的速度是相同的。*/
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /*重复径向渐变 从中心开始沿着四周产生渐变效果，模拟出唱片那种感觉，不喜欢可以注释或删掉*/
  background: black repeating-radial-gradient(#111 0%, #000 5%);

}
.rotate{
  animation: circle 6s infinite linear;
}
.not-rotate{
  animation: circle 6s infinite linear;
animation-play-state: paused
}
.circle{
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  border-radius: 100%;
  background-color: red;
  /*看不出旋转效果，所以使用图片*/
  /*background-image: url('https://p6.qhimg.com/bdr/__85/t01855d063269cef1fe.jpg');*/
  background-size: cover;
}
/*白色圆心，不需要可以直接删除，或者把背景色删掉或改为透明*/
.circle-heart{
  width: 20px;
  height: 20px;
  margin: 0 auto;
  border-radius: 100%;
  background-color: #FFF;
}
@keyframes circle{
  0%{
    /*transform对元素进行旋转、缩放、移动或倾斜。以下就是旋转0度。*/
    transform: rotate(0deg);
  }
  100%{
    /*以下就是旋转360度*/
    transform: rotate(360deg);
  }

}

</style>
