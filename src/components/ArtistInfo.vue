<template>
  <section class="info">
    <div class="card">
      <img
        @click="animateLogo"
        class="logo"
        :data-animate="animate"
        src="../assets/vinyl.svg"
        alt="DJ Logo"
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
  data() {
    return { animate: false };
  },
  props: {
    name: String,
    tagline: String,
    numberOfMixes: Number,
    numberOfSongs: Number,
  },
  methods: {
    animateLogo() {
      this.animate = !this.animate;
    },
  },
  mounted() {
    /** Checks if audio is playing, animates vinyl if playing */
    this.$nextTick(function() {
      const allAudio = Array.from(document.querySelectorAll('audio'));
      allAudio.forEach(el => {
        el.addEventListener('play', () => {
          this.animate = !el.paused;
        });
        el.addEventListener('pause', () => {
          this.animate = !el.paused;
        });
      });
    });
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
.logo {
  width: 15rem;
  margin-top: -9rem;
  border-radius: 50%;
  padding: 0.5rem;
  cursor: pointer;
  background-color: var(--secondary-background-color);
}
.logo[data-animate='true'] {
  animation: animateLogo 1s linear 0s infinite normal forwards;
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
@keyframes animateLogo {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
