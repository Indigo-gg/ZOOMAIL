<template>
<div class="date-box flex-col-around">
  <div class="avatar flex-row-center">
    <van-image
        round
        width="15vw"
        height="15vw"
        :src="require('@/assets/avatar/fan.jpg')"
    />
    <van-icon name="like" size="2em" color="#F98981" />
    <van-image
        round
        width="15vw"
        height="15vw"
        :src="require('@/assets/avatar/dan.jpg')"
    />



  </div>
  <div class="day-box flex-row-space-around">
    <div class="Day my-flex-center" v-if="showDate.day<=99">{{showDate.day}}</div>
    <div class="Day-100 my-flex-center" v-else-if="showDate.day<=999">{{showDate.day}}</div>

    <div class="day-tip my-flex-center">天</div>
  </div>
  <div class="time-box flex-row-space-around">
    <div class="Time">
      {{showDate.hour}}
    </div>
    <div class="time-tip">
      时
    </div>
    <div class="Time">
      {{showDate.minute}}
    </div>
    <div class="time-tip">
      分
    </div>
    <div class="Time">
      {{showDate.second}}
    </div>
    <div class="time-tip">
      秒
    </div>
  </div>
</div>
</template>
<script>
import {OurDate,constantDate} from '@/views/config/date.config'
import {onBeforeMount, onMounted, reactive} from "vue";
import dayjs from "dayjs";
export default {
  name: "date",
  setup(){
    let oriDate={
      day:0,
      hour:0,
      minute:0,
      second:0
    }
    const counter=(showDate)=>{
      // let left=0
      // showDate.day=Math.floor(Time/constantDate.Day)
      // left=Time-showDate.day*constantDate.Day
      // showDate.hour=Math.floor((left/constantDate.Hour))
      // left-=showDate.hour*constantDate.Hour
      // showDate.minute=Math.floor((left/constantDate.Minute))
      // left-=showDate.minute*constantDate.Minute
      // showDate.second=Math.floor((left/constantDate.Second))
      // Time+=constantDate.Second
      let now=dayjs()
      let loveDay=dayjs(OurDate.FALL_IN_LOVE)
      showDate.day=now.diff(loveDay,'day')
      showDate.hour=now.diff(loveDay,'hour')%constantDate.Hour
      showDate.minute=now.diff(loveDay,'minute')%constantDate.Minute
      showDate.second=now.diff(loveDay,'second')%constantDate.Second

    }

    counter(oriDate)
    let showDate=reactive(oriDate)

    onBeforeMount(()=>{
      counter(showDate)
    })
    onMounted(()=>{
      setInterval(()=>{
        counter(showDate)
      },1000)
    })
   return{
      showDate
   }
  }
}
</script>

<style scoped>
.date-box{
  width: 100%;
  height: 12em;
  margin-bottom: 5vw;
  /*font-size: ;*/
}
.day-box{
  width: 100%;
  font-size: 24px;
  font-weight: 700;
}
.Day{
  font-size: 12vw;
  width: 4em;
  height: 4em;
  color: #4b4a4a;
  background-color: rgb(151, 213, 212);
  border-radius: 10px;
  padding: 3px;
}
.Day-100{
  font-size: 12vw;
  width: 20vw;
  height: 20vw;
  color: #4b4a4a;
  background-color: rgb(151, 213, 212);
  border-radius: 10px;
  padding: 3px;
}
.day-tip{
  vertical-align: center;
  font-size: 10vw;
  /*background-color: rgb(151, 213, 212);*/
  /*border-radius: 3px;*/
  /*padding:3px 0;*/
}
.Time{
  font-size: 16px;
  height: 2em;
  color: #494c49;
  width: 2em;
  line-height: 2em;
  border-radius: 4px;
  background-color: rgba(243, 87, 174, 0.40);
  font-weight: bold;
}
.time-tip{
  font-size: 16px;
  color: #4b4a4a;
  height: 2em;
  line-height: 2em;
}
</style>
