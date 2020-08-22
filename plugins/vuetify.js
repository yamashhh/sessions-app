import colors from 'vuetify/es5/util/colors'
import NuxtJSIcon from '@/components/icons/NuxtJSIcon.vue'
import NuxtJSTypo from '@/components/icons/NuxtJSTypo.vue'
import VuetifyIcon from '@/components/icons/VuetifyIcon.vue'
import FirebaseIcon from '@/components/icons/FirebaseIcon.vue'

export default {
  icons: {
    values: {
      NuxtJSIcon: {
        component: NuxtJSIcon
      },
      NuxtJSTypo: {
        component: NuxtJSTypo
      },
      VuetifyIcon: {
        component: VuetifyIcon
      },
      FirebaseIcon: {
        component: FirebaseIcon
      }
    }
  },
  theme: {
    themes: {
      light: {
        primary: colors.deepPurple.darken4
      }
    }
  }
}
