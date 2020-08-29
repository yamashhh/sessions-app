# Sessions

> A simple activity recording tool.

## [Live Demo](https://sessions-app-c2fb5.an.r.appspot.com/)

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

## Technologies

### Front-end

- [Nuxt.js](https://nuxtjs.org/)

  - Vue.js with built-in Server Side Rendering and other useful features

- [Vuetify](https://vuetifyjs.com/en/)

  - Vue.js Material Design component framework
  - Integrated to Nuxt.js with [@nuxtjs/vuetify](https://github.com/nuxt-community/vuetify-module#readme)

- [nuxt-svg-loader](https://github.com/Developmint/nuxt-svg-loader#readme)

  - Import SVGs as Vue components

- [graphicsMagick](https://github.com/aheckmann/gm#readme)

  - Used with [vuetify-loader (included in @nuxtjs/vuetify)](https://github.com/nuxt-community/vuetify-module#treeshake) to enable [progressive images](https://github.com/vuetifyjs/vuetify-loader#progressive-images) option

- [Moment.js](https://momentjs.com/)

  - Manipulate date and time

- [js-cookie](https://github.com/js-cookie/js-cookie#readme)
- [cookieparser](https://github.com/petkaantonov/cookieparser#readme)
- [jwt-decode](https://github.com/auth0/jwt-decode#readme)

  - Manipulate cookies (for persistent user sign in state)

### Back-end

- [Firebase](https://firebase.google.com/)

  - Authentication
  - Cloud Firestore

- [Google App Engine](https://cloud.google.com/appengine)

  - Hosting
