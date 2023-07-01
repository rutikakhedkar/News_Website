const API_KEY= '154c75fff0294791aff03a38af076f09';
const url='https://newsapi.org/v2/everything?q=';


function OpenHamburger()
{
const navLinks=document.getElementById('nav-links');
if(navLinks.classList.contains('active'))
{
    navLinks.classList.remove('active');
}
else{
    navLinks.classList.add('active');
}
}

window.addEventListener('load',()=>fetchnews('India'));

function reload()
{
    window.location.reload();
}

async function fetchnews(query)
{
    const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data= await res.json();
    console.log(data);
    bindData(data.articles)
    ;
}

function bindData(articles)
{
    const cardsContainer=document.getElementById('cards-container');
    const newsCardTemplate=document.getElementById('template-news-card');

    cardsContainer.innerHTML='';

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone=newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article)
{
    const newsImage=cardClone.querySelector('#news-img');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-sourse');
    const newsDesc=cardClone.querySelector('#news-desc');

    newsImage.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });

    newsSource.innerHTML=`${article.source.name}-${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>
    {
        window.open(article.url,"_blank");
    });

}

let currentSelectedNav=null;

function onNavItemClick(id)
{
    fetchnews(id);
    const  navItem=document.getElementById(id);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav=navItem;
    currentSelectedNav.classList.add('active');

}

const  searchButton=document.getElementById('search-button');
const  searchText=document.getElementById('search-text');

searchButton.addEventListener('click',()=>{
    const query=searchText.value;
    if(!query) return ;
    fetchnews(query);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav=null;
});

const  searchButton1=document.getElementById('search-button1');
const  searchText1=document.getElementById('search-text1');

searchButton1.addEventListener('click',()=>{
    const query=searchText1.value;
    if(!query) return ;
    fetchnews(query);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav=null;
});