var utils = {};

/**
 * Extract the year from a date.
 * Capture the special case of just a year because
 * javascript will consider it as the first second
 * of that year in GMT then convert it to the current
 * timezone which could be the previous year.
 */
utils.getYear = function(date) {
  return /^\d{4}$/.test(date) ? date : new Date(date).getFullYear();
};

/**
 * Extract the year from a date and return as an integer.
 */
utils.getYearInt = function(date) {
  return parseInt(utils.getYear(date));
};

/**
 * Add a query param to a url
 */
utils.addQueryParam = function(query, name, value) {
  if (value) {
    query += '&' + name + '=' + encodeURIComponent(value);
  }
  return query;
};

/**
 * Take in a map of param names and values
 * and return an encoded query string
 * without the leading '?'
 */
utils.queryString = function(params) {
  var parts = [];
  utils.each(params, function(val, key) {
    parts.push(key + '=' + encodeURIComponent(val));
  });
  return parts.join('&');
};

/**
 * Functions lifted from underscore.js
 * http://underscorejs.org/
 */
utils.isObject = function(obj) {
  return obj === Object(obj);
};

utils.isString = function(obj) {
  return toString.call(obj) == '[object String]';
};

utils.isUndefined = function(obj) {
  return obj === void 0;
};

utils.each = function(obj, iterator, context) {
  if (obj == null) return obj;
  if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
    obj.forEach(iterator, context);
  } else if (obj.length === +obj.length) {
    for (var i = 0, length = obj.length; i < length; i++) {
      iterator.call(context, obj[i], i, obj);
    }
  } else {
    var keys = utils.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      iterator.call(context, obj[keys[i]], keys[i], obj);
    }
  }
  return obj;
};

utils.keys = function(obj) {
  if (!utils.isObject(obj)) return [];
  if (Object.keys) return Object.keys(obj);
  var keys = [];
  for (var key in obj) if (hasOwnProperty.call(obj, key)) keys.push(key);
  return keys;
};

utils.defaults = function(obj) {
  utils.each(Array.prototype.slice.call(arguments, 1), function(source) {
    if (source) {
      for (var prop in source) {
        if (obj[prop] === void 0) obj[prop] = source[prop];
      }
    }
  });
  return obj;
};

utils.extend = function(obj) {
  utils.each(Array.prototype.slice.call(arguments, 1), function(source) {
    if (source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    }
  });
  return obj;
};

module.exports = utils;
