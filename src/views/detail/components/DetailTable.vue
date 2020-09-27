<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">姓名</th>
          <th class="text-left">名次</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in desserts" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.rank }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
export default {
  name: 'DetailTable',
  data() {
    return {
      desserts: [
        {
          name: '张三',
          rank: 1
        },
        {
          name: '李四',
          rank: 2
        },
        {
          name: '王五',
          rank: 3
        }
      ]
    }
  }
}
</script>
