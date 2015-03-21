'use strict';

var addClass = function(object, className) {
  if (!object.classList.contains(className)) {
    return object.classList.add(className);
  }
};

var removeClass = function(object, className) {
  if (object.classList.contains(className)) {
    return object.classList.remove(className);
  }
};

var toggleClass = function(object, className) {
  return object.classList.toggle(className);
};

document.addEventListener('DOMContentLoaded', function() {
  return addClass(document.body, 'loaded');
});
