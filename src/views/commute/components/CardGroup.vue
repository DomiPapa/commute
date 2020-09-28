<template>
  <div>
    <v-item-group active-class="primary">
      <v-container>
        <v-row>
          <v-col v-for="(item, index) in iterms" :key="index" cols="12" md="4">
            <v-item>
              <v-card color="#fff" class="pa-2">
                <v-card-title class="headline d-flex">
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
                    <span>最大</span>
                    <span>{{ item.payload }}</span>
                  </div>
                  <div
                    v-if="item.status"
                    class="d-flex flex-column text-center"
                    @click="checkDetail(item)"
                  >
                    <span>您的位置</span>
                    <span>{{ item.rank }}</span>
                  </div>
                  <div
                    v-else
                    class="d-flex flex-column text-center"
                    @click="checkDetail(item)"
                  >
                    <span>已排</span>
                    <span>{{ item.rank }}</span>
                  </div>
                  <div class="ma-1">
                    <v-btn
                      v-if="item.status"
                      depressed
                      color="error"
                      @click="cancelRank(item)"
                    >
                      取消排队
                    </v-btn>
                    <v-btn
                      class=""
                      color="primary"
                      @click="handleRank(item)"
                      v-else
                    >
                      排队
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="">
          填写排队人信息
        </v-card-title>
        <v-container>
          <v-row class="mx-2">
            <v-col class="align-center justify-space-between" cols="12">
              <v-row align="center" class="mr-0">
                <v-avatar size="40px" class="mx-3">
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt=""
                  />
                </v-avatar>
                <v-text-field placeholder="姓名"></v-text-field>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-text-field
                prepend-icon="mdi-account-card-details-outline"
                placeholder="单位"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field placeholder="职位"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="tel"
                prepend-icon="mdi-phone"
                placeholder="电话号码"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-text"
                placeholder="其他备注"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions class="justify-end">
          <v-btn text color="primary" @click="dialog = false">
            取消
          </v-btn>
          <v-btn text @click="handleSubmit">提交</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mdiArrowRightBold } from '@mdi/js'
export default {
  name: 'CardGroup',
  data: () => {
    return {
      mdiArrowRightBold,
      inset: false,
      dialog: false,
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
  methods: {
    handleRank(item) {
      console.log('rank')
      console.log(item)
      this.dialog = true
    },
    cancelRank(item) {
      console.log(item)
      console.log('cancelRank')
    },
    checkDetail(item) {
      console.log(item)
      this.$router.push('/detail')
    },
    handleSubmit() {
      console.log('handleSubmit')
      this.dialog = false
    }
  }
}
</script>
<style lang="scss" scoped></style>
