<template>
  <div id="firebaseui-auth-container" />
</template>
<script>
import { authProviders, auth } from '@/plugins/firebase'

export default {
  name: 'FirebaseUi',
  mounted() {
    if (process.browser) {
      const firebaseui = require('firebaseui')
      const ui =
        firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth)
      const config = {
        signInOptions: [authProviders.Google],
        signInSuccessUrl: '/dashboard',
        // tosUrl: '/tos',
        // privacyPolicyUrl: '/privacy-policy',
        callbacks: {
          signInSuccessWithAuthResult() {
            console.log('signInSuccessWithAuthResult')
          },
          uiShown() {
            console.log('uiShown')
          }
        }
      }
      ui.start('#firebaseui-auth-container', config)
    }
  }
}
</script>

<style src="~/node_modules/firebaseui/dist/firebaseui.css"></style>
