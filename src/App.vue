<template>
  <MainLayout>
    <ArtistInfo :numberOfMixes="mixes.length" :numberOfSongs="songs.length" />
    <AudioList heading="Recent Mixes" :audioList="mixes" />
    <AudioList heading="Recent Songs" :audioList="songs" />
  </MainLayout>
</template>

<script>
import MainLayout from './components/MainLayout';
import ArtistInfo from './components/ArtistInfo';
import AudioList from './components/AudioList';

export default {
  name: 'App',
  components: {
    MainLayout,
    ArtistInfo,
    AudioList,
  },
  data() {
    return {
      mixes: [
        { title: 'Mix 1', genres: ['House', "90's", 'Oldskool'] },
        { title: 'Mix 2', genres: ['Techno', 'Trance'] },
        { title: 'Mix 3', genres: ['Pop', 'Noughties', 'Hits'] },
      ],
      songs: [
        { title: 'Song 1', genres: ["90's", 'Oldskool'] },
        { title: 'Song 2', genres: ['Tech', 'House'] },
        { title: 'Song 3', genres: ['Pop', 'Hits'] },
        { title: 'Song 4', genres: ['Noughties', 'Alternative'] },
        { title: 'Song 5', genres: ['Pop', 'Hits'] },
      ],
    };
  },
};
</script>

<style></style>
