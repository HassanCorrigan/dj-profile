import { createStore } from 'vuex';
import { name, tagline, photo, social, mixes, songs } from './data.json';

const store = createStore({
  state() {
    return {
      name,
      tagline,
      photo,
      social,
      mixes,
      songs,
      currentlyPlaying: {
        title: '',
        url: '',
        cover: '',
        peaks: '',
      },
    };
  },
  getters: {
    mixesCount(state) {
      return state.mixes.length;
    },
    songsCount(state) {
      return state.songs.length;
    },
  },
  mutations: {
    setCurrentlyPlaying(state, payload) {
      state.currentlyPlaying = {
        title: payload.title,
        url: payload.url,
        cover: payload.cover,
        peaks: payload.peaks,
      };
    },
  },
});

export default store;
