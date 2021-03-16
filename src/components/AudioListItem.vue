<template>
  <div class="card">
    <p class="title">{{ title }}</p>
    <audio class="audio-player" controls>
      <source src="#" type="audio/mpeg" />
    </audio>
    <div class="metadata">
      <span class="genre" v-for="(genre, index) in genres" :key="index">{{
        genre
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AudioListItem',
  props: {
    id: Number,
    title: String,
    genres: Array,
  },
};
</script>

<style scoped>
.card {
  margin: 2rem 0;
}
.audio-player {
  margin: 0.5rem 0;
  width: 100%;
}
.metadata {
  padding: 0.5rem 0;
}
.metadata .genre {
  display: inline-block;
  color: var(--light-text-color);
  padding: 0.1rem;
  margin-right: 0.75rem;
  font-size: 1.4rem;
}
.metadata .genre::before {
  content: '#';
}
</style>
