const container = document.getElementById('products-cards-container');

const MOBILE_SIZE = 780;
const MAX_ITEM_PAGE = 9;

let currentPage = 0;

const datas = fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((json) => {
    container.innerHTML = json.slice(0, MAX_ITEM_PAGE).map(j => createCard(j)).join(' ');
  });

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
}

const detecteMobile = () => {
    const menuList = document.getElementById('menu-list')
    const burgerMenu = document.getElementById('burger-menu')
    console.log(menuList)
    console.log(window.innerWidth)
    if (window.innerWidth <= MOBILE_SIZE) {
        burgerMenu.style.display = '';
        menuList.style.display = 'none';
    } else {
        burgerMenu.style.display = 'none';
        menuList.style.display = 'flex';
    }
}

detecteMobile();
window.addEventListener('resize', () => {
    detecteMobile();
});
