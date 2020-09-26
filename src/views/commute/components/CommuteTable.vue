<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    hide-default-footer
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-row>
          <v-col cols="5">
            <p class="text-center pt-3">{{ shuttle[0] }}</p>
          </v-col>
          <v-col cols="2">
            <v-btn icon color="green" @click="switchLoc">
              <v-icon>mdi-cached</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="5">
            <p class="text-center pt-3">{{ shuttle[1] }}</p>
          </v-col>
        </v-row>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container fluid>
                <v-data-iterator :items="items" hide-default-footer>
                  <template v-slot:default="props">
                    <v-row>
                      <v-col
                        v-for="item in props.items"
                        :key="item.name"
                        cols="12"
                      >
                        <v-card>
                          <v-card-title class="subheading font-weight-bold">
                            订车详情
                          </v-card-title>

                          <v-divider></v-divider>

                          <v-list dense>
                            <v-list-item>
                              <v-list-item-content>
                                总座位数:
                              </v-list-item-content>
                              <v-list-item-content class="align-end">
                                {{ item.total }}
                              </v-list-item-content>
                            </v-list-item>

                            <v-list-item>
                              <v-list-item-content>
                                您的排名:
                              </v-list-item-content>
                              <v-list-item-content class="align-end">
                                {{ item.rank }}
                              </v-list-item-content>
                            </v-list-item>

                            <v-list-item>
                              <v-list-item-content>
                                预定详情:
                              </v-list-item-content>
                              <v-list-item-content class="align-end">
                                {{ item.des }}
                              </v-list-item-content>
                            </v-list-item>
                          </v-list>
                        </v-card>
                      </v-col>
                    </v-row>
                  </template>
                </v-data-iterator>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">取消</v-btn>
              <v-btn color="blue darken-1" text @click="save">预订</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon middle class="mr-2" @click="editItem(item)">
        mdi-bus
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    shuttle: ['达州基地旗杆处', '生产管理中心'],
    times: [
      [
        {
          time: '8:00'
        },
        {
          time: '10:30'
        },
        {
          time: '13:00'
        },
        {
          time: '18:30'
        }
      ],
      [
        {
          time: '8:00'
        },
        {
          time: '10:30'
        },
        {
          time: '13:00'
        },
        {
          time: '18:30'
        }
      ]
    ],
    headers: [
      { text: '发车时间', align: 'start', value: 'time', sortable: false },
      { text: '预定车次', value: 'actions', sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      time: ''
    },
    defaultItem: {
      time: ''
    },
    items: [
      {
        total: 20,
        rank: 3,
        des: '张三，李四，王五'
      }
    ]
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : '目前预定情况'
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          time: '8:00'
        },
        {
          time: '10:30'
        },
        {
          time: '13:00'
        },
        {
          time: '18:30'
        }
      ]
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
    switchLoc() {
      this.shuttle = [this.shuttle[1], this.shuttle[0]]
    }
  }
}
</script>
