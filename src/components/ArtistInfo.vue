<template>
  <section class="info">
    <div class="card">
      <img
        class="vinyl"
        :data-animate="animate"
        src="../assets/vinyl.svg"
        alt="Vinyl"
      />
      <p class="name">{{ name }}</p>
      <p class="tagline">{{ tagline }}</p>

      <div class="metadata">
        <p>{{ numberOfMixes }} Mixes</p>
        <span>/</span>
        <p>{{ numberOfSongs }} Songs</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ArtistInfo',
  props: {
    name: String,
    tagline: String,
    numberOfMixes: Number,
    numberOfSongs: Number,
    isAudioPlaying: Boolean,
  },
  data() {
    return { animate: false };
  },
  updated() {
    this.animate = this.isAudioPlaying;
  },
};
</script>

<style scoped>
section.info {
  margin-top: 7.5rem;
  padding: 2rem;
}
.card {
  max-width: 50rem;
  margin: auto;
}
.vinyl {
  width: 15rem;
  margin-top: -9rem;
  border-radius: 50%;
  padding: 0.5rem;
  background-color: var(--secondary-background-color);
}
.vinyl[data-animate='true'] {
  animation: animateVinyl 1s linear 0s infinite normal forwards;
}
.card {
  text-align: center;
}
.name {
  text-transform: uppercase;
  font-weight: 400;
  font-size: 1.75rem;
  padding: 0.5rem 0;
}
.tagline {
  color: var(--light-text-color);
  padding: 0.5rem 0;
  font-style: italic;
}
.metadata {
  padding: 0.5rem 0;
}
.metadata p {
  display: inline;
  padding: 0 1rem;
}
</style>

<style>
@keyframes animateVinyl {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
