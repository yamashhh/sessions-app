export default function({ route, store, redirect }) {
  if (!store.getters['auth/loggedIn'] && route.name === 'dashboard') {
    console.log('blocked')
    redirect('/')
  }
}
