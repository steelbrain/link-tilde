# Link-Tilde

Link Tilde creates a symlink in `node_modules/~` to your configured directory, so you don't have to do voodoo to get ESLint and Flowtype to get nicer import paths.

### Installation

```
npm install --save link-tilde
```

### Setup

Merge this into your `package.json` file

```json
{
  "tildeDirectory": "./src",
  "scripts": {
    "postinstall": "link-tilde"
  }
}
```

and run `npx link-tilde` manually (firs time).

### Usage

After the setup, you can start requiring modules like `~/something` in your project, and they should work without an issue.

### License

The contents of this repository/package are licensed under the terms of the MIT License. See the LICENSE file for more info.
