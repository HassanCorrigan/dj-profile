<template>
  <div class="audio-player">
    <button
      @click="handlePlayBtn"
      class="play-button"
      :style="{ backgroundImage: `url(${cover})` }"
      title="Play/Pause"
    >
      <img
        class="play-button-icon"
        :src="require(`@/assets/${playBtnSrc}`)"
        alt="Play Button"
      />
    </button>
    <div class="player">
      <p class="title">
        {{ title }}
      </p>
      <div id="waveform" class="waveform"></div>
      <p class="timecode">{{ currentTime }} / {{ duration }}</p>
    </div>
  </div>
</template>

<script>
import WaveSurfer from 'wavesurfer.js';

export default {
  name: 'AudioPlayer',
  props: {
    title: String,
    cover: String,
    url: String,
    peaks: String,
  },
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
        backend: 'MediaElement',
        progressColor: '#94369f',
        waveColor: '#cc295a',
        removeMediaElementOnDestroy: true,
      });
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
    toggleBtnIcon() {
      this.wavesurfer.isPlaying()
        ? (this.playBtnSrc = 'pause-button.svg')
        : (this.playBtnSrc = 'play-button.svg');
    },
    formatTime(seconds) {
      return new Date(seconds * 1000).toISOString().substr(11, 8);
    },
  },
  watch: {
    url: function(next, previous) {
      this.$nextTick(function() {
        /** Create a new instance of wavesurfer */
        this.createWaveSurfer();

        const wavesurfer = this.wavesurfer;

        /** Load the audio source */
        wavesurfer.load(this.url);

        /** Automatically start playing the audio */
        wavesurfer.play();

        /** Toggle the play button */
        this.toggleBtnIcon();

        /** Wait for the wavesurfer instance to be ready, */
        wavesurfer.on('ready', () => {
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
.timecode {
  color: var(--light-text-color);
  text-align: right;
  line-height: 1.5rem;
}
</style>
