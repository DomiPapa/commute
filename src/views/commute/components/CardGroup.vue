<template>
  <div>
    <error-alert :alert="alert" />
    <v-card>
      <v-card max-width="80%" class="loc-bar" :elevation="3">
        <v-card-text
          class="d-flex justify-space-around align-content-center text-h6 font-weight-bold"
        >
          <div>{{ this.shuttle_loc[0] }}</div>
          <div>
            <v-btn icon @click="handleLocChange">
              <v-icon large color="cyan" :class="{ go: rotate, back: !rotate }">
                mdi-sync
              </v-icon>
            </v-btn>
          </div>
          <div>{{ this.shuttle_loc[1] }}</div>
        </v-card-text>
      </v-card>
      <v-item-group class="mt-3">
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
                  <v-card-text class="d-flex justify-space-between">
                    <div class="text-center font-weight-bold text-h6">
                      {{ item.departureTime | _2hour }}
                    </div>
                    <div
                      class="d-flex flex-column text-center"
                      @click="checkDetail(item)"
                    >
                      <span class="font-weight-bold">剩余座位</span>
                      <span>{{ item.remaining }}/{{ item.capacity }}</span>
                    </div>
                    <div class="ma-1">
                      <v-btn v-if="item.status === 3" depressed color="error">
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

          <!-- 无可用车次时的提示卡 -->
          <v-card color="#fff" class="pa-2" v-if="resItems.length === 0">
            <v-card-title class="subtitle-1 d-flex ml-2">
              <v-icon color="red" class="pr-1">mdi-bus-clock</v-icon>
              <span class="font-weight-bold">
                很抱歉
              </span>
            </v-card-title>
            <v-divider :inset="inset"></v-divider>
            <v-card-text class="ml-2 d-flex justify-space-between">
              <div class="d-flex text-center">
                <span class="font-weight-bold">未获取到可预约车次</span>
              </div>
            </v-card-text>
          </v-card>
        </v-container>
      </v-item-group>
    </v-card>

    <!--一级预约对话框-->
    <v-dialog v-model="order_dialog" width="800px">
      <v-card>
        <v-card-title v-if="current_item" class="subtitle-1 d-flex ml-2">
          <span class="font-weight-bold">
            {{ current_item.departureTime | _2Date }}
          </span>
          <span class="pl-4">{{ current_item.departure }}</span>
          <span class="pl-2">
            <v-icon>{{ mdiArrowRightBold }}</v-icon>
          </span>
          <span class="pl-2">{{ current_item.arrival }}</span>
        </v-card-title>
        <v-divider :inset="inset"></v-divider>
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
              <!--
              <v-select
                prepend-icon="mdi-map-marker-radius"
                :items="['默认', '物资保障部']"
                label="乘车地点"
                v-model="passenger.pickUpPoint"
                menu-props="auto"
                hide-details
                single-line
              ></v-select>
              -->
              <v-switch
                v-if="is_from_dazhou"
                v-model="is_wzbzb"
                class="ma-2"
                label="物资保障部上车"
              ></v-switch>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="8" class="d-flex align-center">
              <v-icon color="primary" class="pr-2">mdi-account-multiple</v-icon>
              <span>添加随行家属</span>
            </v-col>
            <v-col cols="4" class="d-flex  flex-row-reverse align-center">
              <v-btn
                class="ml-2"
                fab
                dark
                x-small
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
    <!--二级添加随行家属对话框-->
    <v-dialog v-model="entourage_dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span>添加随行家属</span>
        </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-account"
                placeholder="随行家属姓名"
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
    <!--已有该班次约车信息时的提示对话框-->
    <v-dialog v-model="reserverd_dialog" width="500">
      <v-card>
        <v-card-title class="headline cyan">
          提示
        </v-card-title>
        <v-card-text class="text-subtitle-1 py-5">
          您已在当前车次下有预约信息，若您要进行修改，例如追加随行人员，请在订车信息页中取消该车次所有约车人后，再重新预约。
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="reserverd_dialog = false">
            确定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--进度条对话框-->
    <v-dialog v-model="loading_dialog" hide-overlay persistent width="300">
      <v-card color="cyan" dark>
        <v-card-text>
          正在加载...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import moment from 'moment'
