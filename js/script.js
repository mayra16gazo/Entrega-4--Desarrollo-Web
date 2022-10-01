// VARIABLES
const MOVIES_URL = "https://japceibal.github.io/japflix_api/movies-data.json";
const MOVIES_LIST_ELEM = document.getElementById("lista");
const SEARCH_INPUT_ELEM = document.getElementById("inputBuscar");
const SEARCH_FORM_ELEM = document.getElementById("search-form");
const OFFCANVAS_BODY_ELEM = document.getElementById("canvas-body");
const DROPDOWN_MENU_ELEM = document.getElementsByClassName("dropdown-menu")[0];
var FETCHED_MOVIES;

//FUNCTIONS STARS

function stars(score){
let scoreStars = ''
let score2 = Math.round(score/2)
for (let i=1; i<= 5; i++){
  if(i <= score2){
    scoreStars += '<span class="fa fa-star checked"></span>'
  }else{
    scoreStars += '<span class="fa fa-star "></span>'
  }
} return scoreStars
};

// FUNCTIONS
function showMovies(moviesArray) {
  MOVIES_LIST_ELEM.innerHTML = "";
  for (let i = 0; i < moviesArray.length; i++) {
    let movie = moviesArray[i];

    let item = document.createElement("div");
    item.className = "search-result list-group-item list-group-item-action";
    item.setAttribute("data-bs-toggle", "offcanvas");
    item.setAttribute("data-bs-target", "#offcanvasTop");
    item.id = `${movie.id}`;

    let container = document.createElement("div");
    container.className = "d-flex w-100 justify-content-between";

    let subContainer = document.createElement("div");
    subContainer.className = "mb-1";

    let title = document.createElement("h5");
    title.innerHTML = `${movie.title}`;

    let tagLine = document.createElement("p");
    tagLine.innerHTML = `${movie.tagline}`;

    let vote_averege = document.createElement("p");
    vote_averege.innerHTML = `${stars(movie.vote_average)}`;

    item.addEventListener("click", () => {
      // INSERTING DATA IN OFFCANVAS BODY
      OFFCANVAS_BODY_ELEM.innerHTML = `
            <h2>${movie.title}</h2>
            <p>${movie.overview}</p>
        `;
      for (const genre of movie.genres) {
        OFFCANVAS_BODY_ELEM.innerHTML += `
            <p>${genre.name}</p>
          `;
      }

      // INSERTING DATA IN DROPDOWN BUTTON
      let releaseDateYear = movie.release_date.slice(0, 4);
      DROPDOWN_MENU_ELEM.innerHTML = `
            <li class="dropdown-item"><strong>Year:</strong> ${releaseDateYear}</li>
            <li class="dropdown-item"><strong>Runtime:</strong> ${movie.runtime} mins</li>
            <li class="dropdown-item"><strong>Budget:</strong> $${movie.budget}</li>
            <li class="dropdown-item"><strong>Revenue:</strong> $${movie.revenue}</li>
        `;
    });

    item.appendChild(container);
    container.appendChild(subContainer);
    subContainer.appendChild(title);
    subContainer.appendChild(tagLine);
    subContainer.appendChild(vote_averege);

    MOVIES_LIST_ELEM.appendChild(item);
  }
}

function filterMovies() {
  let result = [];
  let searchInput = SEARCH_INPUT_ELEM.value.toLowerCase();
  for (const movie of FETCHED_MOVIES) {
    let movieTitle = movie.title.toLowerCase();
    let movieTagline = movie.tagline.toLowerCase();
    let movieOverview = movie.overview.toLowerCase();
    let movieGenres = [];
    for (const genre of movie.genres) {
      movieGenres.push(genre.name);
    }

    if (
      movieTitle.includes(searchInput) ||
      movieTagline.includes(searchInput) ||
      movieOverview.includes(searchInput) ||
      movieGenres.includes(searchInput)
    ) {
      result.push(movie);
    }
  }

  return result;
}

// EVENT LISTENERS
SEARCH_FORM_ELEM.addEventListener("submit", (event) => {
  event.preventDefault();
  showMovies(filterMovies(FETCHED_MOVIES));
});

// DOM LOADED
document.addEventListener("DOMContentLoaded", () => {
  fetch(MOVIES_URL)
    .then((response) => response.json())
    .then((moviesList) => {
      FETCHED_MOVIES = moviesList;
    });
});