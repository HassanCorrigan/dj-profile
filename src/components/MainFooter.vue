<template>
  <footer>
    <a
      class="social-link"
      v-for="(url, network, index) in social"
      :key="index"
      :href="url"
      target="_blank"
      rel="noopener"
      >{{ network }}</a
    >
  </footer>
</template>

<script>
export default {
  name: 'MainFooter',
  data() {
    const { social } = this.$store.state;
    return {
      social,
    };
  },
};
</script>

<style scoped>
footer {
  padding: 2rem;
  background-color: var(--secondary-background-color);
  margin: 2rem 0;
}
.social-link {
  display: inline-block;
  color: var(--main-color);
  padding: 0.5rem;
  margin: 0 0.25rem;
  text-transform: capitalize;
  text-decoration: none;
}
.social-link:hover {
  text-decoration: underline;
}
</style>
