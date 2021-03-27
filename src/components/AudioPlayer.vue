<template>
  <div class="audio-player">
    <button
      @click="handlePlayBtn"
      class="play-button"
      :style="{ backgroundImage: `url(${cover})` }"
    >
      <img
        class="play-button-icon"
        :src="require(`@/assets/${playBtnSrc}`)"
        alt="Play Button"
      />
    </button>
    <div id="waveform" class="waveform"></div>
  </div>
  <!-- <p class="timecode">{{ currentTime }} / {{ duration }}</p> -->
</template>

<script>
import WaveSurfer from 'wavesurfer.js';

export default {
  name: 'AudioPlayer',
  props: {
    title: String,
    cover: String,
    url: String,
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
      this.wavesurfer = WaveSurfer.create({
        container: '#waveform',
        responsive: true,
        height: 50,
        backend: 'MediaElement',
        progressColor: '#94369f',
        waveColor: '#cc295a',
      });
    },
    handlePlayBtn() {
      const wavesurfer = this.wavesurfer;

      /** If there is no audio loaded, return */
      if (wavesurfer === null) {
        return;
      }

      wavesurfer.playPause();

      /** If audio is playing, display a pause button,  */
      this.toggleBtn(wavesurfer.isPlaying());
    },
    toggleBtn(playing) {
      playing
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

        /** Wait for the wavesurfer instance to be ready, */
        wavesurfer.on('ready', () => {
          /** Automatically start playing the audio */
          wavesurfer.play();

          /** If audio is playing, toggle the button */
          this.toggleBtn(wavesurfer.isPlaying());

          /** Set the audio duration */
          this.duration = this.formatTime(wavesurfer.getDuration());
        });

        wavesurfer.on('audioprocess', () => {
          /** Set the current time while the audio is playing */
          this.currentTime = this.formatTime(wavesurfer.getCurrentTime());
        });

        /** Change back to play button icon after audio ends */
        wavesurfer.on('finish', () => {
          this.toggleBtn(wavesurfer.isPlaying());
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
  background-color: var(--secondary-background-color);
  max-height: 6rem;
  display: flex;
  place-items: center;
  padding: 1rem;
  overflow: hidden;
}
.play-button {
  width: 6rem;
  height: 6rem;
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
.waveform {
  width: 100%;
  max-height: 10rem;
  border-radius: var(--border-radius);
  padding: 0 0.5rem;
}
.timecode {
  float: right;
}
</style>
