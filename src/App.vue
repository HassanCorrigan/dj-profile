<template>
  <MainLayout>
    <ArtistInfo
      :name="name"
      :tagline="tagline"
      :numberOfMixes="mixes.length"
      :numberOfSongs="songs.length"
      :isAudioPlaying="isAudioPlaying"
    />
    <AudioList
      heading="Recent Mixes"
      :audioList="mixes"
      @set-is-audio-playing="setIsAudioPlaying"
    />
    <AudioList
      heading="Recent Songs"
      :audioList="songs"
      @set-is-audio-playing="setIsAudioPlaying"
    />
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
    return { name, tagline, mixes, songs, isAudioPlaying: false };
  },
  methods: {
    setIsAudioPlaying(event) {
      this.isAudioPlaying = event;
    },
  },
};
</script>
