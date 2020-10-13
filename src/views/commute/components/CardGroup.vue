<template>
  <div>
    <error-alert :alert="alert" />
    <v-item-group active-class="primary">
      <v-container>
        <v-row>
          <v-col v-for="(item, index) in iterms" :key="index" cols="12" md="4">
            <v-item>
              <v-card color="#fff" class="pa-2">
                <v-card-title class="headline d-flex ml-2">
                  <span>{{ item.time }}</span>
                  <span class="pl-4">{{ item.loc[0] }}</span>
                  <span class="pl-4">
                    <v-icon>{{ mdiArrowRightBold }}</v-icon>
                  </span>
                  <span class="pl-4">{{ item.loc[1] }}</span>
                </v-card-title>
                <v-divider :inset="inset"></v-divider>
                <v-card-text class="ml-2 d-flex justify-space-between">
                  <div class="d-flex flex-column text-center">
                    <span>总座位数</span>
                    <span>{{ item.payload }}</span>
                  </div>
                  <div
                    class="d-flex flex-column text-center"
                    @click="checkDetail(item)"
                  >
                    <span>剩余座位</span>
                    <span>{{ item.rank }}</span>
                  </div>
                  <div class="ma-1">
                    <v-btn
                      v-if="item.status"
                      depressed
                      color="error"
                      @click="cancelRank(item)"
                    >
                      取消预约
                    </v-btn>
                    <v-btn
                      class=""
                      color="primary"
                      @click="handleRank(item)"
                      v-else
                    >
                      预约
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
    <v-dialog v-model="order_dialog" width="800px">
      <v-card>
        <v-card-title class="">
          填写乘车人信息
        </v-card-title>
        <v-container>
          <v-row class="mx-2">
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-account"
                placeholder="姓名"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-briefcase"
                placeholder="单位"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="tel"
                prepend-icon="mdi-phone"
                placeholder="电话号码"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions class="justify-end">
          <v-btn text color="primary" @click="order_dialog = false">
            取消
          </v-btn>
          <v-btn text @click="handleOrderSubmit">提交</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="cancel_dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">
          您确定要取消预约吗？
        </v-card-title>

        <v-card-text v-if="current_item">
          <v-list dense>
            <v-list-item>
              <v-list-item-content>时间:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ current_item.time }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>往返地:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ current_item.loc[0] }} — {{ current_item.loc[1] }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>剩余座位:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ current_item.rank }}
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="normal" @click="cancel_dialog = false">
            返回
          </v-btn>
          <v-btn color="error" @click="handleCancelSubmit">
            确定取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import store from '@/store'
import ErrorAlert from '@/components/ErrorAlert'
import { mdiArrowRightBold } from '@mdi/js'
export default {
  name: 'CardGroup',
  components: {
    ErrorAlert
  },
  data: () => {
    return {
      mdiArrowRightBold,
      inset: false,
      order_dialog: false,
      cancel_dialog: false,
      iterms: [],
      current_item: null,
      alert: {
        toggle: false,
        message: ''
      }
    }
  },
  methods: {
    handleRank(item) {
      console.log('rank')
      this.current_item = item
      this.order_dialog = true
    },
    cancelRank(item) {
      console.log('cancelRank')
      this.current_item = item
      this.cancel_dialog = true
    },
    checkDetail(item) {
      store.commit('bus_info/SET_CURRENT_ITEM_ID', item.id)
      this.$router.push('/detail')
    },
    handleOrderSubmit() {
      console.log('handleOrderSubmit')
      this.refreshBusInfo()
      this.order_dialog = false
    },
    handleCancelSubmit() {
      console.log('handleCancelSubmit')
      this.refreshBusInfo()
      this.cancel_dialog = false
    },
    async refreshBusInfo() {
      try {
        const { data } = await store.dispatch('bus_info/fetchBusInfo')
        this.iterms = data
      } catch (error) {
        console.log('create阶段捕捉的错误' + error)
        this.alert.toggle = true
        this.alert.message = '未能从服务器拉取数据'
      }
    }
  },
  created() {
    this.refreshBusInfo()
  }
}
</script>
<style lang="scss" scoped></style>
