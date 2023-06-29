// apikey
const accesskey = "eyZUb4vMhUpx_O8jMuYIu9ONk-fWAomW4j2r7gSINXc";


// this is to store a input variables
const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");


// to store a input data such as keyword ex: dog,cat etc
let inputData = "";
let page = 1;


// we use a async because we useing fetch and response
 async function searchImages(){
    // this will hold the data 
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1){
        searchResults.innerHTML ="";
    }

    results.map((result) =>{
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;
    if (page > 1){
        showMore.style.display = "block";
    }

}

// now the page is don't work therefore we have to add a eventlistener

formEl.addEventListener("submit", (event) =>{
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener("click",() =>{
    searchImages();
});