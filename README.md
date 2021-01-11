# Sessions

> A simple activity recording tool.

## ~~Live Demo~~

![GIF of live demo](https://media.giphy.com/media/iGos2pRtYR84xbHLv2/giphy.gif)

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Features

### User authentication via Google account

### Stopwatch to record daily activity as "sessions"

### Built-in calendar to visualize sessions

- Available in monthly, weekly, and daily views

- Each session can be examined and deleted from the calendar

  ![GIF of deleting a session](https://media.giphy.com/media/RJnLIcRnx94LfmMLBs/giphy.gif)

### Up to 10 customizable categories

- Create, update, delete, and reset to default functionality

  ![GIF of customizing categories](https://media.giphy.com/media/l4S4v0A13C9nUZHG67/giphy.gif)

- Equipped with input validator (category name length, category duplicates, etc.)

## Built with

### Front-end

- [Nuxt.js](https://nuxtjs.org/)

- [Vuetify](https://vuetifyjs.com/en/)

### Back-end

- [Firebase](https://firebase.google.com/)

  - Authentication
  - Cloud Firestore

- [Google App Engine](https://cloud.google.com/appengine)

  - Hosting
