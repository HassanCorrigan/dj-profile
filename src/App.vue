<template>
  <MainHeader
    :name="name"
    :tagline="tagline"
    :photo="photo"
    :numberOfMixes="mixes.length"
    :numberOfSongs="songs.length"
  />
  <AudioList heading="Recent Mixes" :audioList="mixes" />
  <AudioList heading="Recent Songs" :audioList="songs" />
  <MainFooter />
</template>

<script>
import MainHeader from './components/MainHeader';
import AudioList from './components/AudioList';
import MainFooter from './components/MainFooter';
import { name, tagline, photo, mixes, songs } from './data.json';

export default {
  name: 'App',
  components: {
    MainHeader,
    AudioList,
    MainFooter,
  },
  data() {
    return { name, tagline, photo, mixes, songs };
  },
};
</script>
