export default function({ route, store }) {
  console.log(route.name)
  if (route.name !== 'index') {
    store.dispatch('overlay/switchOverlay', true)
  }
}
