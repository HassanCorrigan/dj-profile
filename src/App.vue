<template>
  <MainHeader
    :name="name"
    :tagline="tagline"
    :photo="photo"
    :numberOfMixes="mixes.length"
    :numberOfSongs="songs.length"
  />
  <AudioList
    heading="Recent Mixes"
    :audioList="mixes"
    @set-currently-playing="setCurrentlyPlaying"
  />
  <AudioList
    heading="Recent Songs"
    :audioList="songs"
    @set-currently-playing="setCurrentlyPlaying"
  />
  <MainFooter />
  <AudioPlayer
    :title="currentlyPlaying.title"
    :cover="currentlyPlaying.cover"
    :url="currentlyPlaying.url"
    :peaks="currentlyPlaying.peaks"
  />
</template>

<script>
import MainHeader from './components/MainHeader';
import AudioList from './components/AudioList';
import MainFooter from './components/MainFooter';
import AudioPlayer from './components/AudioPlayer';
import { name, tagline, photo, mixes, songs } from './data.json';

export default {
  name: 'App',
  components: {
    MainHeader,
    AudioList,
    MainFooter,
    AudioPlayer,
  },
  data() {
    return {
      name,
      tagline,
      photo,
      mixes,
      songs,
      currentlyPlaying: {
        title: '',
        url: '',
        cover: '',
        peaks: '',
      },
    };
  },
  methods: {
    setCurrentlyPlaying(audio) {
      this.currentlyPlaying = {
        title: audio.title,
        url: audio.url,
        cover: audio.cover,
        peaks: audio.peaks,
      };
    },
  },
};
</script>
