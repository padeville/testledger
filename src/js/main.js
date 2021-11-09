const container = document.getElementById("products-cards-container");
const paginationContainer = document.getElementById("page_number");
const prevButton = document.getElementById("button_prev");
const nextButton = document.getElementById("button_next");


const MOBILE_SIZE = 780;
const MAX_PAGE = 10;

let currentPage = 1;

const fetchData = () => {
  fetch(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage - 1}`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      container.innerHTML = json
        .map((j) => createCard(j))
        .join(" ");
    });
};

const createPagination = () => {
  const nbPage = 10;

  for (let i = 0; i < nbPage; i++) {}
  return;
};

const nextPage = () => {
  currentPage++;
  changePage(currentPage);
};

const prevPage = () => {
  currentPage--;
  changePage(currentPage);
};

const selectedPage = function () {
  let page_number = document.getElementById("page_number").getElementsByClassName("pagination-number");
  for (let i = 0; i < page_number.length; i++) {
    if (i === currentPage - 1) {
      page_number[i].classList.add("pagination-number_current");
    } else {
      page_number[i].classList.remove("pagination-number_current");
    }
  }
};

const checkButtonOpacity = function () {
    currentPage == 1
    ? prevButton.classList.add("opacity")
    : prevButton.classList.remove("opacity");
    currentPage == MAX_PAGE
    ? nextButton.classList.add("opacity")
    : nextButton.classList.remove("opacity");
};

const changePage = function (page) {
  if (page < 1) {
    currentPage = 1;
    
  }
  if (page > MAX_PAGE - 1) {
    currentPage = MAX_PAGE;
  }

  fetchData()

  checkButtonOpacity();
  selectedPage();
};

const clickPage = function() {
    document.addEventListener('click', function(e) {
        if(e.target.nodeName == "SPAN" && e.target.classList.contains("pagination-number")) {
            currentPage = e.target.textContent;
            changePage(currentPage);
        }
    });
}

const pageNumbers = function() {
    let pageNumber = document.getElementById('page_number');
        pageNumber.innerHTML = "";

    for(let i = 1; i < MAX_PAGE + 1; i++) {
        pageNumber.innerHTML += "<span class='pagination-number'>" + i + "</span>";
    }
}

const createCard = (cardData) => {
  return `
    <article class="card">
        <div class="card-img">
        <img src="https://picsum.photos/seed/picsum/300/200" />
        </div>
        <div class="card-body">
            <div class="card-title">${cardData.title}</div>
            <div class="card-contend">${cardData.body}</div>
            <div class="card-links">
                <div class="card-link">oui</div>
                <div class="card-link">non</div>
            </div>
        </div>
    </article> `;
};

const detecteMobile = () => {
  const menuList = document.getElementById("menu-list");
  const burgerMenu = document.getElementById("burger-menu");

  if (window.innerWidth <= MOBILE_SIZE) {
    burgerMenu.style.display = "";
    menuList.style.display = "none";
  } else {
    burgerMenu.style.display = "none";
    menuList.style.display = "flex";
  }
};

window.addEventListener("resize", () => {
  detecteMobile();
});

detecteMobile();
fetchData();
pageNumbers();
clickPage();
changePage(1);

prevButton.addEventListener("click", prevPage);
nextButton.addEventListener("click", nextPage);
