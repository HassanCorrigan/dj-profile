<template>
  <div class="volume-control">
    <img
      @click="handleVolumeIconClick"
      class="volume-icon"
      :src="require(`@/assets/${volumeIconSrc}`)"
      alt="Volume Icon"
    />

    <input
      type="range"
      class="volume-slider"
      min="0"
      max="100"
      :value="volumeLevel()"
      :disabled="muted"
      @input="handleVolumeChange"
    />
  </div>
</template>

<script>
export default {
  name: 'VolumeSlider',
  props: {
    wavesurfer: Object,
  },
  data() {
    return {
      volumeIconSrc: 'volume-icon.svg',
    };
  },
  methods: {
    /** Handles volume slider changes */
    handleVolumeChange(e) {
      /** Sets volume as input value divded by 100 (wavesurfer excepts
       * values between 0-1) */
      const volume = e.target.value / 100;

      this.wavesurfer.setVolume(volume);

      /** Saves volume change to localstorage */
      localStorage.setItem('audio-player-volume', volume * 100);
    },
    /** Handles clicks on the volume icon */
    handleVolumeIconClick() {
      this.wavesurfer.toggleMute();

      this.toggleVolumeIcon();
    },
    toggleVolumeIcon() {
      this.wavesurfer.getMute()
        ? (this.volumeIconSrc = 'mute-icon.svg')
        : (this.volumeIconSrc = 'volume-icon.svg');
    },
    volumeLevel() {
      return localStorage.getItem('audio-player-volume') || 50;
    },
  },
  computed: {
    /** Checks if audio player is currently muted */
    muted() {
      return this.wavesurfer ? this.wavesurfer.getMute() : false;
    },
  },
};
</script>

<style scoped>
.volume-control {
  display: flex;
  align-items: center;
}
.volume-icon {
  color: var(--light-text-color);
  -webkit-appearance: none;
  width: 100%;
  cursor: pointer;
}

/* Custom volume slider */
.volume-slider {
  margin: 0 1rem;
  cursor: pointer;

  outline: none;
  -webkit-appearance: none;
  background: transparent;
}
.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 1.5rem;
  width: 1.5rem;
  border: none;
  border-radius: 50%;
  background: var(--highlight-color);

  margin-top: -0.6rem;
}
.volume-slider::-moz-range-thumb {
  -webkit-appearance: none;
  height: 1.5rem;
  width: 1.5rem;
  border: none;
  border-radius: 50%;
  background: var(--highlight-color);
}
.volume-slider::-ms-thumb {
  -webkit-appearance: none;
  height: 1.5rem;
  width: 1.5rem;
  border: none;
  border-radius: 50%;
  background: var(--highlight-color);
}
.volume-slider::-webkit-slider-runnable-track {
  width: 100%;
  height: 0.25rem;
  background-color: var(--secondary-color);
  border-radius: var(--border-radius);
}
.volume-slider::-ms-track {
  background: transparent;
  border-color: transparent;
  color: transparent;

  width: 100%;
  height: 0.25rem;
  background-color: var(--secondary-color);
  border-radius: var(--border-radius);
}

/* Muted/disabled volume slider */
.volume-slider[disabled] {
  cursor: not-allowed;
}
.volume-slider[disabled]::-webkit-slider-thumb {
  background-color: var(--light-text-color);
}
.volume-slider[disabled]::-moz-range-thumb {
  background-color: var(--light-text-color);
}
.volume-slider[disabled]::-ms-thumb {
  background-color: var(--light-text-color);
}
.volume-slider[disabled]::-webkit-slider-runnable-track {
  background-color: var(--light-text-color);
}
.volume-slider[disabled]::-ms-track {
  background-color: var(--light-text-color);
}

/** Change icon color for dark backgrounds */
@media (prefers-color-scheme: dark) {
  .volume-icon {
    filter: invert(0.9);
  }
}
</style>
