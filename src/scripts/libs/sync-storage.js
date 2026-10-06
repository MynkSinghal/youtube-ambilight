import { appendErrorStack } from './generic';
import { StorageChangedListeners } from './storage-changed';

class SyncStorage {
  async set(nameOrNamesAndValues, value = undefined) {
    const multiple = typeof nameOrNamesAndValues !== 'string';
    const namesAndValues = multiple
      ? nameOrNamesAndValues
      : { [nameOrNamesAndValues]: value };

    const stack = new Error().stack;
    return await new Promise(function storageSet(resolve, reject) {
      try {
        const setCallback = () => {
          try {
            if (chrome.runtime.lastError) throw chrome.runtime.lastError;
            resolve();
          } catch (ex) {
            appendErrorStack(stack, ex);
            reject(ex);
          }
        };
        if (!multiple && value === undefined) {
          chrome.storage.sync.remove([nameOrNamesAndValues], setCallback);
        } else {
          chrome.storage.sync.set(namesAndValues, setCallback);
        }
      } catch (ex) {
        appendErrorStack(stack, ex);
        reject(ex);
      }
    });
  }

  async get(nameOrNames) {
    const multiple = typeof nameOrNames !== 'string';
    const names = multiple ? nameOrNames : [nameOrNames];
    const stack = new Error().stack;
    return await new Promise(function storageGet(resolve, reject) {
      try {
        chrome.storage.sync.get(names, function getCallback(result) {
          try {
            if (chrome.runtime.lastError) throw chrome.runtime.lastError;
            resolve(
              multiple
                ? result
                : result[nameOrNames] === undefined
                ? null
                : result[nameOrNames]
            );
          } catch (ex) {
            appendErrorStack(stack, ex);
            reject(ex);
          }
        });
      } catch (ex) {
        appendErrorStack(stack, ex);
        reject(ex);
      }
    });
  }

  onChangedListeners = new StorageChangedListeners('sync');

  addListener(handler) {
    try {
      this.onChangedListeners.add(handler);
    } catch (ex) {
      console.warn(
        "Failed to listen to sync-storage changes. If any setting changes you'll have to manually refresh the page to update them."
      );
      console.debug(ex);
    }
  }

  removeListener(handler) {
    try {
      this.onChangedListeners.remove(handler);
    } catch {
      console.warn(
        "Failed to listen to sync-storage changes. If any setting changes you'll have to manually refresh the page to update them."
      );
    }
  }
}

export const syncStorage = new SyncStorage();
