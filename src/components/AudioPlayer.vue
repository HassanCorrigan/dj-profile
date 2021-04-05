<template>
  <div class="audio-player" v-show="showPlayer">
    <PlayButton
      :cover="transformURL(currentlyPlaying.cover)"
      :wavesurfer="wavesurfer"
      ref="playButton"
    />
    <div class="player">
      <p class="title">{{ currentlyPlaying.title }}</p>
      <div id="waveform" class="waveform"></div>
      <div class="controls">
        <input
          type="range"
          class="volume-slider"
          min="0"
          max="100"
          value="50"
          @input="handleVolumeChange"
        />
        <p class="timecode">{{ currentTime }} / {{ duration }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import WaveSurfer from 'wavesurfer.js';
import PlayButton from './AudioPlayer/PlayButton';

export default {
  name: 'AudioPlayer',
  components: {
    PlayButton,
  },
  data() {
    return {
      wavesurfer: null,
      currentTime: this.formatTime(0),
      duration: this.formatTime(0),
    };
  },
  methods: {
    createWaveSurfer() {
      /** Reset by removing the old wavesurfer if one exists */
      this.wavesurfer !== null && this.wavesurfer.destroy();

      /** Create a new wavesurfer instance */
      this.wavesurfer = WaveSurfer.create({
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
      /** Construct and return the download url */
      const baseURL = 'https://dl.dropboxusercontent.com';
      const { pathname } = new URL(url);

      const staticURL = `${baseURL}${pathname}`;

      return staticURL;
    },
    async fetchPeaks() {
      // Check if peaks are defined, return null if they aren't
      if (this.currentlyPlaying.peaks === '') {
        return '';
      }

      // Fetch the data from the url
      try {
        const url = this.transformURL(this.currentlyPlaying.peaks);
        const peaks = await fetch(url);
        return peaks.json();
      } catch (error) {
        console.error(error);
      }
    },
    handleVolumeChange(e) {
      const volume = e.target.value / 100;
      this.wavesurfer.setVolume(volume);
      localStorage.setItem('audio-player-volume', volume);
    },
    formatTime(seconds) {
      return new Date(seconds * 1000).toISOString().substr(11, 8);
    },
    getVolumeFromLocalStorage() {
      const localVolume = localStorage.getItem('audio-player-volume') * 100;
      return localVolume;
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
    currentlyPlaying: function() {
      this.$nextTick(async function() {
        /** Create a new instance of wavesurfer */
        this.createWaveSurfer();

        const wavesurfer = this.wavesurfer;
        const url = this.transformURL(this.currentlyPlaying.url);
        const { data } = this.fetchPeaks();

        /** Load the audio source */
        wavesurfer.load(url, data);

        /** Wait for the wavesurfer instance to be ready, */
        wavesurfer.on('ready', () => {
          /** Automatically start playing the audio */
          wavesurfer.play();

          /** Toggle the play button */
          this.$refs.playButton.toggleBtnIcon();

          /** Set the audio duration */
          this.duration = this.formatTime(wavesurfer.getDuration());
        });

        wavesurfer.on('audioprocess', () => {
          /** Set the current time while the audio is playing */
          this.currentTime = this.formatTime(wavesurfer.getCurrentTime());
        });

        /** Change back to play button icon after audio ends */
        wavesurfer.on('finish', () => {
          this.$refs.playButton.toggleBtnIcon();
        });
      });
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
.player {
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
.timecode {
  color: var(--light-text-color);
  line-height: 1.5rem;
}
</style>
