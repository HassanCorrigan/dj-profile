<template>
  <MainHeader />
  <AudioList heading="Recent Mixes" :audioList="mixes" />
  <AudioList heading="Recent Songs" :audioList="songs" />
  <MainFooter />
  <AudioPlayer />
</template>

<script>
import MainHeader from './components/MainHeader';
import AudioList from './components/AudioList';
import MainFooter from './components/MainFooter';
import AudioPlayer from './components/AudioPlayer';

export default {
  name: 'App',
  components: {
    MainHeader,
    AudioList,
    MainFooter,
    AudioPlayer,
  },
  data() {
    const { mixes, songs } = this.$store.state;
    return {
      mixes,
      songs,
    };
  },
};
</script>
