// Safari does not allow the YouTube page to load files of the extension
// (web_accessible_resources fail with: "You do not have permission to access
// the requested resource"). Therefore the Safari manifest injects the
// stylesheet and injected.js itself, and images are converted to data urls.

export const isLoadedByManifest = (path) => {
  try {
    return !!chrome.runtime
      .getManifest()
      .content_scripts?.some(
        (contentScript) =>
          contentScript.js?.includes(path) || contentScript.css?.includes(path)
      );
  } catch {
    return false;
  }
};

let _pageCanLoadExtensionResources;
export const pageCanLoadExtensionResources = () => {
  if (_pageCanLoadExtensionResources === undefined) {
    _pageCanLoadExtensionResources = !isLoadedByManifest('scripts/injected.js');
  }
  return _pageCanLoadExtensionResources;
};

export const GET_RESOURCE_DATA_URL_MESSAGE = 'ytal-get-resource-data-url';

const dataUrls = {};
const loadDataUrl = (path) => {
  if (!dataUrls[path]) {
    dataUrls[path] = (async () => {
      const response = await new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(
          { type: GET_RESOURCE_DATA_URL_MESSAGE, path },
          (response) => {
            if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
            else resolve(response);
          }
        );
      });
      if (!response?.dataUrl)
        throw new Error(
          `Failed to load ${path}: ${response?.error ?? 'No response'}`
        );
      dataUrls[path] = response.dataUrl;
      return response.dataUrl;
    })();
    dataUrls[path].catch((ex) => {
      delete dataUrls[path];
      console.warn(ex);
    });
  }
  return dataUrls[path];
};

// Returns an url of an extension file that can be used by the YouTube page.
// Returns undefined when the file is still being loaded, and calls
// onLoaded with the url once it is available.
export const getPageResourceUrl = (path, onLoaded) => {
  if (pageCanLoadExtensionResources()) return chrome.runtime.getURL(path);

  const dataUrl = loadDataUrl(path);
  if (typeof dataUrl === 'string') return dataUrl;

  if (onLoaded) dataUrl.then(onLoaded, () => undefined);
  return undefined;
};
