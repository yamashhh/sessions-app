export default function({ route, store }) {
  if (route.name === 'sign-in') {
    console.log('route is sign-in')
    store.dispatch('overlay/switchOverlay')
  }
}
