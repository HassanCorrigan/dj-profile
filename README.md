# dj-profile

A profile for artists/DJ's to promote their music online. Featuring a custom design, SoundCloud-style audio player and easy setup and configuration. Built using Vue.js, Vuex and Wavesurfer.js.

## Project setup

To begin, install the project dependencies.

```
npm install
```

### User data

All personal data is saved in the [data.json](./data.json) file. You can customise it with any information you want, including a collection of songs or mixes.

```json
{
  "name": "DJ/Artist Name", // Your name
  "tagline": "A personalised tagline", // Tagline e.g. your faviourite genres
  "photo": "", // A link to a personal photo/logo, a default will be used if none is supplied
  "social": {
    // Social links to your profiles to be placed in the footer
    "soundcloud": "https://soundcloud.com/",
    "mixcloud": "https://mixcloud.com/",
    "twitter": "https://twitter.com"
  },
  "mixes": [
    {
      "title": "Mix 1", // The audio title
      "cover": "", // The cover/album art, a default will be used if none is supplied
      "genres": ["Genre 1", "Genre 2, Genre 3"], // A list of genres
      "url": "", // The dropbox url/link to your mix, a dropbox guide is found below.
      "peaks": "" // If you're using a particularly long audio clip, you can choose to pre-generate the waveform. Guide found below
    },
    {
      "title": "Mix 2",
      "cover": "",
      "genres": ["Genre 1", "Genre 2, Genre 3"],
      "url": "",
      "peaks": ""
    },
    {
      "title": "Mix 3",
      "cover": "",
      "genres": ["Genre 1", "Genre 2, Genre 3"],
      "url": "",
      "peaks": ""
    }
  ],
  "songs": [
    {
      "title": "Song 1",
      "cover": "",
      "genres": ["Genre 1", "Genre 2"],
      "url": "",
      "peaks": ""
    },
    {
      "title": "Song 2",
      "cover": "",
      "genres": ["Genre 1", "Genre 2"],
      "url": "",
      "peaks": ""
    }
  ]
}
```

### Dropbox

As this project runs on the client and requires no server setup or configuration, a storage solution for your audio is required.

This project uses dropbox to store audio links. To setup, first upload your chosen audio to dropbox. Click share link to generate a link for the file. Then, replace the main url with `dl.dropboxusercontent.com`. For Example:

`https://www.dropbox.com/s/yaanadgsfsfsd3esi/MyProfilePhoto.jpg`

`https://dl.dropboxusercontent.com/s/yaanadgsfsfsd3esi/MyProfilePhoto.jpg`

### Pre-generated waveforms

If you are planning to host longer audio sources, and are concerned about the performance impact of rendering the waveform on track load, you can instead pre-generate the waveform and serve that data instead.

Wavesurfer.js is used for generating the audio waveforms, they have a guide on how to pre-generate the peaks file required.

## Development

Compiles and hot-reloads the project for development

```
npm run serve
```

## Production

Compiles and minifies the project for production

```
npm run build
```
