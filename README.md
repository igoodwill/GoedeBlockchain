# GoedeBlockchain

This is a client for GoedeBlockchain written with Electron and Mithril.js

## To use

To use application, clone and run this repository:

```bash
# Clone this repository
git clone https://github.com/igoodwill/GoedeBlockchain.git
# Go into the repository
cd GoedeBlockchain
# Install dependencies and run the application
npm run install-start
```

### To use again

To start the application again later:
```bash
# Go into the repository
cd GoedeBlockchain
# Run the application
npm start
```

## To distribute

To distribute the application with Electron, you need download Electron's prebuilt binaries named `electron-v1.8.7-*` [here](https://github.com/electron/electron/releases/tag/v1.8.7). Next, name this folder `electron`, put it in the same directory as the `GoedeBlockchain` folder and run the appropriate script.

On Windows and Linux:

```bash
npm run make
```

On macOS:

```bash
npm run make-mac
```

Then execute `Electron.app` (or `electron` on Linux, `electron.exe` on Windows), and Electron will start as `Goede Blockchain`. The `electron` directory will then be your distribution to deliver to final users.

### To distribute manually

To distribute the application with Electron, you need download Electron's prebuilt binaries named `electron-v1.8.7-*` [here](https://github.com/electron/electron/releases/tag/v1.8.7). Next, the `GoedeBlockchain` folder should be named `app` and placed in Electron's resources directory as shown in the following examples. Note that the location of Electron's prebuilt binaries is indicated with `electron/` in the examples below.

On Windows and Linux:

```bash
electron/resources/app
  ├── package.json
  ├── main.js
  ├── index.html
  └── ...
```

On macOS:

```bash
electron/Electron.app/Contents/Resources/app/
  ├── package.json
  ├── main.js
  ├── index.html
  └── ...
```

Then execute `Electron.app` (or `electron` on Linux, `electron.exe` on Windows), and Electron will start as `Goede Blockchain`. The `electron` directory will then be your distribution to deliver to final users.