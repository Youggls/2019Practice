<template>
  <div v-on:keyup.enter="start" v-on:keyup.space="pauseOrResume">
    <header class="myheader">
      <form v-show="myStat == '1'" class="myform">
        <my-input ref="hour" @gethour="getHour" inputid="hour"></my-input>
        <my-input ref="minute" @getminute="getMinute" inputid="minute"></my-input>
        <my-input ref="second" @getsecond="getSecond" inputid="second"></my-input>
        <my-button btnId="countup" message="开始正计时" @countUp="countUp()"></my-button>
        <my-button btnId="countdown" message="开始倒计时" @countDown="countDown()"></my-button>
      </form>
      <form v-show="myStat == '2'" class="myform">
        <label id="hint" class="hint">{{showLabel}}</label>
        <my-button btnId="pause" message="暂停计时器" @pause="pause()"></my-button>
        <my-button btnId="clear" btnType="clear" message="清空计时器" @clear="clear()"></my-button>
        <my-button btnId="restart" btnType="restart" message="重新再计时" @restart="restart()"></my-button>
      </form>
      <form v-show="myStat == '3'" class="myform">
        <label id="hint" class="hint">{{showLabel}}</label>
        <my-button btnId="resume" message="恢复计时器" @resume="resume()"></my-button>
        <my-button btnId="clear" btnType="clear" message="清空计时器" @clear="clear()"></my-button>
        <my-button btnId="restart" btnType="restart" message="重新再计时" @restart="restart()"></my-button>
      </form>
      <form v-show="myStat == '4'" class="myform">
        <label id="hint" class="hint">{{showLabel}}</label>
        <my-button btnId="clear" btnType="clear" message="清空计时器" @clear="clear()"></my-button>
        <my-button btnId="restart" btnType="restart" message="重新再计时" @restart="restart()"></my-button>
      </form>
    </header>
    <div class="currenttime">
      <span id="time" class="timestyle">{{this.formatTime(restTime)}}</span>
    </div>
  </div>
</template>

