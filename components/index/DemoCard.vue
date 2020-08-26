<template>
  <v-card>
    <v-card-title class="headline font-weight-medium">{{
      content.title
    }}</v-card-title>
    <v-carousel
      v-if="Array.isArray(content.picture.src)"
      height="400"
      hide-delimiters
      show-arrows
    >
      <v-carousel-item v-for="(pic, j) of content.picture.src" :key="j">
        <v-img :src="pic" :height="content.picture.height" contain></v-img>
      </v-carousel-item>
    </v-carousel>
    <v-img
      v-else
      :class="content.picture.class"
      :src="content.picture.src"
      :height="content.picture.height"
      :width="content.picture.width"
      contain
    ></v-img>
    <v-card-text>
      {{ content.text }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'DemoCard',
  props: {
    content: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
