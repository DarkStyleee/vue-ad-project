<template>
    <v-dialog width="400" v-model="modal">
        <template v-slot:activator="{ on }">
            <v-btn :color="color" v-on="on">Buy</v-btn>
        </template>
        <v-card>
            <v-container>
                <v-layout row>
                    <v-flex xs12>
                        <v-card-title>
                            <h2 class="text--primary">Do you want to buy it?</h2>
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row>
                    <v-flex xs12>
                        <v-card-text>
                            <v-text-field
                                label="Name"
                                name="name"
                                type="text"
                                :color="color"
                                v-model="name"
                            ></v-text-field>
                            <v-text-field
                                label="Phone"
                                name="phone"
                                type="text"
                                :color="color"
                                v-model="phone"
                            ></v-text-field>
                        </v-card-text>
                    </v-flex>
                </v-layout>

                <v-layout row>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn 
                                text 
                                @click="onCancel"
                                :disabled="localLoading"
                            >
                            Close
                            </v-btn>
                            <v-btn 
                                text 
                                @click="onSave" 
                                :color="color"
                                :disabled="localLoading"
                                :loading="localLoading"
                            >
                            Buy it!
                            </v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['ad'],
    data () {
        return {
            modal: false,
            name: '',
            phone: '',
            localLoading: false
        }
    },
    computed: {
        color () {
            return this.$store.getters.themeColor
        }
    },
    methods: {
        onCancel () {
            this.name = ''
            this.phone = ''
            this.modal = false
        },
        onSave () {
            if (this.name !== '' && this.phone !== '') {
                this.localLoading = true
                this.$store.dispatch('createOrder', {
                    name: this.name,
                    phone: this.phone,
                    adId: this.ad.id,
                    ownerId: this.ad.ownerId
                })
                .finally(() => {
                    this.name = ''
                    this.phone = ''
                    this.localLoading = false
                    this.modal = false
                })
            }
        }
    }
}
</script>