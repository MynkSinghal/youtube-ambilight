[![Google Chrome Web rating](https://img.shields.io/chrome-web-store/rating/paponcgjfojgemddooebbgniglhkajkj?logo=googlechrome&color=brightgreen)](https://chrome.google.com/webstore/detail/youtube-ambilight/paponcgjfojgemddooebbgniglhkajkj) [![Google Chrome users](https://img.shields.io/chrome-web-store/users/paponcgjfojgemddooebbgniglhkajkj?logo=googlechrome&color=blue)](https://chrome.google.com/webstore/detail/youtube-ambilight/paponcgjfojgemddooebbgniglhkajkj) &nbsp; [![Microsoft Edge rating](https://img.shields.io/badge/dynamic/json?label=rating&suffix=/5&query=%24.averageRating&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Fcmggdjjjfembmemhleknmfpakmgggjcf&logo=embarcadero&color=brightgreen)](https://microsoftedge.microsoft.com/addons/detail/cmggdjjjfembmemhleknmfpakmgggjcf) [![Microsoft Edge users](https://img.shields.io/badge/dynamic/json?label=users&query=%24.activeInstallCount&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Fcmggdjjjfembmemhleknmfpakmgggjcf&logo=embarcadero&color=blue)](https://microsoftedge.microsoft.com/addons/detail/cmggdjjjfembmemhleknmfpakmgggjcf) &nbsp; [![Firefox rating](https://img.shields.io/amo/rating/ambient-light-for-youtube?logo=firefoxbrowser)](https://addons.mozilla.org/en-US/firefox/addon/ambient-light-for-youtube/) [![Firefox users](https://img.shields.io/amo/users/ambient-light-for-youtube?logo=firefoxbrowser&color=blue)](https://addons.mozilla.org/en-US/firefox/addon/ambient-light-for-youtube/) &nbsp; [![Opera rating](https://img.shields.io/badge/rating-4.4/5-brightgreen?logo=opera)](https://addons.opera.com/nl/extensions/details/youtube-ambilight/) [![Opera users](https://img.shields.io/badge/downloads-20k-blue?logo=opera)](https://addons.opera.com/nl/extensions/details/youtube-ambilight/)

<a href="https://ko-fi.com/G2G59EK8L" rel="noopener">
  <img align="right" src="https://github.com/WesselKroos/youtube-ambilight/blob/master/src/images/donate.svg?raw=true" title="Support me via a donation">
</a>

[![Ambient light for YouTube™](https://github.com/WesselKroos/youtube-ambilight/blob/master/assets/heading.png?raw=true)](https://github.com/WesselKroos/youtube-ambilight#readme)

![Preview](https://github.com/WesselKroos/chrome-youtube-ambilight/blob/master/assets/readme/screenshot-1.jpg?raw=true)


# Ambient light for YouTube™
Immerse yourself in YouTube videos with ambient light!

## Installation
Go to the extensions site of your browser and add the extension:

[![Google Chrome Web Store](https://github.com/WesselKroos/youtube-ambilight/blob/master/assets/browsers/Google%20Chrome.png?raw=true)](https://chrome.google.com/webstore/detail/youtube-ambilight/paponcgjfojgemddooebbgniglhkajkj)

[![Microsoft Edge Store](https://github.com/WesselKroos/chrome-youtube-ambilight/blob/master/assets/browsers/Microsoft%20Edge.png?raw=true)](https://microsoftedge.microsoft.com/addons/detail/cmggdjjjfembmemhleknmfpakmgggjcf)

[![Firefox Add-ons](https://github.com/WesselKroos/chrome-youtube-ambilight/blob/master/assets/browsers/Firefox.png?raw=true)](https://addons.mozilla.org/en-US/firefox/addon/ambient-light-for-youtube/)

[![Opera addons](https://github.com/WesselKroos/youtube-ambilight/blob/master/assets/browsers/Opera.png?raw=true)](https://addons.opera.com/nl/extensions/details/youtube-ambilight/)


## Minimum requirements

### Performance
A video card with a score of at least 1000 points in the PassMark Video Card Benchmark is recommended.
Check your video card's score here:

https://www.videocardbenchmark.net/gpu_list.php

With a score lower than 1000 the extension will still work but it is likely that the YouTube video page will be slow and/or stuttering.
> To troubleshoot performance problems or maximize the performance you can follow the checks and steps in the [Troubleshoot guide](https://github.com/WesselKroos/youtube-ambilight/blob/master/TROUBLESHOOT.md)


### Browser versions
| Browser  | Version | Reason |
| -------- | ------- | ------ |
| Chromium | 80      | [Optional chaining operator (?.)](https://caniuse.com/mdn-javascript_operators_optional_chaining) |
| Firefox  | 74      | [Optional chaining operator (?.)](https://caniuse.com/mdn-javascript_operators_optional_chaining) |
| Safari   | 17      | [WebGL in OffscreenCanvas](https://caniuse.com/offscreencanvas), [Fullscreen API](https://caniuse.com/fullscreen) and [requestVideoFrameCallback](https://caniuse.com/mdn-api_htmlvideoelement_requestvideoframecallback) (macOS, and iPadOS when YouTube is opened as a desktop website) |


## Privacy & Security
Read the [privacy policy](/PRIVACY-POLICY.md)


## Report, request or contribute
Feel free to 
- contribute to the project at [/youtube-ambilight](https://github.com/WesselKroos/youtube-ambilight)
- report bugs at [/youtube-ambilight/issues](https://github.com/WesselKroos/youtube-ambilight/issues)
- request a feature at [/youtube-ambilight/issues](https://github.com/WesselKroos/youtube-ambilight/issues)
- or ask a question at [/youtube-ambilight/issues](https://github.com/WesselKroos/youtube-ambilight/issues)


## Support me
[![Support me via a donation](https://github.com/WesselKroos/youtube-ambilight/blob/master/src/images/donate.svg?raw=true)](https://ko-fi.com/G2G59EK8L)


## Development
1. Install [Node (LTS)](https://nodejs.org/en/download/)
2. In the terminal/commandline enter `npm install`.
3. In the terminal/commandline enter `npm run build`. A `/dist` folder will be generated which contains all the generated files of the extension.
4. Add the extension to Chrome:
    1. In Chrome go to the url [chrome://extensions/](chrome://extensions/).
    2. Turn on the `Developer mode` toggle.
    3. Click `Load unpacked` and select the `/dist` folder.
    4. `Ambient light for YouTube™` has been added to the list of extensions.
5. After you've modified a file in the `/src` folder follow these steps:
    1. In the terminal/commandline enter `npm run build`
    2. In Chrome go to the url [chrome://extensions/](chrome://extensions/) and click the refresh/update button in the card of the extension.

### Safari
Safari extensions are distributed inside a macOS/iOS app, which requires a Mac with [Xcode](https://developer.apple.com/xcode/).
1. In the terminal enter `npm install`.
2. In the terminal enter `npm run package:safari`. This builds the Safari version of the extension in the `/dist-safari` folder and generates an Xcode project in the `/safari` folder (using `xcrun safari-web-extension-converter`).
    > Set the `SAFARI_BUNDLE_IDENTIFIER` environment variable to use your own bundle identifier (default: `com.wesselkroos.youtube-ambilight`).
3. Open the Xcode project in the `/safari` folder, select the `Ambient light for YouTube (macOS)` scheme and click Run. This builds and opens the containing app.
4. Allow unsigned extensions in Safari (Only needed when the app is not signed with a developer certificate):
    1. In Safari open `Settings` > `Advanced` and turn on `Show features for web developers`.
    2. In Safari open `Settings` > `Developer` and turn on `Allow unsigned extensions`.
5. In Safari open `Settings` > `Extensions`, turn on `Ambient light for YouTube™` and allow it on `www.youtube.com`.
6. After you've modified a file in the `/src` folder enter `npm run build:safari` in the terminal and run the app in Xcode again. The Xcode project references the `/dist-safari` folder, so it does not have to be regenerated.

The Safari version is built from the same source code. The differences are in the manifest (see `safari-build.js`):
- `content-main.js` is loaded as a content script, because Safari does not support dynamic imports in content scripts.
- Additional icon sizes, which are also used for the app icon.
- The settings page opens in a tab, because file dialogs and downloads close the popup in Safari.
