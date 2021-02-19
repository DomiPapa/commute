<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    hide-default-footer
    class="elevation-1"
  >
    <template v-slot:[`item.actions`]="{ item }">
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
      { text: '起点', value: 'from', sortable: false },
      { text: '终点', value: 'to', sortable: false },
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
      this.$router.push('/detail').catch(err => {
        err
      })
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
