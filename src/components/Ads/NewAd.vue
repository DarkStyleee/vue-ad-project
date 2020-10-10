<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3 pa-2>
                <h1 class="text--secondary mb-3">Create new ad</h1>
                <v-form 
                    ref="form"
                    v-model="valid"
                    validation
                    class="mb-3"
                >
                  <v-text-field
                    label="Ad title"
                    name="title"
                    type="text"
                    :color="color"
                    v-model="title"
                    :rules="[v => !!v || 'Title is required']"
                    required
                  ></v-text-field>

                    <v-textarea
                    v-model="desc"
                    :color="color"
                    name="description"
                    type="text"
                    :rules="[v => !!v || 'Description is required']"
                    required
                    >
                    <template v-slot:label>
                        <div>
                        Ad description
                        </div>
                    </template>
                    </v-textarea>
                </v-form>
                <v-layout row mb-3>
                    <v-flex xs12>
                        <v-btn :class="color" @click="triggerUpload">
                            Upload
                            <v-icon right dark>mdi-cloud-upload</v-icon>
                        </v-btn>
                        <input 
                        ref="fileInput" 
                        type="file" 
                        style="display: none;" 
                        accept="image/*"
                        @change="onFileChange"
                        >
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-img width="200" :src="imgSrc" v-if="imgSrc"></v-img>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-switch :color="color" v-model="promo" class="ma-4" label="Add to promo?"></v-switch>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-spacer></v-spacer>
                        <v-btn :class="color" :loading="loading" @click="createAd" :disabled="!valid || !img || loading">Create Ad</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            title: '',
            desc: '',
            promo: false,
            valid: false,
            img: null,
            imgSrc: ''
        }
    },
    methods: {
        createAd () {
            if (this.$refs.form.validate() && this.img) {
                const ad = {
                    title: this.title,
                    desc: this.desc,
                    promo: this.promo,
                    img: this.img
                }

                this.$store.dispatch('createAd', ad)
                    .then(() => {
                        this.$router.push('/list')
                    })
                    .catch(() => {})
            }
        },
        triggerUpload () {
            this.$refs.fileInput.click()
        },
        onFileChange (event) {
            const file = event.target.files[0]

            const reader = new FileReader()
            reader.onload = () => {
                this.imgSrc = reader.result
            }
            reader.readAsDataURL(file)
            this.img = file
        }
    },
    computed: {
      color () {
        return this.$store.getters.themeColor
      },
      loading () {
        return this.$store.getters.loading
      }
    }
}
</script>