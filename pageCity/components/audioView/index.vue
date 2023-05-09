<template>
  <view class="audio-view">
    <view class="play-button-area">
      <image class="icon-play" :src="playImage" @click="play"></image>
    </view>
    <view class="play-silder" v-if="isPlaying && type == 1">
      <view class="audio-time">
        <text>{{ currentTimeStr }}</text>
      </view>
      <view class="audio-siler">
        <slider
          :value="position"
          :min="0"
          :max="duration"
          @changing="onchanging"
          @change="onchange"
        ></slider>
      </view>
      <view class="audio-time">
        <text>{{ timeStr }}</text>
      </view>
    </view>
  </view>
</template>
<script>
// const audioUrl =
//   'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3'
export default {
  name: 'audioView',
  props: ['audioUrl', 'type'],
  data() {
    return {
      title: 'innerAudioContext',
      isPlaying: false,
      isPlayEnd: false,
      currentTime: 0,
      currentTimeStr: '00:00',
      duration: 100,
      timeStr: '00:00:00',
    }
  },
  computed: {
    position() {
      return this.isPlayEnd ? 0 : this.currentTime
    },
    playImage() {
      return this.isPlaying
        ? '/pageCity/static/images/pause.png'
        : '/pageCity/static/images/mp3.png'
    },
  },
  mounted() {
    this._isChanging = false
    this._audioContext = null
    // this.createAudio()
  },
  onUnload() {
    if (this._audioContext != null && this.isPlaying) {
      this.stop()
    }
  },
  methods: {
    createAudio() {
      var innerAudioContext = (this._audioContext =
        uni.createInnerAudioContext())
      innerAudioContext.autoplay = false
      innerAudioContext.src = this.audioUrl
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
      innerAudioContext.onCanplay(() => {
        let timeid = setInterval(() => {
          if (innerAudioContext.duration) {
            clearInterval(timeid)
            this.duration = innerAudioContext.duration || 0
            // console.log(this.duration)
            this.timeStr = this.formatSecond(this.duration)
          }
        }, 500)
      })
      innerAudioContext.onTimeUpdate((e) => {
        if (this._isChanging === true) {
          return
        }
        this.currentTime = innerAudioContext.currentTime || 0
        this.duration = innerAudioContext.duration || 0
        this.currentTimeStr = this.formatTime(this.currentTime)
        //进度条最大值
        // this.timeStr = this.formatSecond(this.duration);
      })
      innerAudioContext.onEnded(() => {
        this.currentTime = 0
        this.currentTimeStr = this.formatTime(this.currentTime)
        this.isPlaying = false
        this.isPlayEnd = true
      })
      innerAudioContext.onError((res) => {
        this.isPlaying = false
        // console.log(res.errMsg)
        // console.log(res.errCode)
      })
      return innerAudioContext
    },
    onchanging() {
      this._isChanging = true
    },
    onchange(e) {
      // console.log(e.detail.value)
      // console.log(typeof e.detail.value)
      this._audioContext.seek(e.detail.value)
      this._isChanging = false
      const currTimeStr = this.formatTime(e.detail.value)
      this.currentTimeStr = currTimeStr
    },
    play() {
      if (this.isPlaying) {
        this.pause()
        return
      }
      this.createAudio()
      this.isPlaying = true
      this._audioContext.play()
      this.isPlayEnd = false
    },
    pause() {
      this._audioContext.pause()
      this.isPlaying = false
    },
    stop() {
      this._audioContext.stop()
      this.isPlaying = false
    },
    formatTime(num) {
      //格式化时间格式
      num = num.toFixed(0)
      let second = num % 60
      if (second < 10) second = '0' + second
      let min = Math.floor(num / 60)
      if (min < 10) min = '0' + min
      return min + ':' + second
    },
    /**
     * 格式化时间
     * @param {String} date 原始时间格式
     * 格式后的时间：hh:mm:ss
     **/
    formatSecond(seconds) {
      var h =
        Math.floor(seconds / 3600) < 10
          ? '0' + Math.floor(seconds / 3600)
          : Math.floor(seconds / 3600)
      var m =
        Math.floor((seconds / 60) % 60) < 10
          ? '0' + Math.floor((seconds / 60) % 60)
          : Math.floor((seconds / 60) % 60)
      var s =
        Math.floor(seconds % 60) < 10
          ? '0' + Math.floor(seconds % 60)
          : Math.floor(seconds % 60)
      return h + ':' + m + ':' + s
    },
  },
}
</script>
<style>
.audio-view {
  display: flex;
  justify-content: space-between;
  /* border: 1rpx #dadada solid; */
  padding: 10rpx 10rpx;
  /* background-color: #ffffff; */
}

.play-time-area {
  display: flex;
  flex-direction: row;
}

.audio-time {
  width: 150rpx;
  line-height: 80rpx;
}

.duration {
  margin-left: auto;
}

.audio-siler {
  width: 100%;
}

.play-silder {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.play-button-area {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100rpx;
}

.icon-play {
  margin: auto 0;
  width: 50rpx;
  height: 50rpx;
  /* margin-top: 5rpx; */
}
</style>
