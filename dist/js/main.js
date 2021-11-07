"use strict";

var container = document.getElementById('products-cards-container');
var MOBILE_SIZE = 780;
var MAX_ITEM_PAGE = 9;
var currentPage = 0;
var datas = fetch("https://jsonplaceholder.typicode.com/posts").then(function (response) {
  return response.json();
}).then(function (json) {
  container.innerHTML = json.slice(0, MAX_ITEM_PAGE).map(function (j) {
    return createCard(j);
  }).join(' ');
});

var createCard = function createCard(cardData) {
  return "\n    <article class=\"card\">\n        <div class=\"card-img\">\n        <img src=\"https://picsum.photos/seed/picsum/300/200\" />\n        </div>\n        <div class=\"card-body\">\n            <div class=\"card-title\">".concat(cardData.title, "</div>\n            <div class=\"card-contend\">").concat(cardData.body, "</div>\n            <div class=\"card-links\">\n                <div class=\"card-link\">oui</div>\n                <div class=\"card-link\">non</div>\n            </div>\n        </div>\n    </article> ");
};

var detecteMobile = function detecteMobile() {
  var menuList = document.getElementById('menu-list');
  var burgerMenu = document.getElementById('burger-menu');
  console.log(menuList);
  console.log(window.innerWidth);

  if (window.innerWidth <= MOBILE_SIZE) {
    burgerMenu.style.display = '';
    menuList.style.display = 'none';
  } else {
    burgerMenu.style.display = 'none';
    menuList.style.display = 'flex';
  }
};

detecteMobile();
window.addEventListener('resize', function () {
  detecteMobile();
});