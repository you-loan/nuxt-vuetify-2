import LRU from 'lru-cache'
import pkg from './package'

const themeCache = new LRU({
  max: 10,
  maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
})

export default {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['~/assets/style/app.sass'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],

  devModules: ['@nuxtjs/vuetify'],

  // Vuetify options
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/style/variables.sass'],
    theme: {
      themes: {
        light: {
          primary: '#FF5722',
          accent: '#FFAB91',
          success: '#4CAF50'
        }
      },
      options: {
        themeCache,
        minifyTheme: function(css) {
          return css.replace(/[\s|\r\n|\r|\n]/g, '')
        }
      }
    }
  },

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
