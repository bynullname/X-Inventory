// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr:false,
  devtools: { enabled: true },
  dev:'0.0.0.0',
  modules: [
    '@vant/nuxt',
    '@element-plus/nuxt'
     ],
  vant: { /** Options */ },
  elementPlus: { /** Options */ }
})
