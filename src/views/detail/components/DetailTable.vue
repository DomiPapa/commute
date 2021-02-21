<template>
  <v-simple-table fixed-header class="mytb">
    <error-alert :alert="alert" />
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">名次</th>
          <th class="text-left">姓名</th>
          <th class="text-left">乘车点</th>
          <th class="text-left">电话</th>
          <th class="text-left">单位</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in rankInfos" :key="item.id">
          <td>{{ item.rank || index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td class="pup">{{ item.pickUpPoint }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.department }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
import store from '@/store'
import ErrorAlert from '@/components/ErrorAlert'
export default {
  name: 'DetailTable',

  data() {
    return {
      rankInfos: [],
      alert: {
        toggle: false,
        message: ''
      }
    }
  },
  components: {
    ErrorAlert
  },
  created() {
    void (async () => {
      try {
        const { data } = await store.dispatch('rank_info/fetchRankInfo', {
          sid: store.getters.currentItemId
        })
        console.log('获取排名数据-->')
        console.log(data)
        this.rankInfos = data
      } catch (error) {
        this.alert.toggle = true
        this.alert.message = '未能从服务器拉取数据'
      }
    })()
  }
}
</script>
<style scoped>
.mytb {
  word-break: keep-all;
}
.pup {
  color: red;
  font-weight: 600;
}
</style>
