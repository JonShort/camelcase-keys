import mapObj from 'map-obj';
import camelCase from 'camelcase';
import QuickLRU from 'quick-lru';

const doesExclusionMatchKey = (exclusion, key) => {
  if (typeof exclusion === 'string') {
    return exclusion === key;
  } else {
    return exclusion.test(key);
  }
};

const isKeyExcluded = (exclusionsArray, key) => {
  if (!exclusionsArray) {
    return false;
  }

  return exclusionsArray.some(exclusion =>
    doesExclusionMatchKey(exclusion, key)
  );
};

const cache = new QuickLRU({ maxSize: 100000 });

const convertKeysToCamelcase = (input, { deep = false, exclude } = {}) => {
  return mapObj(
    input,
    (key, val) => {
      if (!isKeyExcluded(exclude, key)) {
        if (cache.has(key)) {
          key = cache.get(key);
        } else {
          const camelcasedKey = camelCase(key);

          if (key.length < 100) {
            // Prevent abuse
            cache.set(key, camelcasedKey);
          }

          key = camelcasedKey;
        }
      }

      return [key, val];
    },
    { deep }
  );
};

const keysToCamelcase = (input, options) => {
  if (Array.isArray(input)) {
    return input.map(sourceObject =>
      convertKeysToCamelcase(sourceObject, options)
    );
  }

  return convertKeysToCamelcase(input, options);
};

export default keysToCamelcase;
