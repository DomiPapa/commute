<template>
  <v-simple-table fixed-header>
    <error-alert :alert="alert" />
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">名次</th>
          <th class="text-left">姓名</th>
          <th class="text-left">单位</th>
          <th class="text-left">电话</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in rankInfos" :key="item.rank">
          <td>{{ item.rank }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.unit }}</td>
          <td>{{ item.phone }}</td>
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
        const { data } = await store.dispatch({
          type: 'rank_info/fetchRankInfo',
          id: store.getters.currentItemId
        })
        this.rankInfos = data
      } catch (error) {
        this.alert.toggle = true
        this.alert.message = '未能从服务器拉取数据'
      }
    })()
  }
}
</script>
