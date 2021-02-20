<template>
  <div>
    <error-alert :alert="alert" />
    <v-item-group active-class="primary">
      <v-container>
        <v-row>
          <v-col
            v-for="(item, index) in reservation_items"
            :key="index"
            cols="12"
            md="4"
          >
            <v-item>
              <v-card color="#fff" class="pa-2">
                <v-card-title class="subtitle-1 d-flex ml-2">
                  <span class="font-weight-bold">
                    {{ item.departureTime | _2hour }}
                  </span>
                  <span class="pl-4">{{ item.departure }}</span>
                  <span class="pl-2">
                    <v-icon>{{ mdiArrowRightBold }}</v-icon>
                  </span>
                  <span class="pl-2">{{ item.arrival }}</span>
                </v-card-title>
                <v-divider :inset="inset"></v-divider>
                <v-card-text>
                  <v-row>
                    <v-col cols="8">
                      <v-row>
                        <v-col cols="4">姓名</v-col>
                        <v-col cols="8">{{ item.name }}</v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="4">地点</v-col>
                        <v-col cols="8">{{ item.pickUpPoint }}</v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="4" class="d-flex align-end">
                      <v-btn depressed color="error" @click="cancelRank(item)">
                        退订
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>

    <!--退订对话框-->
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
import moment from 'moment'
import store from '@/store'
import ErrorAlert from '@/components/ErrorAlert'
import { mdiArrowRightBold } from '@mdi/js'
import { updateOrderCancel } from '@/api/rank-info.js'
export default {
  name: 'Reservation',
  components: {
    ErrorAlert
  },
  filters: {
    _2hour: function(time_pram) {
      return moment(time_pram, 'YYYY-MM-DD HH:mm:ss').format('HH:mm')
    }
  },
  data: () => {
    return {
      mdiArrowRightBold,
      inset: false,
      cancel_dialog: false,
      reservation_items: [],
      current_item: null,
      alert: {
        toggle: false,
        message: ''
      }
    }
  },
  methods: {
    cancelRank(item) {
      console.log('cancelRank')
      this.current_item = item
      this.cancel_dialog = true
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
    async refreshReservationInfo() {
      try {
        this.reservation_items = await store.dispatch(
          'user/fetchUserReservationInfo',
          {
            uid: store.getters.userId
          }
        )
      } catch (error) {
        console.log('create阶段捕捉的错误' + error)
        this.alert.toggle = true
        this.alert.message = '服务器拉取用户订车数据异常'
      }
    }
  },
  created() {
    this.refreshReservationInfo()
  }
}
</script>
<style lang="scss" scoped></style>
