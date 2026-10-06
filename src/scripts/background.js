import { getBrowser, getFeedbackFormLink } from './libs/utils';
import { GET_RESOURCE_DATA_URL_MESSAGE } from './libs/extension-resources';

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason !== 'install' && details.reason !== 'update') return;

  if (chrome.runtime.setUninstallURL) {
    chrome.runtime.setUninstallURL(getFeedbackFormLink());
  }

  if (details.reason === 'install' && getBrowser() === 'Firefox') {
    chrome.runtime.openOptionsPage();
  }
});

chrome.action.onClicked.addListener(function () {
  chrome.runtime.openOptionsPage();
});

const pageResources = [
  'images/donate.svg',
  'images/noise-1.png',
  'images/noise-2.png',
  'images/noise-3.png',
];

const fileToDataUrl = async (path) => {
  const response = await fetch(chrome.runtime.getURL(path));
  if (!response.ok)
    throw new Error(`${response.status} ${response.statusText}`.trim());

  const bytes = new Uint8Array(await response.arrayBuffer());
  let binary = '';
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  const type = path.endsWith('.svg') ? 'image/svg+xml' : 'image/png';
  return `data:${type};base64,${btoa(binary)}`;
};

// Used when the YouTube page is not allowed to load files of the extension (Safari)
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message?.type !== GET_RESOURCE_DATA_URL_MESSAGE) return;
  if (!pageResources.includes(message.path)) {
    sendResponse({ error: `Not a page resource: ${message.path}` });
    return;
  }

  fileToDataUrl(message.path).then(
    (dataUrl) => sendResponse({ dataUrl }),
    (ex) => sendResponse({ error: ex?.message ?? `${ex}` })
  );
  return true; // Keeps sendResponse valid until the file has been read
});