<script>
import myButton from './components/myButton'
import myInput from './components/myInput'
import { setInterval, clearInterval } from 'timers'
export default {
  name: 'App',
  data () {
    return {
      myStat: this.stat,
      isCountUp: true,
      restTime: 0,
      totalTime: 0,
      timmer: 0,
      timeAccuracy: 100
    }
  },
  props: {
    stat: {
      type: String,
      default: '1'
    }
  },
  components: {
    myButton,
    myInput
  },
  mounted: function () {
    document.onkeydown = this.keyDown
  },
  methods: {

    keyDown: function () {
      let key = window.event.keyCode
      if (key === 32) {
        this.pauseOrResume()
      } else if (key === 13) {
        this.start()
      }
    },

    pause: function () {
      this.myStat = '3'
      this.timmer = clearInterval(this.timmer)
    },

    resume: function () {
      this.myStat = '2'
      if (this.isCountUp) {
        this.timmer = setInterval(this.increaseRestTime, this.timeAccuracy)
      } else {
        this.timmer = setInterval(this.decreaseRestTime, this.timeAccuracy)
      }
    },

    restart: function () {
      this.myStat = '2'
      this.timmer = clearInterval(this.timmer)
      if (this.isCountUp) {
        this.restTime = 0
        this.timmer = setInterval(this.increaseRestTime, this.timeAccuracy)
      } else {
        this.restTime = this.totalTime
        this.timmer = setInterval(this.decreaseRestTime, this.timeAccuracy)
      }
    },

    clear: function () {
      this.timmer = clearInterval(this.timmer)
      this.myStat = '1'
      this.isCountUp = true
      this.totalTime = 0
      this.restTime = 0
      this.$refs.hour.clearInput()
      this.$refs.minute.clearInput()
      this.$refs.second.clearInput()
    },

    decreaseRestTime: function () {
      if (this.restTime - this.timeAccuracy < 0) {
        this.myStat = 4
        this.timmer = clearInterval(this.timmer)
      } else {
        this.restTime -= this.timeAccuracy
        if (this.restTime <= 0) {
          this.myStat = 4
          this.timmer = clearInterval(this.timmer)
        }
      }
    },

    increaseRestTime: function () {
      if (this.restTime + this.timeAccuracy > this.totalTime) {
        this.myStat = 4
        this.timmer = clearInterval(this.timmer)
      } else {
        this.restTime += this.timeAccuracy
        if (this.restTime >= this.totalTime) {
          this.myStat = 4
          this.timmer = clearInterval(this.timmer)
        }
      }
    },

    countUp: function () {
      if (this.$refs.hour.sendValue() &&
          this.$refs.minute.sendValue() &&
          this.$refs.second.sendValue()) {
        this.myStat = 2
        this.isCountUp = true
        this.timmer = setInterval(this.increaseRestTime, this.timeAccuracy)
      }
    },

    countDown: function () {
      if (this.$refs.hour.sendValue() &&
          this.$refs.minute.sendValue() &&
          this.$refs.second.sendValue()) {
        this.myStat = 2
        this.isCountUp = false
        this.restTime = this.totalTime
        this.timmer = setInterval(this.decreaseRestTime, this.timeAccuracy)
      }
    },

    start: function () {
      if (this.myStat + '' === '1') {
        this.countUp()
      }
    },

    pauseOrResume: function () {
      if (this.myStat + '' === '2') {
        this.pause()
      } else if (this.myStat + '' === '3') {
        this.resume()
      }
    },

    getHour: function (hour) {
      this.totalTime += hour * 60 * 60 * 1000
    },

    getMinute: function (minute) {
      this.totalTime += minute * 60 * 1000
    },

    getSecond: function (second) {
      this.totalTime += second * 1000
    },

    formatTime: function (ms) {
      let hour = parseInt((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      let minute = parseInt((ms % (1000 * 60 * 60)) / (1000 * 60))
      let second = parseInt((ms % (1000 * 60)) / 1000)
      if (hour < 10) {
        hour = '0' + hour
      }
      if (minute < 10) {
        minute = '0' + minute
      }
      if (second < 10) {
        second = '0' + second
      }
      return hour + ':' + minute + ':' + second
    }
  },
  computed: {
    pauseOrResumeBtnMsg: function () {
      if (this.isCountUp) {
        return '正计时'
      } else {
        return '倒计时'
      }
    },
    showLabel: function () {
      let revMsg = ''
      if (this.myStat + '' === '4') {
        if (this.isCountUp) {
          revMsg += '正计时'
        } else {
          revMsg += '倒计时'
        }
        revMsg = revMsg + ' ' + this.formatTime(this.totalTime)
        revMsg += ' 已结束'
      } else if (this.myStat + '' === '2' || this.myStat + '' === '3') {
        if (this.myStat + '' === '2') {
          revMsg += '正在'
        } else {
          revMsg += '暂停'
        }
        if (this.isCountUp) {
          revMsg += '正计时'
        } else {
          revMsg += '倒计时'
        }
        revMsg += ' ' + this.formatTime(this.totalTime)
      }
      return revMsg
    }
  }
}
</script>

<style scope>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.currenttime {
  position: relative;
  margin-top: 70px;
  text-align: center;
}

.timestyle {
  position: relative;
  display: inline-block;
  vertical-align: center;
  line-height: 200px;
  width: 960px;
  height: 200px;
  margin-top: 127px;
  font-family: PTMono-Bold;
  color: #333333;
  font-size: 200px;
}

.hint {
  font-family: PingFangSC-Regular;
  color: #ffffff;
  margin-left: 0;
  margin-top: 24px;
  font-size: 16px;
}

.myform {
  position: relative;
  width: 1140px;
  height: 70px;
  margin-left: auto;
  margin-right: auto;
  font-size: 0;
}

.myheader {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 70px;
  background: #97a5bc;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
</style>
