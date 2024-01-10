<template>
  <view @touchstart="touchStart" @touchend="touchEnd">
    <slot></slot>
  </view>
</template>

<script>
export default {
  name: "touch-listen",
  props: {
    delta: {
      type: Number,
      default: 50
    }
  },
  data() {
    return {
      touchStartX: 0, // 触屏起始点x
      touchStartY: 0, // 触屏起始点y
    };
  },
  methods: {
    /**
     * 触摸开始
     **/
    touchStart(e) {
      // console.log("触摸开始")
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    },

    /**
     * 触摸结束
     **/
    touchEnd(e) {
      // console.log("触摸结束")
      let deltaX = e.changedTouches[0].clientX - this.touchStartX;
      let deltaY = e.changedTouches[0].clientY - this.touchStartY;
      // X轴的滑动距离大于 delta，且此次事件是以X轴移动为主（左滑或者右滑）；
      if (Math.abs(deltaX) > this.delta && Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX >= 0) {
          console.log("右滑")
          this.$emit('scrollRight')
        } else {
          console.log("左滑")
          this.$emit('scrollLeft')
        }
        // Y轴的滑动距离大于 delta，且此次事件是以Y轴移动为主（上滑或者下滑）；
      } else if (Math.abs(deltaY) > this.delta && Math.abs(deltaX) < Math.abs(deltaY)) {
        if (deltaY < 0) {
          console.log("上滑")
          this.$emit('scrollTop')
        } else {
          console.log("下滑")
          this.$emit('scrollBottom')
        }
        // 两轴位移都特别小，可以判断是点击
      } else if (Math.abs(deltaY) < 25 && Math.abs(deltaX) < 25) {
        console.log("点击")
        this.$emit('fingerClick')
      } else {
        console.log("可能是误触")
      }
    },
  }
}
</script>
