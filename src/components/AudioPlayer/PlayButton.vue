<template>
  <button
    @click="handlePlayBtn"
    class="play-button"
    :style="{
      backgroundImage: `url(${cover})`,
    }"
    title="Play/Pause"
  >
    <img
      class="play-button-icon"
      :src="require(`@/assets/${playBtnSrc}`)"
      alt="Play Button"
    />
  </button>
</template>

<script>
export default {
  name: 'PlayButton',
  props: {
    cover: String,
    wavesurfer: Object,
  },
  data() {
    return {
      playBtnSrc: 'play-button.svg',
    };
  },
  methods: {
    handlePlayBtn() {
      /** If there is no audio loaded, return */
      if (this.wavesurfer === null) {
        return;
      }

      /** Toggle play/pause */
      this.wavesurfer.playPause();

      /** Toggle the play button */
      this.toggleBtnIcon();
    },
    toggleBtnIcon() {
      /** Toggles the play button icon depending on if audio is playing */
      this.wavesurfer.isPlaying()
        ? (this.playBtnSrc = 'pause-button.svg')
        : (this.playBtnSrc = 'play-button.svg');
    },
  },
  watch: {
    wavesurfer: function() {
      /** Change back to play button icon after audio ends */
      this.wavesurfer.on('finish', () => {
        this.toggleBtnIcon();
      });
    },
  },
};
</script>

<style scoped>
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

@media (prefers-color-scheme: dark) {
  .play-button-icon {
    filter: invert(0.85);
  }
}
</style>
