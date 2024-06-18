async function getcountry() {
    let data = await fetch(`https://ipinfo.io/json`)
    let result = await data.json()
    console.log(result.country);
    getNews(result.country)
}

getcountry()

async function getNews(country) {
    let news = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=business&apiKey=517b1c0045ea4c78899df5afe8f01450`)
    let result = await news.json()
    addNews(result.articles)
    console.log(result.articles);
}

function addNews(articles) {
    let cartona = []
    for (let i = 0; i < articles.length; i++) {
        cartona += `
        <div class="col-md-3 z-top newcont p-3">
            <div class="new p-4 rounded shadow d-flex flex-column justify-content-between">
                <div class="d-flex flex-column justify-content-between h-100">
                    <h3 class="newTitle">${articles[i].title}</h3>
                    <a href="${articles[i].url}" class="morelink" target="_blank">See more...</a>
                </div>
                <div class="metadata py-3">
                    <h6 class="author">${articles[i].author}</h6>
                    <div class="publishedAt">${extractDate(articles[i].publishedAt)}</div>
                </div>
            </div>
        </div>
        `
    }
    document.getElementById('newsRow').innerHTML = cartona
}


function extractDate(isoString) {
    return isoString.split('T')[0];
}