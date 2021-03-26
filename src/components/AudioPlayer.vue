<template>
  <div class="audio-player">
    <button
      :id="`button-${id}`"
      class="play-button"
      :style="{ backgroundImage: `url(${cover})` }"
    >
      <img
        :id="`buttonIcon-${id}`"
        class="play-button-icon"
        src="../assets/play-button.svg"
        alt="Play Button"
      />
    </button>
    <div :id="setID" class="waveform"></div>
  </div>
  <p class="timecode">{{ currentTime }} / {{ duration }}</p>
</template>

<script>
import WaveSurfer from 'wavesurfer.js';

export default {
  name: 'AudioPlayer',
  props: {
    id: Number,
    cover: String,
    url: String,
  },
  data() {
    return {
      currentTime: this.formatTime(0),
      duration: this.formatTime(0),
    };
  },
  emits: ['set-is-audio-playing'],
  methods: {
    formatTime(seconds) {
      return new Date(seconds * 1000).toISOString().substr(11, 8);
    },
  },
  mounted() {
    this.$nextTick(function() {
      const btn = document.querySelector(`#button-${this.id}`);
      const btnIcon = document.querySelector(`#buttonIcon-${this.id}`);

      /** Create an instance of wavesurfer */
      const wavesurfer = WaveSurfer.create({
        container: `#waveform-${this.id}`,
        responsive: true,
        backend: 'MediaElement',
        progressColor: '#94369f',
        waveColor: '#cc295a',
      });

      /** Load the audio source */
      wavesurfer.load(this.url);

      /** Wait for the wavesurfer instance to be ready, */
      wavesurfer.on('ready', () => {
        /** Add play button event listener */
        btn.addEventListener('click', e => {
          wavesurfer.playPause();

          /** If audio is playing, display a pause button,  */
          wavesurfer.isPlaying()
            ? (btnIcon.src = require(`../assets/pause-button.svg`))
            : (btnIcon.src = require(`../assets/play-button.svg`));

          /** Emits an event to set a boolean of true or false */
          this.$emit('set-is-audio-playing', wavesurfer.isPlaying());
        });

        /** Set the audio duration */
        this.duration = this.formatTime(wavesurfer.getDuration());
      });

      wavesurfer.on('audioprocess', () => {
        /** Set the current time while the audio is playing */
        this.currentTime = this.formatTime(wavesurfer.getCurrentTime());
      });

      /** Change back to play button icon after audio ends */
      wavesurfer.on('finish', () => {
        btnIcon.src = require(`../assets/play-button.svg`);
        /** Emits an event to set a boolean of true or false */
        this.$emit('set-is-audio-playing', wavesurfer.isPlaying());
      });
    });
  },
  computed: {
    setID() {
      return `waveform-${this.id}`;
    },
  },
};
</script>

<style scoped>
.audio-player {
  display: flex;
  place-items: center;
  margin: 1rem 0;
  overflow: hidden;
}
.play-button {
  width: 12rem;
  height: 12rem;
  aspect-ratio: 1/1;
  color: var(--secondary-color);
  background-color: var(--primary-background-color);
  border-radius: var(--border-radius);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  font-family: 'Rubik', sans-serif;
  border: none;
  outline: none;
  cursor: pointer;
  margin-right: 1rem;
}
.play-button-icon {
  background-color: rgb(240, 240, 240);
  border-radius: 50%;
  padding: 1rem;
}
.play-button-icon:hover {
  filter: brightness(0.9);
}
.waveform {
  width: 100%;
  height: 12rem;
  border-radius: var(--border-radius);
  overflow: hidden;
}
.timecode {
  float: right;
}
</style>
