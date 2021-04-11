<template>
  <div class="audio-player" v-show="showPlayer">
    <PlayButton
      :cover="transformURL(currentlyPlaying.cover)"
      :wavesurfer="wavesurfer"
      ref="playButton"
    />

    <div class="player-body">
      <p class="title">{{ currentlyPlaying.title }}</p>

      <div id="waveform" class="waveform"></div>

      <div class="controls">
        <VolumeSlider :wavesurfer="wavesurfer" />
        <TimeCode :wavesurfer="wavesurfer" />
      </div>
    </div>
  </div>
</template>

<script>
import WaveSurfer from 'wavesurfer.js';
import PlayButton from './AudioPlayer/PlayButton';
import VolumeSlider from './AudioPlayer/VolumeSlider';
import TimeCode from './AudioPlayer/TimeCode';

export default {
  name: 'AudioPlayer',
  components: {
    PlayButton,
    VolumeSlider,
    TimeCode,
  },
  data() {
    return {
      wavesurfer: null,
    };
  },
  methods: {
    createWaveSurfer() {
      /** Reset by removing the old wavesurfer object if one exists */
      this.wavesurfer !== null && this.wavesurfer.destroy();

      /** Create a new wavesurfer instance */
      return WaveSurfer.create({
        container: '#waveform',
        responsive: true,
        height: 30,
        backend: 'WebAudio',
        progressColor: '#94369f',
        waveColor: '#cc295a',
        removeMediaElementOnDestroy: true,
      });
    },
    /** Transforms the URL into a static dropbox link */
    transformURL(url) {
      /** Check if URL is blank */
      if (url === '') {
        return null;
      }
      /** Construct and return the dropbox url */
      const baseURL = 'https://dl.dropboxusercontent.com';
      const { pathname } = new URL(url);

      const staticURL = `${baseURL}${pathname}`;

      return staticURL;
    },
    async fetchPeaks() {
      // Check if peaks are defined, return blank if they aren't
      if (this.currentlyPlaying.peaks === '') {
        return '';
      }

      // Fetch the peaks data from the url
      try {
        const url = this.transformURL(this.currentlyPlaying.peaks);
        const peaks = await fetch(url);

        const { data } = await peaks.json();
        return data;
      } catch (error) {
        console.error(error);
      }
    },
    getVolumeFromLocalStorage() {
      /**
       * Must be dived by 100 as wavesurfer excepts volume value between 0-1).
       * Returns 0.5 as default if no local volume is found.
       */
      return localStorage.getItem('audio-player-volume') / 100 || 0.5;
    },
  },
  computed: {
    currentlyPlaying() {
      const { title, cover, url, peaks } = this.$store.state.currentlyPlaying;
      return {
        title,
        cover,
        url,
        peaks,
      };
    },
    /** Hides audio player if no track is queued */
    showPlayer() {
      return this.wavesurfer !== null;
    },
  },
  watch: {
    currentlyPlaying: async function() {
      /** Create a new instance of wavesurfer */
      this.wavesurfer = this.createWaveSurfer();

      const url = this.transformURL(this.currentlyPlaying.url);
      const peaks = await this.fetchPeaks();
      const volume = this.getVolumeFromLocalStorage();

      /** Load the audio source */
      this.wavesurfer.load(url, peaks);

      /** Wait for the wavesurfer instance to be ready, */
      this.wavesurfer.on('ready', () => {
        /** Automatically start playing the audio */
        this.wavesurfer.play();

        this.wavesurfer.setVolume(volume);

        /** Toggle the play button */
        this.$refs.playButton.toggleBtnIcon();
      });

      /** Log any errors */
      this.wavesurfer.on('error', error => console.error(error));
    },
  },
};
</script>

<style scoped>
.audio-player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  place-items: center;
  background-color: var(--transparent-background-color);
  backdrop-filter: blur(0.5rem);
  padding: 1.5rem 1rem;
  z-index: 3;
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
}
.player-body {
  width: 100%;
  margin-left: 0.75rem;
}
.title {
  font-weight: 400;
  line-height: 1.5rem;
}
.waveform {
  width: 100%;
  min-height: 3rem;
  border-radius: var(--border-radius);
}
.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
