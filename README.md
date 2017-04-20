# neutrino-preset-pragmatic-react
## Requirements

- Node.js v6.9+
- Yarn or npm client
- Neutrino v5

## Installation

#### Yarn

```bash
❯ yarn add --dev neutrino
❯ yarn add --dev https://github.com/pragmaticcoders/neutrino-preset-pragmatic-react.git#v1.1.0
❯ yarn add react react-dom prop-types
```

#### npm

```bash
❯ npm install --save-dev neutrino
❯ npm install --save-dev https://github.com/pragmaticcoders/neutrino-preset-pragmatic-react.git#v1.1.0
❯ npm install --save react react-dom prop-types
```

## Quickstart

```bash
❯ mkdir {test,src}
❯ cat > src/index.js <<EOL
import React from 'react';
import { render } from 'react-dom';

render(<h1>Hello world!</h1>, document.getElementById('root'));

EOL
```

Now edit your project's package.json to add commands for starting and building the application:

```javascript
{
 ...

 "neutrino": {
    "use": [
      "neutrino-preset-pragmatic-react"
    ]
  },
  "scripts": {
    "start": "neutrino start",
    "build": "neutrino build",
    "test": "neutrino test",
    "test-watch": "neutrino test --watch"
  },

...
}
```

Start the app, then open a browser to the address in the console:

### Yarn

```bash
❯ yarn start
✔ Development server running on: http://localhost:5000
✔ Build completed
```

### Npm

```bash
❯ npm start
✔ Development server running on: http://localhost:5000
✔ Build completed
```

## TODO
- [ ] example project
- [ ] tests
- [ ] https://www.npmjs.com/