import store from '@/store'
import ErrorAlert from '@/components/ErrorAlert'
import { mdiArrowRightBold } from '@mdi/js'
import { updateOrderSubmit } from '@/api/rank-info.js'
export default {
  name: 'CardGroup',
  components: {
    ErrorAlert
  },
  filters: {
    _2hour: function(time_pram) {
      return moment(time_pram, 'YYYY-MM-DD HH:mm:ss').format('HH:mm')
    },
    _2Date: function(time_pram) {
      return moment(time_pram, 'YYYY-MM-DD HH:mm:ss').format('MM-DD HH:mm')
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
      entourage_dialog: false,
      reserverd_dialog: false,
      items: [],
      resItems: [],
      passenger: {
        name: '',
        department: '',
        phone: '',
        //乘车点
        pickUpPoint: '默认'
      },
      // 随行家属
      ent: '',
      entourage: [],
      // 正在操作的乘车卡
      current_item: null,
      alert: {
        toggle: false,
        message: ''
      },
      // 控制物资保障部上车
      is_wzbzb: false,
      // 地址栏参数切换
      shuttle_loc: ['达州', '普光'],
      is_from_dazhou: true,
      rotate: false,
      // 进度条对话框
      loading_dialog: false
    }
  },
  methods: {
    handleLocChange() {
      console.log('切换乘车点')
      this.rotate = !this.rotate
      this.shuttle_loc = [this.shuttle_loc[1], this.shuttle_loc[0]]
      this.is_from_dazhou = !this.is_from_dazhou
    },
    // 计算当日应显示的班车信息
    computedResItems() {
      let midArr = []
      let resArr = []
      this.items.forEach(el => {
        if (this.today) {
          if (el.status != 2) {
            let eObj = Object.assign({}, el)
            midArr.push(eObj)
          }
        } else {
          if (el.status === 2) {
            let eObj = Object.assign({}, el)
            midArr.push(eObj)
          }
        }
      })
      // 根据目的地进行二次筛选
      if (this.is_from_dazhou) {
        midArr.forEach(el => {
          if (el.departure === '达州') {
            resArr.push(el)
          }
        })
      } else {
        midArr.forEach(el => {
          if (el.departure === '普光') {
            resArr.push(el)
          }
        })
      }
      return resArr
    },
    // 处理点击预约的逻辑，若当前id存在该班次约车信息则不允许继续约
    handleRank(item) {
      let _this = this
      console.log('点击了预约,处理项目item-->')
      console.log(item)

      // 如果已经有该班次的约车信息，则提示不要重复预约
      store
        .dispatch('user/fetchUserReservationInfo', {
          uid: store.getters.userId
        })
        .then(res => {
          console.log(res)
          if (Array.isArray(res)) {
            res.forEach(el => {
              if (el.shuttleId === item.sid) {
                // 打开提示已预约提示框 结束函数流程
                _this.reserverd_dialog = true
                throw '该车次已存在预约'
              }
            })
            // 打开订车页 允许下订单
            this.passenger.name = store.getters.userName
            this.passenger.department = store.getters.department
            this.passenger.phone = store.getters.phone
            this.current_item = item
            this.order_dialog = true
          } else {
            console.log('服务器获取数据不为数组')
          }
        })
        .catch(err => {
          this.alert.toggle = true
          this.alert.message = err
        })
    },
    checkDetail(item) {
      this.$store.dispatch('bus_info/setCurrentItemId', item.sid)
      this.$router.push('/detail').catch(err => {
        err
      })
    },
    handleOrderSubmit() {
      console.log('handleOrderSubmit')
      let reservations_arr = []
      let mainData = Object.assign(
        { shuttleId: this.current_item.sid, userId: store.getters.userId },
        this.passenger
      )
      // 先将主订车人对象压入数组
      reservations_arr.push(mainData)
      // 再构造随行人员对象并压入数组
      if (this.entourage.length !== 0) {
        this.entourage.forEach(ent => {
          let entData = Object.assign(
            { shuttleId: this.current_item.sid, userId: store.getters.userId },
            {
              name: ent,
              phone: this.passenger.phone,
              pickUpPoint: this.passenger.pickUpPoint
            }
          )
          reservations_arr.push(entData)
        })
      }

      updateOrderSubmit(reservations_arr).then(res => {
        console.log(res.data.msg)
        // 预约成功后从新刷新一下视图
        this.refreshBusInfo()
      })
      this.order_dialog = false
    },
    closeOrderSubmit() {
      this.order_dialog = false
    },
    async refreshBusInfo() {
      try {
        this.loading_dialog = true
        this.items = await store.dispatch('bus_info/fetchBusInfo')
        // 设置卡片信息
        this.resItems = this.computedResItems()
        this.loading_dialog = false
      } catch (error) {
        console.log('create阶段捕捉的错误' + error)
        this.alert.toggle = true
        this.alert.message = '服务器拉取数据异常'
      }
    },
    // 打开随行家属添加页
    addEntourage() {
      this.entourage_dialog = true
    },
    // 添加随行家属
    handleAddEntourage() {
      if (this.ent) {
        this.entourage.push(this.ent)
      }
      this.ent = ''
      this.entourage_dialog = false
    },
    // 删除随行家属
    handleEntourageDelete(item) {
      this.entourage.splice(this.entourage.indexOf(item), 1)
    }
  },
  watch: {
    today() {
      this.refreshBusInfo()
    },
    is_wzbzb(newVal) {
      if (newVal) {
        this.passenger.pickUpPoint = '物资保障部'
      } else {
        this.passenger.pickUpPoint = '默认'
      }
    },
    is_from_dazhou() {
      this.refreshBusInfo()
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
    this.refreshBusInfo()
    console.log('cardCoupCreated')
  }
}
</script>
<style lang="scss" scoped>
.loc-bar {
  position: relative;
  top: -25px;
  left: 10%;
  margin-bottom: -25px;
}
.back {
  transition: all 0.5s;
}
.go {
  transform: rotate(180deg);
  transition: all 0.5s;
}
</style>
