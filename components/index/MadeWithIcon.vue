<template>
  <a :href="elem.href">
    <v-icon v-for="(icon, j) of elem.icons" :key="j" :size="elem.size">
      {{ icon }}
    </v-icon>
  </a>
</template>

<script>
export default {
  props: {
    elem: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
