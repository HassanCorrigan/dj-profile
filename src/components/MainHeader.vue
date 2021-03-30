<template>
  <header>
    <div class="card">
      <img class="profile" :src="profilePhoto" alt="Profile Photo" />
      <h1 class="name">{{ name }}</h1>
      <p class="tagline">{{ tagline }}</p>

      <div class="metadata">
        <p>{{ mixesCount }} Mixes</p>
        <span>/</span>
        <p>{{ songsCount }} Songs</p>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'MainHeader',
  data() {
    const { name, tagline, photo } = this.$store.state;
    const { mixesCount, songsCount } = this.$store.getters;
    return {
      name,
      tagline,
      photo,
      mixesCount,
      songsCount,
    };
  },
  computed: {
    /** Return defined photo, otherwise return a fallback */
    profilePhoto() {
      return this.photo ? this.photo : require(`@/assets/vinyl.svg`);
    },
  },
};
</script>

<style scoped>
header {
  margin-top: 7.5rem;
  padding: 2rem;
}
.card {
  max-width: 50rem;
  margin: auto;
}
.profile {
  width: 15rem;
  margin-top: -9rem;
  border-radius: 50%;
  padding: 0.5rem;
  background-color: var(--secondary-background-color);
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
