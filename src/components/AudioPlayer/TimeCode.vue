<template>
  <p class="timecode">{{ currentTime }} / {{ duration }}</p>
</template>

<script>
export default {
  name: 'TimeCode',
  props: {
    wavesurfer: Object,
  },
  data() {
    return {
      currentTime: this.formatTime(0),
      duration: this.formatTime(0),
    };
  },
  methods: {
    /** Format time into HH:MM:SS */
    formatTime(seconds) {
      return new Date(seconds * 1000).toISOString().substr(11, 8);
    },
  },
  watch: {
    wavesurfer: function() {
      /** Wait for the wavesurfer instance to be ready, */
      this.wavesurfer.on('ready', () => {
        /** Set the audio duration */
        this.duration = this.formatTime(this.wavesurfer.getDuration());
      });

      this.wavesurfer.on('audioprocess', () => {
        /** Set the current time while the audio is playing */
        this.currentTime = this.formatTime(this.wavesurfer.getCurrentTime());
      });
    },
  },
};
</script>

<style scoped>
.timecode {
  color: var(--light-text-color);
  line-height: 1.5rem;
}
</style>
