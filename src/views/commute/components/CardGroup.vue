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
                    <!--
                    <v-btn
                      v-if="item.orderId"
                      depressed
                      color="error"
                      @click="cancelRank(item)"
                    >
                      取消预约
                    </v-btn>
                    -->
                    <v-btn v-if="item.status === 0" depressed color="error">
                      已过期
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
          <v-row>
            <v-col cols="5">
              <v-text-field
                prepend-icon="mdi-account"
                placeholder="姓名"
                v-model="passenger.name"
              ></v-text-field>
            </v-col>
            <v-col cols="7">
              <v-text-field
                prepend-icon="mdi-briefcase"
                placeholder="单位"
                v-model="passenger.department"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="5">
              <v-text-field
                type="tel"
                prepend-icon="mdi-phone"
                placeholder="电话号码"
                v-model="passenger.phone"
              ></v-text-field>
            </v-col>
            <v-col cols="7">
              <v-select
                prepend-icon="mdi-map-marker-radius"
                :items="['达州基地旗杆处', '物资保障部']"
                label="乘车地点"
                v-model="passenger.pickUpPoint"
                menu-props="auto"
                hide-details
                single-line
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <span>添加随行人员</span>
            </v-col>
            <v-col cols="6">
              <v-btn
                class="ml-2"
                fab
                dark
                small
                color="primary"
                @click="addEntourage"
              >
                <v-icon dark>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-chip
                v-for="(item, index) in entourage"
                :key="index"
                class="ma-2"
                close
                @click:close="handleEntourageDelete(item)"
              >
                {{ item }}
              </v-chip>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions class="justify-end">
          <v-btn color="primary" @click="handleOrderSubmit">提交</v-btn>
          <v-btn @click="closeOrderSubmit">
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--二级添加随行人员对话框-->
    <v-dialog v-model="entourage_dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span>添加随行人员</span>
        </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-account"
                placeholder="随行人员姓名"
                v-model="ent"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions class="justify-end">
          <v-btn color="primary" @click="handleAddEntourage">
            确认
          </v-btn>
          <v-btn @click="entourage_dialog = false">
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--取消对话框-->
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
import { updateOrderSubmit, updateOrderCancel } from '@/api/rank-info.js'
export default {
  name: 'CardGroup',
  components: {
    ErrorAlert
  },
  filters: {
    _2hour: function(time_pram) {
      return moment(time_pram, 'YYYY-MM-DD HH:mm:ss').format('HH:mm')
    }
  },
  props: {
    today: Boolean
  },
  data: () => {
    return {
      mdiArrowRightBold,
      inset: false,
      order_dialog: false,
      cancel_dialog: false,
      entourage_dialog: false,
      items: [],
      resItems: [],
      passenger: {
        name: '',
        department: '',
        phone: '',
        //乘车点
        pickUpPoint: '达州基地旗杆处'
      },
      // 随行人员
      ent: '',
      entourage: [],
      current_item: null,
      alert: {
        toggle: false,
        message: ''
      }
    }
  },
  methods: {
    computedResItems() {
      /*
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
      */
      let resArr = []
      this.items.forEach(el => {
        if (this.today) {
          if (el.status != 2) {
            let eObj = Object.assign({}, el)
            resArr.push(eObj)
          }
        } else {
          if (el.status === 2) {
            let eObj = Object.assign({}, el)
            resArr.push(eObj)
          }
        }
      })
      return resArr
    },
    handleRank(item) {
      console.log('rank')
      this.passenger.name = store.getters.userName
      this.passenger.department = store.getters.department
      this.passenger.phone = store.getters.phone
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
      this.$router.push('/detail').catch(err => {
        err
      })
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
      this.order_dialog = false
    },
    closeOrderSubmit() {
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
        /*
        // 刷一下时间
        this.$store.dispatch('rank_info/handleDate')
        // 刷一下用户订单信息
        await this.$store.dispatch('user/fetchUserReservationInfo', {
          uid: store.getters.userId,
          startTime: store.getters.reservationDateInfo.startTime,
          endTime: store.getters.reservationDateInfo.endTime
        })
        console.log('刷新执行完成')
        */
        // 设置卡片信息
        this.resItems = this.computedResItems()
      } catch (error) {
        console.log('create阶段捕捉的错误' + error)
        this.alert.toggle = true
        this.alert.message = '服务器拉取数据异常'
      }
    },
    // 打开随行人员添加页
    addEntourage() {
      this.entourage_dialog = true
    },
    // 添加随行人员
    handleAddEntourage() {
      if (this.ent) {
        this.entourage.push(this.ent)
      }
      this.ent = ''
      this.entourage_dialog = false
    },
    // 删除随行人员
    handleEntourageDelete(item) {
      this.entourage.splice(this.entourage.indexOf(item), 1)
    }
  },
  watch: {
    today() {
      this.refreshBusInfo()
    }
  },
  created() {
    this.refreshBusInfo()
    console.log('cardCoupCreated')
  }
}
</script>
<style lang="scss" scoped></style>
