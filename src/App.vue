<template>
  <div id="app">
    <router-view :key="key" />
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi'
import store from '@/store'
try {
  dd.ready(function() {
    // dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
    try {
      alert('进入try块了')
      dd.device.notification.alert({
        message: '钉钉环境到位了',
        title: '提示', //可传空
        buttonName: '收到'
      })
      dd.runtime.permission.requestAuthCode({
        corpId: 'ding0a9fbc06157f3c1a35c2f4657eb6378f',
        onSuccess: function(result) {
          alert('corpId对了')
          alert(result.code)
          //通过corpId，code获取userid
          console.log(result.code)
          store
            .dispatch('user/fetchUserInfo', {
              authCode: result.code
            })
            .then(res => {
              alert('userId请求成功')
              alert(res.userId)
            })
            .catch(alert('请求失败'))
        },
        onFail: function(err) {
          console.log(JSON.stringify(err))
          alert('corpID失败了')
          alert(err)
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
  }
}
</script>
