/* global pym */

'use strict';

var pymParent;

function getQueryString(field, url) {
  var href = url ? url : window.location.href;
  var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
  var string = reg.exec(href);
  return string ? string[1] : null;
}

var stageEl = document.getElementById('stage');
var urlInputEl = document.getElementById('url-input');

var submittedUrl = getQueryString('url');
submittedUrl = submittedUrl ? decodeURIComponent(submittedUrl) : '';

if (submittedUrl) {
  urlInputEl.value = submittedUrl;
  pymParent = new pym.Parent('stage', submittedUrl, {});
}

var resizersEl = document.getElementById('resizers');

resizersEl.addEventListener('click', function(e) {
  e.stopPropagation();
  var target = e.target;

  if (target && target.tagName.toLowerCase() === 'button') {
    Array.prototype.forEach.call(target.parentNode.children, function(node) {
      node.classList.remove('resizers__button--active');
    });
    target.classList.add('resizers__button--active');
    var value = target.value;

    var width = value === '100%' ? '100%' : value + 'px';

    stageEl.style.width = width;
    pymParent.sendWidth();
  }
});
