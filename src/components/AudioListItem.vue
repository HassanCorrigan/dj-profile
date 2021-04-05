<template>
  <div class="card">
    <button
      class="play-button"
      :style="{ backgroundImage: `url(${coverPhoto})` }"
      @click="setCurrentlyPlaying"
      title="Play"
    >
      <img
        id="playBtnIcon"
        class="play-button-icon"
        :src="btnIconSrc"
        alt="Play Button"
      />
    </button>
    <div class="details">
      <p class="title">{{ title }}</p>
      <div class="metadata">
        <span class="genre" v-for="(genre, index) in genres" :key="index">{{
          genre
        }}</span>
      </div>
    </div>
    <button @click="downloadAudio" class="download-btn" title="Download">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 15V3m0 12l-4-4m4 4l4-4" />
        <path
          d="M2 17l.621 2.485A2 2 0 004.561 21H19.439a2 2 0 001.94-1.515L22 17"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'AudioListItem',
  props: {
    title: String,
    cover: String,
    genres: Array,
    url: String,
    peaks: String,
  },
  computed: {
    /** Return defined photo, otherwise return a fallback */
    coverPhoto() {
      return this.cover
        ? this.transformURL(this.cover)
        : require(`@/assets/vinyl.svg`);
    },
    btnIconSrc() {
      // Check if src is empty
      if (this.url === '') {
        return require('@/assets/play-button.svg');
      }

      /** Check if audio is equal to currently playing audio */
      const isPlaying = this.url === this.$store.state.currentlyPlaying.url;

      return isPlaying
        ? require('@/assets/equalizer.gif')
        : require('@/assets/play-button.svg');
    },
  },
  methods: {
    /** Set currently plaing in the app store */
    setCurrentlyPlaying() {
      this.$store.commit('setCurrentlyPlaying', {
        title: this.title,
        cover: this.cover,
        url: this.url,
        peaks: this.peaks,
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
    downloadAudio() {
      /** Simulate a user clicking a download link */
      const anchor = document.createElement('a');
      anchor.href = this.url;
      anchor.download = this.url;
      anchor.target = '_blank';
      anchor.rel = 'noopener';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    },
  },
};
</script>

<style scoped>
.card {
  margin: 2rem 0;
  display: flex;
  align-items: center;
}
.play-button {
  min-width: 8rem;
  min-height: 8rem;
  border-radius: var(--border-radius);

  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.play-button-icon {
  background-color: rgb(240, 240, 240);
  border-radius: 50%;
  padding: 0.75rem;
  width: 2.4rem;
  height: 2.4rem;
}
.details {
  padding: 0 1rem;
}
.title {
  font-weight: 400;
  padding-bottom: 0.5rem;
}
.metadata {
  padding-bottom: 0.5rem;
}
.metadata .genre {
  display: inline-block;
  color: var(--light-text-color);
  padding: 0.1rem;
  margin-right: 0.75rem;
  font-size: 1.4rem;
}
.metadata .genre::before {
  content: '#';
}
.download-btn {
  color: var(--primary-color);
  background-color: var(--primary-background-color);
  padding: 1rem;
  height: 4rem;
  width: 4rem;
  border-radius: var(--border-radius);
  margin-left: auto;
}
</style>
