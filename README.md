# dj-profile

A profile for artists/DJ's to promote their music online. Featuring a custom design, SoundCloud-style audio player and easy setup and configuration. Built using Vue.js, Vuex and Wavesurfer.js.

## Project setup

To begin, install the project dependencies.

```
npm install
```

### User data

All personal data is saved in the [data.json](./src/data.json) file. You can customize it with any information you want to include, such as a collection of songs or mixes.

**General**

| Field   | Required | Description                                                             |
| ------- | -------- | ----------------------------------------------------------------------- |
| name    | true     | Your DJ/Artist name                                                     |
| tagline | true     | A personalised tagline e.g. your faviourite genres                      |
| photo   | false    | A link to a personal photo/logo, a default will be used if not supplied |
| social  | false    | Links to social profiles/websites, placed in the footer                 |

**Mixes**

| Field  | Required | Description                                                                                                     |
| ------ | -------- | --------------------------------------------------------------------------------------------------------------- |
| title  | true     | The audio track title                                                                                           |
| cover  | false    | The cover/album art, a default will be used if not supplied                                                     |
| genres | false    | A list of genres                                                                                                |
| url    | true     | The dropbox url/link to your mix, a dropbox guide is found below                                                |
| peaks  | false    | If you're using a particularly long audio clip, you can choose to pre-generate the waveform (guide found below) |

**The data.json file**

```json
{
  "name": "DJ/Artist Name",
  "tagline": "A personalised tagline",
  "photo": "",
  "social": {
    "soundcloud": "https://soundcloud.com/",
    "mixcloud": "https://mixcloud.com/",
    "twitter": "https://twitter.com"
  },
  "mixes": [
    {
      "title": "Mix 1",
      "cover": "",
      "genres": ["Genre 1", "Genre 2", "Genre 3"],
      "url": "",
      "peaks": ""
    },
    {
      "title": "Mix 2",
      "cover": "",
      "genres": ["Genre 1", "Genre 2"],
      "url": "",
      "peaks": ""
    },
    {
      "title": "Mix 3",
      "cover": "",
      "genres": ["Genre 1", "Genre 2", "Genre 3"],
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

This project uses dropbox to store audio links. To setup, first upload your chosen audio to dropbox. Click share link to generate a link for the file.

Add these links for your audio sources, photos, covers and peaks in the [data.json](./src/data.json) file.

### Pre-generated waveforms

If you are planning to host longer audio sources, and are concerned about the performance impact of rendering the waveform on track load, you can instead pre-generate the waveform and serve that data instead.

Wavesurfer.js is used for generating the audio waveforms, they have a guide on how to pre-generate the peaks file required, available [here](https://wavesurfer-js.org/faq/).

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

## Credits

Sample music provided by the [Free Music Archive](https://freemusicarchive.org/music/Marc_Burt/landscapes) and [Mixing.dj](https://mixing.dj/?s=stonebridge).

Icons are open-source and available at [akaricons.com](https://akaricons.com/).
