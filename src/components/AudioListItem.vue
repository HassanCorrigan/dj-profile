<template>
  <div class="card">
    <button
      class="play-button"
      :style="{ backgroundImage: `url(${cover})` }"
      @click="$emit('set-currently-playing', { title, cover, url })"
    >
      <img
        id="playBtnIcon"
        class="play-button-icon"
        src="../assets/play-button.svg"
        alt="Play Button"
      />
    </button>
    <div class="details">
      <p class="title">{{ title }}</p>
      <div class="metadata">
        <span class="genre" v-for="(genre, index) in genres" :key="index">{{
          genre
        }}</span>
      </div>
    </div>
    <button @click="downloadAudio" class="download-btn" title="Download">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 15V3m0 12l-4-4m4 4l4-4" />
        <path
          d="M2 17l.621 2.485A2 2 0 004.561 21H19.439a2 2 0 001.94-1.515L22 17"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'AudioListItem',
  props: {
    title: String,
    cover: String,
    genres: Array,
    url: String,
  },
  methods: {
    downloadAudio() {
      console.log('Downloading:', this.url);
      alert('Downloads coming soon...');
    },
  },
};
</script>

<style scoped>
.card {
  margin: 2rem 0;
  display: flex;
  align-items: center;
}
.play-button {
  width: 8rem;
  height: 8rem;
  border-radius: var(--border-radius);

  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.play-button-icon {
  background-color: rgb(240, 240, 240);
  border-radius: 50%;
  padding: 0.75rem;
}
.details {
  padding: 0 1rem;
}
.title {
  font-weight: 400;
  padding-bottom: 0.5rem;
}
.metadata {
  padding-bottom: 0.5rem;
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
.download-btn {
  color: var(--primary-color);
  background-color: var(--primary-background-color);
  padding: 1rem;
  height: 4rem;
  width: 4rem;
  border-radius: var(--border-radius);
  margin-left: auto;
}
</style>
