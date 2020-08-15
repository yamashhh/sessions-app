export default function({ route, store }) {
  if (
    route.name === 'sign-in' ||
    route.name === 'dashboard' ||
    route.name === 'settings'
  ) {
    store.dispatch('overlay/switchOverlay', true)
  }
}
