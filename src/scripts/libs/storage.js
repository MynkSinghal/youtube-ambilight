import { appendErrorStack } from './generic';
import { StorageChangedListeners } from './storage-changed';

class Storage {
  async set(
    nameOrNamesAndValues,
    value = undefined,
    throwOnUninstalled = false
  ) {
    try {
      const multiple = typeof nameOrNamesAndValues !== 'string';
      const namesAndValues = multiple
        ? nameOrNamesAndValues
        : { [nameOrNamesAndValues]: value };

      const stack = new Error().stack;
      return await new Promise(function storageSet(resolve, reject) {
        try {
          if (!chrome?.runtime?.id) throw new Error('uninstalled');

          const setCallback = () => {
            try {
              if (chrome.runtime.lastError) throw chrome.runtime.lastError;
              resolve();
            } catch (ex) {
              if (!chrome?.runtime?.id) return reject(new Error('uninstalled'));
              appendErrorStack(stack, ex);
              reject(ex);
            }
          };
          if (!multiple && value === undefined) {
            chrome.storage.local.remove([nameOrNamesAndValues], setCallback);
          } else {
            chrome.storage.local.set(namesAndValues, setCallback);
          }
        } catch (ex) {
          if (!chrome?.runtime?.id) return reject(new Error('uninstalled'));
          appendErrorStack(stack, ex);
          reject(ex);
        }
      });
    } catch (ex) {
      if (
        ex &&
        (throwOnUninstalled ||
          !(
            ex.message === 'uninstalled' ||
            ex.message?.includes('QuotaExceededError')
          ))
      )
        throw ex;
    }
  }

  async get(nameOrNames, throwOnUninstalled = false) {
    try {
      const multiple = typeof nameOrNames !== 'string';
      const names = multiple ? nameOrNames : [nameOrNames];
      const stack = new Error().stack;
      return await new Promise(function storageGet(resolve, reject) {
        try {
          if (!chrome?.runtime?.id) throw new Error('uninstalled');

          chrome.storage.local.get(names, function getCallback(result) {
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
              if (!chrome?.runtime?.id) return reject(new Error('uninstalled'));
              appendErrorStack(stack, ex);
              reject(ex);
            }
          });
        } catch (ex) {
          if (!chrome?.runtime?.id) return reject(new Error('uninstalled'));
          appendErrorStack(stack, ex);
          reject(ex);
        }
      });
    } catch (ex) {
      if (
        ex &&
        (throwOnUninstalled ||
          !(
            ex.message === 'uninstalled' ||
            ex.message?.includes('QuotaExceededError')
          ))
      )
        throw ex;
    }
  }

  onChangedListeners = new StorageChangedListeners('local');

  addListener(handler) {
    try {
      this.onChangedListeners.add(handler);
    } catch (ex) {
      console.warn(
        "Failed to listen to storage changes. If any setting changes you'll have to manually refresh the page to update them."
      );
      console.debug(ex);
    }
  }

  removeListener(handler) {
    try {
      this.onChangedListeners.remove(handler);
    } catch {
      console.warn(
        "Failed to listen to storage changes. If any setting changes you'll have to manually refresh the page to update them."
      );
    }
  }
}

export const storage = new Storage();

export const defaultCrashOptions = {
  video: false,
  technical: true,
  crash: true,
};
