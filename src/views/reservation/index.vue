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
                <v-card-title
                  class="subtitle-1 d-flex  justify-space-between ml-2"
                >
                  <div class="font-weight-bold">
                    {{ item.departureTime | _2dayhour }}
                  </div>
                  <div>
                    <span>{{ item.departure }}</span>
                    <span class="pl-2">
                      <v-icon>{{ mdiArrowRightBold }}</v-icon>
                    </span>
                    <span class="pl-2">{{ item.arrival }}</span>
                  </div>
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
    <!-- 无订车信息时的提示卡 -->
    <v-card
      color="#fff"
      class="ma-auto"
      v-if="reservation_items.length === 0"
      max-width="90%"
    >
      <v-card-title class="subtitle-1 d-flex ml-2">
        <v-icon color="red" class="pr-1">mdi-bus-clock</v-icon>
        <span class="font-weight-bold">
          温馨提示
        </span>
      </v-card-title>
      <v-divider :inset="inset"></v-divider>
      <v-card-text class="ml-2 d-flex justify-space-between">
        <div class="d-flex text-center">
          <span class="font-weight-bold">您还未预约任何车次</span>
        </div>
      </v-card-text>
    </v-card>
    <!--退订对话框-->
    <v-dialog v-model="cancel_dialog" max-width="400">
      <v-card>
        <v-card-title class="headline">
          您确定要取消预约吗？
        </v-card-title>

        <v-card-text v-if="current_item">
          <v-list dense>
            <v-list-item>
              <v-list-item-content>姓名</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ current_item.name }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>乘车时间</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ current_item.departureTime }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>预约时间</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ current_item.reserveTime }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>往返地</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ current_item.departure }} — {{ current_item.arrival }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>上车地点</v-list-item-content>
              <v-list-item-content class="align-end">
                {{ current_item.pickUpPoint }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>剩余座位</v-list-item-content>
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
    _2dayhour: function(time_pram) {
      return moment(time_pram, 'YYYY-MM-DD HH:mm:ss').format('MM月DD日 HH:mm')
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
          reservationIds: this.current_item.orderId
        }
      )
      updateOrderCancel(tempData).then(res => {
        console.log(res.data.msg)
        this.refreshReservationInfo()
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
