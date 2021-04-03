<template>
  <div class="audio-player" v-show="showPlayer">
    <button
      @click="handlePlayBtn"
      class="play-button"
      :style="{ backgroundImage: `url(${currentlyPlaying.cover})` }"
      title="Play/Pause"
    >
      <img
        class="play-button-icon"
        :src="require(`@/assets/${playBtnSrc}`)"
        alt="Play Button"
      />
    </button>
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

export default {
  name: 'AudioPlayer',
  data() {
    return {
      wavesurfer: null,
      playBtnSrc: 'play-button.svg',
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
    async fetchPeaks() {
      // Check if peaks are defined, return null if they aren't
      if (this.currentlyPlaying.peaks === '') {
        return '';
      }

      // Fetch the data from the url
      try {
        const peaks = await fetch(this.currentlyPlaying.peaks);
        return peaks.json();
      } catch (error) {
        console.error(error);
      }
    },
    handlePlayBtn() {
      const wavesurfer = this.wavesurfer;

      /** If there is no audio loaded, return */
      if (wavesurfer === null) {
        return;
      }

      /** Toggle play/pause */
      wavesurfer.playPause();

      /** Toggle the play button */
      this.toggleBtnIcon();
    },
    handleVolumeChange(e) {
      const volume = e.target.value / 100;
      this.wavesurfer.setVolume(volume);
      localStorage.setItem('audio-player-volume', volume);
    },
    toggleBtnIcon() {
      this.wavesurfer.isPlaying()
        ? (this.playBtnSrc = 'pause-button.svg')
        : (this.playBtnSrc = 'play-button.svg');
    },
    formatTime(seconds) {
      return new Date(seconds * 1000).toISOString().substr(11, 8);
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
    getVolumeFromLocalStorage() {
      const localVolume = localStorage.getItem('audio-player-volume') * 100;
      return localVolume;
    },
  },
  watch: {
    currentlyPlaying: function(next, previous) {
      this.$nextTick(async function() {
        /** Create a new instance of wavesurfer */
        this.createWaveSurfer();

        const wavesurfer = this.wavesurfer;

        const { data } = await this.fetchPeaks();

        /** Load the audio source */
        wavesurfer.load(this.currentlyPlaying.url, data);

        /** Wait for the wavesurfer instance to be ready, */
        wavesurfer.on('ready', () => {
          /** Automatically start playing the audio */
          wavesurfer.play();

          /** Toggle the play button */
          this.toggleBtnIcon();

          /** Set the audio duration */
          this.duration = this.formatTime(wavesurfer.getDuration());
        });

        wavesurfer.on('audioprocess', () => {
          /** Set the current time while the audio is playing */
          this.currentTime = this.formatTime(wavesurfer.getCurrentTime());
        });

        /** Change back to play button icon after audio ends */
        wavesurfer.on('finish', () => {
          this.toggleBtnIcon();
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
.play-button {
  min-width: 6rem;
  min-height: 6rem;
  color: var(--secondary-color);
  background-color: var(--primary-background-color);
  border-radius: var(--border-radius);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.play-button-icon {
  background-color: rgb(240, 240, 240);
  border-radius: 50%;
  padding: 0.75rem;
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
