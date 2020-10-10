<template>
    <v-container>
        <v-layout row v-if="!loading && myAds.length !== 0">
            <v-flex xs12 sm8 md6 offset-md3 offset-sm2 pa-2>
                <h1 class="text--secondary mb-3">My ads</h1>

                <v-card 
                elevation="3" 
                class="mb-3"
                v-for="ad in myAds"
                :key="ad.id"
                >
                    <v-layout>
                        <v-flex xs4>
                            <v-img
                            :src="ad.img"
                            height="150"
                            >
                            </v-img>
                        </v-flex>
                        <v-flex xs8>
                            <v-card-text>
                                <h2 class="text--primary mb-2 text-truncate">{{ ad.title }}</h2>
                                <p class="text-truncate">{{ ad.desc }}</p>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn :class="color" :to="'/ad/'+ad.id">Open</v-btn>
                            </v-card-actions>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout v-else-if="!loading && myAds.length === 0">
            <v-flex xs12 class="fill-height">
                <h1
                class="text--primary mt-4"
                align="center"
                justify="center"
                >
                You don't have ads
                </h1>
            </v-flex>
        </v-layout>
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
    </v-container>
</template>

<script>
export default {
    computed: {
        myAds () {
            return this.$store.getters.myAds
        },
        color () {
            return this.$store.getters.themeColor
        },
        loading () {
            return this.$store.getters.loading
        }
    }
}
</script>