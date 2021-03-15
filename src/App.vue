<template>
  <MainLayout>
    <ArtistInfo />
    <MixList />
  </MainLayout>
</template>

<script>
import MainLayout from './components/MainLayout';
import ArtistInfo from './components/ArtistInfo';
import MixList from './components/MixList';

export default {
  name: 'App',
  components: {
    MainLayout,
    ArtistInfo,
    MixList,
  },
};
</script>

<style></style>
