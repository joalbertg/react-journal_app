# Journal App

- [React Router][react_router]

- [Font Awesome][font_awesome]

- [Redux][reduxjs]
- [React Redux][react_redux]
- [Redux devtools][redux_devtools]

[react_router]: https://reacttraining.com/react-router/web/guides/quick-start

[font_awesome]: https://cdnjs.com/libraries/font-awesome

[reduxjs]: https://es.redux.js.org/
[react_redux]: https://react-redux.js.org/
[redux_devtools]: https://github.com/zalmoxisus/redux-devtools-extension#usage

### Installs

With `package.json` and dependencies
```shell
docker-compose run app yarn
```

Without dependencies
```shell
docker-compose run app yarn add node-sass react-router-dom
docker-compose run app yarn add react-redux redux
docker-compose run app yarn add firebase redux-thunk
docker-compose run app yarn add validator
```

### Project Structure

> run `tree -I "node_modules|public"`
```shell
.
├── Dockerfile
├── README.md
├── docker-compose.yml
├── package.json
├── src
│   ├── JournalApp.js
│   ├── components
│   │   ├── auth
│   │   │   ├── LoginScreen.js
│   │   │   └── RegisterScreen.js
│   │   ├── journal
│   │   │   ├── JournalEntries.js
│   │   │   ├── JournalEntry.js
│   │   │   ├── JournalScreen.js
│   │   │   ├── NothingSelected.js
│   │   │   └── Sidebar.js
│   │   └── notes
│   │       ├── NotesAppBar.js
│   │       └── NotesScreen.js
│   ├── index.js
│   ├── routers
│   │   ├── AppRouter.js
│   │   └── AuthRouter.js
│   └── styles
│       ├── base
│       │   ├── _base.scss
│       │   └── _settings.scss
│       ├── components
│       │   ├── _auth.scss
│       │   ├── _buttons.scss
│       │   ├── _journal.scss
│       │   ├── _links.scss
│       │   ├── _notes.scss
│       │   └── _nothing.scss
│       └── styles.scss
├── yarn-error.log
└── yarn.lock

9 directories, 28 files
```

### Start Project

> run `docker-compose up`

### Tests

> run `docker-compose run app yarn test`

