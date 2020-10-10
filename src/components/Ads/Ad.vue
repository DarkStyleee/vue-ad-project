<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <v-card v-if="!loading">
                    <v-img :src="ad.img" height="300"></v-img>
                    <v-card-text>
                        <h1 class="text--primary mb-5 mt-3">{{ad.title}}</h1>
                        <p>{{ad.desc}}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <app-edit-ad-modal :ad="ad" v-if="isOwner"></app-edit-ad-modal>
                        <app-buy-modal :ad="ad"></app-buy-modal>
                    </v-card-actions>
                </v-card>
                <div v-else>
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
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import EditAdModal from './EditAdModal'

export default {
    props: ['id'],
    computed: {
        ad () {
            const id = this.id
            return this.$store.getters.adById(id)
        },
        color () {
            return this.$store.getters.themeColor
        },
        loading () {
            return this.$store.getters.loading
        },
        isOwner () {
            return this.ad.ownerId === this.$store.getters.user.id
        }
    },
    components: {
        appEditAdModal: EditAdModal
    }
}
</script>