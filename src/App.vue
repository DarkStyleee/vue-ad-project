<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="inspire">
        <v-navigation-drawer
          v-model="drawer"
          app
          clipped
        >
          <v-list dense>
            <v-list-item link v-for="l in links" :key="l.title" :to="l.url">
              <v-list-item-action>
                <v-icon :color="color">mdi-{{l.icon}}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{l.title}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item @click="onLogout" v-if="isUserLoggedIn">
              <v-list-item-action>
                <v-icon :color="color">mdi-logout</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
    
        <v-app-bar
          app
          clipped-left
        >
          <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
          <v-toolbar-title><router-link class="homeLink" tag="span" to="/">Vue Project</router-link></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-sm-and-down">
            <v-btn v-for="l in links" :key="l.title" :to="l.url" elevation="0">
              <v-icon :color="color" left>mdi-{{l.icon}}</v-icon>
              {{l.title}}
            </v-btn>

            <v-btn elevation="0" v-if="isUserLoggedIn" @click="onLogout">
              <v-icon :color="color" left >mdi-logout</v-icon>
              Logout
            </v-btn>
          </v-toolbar-items>

          <v-toolbar-items>
            <v-btn @click="$vuetify.theme.dark = !$vuetify.theme.dark" elevation="0">
              <v-icon color="indigo lighten-1" left>mdi-cached</v-icon>
              Switch Theme
            </v-btn>
            <v-menu
              bottom
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  elevation="0"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon left color="blue darken-2">mdi-palette</v-icon>
                  Color
                </v-btn>
              </template>
              <div style="height: 300px;">
                <v-list>
                  <v-list-item
                    v-for="(clr, i) in colors"
                    :key="i"
                  >
                    <v-btn @click="changeColor(clr)" :class="clr" height="30"></v-btn>
                  </v-list-item>
                </v-list>
              </div>
            </v-menu>
          </v-toolbar-items>
        </v-app-bar>
    
        <v-main>
          <router-view></router-view>
        </v-main>

        <template v-if="error">
          <v-snackbar
            color="error"
            :multi-line="true"
            :timeout="5000"
            @input="closeError"
            :value="true"
          >
            {{error}}

            <v-btn
              dark
              text
              @click="closeError"
            >
              Close
            </v-btn>
          </v-snackbar>
        </template>
      </v-app>
    </v-app>
  </div>
</template>

<script>
export default {
    data () {
      return {
        drawer: false
      }
    },
    computed: {
      colors () {
        return this.$store.getters.colors
      },
      color () {
        return this.$store.getters.themeColor
      },
      error () {
        return this.$store.getters.error
      },
      isUserLoggedIn () {
        return this.$store.getters.isUserLoggedIn
      },
      links () {
        if (this.isUserLoggedIn) {
          return [
            { title: 'Orders', icon: 'bookmark', url: '/orders' },
            { title: 'New ad', icon: 'note', url: '/new' },
            { title: 'My ads', icon: 'book', url: '/list' }
          ]
        }

        return [
          { title: 'Login', icon: 'lock', url: '/login' },
          { title: 'Registration', icon: 'face', url: '/registration' }
        ]
      }
    },
    methods: {
      changeColor (color) {
        this.$store.dispatch('changeColor', color)
      },
      closeError () {
        this.$store.dispatch('clearError')
      },
      onLogout () {
        this.$store.dispatch('logoutUser')
        this.$router.push('/')
      }
    }
}
</script>

<style scoped>
.homeLink {
  cursor: pointer;
}
</style>