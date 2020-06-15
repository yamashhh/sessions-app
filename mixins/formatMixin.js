export const formatMixin = {
  methods: {
    formatTime(time) {
      const d = new Date(time)
      const h = String(d.getUTCHours()).padStart(2, '0')
      const m = String(d.getMinutes()).padStart(2, '0')
      const s = String(d.getSeconds()).padStart(2, '0')
      // const ms = String(d.getMilliseconds()).padStart(3, '0')
      return `${h}:${m}:${s}`
    },
    formatDate(date) {
      const year = String(date.getUTCFullYear())
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      return `${year}-${month}-${day} ${hours}:${minutes}`
    }
  }
}
