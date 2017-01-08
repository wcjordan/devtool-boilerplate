'use strict';

var deselectAll = function() {
  var shapes = document.getElementsByClassName('shape');
  for (var idx = 0; idx < shapes.length; idx++) {
    shapes[idx].classList.remove('highlighted');
  }
};

var onSelect = function(selectedShape) {
  deselectAll();
  selectedShape.classList.add('highlighted');
};

var selectByName = function(name) {
  deselectAll();
  document.querySelector('.' + name).parentNode.classList.add('highlighted');
};
