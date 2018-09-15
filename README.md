# Tilde-Imports

Tilde imports creates a symlink in `node_modules/~` to your configured directory, so you don't have to do voodoo to get ESLint, Flowtype and Babel to get nicer import paths.

### Installation

```
npm install --save tilde-imports
```

### Usage

In your package.json

```json
{
  // ... stuff
  "tildeDirectory": "./src"
}
```

### License

The contents of this repository/package are licensed under the terms of the MIT License. See the LICENSE file for more info.
