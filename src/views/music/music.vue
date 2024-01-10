<template>
<div class="music">
  <div class="list" v-show="isShowList">
    <div class="song" v-for="song in playlist" :key="song.id" @click="selectSong(song)">
      {{song.name}}
    </div>
  </div>
  <div class="box">
    <div class="nav" @click="prevSong"></div>
    <music-box ref="musicBox"
               :song="currentSong"
               @handleEnd="handleEnd"
    ></music-box>
    <div class="nav" @click="nextSong"></div>
  </div>
</div>
</template>

<script>
// import {secondGet} from "@/api/env.config";
import {getPlaylist} from "@/api/music";
import { reactive, ref} from "vue";
import music from "@/views/config/music";
import MusicBox from "@/views/music/component/music-box";
// import TouchListen from "@/components/touch/touch-listen";
export default {
  name: "music",
  components: { MusicBox},
  setup(){
    let musicBox=ref()
  let currentSong=reactive({
    index:0,
    name:'',
    al:{},
    id:0,
    info:'',
    ar:{}
  })
    let isShowList=ref(false)
    let playlist=ref([])
    console.log('进入八音盒')
      /**
     * 音乐播放相关
     */

    /**
     * initCurrentSong:改变当前选中的的歌曲
     * 并且触发子组件中的信息
     */
    const initCurrentSong=(song,index)=>{
      currentSong.name=song.name
      currentSong.al=song.al
      currentSong.id=song.id
      currentSong.ar=song.ar
      currentSong.index=index
      // nextTick(()=>{
      //   musicBox.value.initSong(song)
      // })

    }
    /**
     * 获取歌单列表
     * @param id
     */
    const initPlaylist=(id)=>{
      getPlaylist({id:id}).then(res=>{
        playlist.value=res.playlist.tracks
        console.log('playlist',playlist)
        initCurrentSong(playlist.value[0],0)
      })
    }
    /**
     * 选中当前歌曲
     * @param song
     */
    const selectSong=(song,index)=>{
      console.log('当前切换的music',song)
      initCurrentSong(song,index)
    }
    /**
     * 播放完毕触发的事件
     */

    const handleEnd=()=>{
      nextSong()
    }
    /**
     * 更换下一首歌
     */
    const nextSong=()=>{
      musicBox.value.pause()
      selectSong(playlist.value[(currentSong.index+1)%playlist.value.length],(currentSong.index+1)%playlist.value.length)
      // musicBox.value.play()
    }
    /**
     * 更换上一首歌
     */
    const prevSong=()=>{
      musicBox.value.pause()
      selectSong(playlist.value[(currentSong.index-1+playlist.value.length)%playlist.value.length],
          (currentSong.index-1+playlist.value.length)%playlist.value.length)
      // musicBox.value.play()
    }
    /**
     * 播放
     */
    const play=()=>{
      musicBox.value.play()
    }
    /**
     * 播放
     */
    const pause=()=>{
      musicBox.value.pause()
    }

    // onMounted(()=>{
      // initSong()
      initPlaylist(music.myPlaylistId)
    // })

    return{
      currentSong,
      initPlaylist,
      playlist,
      isShowList,
      selectSong,
      musicBox,
      nextSong,
      handleEnd,
      prevSong,
      play,
      pause

    }



  }
}
</script>

<style scoped>
.music{
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background:url("../../assets/background/20.jpg") no-repeat;
  background-size: 100% auto;
  /*background-color: #42b983;*/

}
.box{
  display: flex;
  /*flex-direction: column;*/
  align-items: center;
  justify-content: center;
  height: 80vw;
  width: 80vw;
  margin-bottom: 5vh;
  border-radius: 10px;
  background-color: rgb(0, 162, 216,0.4);
  /*margin-bottom: 10vh;*/
}
.list{
  position: absolute;
  top: 10px;
  right: 10px;
}
/*.song{*/
/*  padding: 20px;*/
/*}*/
.nav{
  /*height: 40px;*/
  height: 0;
  width: 0;
  /*width: 40px;*/
  transition: opacity 0.2s;
  position: relative;
}
.nav::after{
  display: inline-block;
  position: absolute;
  /*margin-top: 40px;*/
  top: 100%;
  left: 100%;
  /*border-left:0;*/
  /*border-top:0;*/
  /*border-bottom:0;*/
  /*border-right:#66f1d2 50px solid;*/
 /*padding: 0 0 50px 0;*/
  padding: 30px;
  opacity: 0;
  border-radius: 50%;
  background-color: #66f1d2;
  content: '';
  transform: translate(-50%, -50%);
}
.nav:active::after{
  opacity: 0.5;
}
</style>
