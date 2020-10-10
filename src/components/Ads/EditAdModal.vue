<template>
    <v-dialog width="400" v-model="modal">
        <template v-slot:activator="{ on }">
            <v-btn text color="blue-grey lighten-2" v-on="on">Edit</v-btn>
        </template>
        <v-card>
            <v-container>
                <v-layout row>
                    <v-flex xs12>
                        <v-card-title>
                            <h2 class="text--primary">Edit ad</h2>
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row>
                    <v-flex xs12>
                        <v-card-text>
                            <v-text-field
                                label="Title"
                                name="title"
                                type="text"
                                :color="color"
                                v-model="editedTitle"
                            ></v-text-field>
                            <v-textarea
                                v-model="editedDescription"
                                :color="color"
                                name="description"
                                type="text"
                            >
                            <template v-slot:label>
                                <div>
                                Description
                                </div>
                            </template>
                            </v-textarea>
                        </v-card-text>
                    </v-flex>
                </v-layout>

                <v-layout row>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text @click="onCancel">Cancel</v-btn>
                            <v-btn text @click="onSave" :color="color">Save</v-btn>
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
            editedTitle: this.ad.title,
            editedDescription: this.ad.desc
        }
    },
    computed: {
        color () {
            return this.$store.getters.themeColor
        }
    },
    methods: {
        onCancel () {
            this.editedDescription = this.ad.desc
            this.editedTitle = this.ad.title
            this.modal = false
        },
        onSave () {
            if (this.editedDescription !== '' && this.editedTitle !== '') {
                this.$store.dispatch('updateAd', {
                    title: this.editedTitle,
                    desc: this.editedDescription,
                    id: this.ad.id
                })
                this.modal = false
            }
        }
    }
}
</script>