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
                  class="text-h6 d-flex  justify-space-between ml-2"
                >
                  <div class="font-weight-bold">
                    {{ item.departureTime | _2dayhour }}
                  </div>
                  <div @click="showQrcode(item)">
                    <v-avatar tile color="blue">
                      <!--
                      <v-icon dark>mdi-alarm</v-icon>
                      -->
                      <img :src="baseurl + 'qrcode.png'" alt="乘车码" />
                    </v-avatar>
                  </div>
                </v-card-title>
                <v-divider :inset="inset"></v-divider>
                <v-card-text class="ml-2 d-flex justify-space-between text-end">
                  <div class="font-weight-bold text-subtitle-1">
                    {{ item.name }}
                  </div>
                  <div class="text-subtitle-1">
                    <span>{{ item.departure }}</span>
                    <span class="pl-2">
                      <v-icon>{{ mdiArrowRightBold }}</v-icon>
                    </span>
                    <span class="pl-2">{{ item.arrival }}</span>
                  </div>
                  <div>
                    <v-btn v-if="item.status === 2" disabled>
                      已发
                    </v-btn>
                    <v-btn
                      v-else
                      depressed
                      color="error"
                      @click="cancelRank(item)"
                    >
                      退订
                    </v-btn>
                  </div>
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
    <!-- 分页组件 -->
    <div class="text-center">
      <v-pagination
        v-model="current_page"
        :length="max_length"
        :total-visible="5"
        circle
      ></v-pagination>
    </div>
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
    <!--二维码对话框-->
    <v-dialog v-model="qrcode_dialog">
      <v-card @click="qrcode_dialog = false">
        <v-card-title class="headline text-center">
          请上车
        </v-card-title>

        <v-card-text class="teal accent-3 pt-4">
          <div class="">
            <Qrcode sid="url" :text="codeText" :swidth="swidth"></Qrcode>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!--二维码无法显示提示框-->
    <v-dialog v-model="no_qrcode_dialog" max-width="300">
      <v-card @click="no_qrcode_dialog = false">
        <v-card-text class="pa-4 red headline text-center">
          乘车通行码发车时间前后30分钟内可用
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import moment from 'moment'
import Qrcode from './components/Qrcode'
import store from '@/store'
import ErrorAlert from '@/components/ErrorAlert'
import { mdiArrowRightBold } from '@mdi/js'
import { updateOrderCancel } from '@/api/rank-info.js'
import { fetchUserReservationInfoByPages } from '@/api/user.js'
export default {
  name: 'Reservation',
  components: {
    ErrorAlert,
    Qrcode
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
      },
      baseurl: process.env.BASE_URL,
      // qrcode
      qrcode_dialog: false,
      no_qrcode_dialog: false,
      url: '',
      codeText: '',
      // 分页
      current_page: 1,
      max_length: 1
    }
  },
  computed: {
    swidth() {
      return (window.innerWidth * 0.9 * 0.4 * 320) / window.innerWidth / 20 //370*320/(window.innerWidth)/20
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
        // this.refreshReservationInfo()
        // 重新回到第一页并刷新结果
        this.current_page = 1
        this.refreshReservationInfoByPages()
      })
      this.cancel_dialog = false
    },
    // 旧的方法,不分页 只显示时间没到的车次
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
    },
    // 新的方法,分页显示车次（所有订过的车次）
    refreshReservationInfoByPages() {
      let paramsObj = {
        uid: store.getters.userId,
        currentPage: this.current_page,
        pageSize: 3
      }
      fetchUserReservationInfoByPages(paramsObj)
        .then(result => {
          let reservation_result_arr = []
          const {
            content: reservation_arr,
            totalElements,
            totalPages
          } = result.data.data
          console.log(reservation_arr)
          console.log(totalElements)
          console.log(totalPages)
          this.max_length = totalPages
          if (Array.isArray(reservation_arr) && reservation_arr.length !== 0) {
            reservation_arr.forEach(el => {
              let elObj = {}
              elObj.status = el.status
              elObj.shuttleId = el.shuttle.sid
              elObj.orderId = el.rid
              elObj.department = el.department
              elObj.name = el.name
              elObj.pickUpPoint = el.pickUpPoint
              elObj.reserveTime = el.reserveTime
              elObj.arrival = el.shuttle.arrival
              elObj.departure = el.shuttle.departure
              elObj.departureTime = el.shuttle.departureTime
              elObj.remaining = el.shuttle.remaining
              reservation_result_arr.push(elObj)
            })
          }

          // 直接刷新显示内容把
          this.reservation_items = reservation_result_arr
        })
        .catch(err => {
          console.log(err)
          this.alert.toggle = true
          this.alert.message = '服务器拉取用户订车数据异常'
        })
    },
    // 显示二维码
    showQrcode(item) {
      // 发车时间差
      let res_time = moment(item.departureTime, 'YYYY-MM-DD HH:mm:ss').diff(
        moment(),
        'minute'
      )
      if (Math.abs(res_time) <= 30) {
        console.log('时间前后不足30')
        this.qrcode_dialog = true
      } else {
        this.no_qrcode_dialog = true
      }
    }
  },
  watch: {
    current_page(page) {
      // 页面变更，立即请求
      console.log(page)
      this.refreshReservationInfoByPages()
    },
    alert: {
      // 提示框自动关闭
      handler: function(val) {
        if (val.toggle) {
          setTimeout(() => {
            this.alert.toggle = false
          }, 10000)
        }
      },
      deep: true
    }
  },
  created() {
    // this.refreshReservationInfo()
    this.refreshReservationInfoByPages()
  }
}
</script>
<style lang="scss" scoped></style>
