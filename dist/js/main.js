"use strict";

var container = document.getElementById("products-cards-container");
var paginationContainer = document.getElementById("page_number");
var prevButton = document.getElementById("button_prev");
var nextButton = document.getElementById("button_next");
var MOBILE_SIZE = 780;
var MAX_PAGE = 10;
var currentPage = 1;

var fetchData = function fetchData() {
  fetch("https://jsonplaceholder.typicode.com/posts?_page=".concat(currentPage - 1)).then(function (response) {
    return response.json();
  }).then(function (json) {
    container.innerHTML = json.map(function (j) {
      return createCard(j);
    }).join(" ");
  });
};

var createPagination = function createPagination() {
  var nbPage = 10;

  for (var i = 0; i < nbPage; i++) {}

  return;
};

var nextPage = function nextPage() {
  currentPage++;
  changePage(currentPage);
};

var prevPage = function prevPage() {
  currentPage--;
  changePage(currentPage);
};

var selectedPage = function selectedPage() {
  var page_number = document.getElementById("page_number").getElementsByClassName("pagination-number");

  for (var i = 0; i < page_number.length; i++) {
    if (i === currentPage - 1) {
      page_number[i].classList.add("pagination-number_current");
    } else {
      page_number[i].classList.remove("pagination-number_current");
    }
  }
};

var checkButtonOpacity = function checkButtonOpacity() {
  currentPage == 1 ? prevButton.classList.add("opacity") : prevButton.classList.remove("opacity");
  currentPage == MAX_PAGE ? nextButton.classList.add("opacity") : nextButton.classList.remove("opacity");
};

var changePage = function changePage(page) {
  if (page < 1) {
    currentPage = 1;
  }

  if (page > MAX_PAGE - 1) {
    currentPage = MAX_PAGE;
  }

  fetchData();
  checkButtonOpacity();
  selectedPage();
};

var clickPage = function clickPage() {
  document.addEventListener('click', function (e) {
    if (e.target.nodeName == "SPAN" && e.target.classList.contains("pagination-number")) {
      currentPage = e.target.textContent;
      changePage(currentPage);
    }
  });
};

var pageNumbers = function pageNumbers() {
  var pageNumber = document.getElementById('page_number');
  pageNumber.innerHTML = "";

  for (var i = 1; i < MAX_PAGE + 1; i++) {
    pageNumber.innerHTML += "<span class='pagination-number'>" + i + "</span>";
  }
};

var createCard = function createCard(cardData) {
  return "\n    <article class=\"card\">\n        <div class=\"card-img\">\n        <img src=\"https://picsum.photos/seed/picsum/300/200\" />\n        </div>\n        <div class=\"card-body\">\n            <div class=\"card-title\">".concat(cardData.title, "</div>\n            <div class=\"card-contend\">").concat(cardData.body, "</div>\n            <div class=\"card-links\">\n                <div class=\"card-link\">oui</div>\n                <div class=\"card-link\">non</div>\n            </div>\n        </div>\n    </article> ");
};

var detecteMobile = function detecteMobile() {
  var menuList = document.getElementById("menu-list");
  var burgerMenu = document.getElementById("burger-menu");

  if (window.innerWidth <= MOBILE_SIZE) {
    burgerMenu.style.display = "";
    menuList.style.display = "none";
  } else {
    burgerMenu.style.display = "none";
    menuList.style.display = "flex";
  }
};

window.addEventListener("resize", function () {
  detecteMobile();
});
detecteMobile();
fetchData();
pageNumbers();
clickPage();
changePage(1);
prevButton.addEventListener("click", prevPage);
nextButton.addEventListener("click", nextPage);