<template>
    <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="6"
          >
            <v-card class="elevation-12">
              <v-toolbar
                :color="color"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form 
                    ref="form"
                    v-model="valid"
                    validation
                >
                  <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="mdi-account"
                    type="email"
                    :color="color"
                    v-model="email"
                    :rules="emailRules"
                    required
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    :color="color"
                    v-model="password"
                    :counter="6"
                    :rules="passwordRules"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :color="color" @click="onSubmit" :disabled="!valid || loading" :loading="loading">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
export default {
    data () {
        return {
            email: '',
            password: '',
            valid: false,
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v => (v && v.length >= 6) || 'Min 6 symbol',
            ]
        }
    },
    methods: {
        onSubmit () {
            if (this.$refs.form.validate()) {
                const user = {
                    email: this.email,
                    password: this.password
                }
                
                this.$store.dispatch('loginUser', user)
                  .then(() => {
                    this.$router.push('/')
                  })
                  .catch(() => {})
            }
        }
    },
    computed: {
      color () {
        return this.$store.getters.themeColor
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    created () {
      if (this.$route.query['loginError']) {
        this.$store.dispatch('setError', 'Please login to access this page.')
      }
    }
}
</script>