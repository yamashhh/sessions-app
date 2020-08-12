export default ({ route, store, redirect }) => {
  console.log('ROUTE GUARD ROUTE GUARD')
  if (
    !store.getters['auth/signedIn'] &&
    (route.name === 'dashboard' || route.name === 'settings')
  ) {
    console.log('blocked')
    store.dispatch('auth/clearUser')
    redirect('/')
  }
}
