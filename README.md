# Journal App

- [React Router][react_router]

- [Font Awesome][font_awesome]
- [Animate CSS][animate_st]
- [Sweetalert 2][sweetalert2]

- [Moment][momentjs]
- [Cloudinary][cloudinary]
- [Link module alias][link_module_alias]

- [Redux][reduxjs]
- [React Redux][react_redux]
- [Redux devtools][redux_devtools]

[react_router]: https://reacttraining.com/react-router/web/guides/quick-start

[font_awesome]: https://cdnjs.com/libraries/font-awesome
[animate_st]: https://animate.style/
[sweetalert2]: https://sweetalert2.github.io/

[momentjs]: https://momentjs.com/
[cloudinary]: https://cloudinary.com/
[link_module_alias]: https://github.com/Rush/link-module-alias

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
docker-compose run app yarn add validator sweetalert2 moment
docker-compose run app yarn add link-module-alias cloudinary --dev
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
│   ├── actions
│   │   ├── auth.js
│   │   ├── index.js
│   │   ├── notes.js
│   │   └── ui.js
│   ├── components
│   │   ├── auth
│   │   │   ├── LoginScreen.js
│   │   │   ├── RegisterScreen.js
│   │   │   └── index.js
│   │   ├── journal
│   │   │   ├── JournalEntries.js
│   │   │   ├── JournalEntry.js
│   │   │   ├── JournalScreen.js
│   │   │   ├── NothingSelected.js
│   │   │   ├── Sidebar.js
│   │   │   └── index.js
│   │   └── notes
│   │       ├── NotesAppBar.js
│   │       ├── NotesScreen.js
│   │       └── index.js
│   ├── firebase
│   │   ├── firebase-config.js
│   │   └── index.js
│   ├── helpers
│   │   ├── fileUpload.js
│   │   ├── index.js
│   │   └── loadNotes.js
│   ├── hooks
│   │   └── useForm.js
│   ├── index.js
│   ├── reducers
│   │   ├── authReducer.js
│   │   ├── index.js
│   │   ├── notesReducer.js
│   │   └── uiReducer.js
│   ├── routers
│   │   ├── AppRouter.js
│   │   ├── AuthRouter.js
│   │   ├── PrivateRoute.js
│   │   ├── PublicRoute.js
│   │   └── index.js
│   ├── store
│   │   ├── index.js
│   │   └── store.js
│   ├── styles
│   │   ├── base
│   │   │   ├── _base.scss
│   │   │   └── _settings.scss
│   │   ├── components
│   │   │   ├── _auth.scss
│   │   │   ├── _buttons.scss
│   │   │   ├── _journal.scss
│   │   │   ├── _links.scss
│   │   │   ├── _notes.scss
│   │   │   └── _nothing.scss
│   │   └── styles.scss
│   └── types
│       ├── index.js
│       └── types.js
└── yarn.lock

16 directories, 51 files
```

### Start Project

> run `docker-compose up`

### Tests

> run `docker-compose run app yarn test`

#### Link module alias

> run `docker-compose run app yarn preinstall` for clean alias.

> run `docker-compose run app yarn postinstall` for generate alias.

```json
...
"scripts": {
  ...
  "preinstall": "command -v link-module-alias && link-module-alias clean || true",
  "postinstall": "link-module-alias"
},
"_moduleAliases": {
  "~root": ".",
  "~src" : "./src",
  "~styles": "./src/styles/styles.scss"
},
...
```

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import App from '~src/JournalApp';

import '~styles';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

