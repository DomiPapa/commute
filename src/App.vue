<template>
  <div id="app">
    <router-view :key="key" />
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi'
import store from '@/store'
// 钉钉处理逻辑
try {
  dd.ready(function() {
    // dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
    try {
      dd.runtime.permission.requestAuthCode({
        corpId: 'ding0a9fbc06157f3c1a35c2f4657eb6378f',
        onSuccess: function(result) {
          //通过corpId，code获取userid
          // 设定一下用户信息
          console.log('result.code成功' + result.code)
          store
            .dispatch('user/fetchUserLoginInfo', {
              authCode: result.code
            })
            .then(res => {
              console.log('fetchUserLoginInfo执行结果' + res)
              // 刷一下时间
              store.dispatch('rank_info/handleDate')
              // 获取一下用户订单信息
              console.log(
                `刷取时间${store.getters.reservationDateInfo.startTime}`
              )
              store
                .dispatch('user/fetchUserReservationInfo', {
                  uid: store.getters.userId,
                  startTime: store.getters.reservationDateInfo.startTime,
                  endTime: store.getters.reservationDateInfo.endTime
                })
                .catch(err => {
                  console.log(err)
                })
            })
            .catch(err => {
              console.log(err)
            })
        },
        onFail: function(err) {
          console.log('corpID失败了' + err)
        }
      })
    } catch (e) {
      console.log(e)
    }
  })
} catch (error) {
  console.log(error)
  console.log('钉钉环境未到位')
}

export default {
  name: 'App',
  computed: {
    key() {
      return this.$route.path
    }
  },
  methods: {
    handleDD() {
      console.log('执行handleDD')
    },
    handleLocal() {
      alert('执行了本地环境！联系管理员')
      store
        .dispatch('user/fetchUserLoginInfo', {
          authCode: 'e7d9b4468e8039ce9d3f808dd23da810'
        })
        .then(res => {
          alert('res.userId成功' + res)
          // 刷一下时间
          store.dispatch('rank_info/handleDate')
          // 获取一下用户订单信息
          store.dispatch('user/fetchUserReservationInfo', {
            uid: store.getters.userId,
            startTime: store.getters.reservationDateInfo.startTime,
            endTime: store.getters.reservationDateInfo.endTime
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    console.log('AppvueCreated')
    // 处理钉钉获取逻辑
    this.handleDD()
    // 本地调试环境
    // this.handleLocal()
  }
}
</script>
