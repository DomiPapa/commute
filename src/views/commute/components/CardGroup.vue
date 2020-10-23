<template>
  <div>
    <error-alert :alert="alert" />
    <v-item-group active-class="primary">
      <v-container>
        <v-row>
          <v-col
            v-for="(item, index) in resItems"
            :key="index"
            cols="12"
            md="4"
          >
            <v-item>
              <v-card color="#fff" class="pa-2">
                <v-card-title class="headline d-flex ml-2">
                  <span>{{ item.departureTime }}</span>
                  <span class="pl-4">{{ item.departure }}</span>
                  <span class="pl-4">
                    <v-icon>{{ mdiArrowRightBold }}</v-icon>
                  </span>
                  <span class="pl-4">{{ item.arrival }}</span>
                </v-card-title>
                <v-divider :inset="inset"></v-divider>
                <v-card-text class="ml-2 d-flex justify-space-between">
                  <div class="d-flex flex-column text-center">
                    <span>总座位数</span>
                    <span>{{ item.capacity }}</span>
                  </div>
                  <div
                    class="d-flex flex-column text-center"
                    @click="checkDetail(item)"
                  >
                    <span>剩余座位</span>
                    <span>{{ item.remaining }}</span>
                  </div>
                  <div class="ma-1">
                    <v-btn
                      v-if="item.orderId"
                      depressed
                      color="error"
                      @click="cancelRank(item)"
                    >
                      取消预约
                    </v-btn>
                    <v-btn v-else-if="item.remaining === 0" disabled>
                      已约满
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
            <v-form ref="form">
              <v-col cols="12">
                <v-text-field
                  prepend-icon="mdi-account"
                  placeholder="姓名"
                  v-model="passenger.name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  prepend-icon="mdi-briefcase"
                  placeholder="单位"
                  v-model="passenger.department"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  type="tel"
                  prepend-icon="mdi-phone"
                  placeholder="电话号码"
                  v-model="passenger.phone"
                ></v-text-field>
              </v-col>
            </v-form>
          </v-row>
        </v-container>
        <v-card-actions class="justify-end">
          <v-btn text color="primary" @click="closeOrderSubmit">
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
                {{ current_item.departureTime }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>往返地:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ current_item.departure }} — {{ current_item.arrival }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>剩余座位:</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ current_item.remaining }}
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
// import * as dd from 'dingtalk-jsapi'
import store from '@/store'
import ErrorAlert from '@/components/ErrorAlert'
import { mdiArrowRightBold } from '@mdi/js'
import { updateOrderSubmit, updateOrderCancel } from '@/api/rank-info.js'
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
      items: [],
      resItems: [],
      passenger: {
        name: '',
        department: '',
        phone: ''
      },
      current_item: null,
      alert: {
        toggle: false,
        message: ''
      }
    }
  },
  methods: {
    computedResItems() {
      let shuttleInfos = store.getters.shuttleInfos
      let resArr = []
      this.items.forEach(el => {
        let eObj = Object.assign({}, el)
        shuttleInfos.forEach(sEl => {
          if (sEl.shuttleId === eObj.id) {
            eObj.orderId = sEl.orderId
          }
        })
        resArr.push(eObj)
      })
      return resArr
    },
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
      this.$store.dispatch('bus_info/setCurrentItemId', item.id)
      this.$router.push('/detail')
    },
    handleOrderSubmit() {
      console.log('handleOrderSubmit')
      const tempData = Object.assign(
        { shuttleId: this.current_item.id, userId: store.getters.userId },
        this.passenger
      )
      updateOrderSubmit(tempData).then(res => {
        console.log(res.data.msg)
        /*
        if (res.data.code === 10000) {
          dd.device.notification.alert({
            message: '预约成功',
            title: '', //可传空
            buttonName: '收到'
          })
        }
        */
        this.refreshBusInfo()
      })

      // this.$refs.form.reset()
      this.order_dialog = false
    },
    closeOrderSubmit() {
      // this.$refs.form.reset()
      this.order_dialog = false
    },
    handleCancelSubmit() {
      console.log('handleCancelSubmit')
      const tempData = Object.assign(
        {},
        {
          id: this.current_item.orderId,
          startTime: store.getters.reservationDateInfo.startTime,
          endTime: store.getters.reservationDateInfo.endTime
        }
      )
      updateOrderCancel(tempData).then(res => {
        console.log(res.data.msg)
        this.refreshBusInfo()
      })
      this.cancel_dialog = false
    },
    async refreshBusInfo() {
      try {
        this.items = await store.dispatch('bus_info/fetchBusInfo')
        // 刷一下时间
        await this.$store.dispatch('rank_info/handleDate')
        // 刷一下用户订单信息
        await this.$store.dispatch('user/fetchUserReservationInfo', {
          uid: store.getters.userId,
          startTime: store.getters.reservationDateInfo.startTime,
          endTime: store.getters.reservationDateInfo.endTime
        })
        console.log('刷新执行完成')
        this.resItems = this.computedResItems()
      } catch (error) {
        console.log('create阶段捕捉的错误' + error)
        this.alert.toggle = true
        this.alert.message = '服务器拉取数据异常'
      }
    }
  },
  created() {
    this.refreshBusInfo()
    this.passenger.name = store.getters.userName || ''
    this.passenger.department = store.getters.department || ''
    this.passenger.phone = store.getters.phone || ''
  }
}
</script>
<style lang="scss" scoped></style>
