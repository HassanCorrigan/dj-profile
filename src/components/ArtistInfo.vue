<template>
  <section class="info">
    <div class="card">
      <img class="logo" src="../assets/logo.png" alt="DJ Logo" />
      <p class="name">DJ Name</p>
      <p class="tagline">A personalised tagline</p>

      <div class="metadata">
        <p>10 Mixes</p>
        <span>/</span>
        <p>3 Songs</p>
      </div>

      <div class="social-networks"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ArtistInfo',
};
</script>

<style scoped>
section.info {
  margin-top: 7.5rem;
  padding: 2rem;
}
.logo {
  width: 15rem;
  margin-top: -9rem;
  border-radius: 50%;
  padding: 0.5rem;
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
