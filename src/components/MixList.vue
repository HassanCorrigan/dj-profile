<template>
  <section class="mixes">
    <h1>Recent Mixes</h1>
    <MixListItem title="Mix 1" :genres="['House', '90\'s', 'Oldskool']" />
    <MixListItem title="Mix 2" :genres="['Techno', 'Trance']" />
    <MixListItem title="Mix 3" :genres="['Pop', 'Noughties', 'Hits']" />
  </section>
</template>

<script>
import MixListItem from './MixListItem';

export default {
  name: 'MixList',
  components: {
    MixListItem,
  },
};
</script>

<style scoped>
section.mixes {
  padding: 2rem;
}
</style>
