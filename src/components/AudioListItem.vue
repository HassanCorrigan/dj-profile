<template>
  <div class="card">
    <p class="title">{{ title }}</p>
    <audio class="audio-player" controls>
      <source :src="url" type="audio/mpeg" />
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
    url: String,
  },
};
</script>

<style scoped>
.card {
  margin: 2rem 0;
}
.title {
  font-weight: 400;
}
.audio-player {
  margin: 1rem 0;
  width: 100%;
  outline: none;
  border-radius: var(--border-radius);
  background-color: rgb(241, 241, 241);
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
