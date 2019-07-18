<template>
    <label v-bind:for="inputid" v-bind:class="getClass">
      <input v-bind:id="inputid" @blur="check" placeholder="0" class="timeinput" v-model="value">
    </label>
</template>

<script>
export default {
  name: 'myInput',
  data () {
    return {
      value: ''
    }
  },
  props: {
    inputid: {
      type: String
    }
  },
  methods: {
    check: function () {
      this.checkIsInteger()
      if (this.inputid + '' === 'hour') {
        if (this.value < 0) {
          this.value = 0
        }
      } else {
        if (this.value < 0) {
          this.value = 0
        } else if (this.value >= 60) {
          this.value = 59
        }
      }
    },
    checkIsInteger: function () {
      let num = this.value + ''
      if (num.trim() + '' === '') {
        this.value = null
      } else if (num + '' === '' || num + '' === 'undefined' || num === undefined || num === null) {
        return false
      } else {
        if (!isNaN(num)) {
          this.value = Math.round(parseFloat(num))
          return true
        } else {
          this.value = null
          return false
        }
      }
    },
    sendValue: function () {
      if (this.checkIsInteger()) {
        this.$emit('get' + this.inputid, this.value)
        return true
      } else {
        this.$emit('get' + this.inputid, 0)
        return false
      }
    },
    clearInput: function () {
      this.value = null
    }
  },
  computed: {
    getClass: function () {
      if (this.inputid + '' === 'hour') {
        return 'label ' + 'hour'
      } else if (this.inputid + '' === 'minute') {
        return 'label ' + 'minute'
      } else if (this.inputid + '' === 'second') {
        return 'label ' + 'second'
      }
    }
  }
}
</script>

<style scoped>
input.timeinput {
  font-family: PingFangSC-Regular;
  color: #222222;
  width: 70px;
  height: 40px;
  border-radius: 5px;
  border: 0;
  padding: 0;
  text-indent: 9px;
}

input::-webkit-input-placeholder {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #afafaf;
  text-indent: 9px;
  vertical-align: center;
}

.label {
  position: relative;
  margin-top: 15px;
  margin-bottom: 15px;
  width: 70px;
  height: 40px;
  display: inline-block;
}

.hour {
  margin-left: 0;
}

.minute {
  margin-left: 20px;
}

.second {
  margin-left: 20px;
}

.hour::after {
  content: "时";
  position: absolute;
  right: 9px;
  top: 9px;
  width: 32px;
  height: 22px;
  text-align: right;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #222222;
}

.minute::after {
  content: "分";
  position: absolute;
  right: 9px;
  top: 9px;
  width: 32px;
  height: 22px;
  text-align: right;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #222222;
}

.second::after {
  content: "秒";
  position: absolute;
  right: 9px;
  top: 9px;
  width: 32px;
  height: 22px;
  text-align: right;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #222222;
}
</style>
