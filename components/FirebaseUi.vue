<template>
  <div id="firebaseui-auth-container" />
</template>
<script>
import { authProviders, auth } from '@/plugins/firebase'

export default {
  name: 'FirebaseUi',
  mounted() {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        const firebaseui = require('firebaseui')
        const ui =
          firebaseui.auth.AuthUI.getInstance() ||
          new firebaseui.auth.AuthUI(auth)
        const config = {
          signInOptions: [authProviders.Google],
          signInSuccessUrl: '/dashboard',
          callbacks: {
            // Below method is only needed for development,
            // delete when moving to production.
            // https://blog.ikedaosushi.com/entry/2019/04/17/201246
            signInSuccessWithAuthResult: (authResult) => {
              console.log('signInSuccessWithAuthResult')
              window.location.href = '/dashboard'
              return false
            },
            uiShown() {
              console.log('uiShown')
            }
          }
        }
        ui.start('#firebaseui-auth-container', config)
      }
    })
  }
}
</script>

<style src="~/node_modules/firebaseui/dist/firebaseui.css"></style>
