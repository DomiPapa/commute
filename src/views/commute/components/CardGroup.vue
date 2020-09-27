<template>
  <v-item-group active-class="primary">
    <v-container>
      <v-row>
        <v-col v-for="(item, index) in iterms" :key="index" cols="12" md="4">
          <v-item>
            <v-card color="#385F73" dark class="pa-2">
              <v-card-title class="headline d-flex">
                <span>{{ item.time }}</span>
                <span class="pl-4">{{ item.loc[0] }}</span>
                <span class="pl-4">
                  <v-icon>{{ mdiArrowRightBold }}</v-icon>
                </span>
                <span class="pl-4">{{ item.loc[1] }}</span>
              </v-card-title>
              <v-divider :inset="inset"></v-divider>
              <v-card-subtitle class="d-flex">
                <span class="pl-2">最大： {{ item.payload }}</span>
                <span class="pl-2" v-if="item.status">您的位置：</span>
                <span class="pl-2" v-else>已排：</span>
                <span>{{ item.rank }}</span>
              </v-card-subtitle>

              <v-card-actions class="justify-end">
                <v-btn v-if="item.status" depressed color="error">
                  取消排队
                </v-btn>
                <v-btn
                  class="ma-2 "
                  :loading="loading"
                  :disabled="loading"
                  color="primary"
                  @click="loader = 'loading'"
                  v-else
                >
                  排队
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>
<script>
import { mdiArrowRightBold } from '@mdi/js'
export default {
  name: 'CardGroup',
  data: () => {
    return {
      mdiArrowRightBold,
      loading: false,
      loader: null,
      inset: false,
      iterms: [
        {
          time: '8:00',
          loc: ['达州基地', '采气厂'],
          payload: '20',
          rank: '5',
          status: false
        },
        {
          time: '10:00',
          loc: ['达州基地', '采气厂'],
          payload: '20',
          rank: '5',
          status: true
        },
        {
          time: '12:00',
          loc: ['达州基地', '采气厂'],
          payload: '20',
          rank: '5',
          status: false
        },
        {
          time: '14:00',
          loc: ['达州基地', '采气厂'],
          payload: '20',
          rank: '5',
          status: false
        }
      ]
    }
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    }
  }
}
</script>
