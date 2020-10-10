<template>
    <v-container>
        <v-layout row>
            <div v-if="loading">
                <v-container
                class="fill-height"
                style="width: 100vw; height: 100vh;"
                fluid
                >
                    <v-row
                    align="center"
                    justify="center"
                    >
                        <v-progress-circular
                        :size="100"
                        :width="5"
                        :color="color"
                        indeterminate
                        ></v-progress-circular>
                    </v-row>
                </v-container>
            </div>
            <v-flex v-else-if="!loading && orders.length !== 0" xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">Orders</h1>
                <v-list
                subheader
                two-line
                flat
                >

                <v-list-item-group
                    multiple
                >
                    <v-list-item
                        v-for="order in orders"
                        :key="order.id"
                    >
                    <template>
                        <v-list-item-action>
                        <v-checkbox
                            :input-value="order.done"
                            @change="markDone(order)"
                            :color="color"
                        ></v-checkbox>
                        </v-list-item-action>

                        <v-list-item-content>
                        <v-list-item-title>{{ order.name }}</v-list-item-title>
                        <v-list-item-subtitle>{{ order.phone }}</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-btn :color="color" :to="'/ad/' + order.adId">Open</v-btn>
                        </v-list-item-action>
                    </template>
                    </v-list-item>

                    
                </v-list-item-group>
                </v-list>
            </v-flex>
            <v-layout v-else>
                <v-flex xs12 class="fill-height">
                    <h1
                    class="text--primary mt-4"
                    align="center"
                    justify="center"
                    >
                    You don't have orders
                    </h1>
                </v-flex>
            </v-layout>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    methods: {
        markDone (order) {
            this.$store.dispatch('markOrderDone', order.id)
                .then(() => {
                    order.done = true
                })
                .catch(() => {})
            order.done = true
        }
    },
    computed: {
      color () {
        return this.$store.getters.themeColor
      },
      loading () {
          return this.$store.getters.loading
      },
      orders () {
          return this.$store.getters.orders
      }
    },
    created () {
        this.$store.dispatch('fetchOrders')
    }
}
</script>