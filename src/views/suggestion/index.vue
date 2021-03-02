<template>
  <v-card class="mt-4 mx-auto" color="#26c6da" dark max-width="400">
    <v-card-title>
      <v-icon large left>
        mdi-message-text
      </v-icon>
      <span class="title font-weight-light">意见反馈</span>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      <p>
        如果您钉钉组织机构中没有中国石化集团中原石油勘探局，请联系信息中心值班电话
        4776804如果您不会操作，请先看我们的
        <span>操作说明</span>
      </p>
      <p>
        如果您觉得我们的应用不好用想提出改进意见或者发现有问题的地方，请给我们发邮件或在钉钉给我留言，我们会进行讨论并进行相应修改
      </p>
      <p>
        如果您觉得工作生活中有需要开发应用进行信息化改进的地方，也请积极联系我们，我们期待与您进行更多的合作，将油田的工作开展得越来越好
      </p>
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-avatar color="primary">
            <v-icon dark>
              mdi-account-circle
            </v-icon>
          </v-avatar>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>张博</v-list-item-title>
        </v-list-item-content>

        <v-row align="center" justify="end">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <a
                class="z-incons"
                href="mailto:bobzhang890414@outlook.com"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon class="mx-2">
                  mdi-email
                </v-icon>
              </a>
            </template>
            <span>bobzhang890414@outlook.com</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <a
                class="z-incons"
                href="tel:17723115964"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon class="mx-2">
                  mdi-phone
                </v-icon>
              </a>
            </template>
            <span>17723115964</span>
          </v-tooltip>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    //
  })
}
</script>
<style scoped>
.z-incons {
  text-decoration: none;
}
</style>
