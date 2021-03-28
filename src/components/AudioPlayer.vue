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
    <div class="player">
      <p class="title">{{ title }}</p>
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
        height: 30,
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
      this.toggleBtnIcon(wavesurfer.isPlaying());
    },
    toggleBtnIcon(playing) {
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
        /** Reset by removing the old waveform if one exists */
        document.querySelector('#waveform').innerHTML = '';

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
          this.toggleBtnIcon(wavesurfer.isPlaying());

          /** Set the audio duration */
          this.duration = this.formatTime(wavesurfer.getDuration());
        });

        wavesurfer.on('audioprocess', () => {
          /** Set the current time while the audio is playing */
          this.currentTime = this.formatTime(wavesurfer.getCurrentTime());
        });

        /** Change back to play button icon after audio ends */
        wavesurfer.on('finish', () => {
          this.toggleBtnIcon(wavesurfer.isPlaying());
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
  display: flex;
  place-items: center;
  padding: 0.5rem 1rem;
  overflow: hidden;
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
  height: 3rem;
  border-radius: var(--border-radius);
}
.timecode {
  float: right;
  line-height: 1.5rem;
}
</style>
