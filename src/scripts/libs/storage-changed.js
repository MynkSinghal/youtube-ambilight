import { wrapErrorHandler } from './generic';

// storage.StorageArea.onChanged (chrome.storage.local.onChanged) is not
// reliably available in every browser (Safari, Firefox < 101). The global
// storage.onChanged event is supported everywhere, so filter it by areaName.
export class StorageChangedListeners {
  listeners = [];

  constructor(areaName) {
    this.areaName = areaName;
  }

  add(handler) {
    const wrappedHandler = wrapErrorHandler(
      function storageChanged(changes, areaName) {
        if (areaName !== this.areaName) return;
        handler(changes);
      }.bind(this),
      true
    );
    chrome.storage.onChanged.addListener(wrappedHandler);
    this.listeners.push({ handler, wrappedHandler });
  }

  remove(handler) {
    const entry = this.listeners.find((entry) => entry.handler === handler);
    if (!entry)
      throw new Error(
        `Cannot remove a storage.${this.areaName}.onChange listener that has never been added`
      );

    chrome.storage.onChanged.removeListener(entry.wrappedHandler);
    this.listeners.splice(this.listeners.indexOf(entry), 1);
  }
}

export const isStorageChangedSupported = () => !!chrome?.storage?.onChanged;
