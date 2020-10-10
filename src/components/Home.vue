<template>
    <div v-if="!loading">
        <v-container pt-0>
            <v-layout row>
                <v-flex xs12>
                    <v-carousel
                        cycle
                        height="400"
                        hide-delimiter-background
                        show-arrows-on-hover
                    >
                        <v-carousel-item
                        v-for="slide in promoAds"
                        :key="slide.id"
                        :src="slide.img"
                        :to="'/ad/'+slide.id"
                        >
                            <v-row
                            class="fill-height"
                            align="center"
                            justify="center"
                            >
                            <div class="display-2 pa-4">{{ slide.title }} Slide</div>
                            </v-row>
                        </v-carousel-item>
                    </v-carousel>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container grid-list-lg>
            <v-layout row>
                <v-flex
                xs12
                sm6
                md4
                lg3
                v-for="slide in ads"
                :key="slide.id"
                >
                    <v-card
                        class="mx-auto"
                        max-width="400"
                    >
                        <v-img
                        class="white--text align-end"
                        height="200px"
                        :src="slide.img"
                        >
                        <div class="previewText">
                            <v-card-title class="text-subtitle-2">{{ slide.title }}</v-card-title>
                        </div>
                        
                        </v-img>

                        <v-card-text class="text--primary">
                        <div class="text-h6 mb-2 text-truncate">{{ slide.title }}</div>

                        <div class="text-truncate">{{ slide.desc }}</div>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn text :to="'/ad/'+slide.id">Open</v-btn>
                            <app-buy-modal :ad="slide"></app-buy-modal>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
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
</template>

<script>
export default {
    computed: {
        promoAds () {
            return this.$store.getters.promoAds
        },
        ads () {
            return this.$store.getters.ads
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

<style scoped>
.previewText {
    background-color: rgba(0, 0, 0, 0.5);
}
</style>