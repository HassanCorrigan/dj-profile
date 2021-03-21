<template>
  <div class="audio-player">
    <button class="play-button">
      <img id="btnIcon" src="../assets/play-button.svg" alt="Play Button" />
    </button>
    <div id="waveform" class="waveform"></div>
  </div>
</template>

<script>
import WaveSurfer from 'wavesurfer.js';

export default {
  name: 'AudioPlayer',
  props: {
    id: Number,
    url: String,
  },
  mounted() {
    this.$nextTick(function() {
      const btn = document.querySelector('button');
      const btnIcon = document.querySelector('#btnIcon');

      const wavesurfer = WaveSurfer.create({
        container: '#waveform',
      });

      wavesurfer.load(this.url);

      wavesurfer.on('ready', function() {
        btn.addEventListener('click', e => {
          wavesurfer.playPause();

          wavesurfer.isPlaying()
            ? (btnIcon.src = require(`../assets/pause-button.svg`))
            : (btnIcon.src = require(`../assets/play-button.svg`));
        });
      });
    });
  },
};
</script>

<style scoped>
.audio-player {
  display: flex;
  margin: 2rem;
  background-color: var(--secondary-background-color);

  border-radius: var(--border-radius);
  overflow: hidden;
}
.play-button {
  width: 15rem;
  height: auto;
  color: var(--secondary-color);
  background-color: var(--secondary-background-color);

  font-family: 'Rubik', sans-serif;
  border: none;
  outline: none;
  cursor: pointer;
}
.waveform {
  width: 100%;
}
</style>
