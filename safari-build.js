// Creates the Safari Web Extension in /dist-safari from the /dist build.
// Run `npm run build:safari` to build it, or `npm run package:safari` (macOS
// with Xcode only) to also generate the Xcode project in /safari.
import { cpSync, existsSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { execFileSync } from 'child_process';

const srcDir = 'dist';
const destDir = 'dist-safari';
const xcodeProjectDir = 'safari';
const appName = 'Ambient light for YouTube';
const bundleIdentifier =
  process.env.SAFARI_BUNDLE_IDENTIFIER || 'com.wesselkroos.youtube-ambilight';
// Safari 18: content_scripts world MAIN (Safari 17: WebGL in OffscreenCanvas,
// unprefixed fullscreen API and requestVideoFrameCallback)
const safariMinVersion = '18.0';

if (!existsSync(`${srcDir}/manifest.json`))
  throw new Error(
    `Cannot find ${srcDir}/manifest.json. Run "npm run build" first.`
  );

rmSync(destDir, { recursive: true, force: true });
cpSync(srcDir, destDir, { recursive: true });
cpSync('src/safari/images', `${destDir}/images`, { recursive: true });

const manifestPath = `${destDir}/manifest.json`;
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

delete manifest.minimum_chrome_version;
manifest.browser_specific_settings = {
  safari: {
    strict_min_version: safariMinVersion,
  },
};

manifest.icons = {
  16: 'images/icon-16.png',
  32: 'images/icon-32.png',
  48: 'images/icon-48.png',
  64: 'images/icon-64.png',
  96: 'images/icon-96.png',
  128: 'images/icon-128.png',
  256: 'images/icon-256.png',
  512: 'images/icon-512.png',
};

// Safari does not allow the YouTube page to load files of the extension
// (web_accessible_resources), and does not support dynamic imports in
// content scripts. So the manifest injects all these files instead:
// - styles/content.css as a content script stylesheet
// - scripts/content-main.js as a content script right after content.js
// - scripts/injected.js as a content script in the main world of the page
const mainWorldContentScripts = [];
for (const contentScript of manifest.content_scripts) {
  const index = contentScript.js.indexOf('scripts/content.js');
  if (index === -1) continue;

  contentScript.js.splice(index + 1, 0, 'scripts/content-main.js');
  contentScript.css = [...(contentScript.css ?? []), 'styles/content.css'];
  mainWorldContentScripts.push({
    ...contentScript,
    css: undefined,
    js: ['scripts/injected.js'],
    world: 'MAIN',
  });
}
manifest.content_scripts.push(...mainWorldContentScripts);

// File dialogs and downloads close the popup in Safari
manifest.options_ui.open_in_tab = true;

writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Created the Safari Web Extension in /${destDir}`);

if (process.argv.includes('--xcode')) {
  if (process.platform !== 'darwin')
    throw new Error('Generating the Xcode project requires macOS with Xcode');

  execFileSync(
    'xcrun',
    [
      'safari-web-extension-converter',
      destDir,
      '--project-location',
      xcodeProjectDir,
      '--app-name',
      appName,
      '--bundle-identifier',
      bundleIdentifier,
      '--swift',
      '--no-open',
      '--no-prompt',
      '--force',
    ],
    { stdio: 'inherit' }
  );
  console.log(
    `Created the Xcode project in /${xcodeProjectDir}. Open it in Xcode and run the "${appName} (macOS)" scheme.`
  );
}
