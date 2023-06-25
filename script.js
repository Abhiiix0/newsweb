const Api_key ="e77066b7dc774cab844d4b3235769610";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=>fetchNews("india"));
async function fetchNews(qury){
    const res = await fetch(`${url}${qury}&apikey=${Api_key}`);
    const data = await res.json();
    console.log(data.articles);
    bindData(data.articles)
}
function bindData(articles){
    const cardsCointer= document.getElementById('cards-container');
    const newsCardTemplete = document.getElementById('template-news-card');

    cardsCointer.innerHTML = " ";

    articles.forEach((article) =>{
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplete.content.cloneNode(true);
        filldataincard(cardClone, article);
        cardsCointer.appendChild(cardClone);
    })
}
function filldataincard(cardClone, article){
    const newsimg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsdesc = cardClone.querySelector('#news-desc');

    newsimg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsdesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });
    newsSource.innerHTML=`${article.source.name} ${date}`;

    cardClone.firstElementChild.addEventListener('click', ()=>{
        window.open(article.url,"_blank");
    })
}

let curSelectDiv = null;
function onNavItemClick(id){
    fetchNews(id)
    const navItem = document.getElementById(id);
    curSelectDiv?.classList.remove("active");
    curSelectDiv = navItem;
    curSelectDiv.classList.add("active")
}
const searchText = document.getElementById('news-input');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener("click", ()=>{
    let qury = searchText.value;
    if(!qury) return;
    fetchNews(qury);
});
const logo = document.getElementById("logo");
logo.addEventListener("click",()=>{
    location.reload();
})