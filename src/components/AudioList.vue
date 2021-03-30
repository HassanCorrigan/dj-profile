<template>
  <section class="audio">
    <h1>{{ heading }}</h1>
    <AudioListItem
      v-for="(audio, index) in audioList"
      :key="index"
      :title="audio.title"
      :cover="audio.cover"
      :genres="audio.genres"
      :url="audio.url"
      :peaks="audio.peaks"
    />
  </section>
</template>

<script>
import AudioListItem from './AudioListItem';

export default {
  name: 'AudioList',
  components: {
    AudioListItem,
  },
  props: {
    heading: String,
    audioList: Array,
  },
};
</script>

<style scoped>
section.audio {
  padding: 2rem;
  max-width: 100rem;
  margin: auto;
}
</style>
