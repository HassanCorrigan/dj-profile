<template>
  <MainLayout>
    <ArtistInfo
      :name="name"
      :tagline="tagline"
      :numberOfMixes="mixes.length"
      :numberOfSongs="songs.length"
    />
    <AudioList heading="Recent Mixes" :audioList="mixes" />
    <AudioList heading="Recent Songs" :audioList="songs" />
  </MainLayout>
</template>

<script>
import MainLayout from './components/MainLayout';
import ArtistInfo from './components/ArtistInfo';
import AudioList from './components/AudioList';
import { name, tagline, mixes, songs } from './data.json';

export default {
  name: 'App',
  components: {
    MainLayout,
    ArtistInfo,
    AudioList,
  },
  data() {
    return { name, tagline, mixes, songs };
  },
};
</script>
