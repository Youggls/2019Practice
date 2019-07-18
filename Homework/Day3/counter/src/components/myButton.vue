<template>
  <button type="button" v-bind:id="btnId" v-bind:class="getClass" @click="clickBtn">{{message}}</button>
</template>

<script>
export default {
  name: 'myButton',
  data () {
    return {
      msg: 'hello'
    }
  },
  props: {
    message: {
      type: String,
      default: 'Button'
    },
    btnType: {
      type: String,
      default: 'blue'
    },
    btnId: {
      type: String,
      default: 'countUp'
    }
  },
  methods: {
    clickBtn: function () {
      if (this.btnId + '' === 'countup') {
        this.$emit('countUp')
      } else if (this.btnId + '' === 'countdown') {
        this.$emit('countDown')
      } else if (this.btnId + '' === 'pause') {
        this.$emit('pause')
      } else if (this.btnId + '' === 'resume') {
        this.$emit('resume')
      } else if (this.btnId + '' === 'restart') {
        this.$emit('restart')
      } else if (this.btnId + '' === 'clear') {
        this.$emit('clear')
      }
    }
  },
  computed: {
    getClass: function () {
      if (this.btnType + '' === 'blue') {
        return 'btnshape ' + 'bluebtn'
      } else if (this.btnType + '' === 'clear') {
        return 'btnshape ' + 'clearbtn'
      } else if (this.btnType + '' === 'restart') {
        return 'btnshape ' + 'restartbtn'
      }
    }
  }
}
</script>

<style scoped>
.btnshape {
  position: relative;
  font-family: PingFangSC-Regular;
  width: 98px;
  height: 40px;
  color: #ffffff;
  font-size: 16px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  border: 0;
}

.bluebtn {
  margin-left: 20px;
  background: #2188e9;
  margin-top: 15px;
}

.clearbtn {
  margin-left: 599px;
  background: #DD2E1D;
  margin-top: 15px;
}

.restartbtn {
  margin-left: 20px;
  margin-top: 15px;
  background: #FFB020;
}
</style>
