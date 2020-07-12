const FUNCTION_PREFIX = 'findBy';

const findable = (arr, prefix = FUNCTION_PREFIX) => {
  return new Proxy(arr, {
    get: (target, prop) => {
      if (typeof prop === 'string' && prop.startsWith(prefix)) {
        return findBy(target, prop, prefix);
      } else {
        return Reflect.get(target, prop);
      }
    }
  });
};

const findBy = (target, prop, prefix) => {
  const key = prop.slice(prefix.length, prop.length);
  return (value) => {
    if (typeof value === 'function') {
      return findable(target.filter(item => value(item[key.toLowerCase()])), prefix);
    }
    return findable(target.filter(item => item[key.toLowerCase()] === value), prefix);
  };
};

module.exports = findable;
