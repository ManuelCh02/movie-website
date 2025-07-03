<<<<<<< HEAD
// Here's where the logic of singly linked list data structure will work
import { homePage } from "./views.js"
import { movieDetails } from "./views.js"
import { seeAllTrending } from "./views.js"
import { seeAllPlaying } from "./views.js"
import { seeAllUpcoming } from "./views.js"
import { searchMovieById } from "./main.js"
import { getMovieDetailContent } from "./main.js"
import { seeAllPage } from "./main.js"
import { seeAllNowPlayingPage } from "./main.js"
import { seeAllUpcomingPage } from "./main.js"
=======
import { getTrendingMoviesPreview } from "./main.js";
import { getCategoriesPreview } from "./main.js";
import { getMoviesByCategory } from "./main.js";
import { getMoviesBySearch } from "./main.js";
import { getTrendingMovies } from "./main.js";
import { getMovieById } from "./main.js";
import { sections } from './views.js';
>>>>>>> platzi-fetch

// Nodes
const homePageHeader = document.querySelector('#header-home');
const homePageMain = document.querySelector('#main-element');

const detailPageHeader = document.querySelector('#header-details');
const detailPageMain = document.querySelector('#detail-preview');

const allTrendingPageHeader = document.querySelector('#header-trending');
const allTrendingPageMain = document.querySelector('#trends-preview');

const categoryPageHeader = document.querySelector('.header-category');
const categoryPageMain = document.querySelector('#category-preview');

const searchPageHeader = document.querySelector('#header-search');
const searchPageMain = document.querySelector('#query-preview');

console.log(categoryPageHeader)

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    console.log({ location });

    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage();
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
        homePage();
    }
    location.hash;
}

function homePage() {
    console.log('HOME!');

    // sections.allHeaders.forEach((header) => {
    //     if(!header.classList.contains('header-container')) {
    //         header.classList.add('inactive');
    //     }
    // })

    // sections.allMainElements.forEach((main) => {
    //     if(!main.classList.contains('main-homePage')) {
    //         main.classList.add('inactive');
    //     }
    // })

    homePageHeader.classList.remove('inactive');
    homePageMain.classList.remove('inactive');

    detailPageHeader.classList.add('inactive');
    detailPageMain.classList.add('inactive');
    allTrendingPageHeader.classList.add('inactive');
    allTrendingPageMain.classList.add('inactive');
    categoryPageHeader.classList.add('inactive');
    categoryPageMain.classList.add('inactive');
    searchPageHeader.classList.add('inactive');
    searchPageMain.classList.add('inactive');

    getTrendingMoviesPreview();
    getCategoriesPreview();
}

function categoriesPage() {
    console.log('CATEGORIES!');

<<<<<<< HEAD
async function loadHomePage() {
    const initialLoadingPage = await homePage()

    if(!myStack.length) {
    myStack.push(initialLoadingPage);
    appParent.appendChild(myStack.peek().value);
    }
}

loadHomePage()

document.body.addEventListener('click', (e) => {
    if(e.target.matches('.container-top__details-btn')) {
        updateAppContent(movieDetails());
    }
=======
    categoryPageHeader.classList.remove('inactive');
    categoryPageMain.classList.remove('inactive');

    homePageHeader.classList.add('inactive');
    homePageMain.classList.add('inactive');
    detailPageHeader.classList.add('inactive');
    detailPageMain.classList.add('inactive');
    allTrendingPageHeader.classList.add('inactive');
    allTrendingPageMain.classList.add('inactive');
    searchPageHeader.classList.add('inactive');
    searchPageMain.classList.add('inactive');

    const categoryTitle = document.querySelector('.category-title');
    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');
    categoryTitle.innerHTML = categoryName;

    getMoviesByCategory(categoryId);
}

function movieDetailsPage() {
    console.log('MOVIE!');
>>>>>>> platzi-fetch

    detailPageHeader.classList.remove('inactive');
    detailPageMain.classList.remove('inactive');

<<<<<<< HEAD
    if(e.target.matches('.trending-now-see-all')) {
        updateAppContent(seeAllTrending());
        seeAllPage();
    }

    if(e.target.matches('.latest-see-all')) {
        updateAppContent(seeAllPlaying());
        seeAllNowPlayingPage();
    }

    if(e.target.matches('.upcoming-see-all')) {
        updateAppContent(seeAllUpcoming());
        seeAllUpcomingPage();
    }

    if(e.target.matches('.movie-img')) {
        const movieImg = e.target;
        const getMovieName = { title: movieImg.alt, id: movieImg.id };
        appendDetailMovieInStack(getMovieName)
            .then(res => updateAppContent(res))
            .catch(error => {  
                console.error('Error -_-: ', error)
            })
    }
})

function updateAppContent(nodeContent) {;
    myStack.push(nodeContent);
    appParent.innerHTML = '';
    appParent.appendChild(myStack.peek().value);
}

function returnAppContent() {
    myStack.pop();
    appParent.innerHTML = '';
    appParent.appendChild(myStack.peek().value);
}

async function appendDetailMovieInStack(movieData) {
    try {
        const eventDataResponse = await searchMovieById(movieData);
        const sendInfoToDetails = await getMovieDetailContent(eventDataResponse)
        const movieDetail = movieDetails(sendInfoToDetails)
        return movieDetail
    } catch(error) {
        console.error('Error yo: ', error)
    }
=======
    homePageHeader.classList.add('inactive');
    homePageMain.classList.add('inactive');
    allTrendingPageHeader.classList.add('inactive');
    allTrendingPageMain.classList.add('inactive');
    categoryPageHeader.classList.add('inactive');
    categoryPageMain.classList.add('inactive');
    searchPageHeader.classList.add('inactive');
    searchPageMain.classList.add('inactive');

    const [_, movieId] = location.hash.split('=');
    getMovieById(movieId);
}

function searchPage() {
    console.log('SEARCH!');

    searchPageHeader.classList.remove('inactive');
    searchPageMain.classList.remove('inactive');

    homePageHeader.classList.add('inactive');
    homePageMain.classList.add('inactive');
    detailPageHeader.classList.add('inactive');
    detailPageMain.classList.add('inactive');
    allTrendingPageHeader.classList.add('inactive');
    allTrendingPageMain.classList.add('inactive');
    categoryPageHeader.classList.add('inactive');
    categoryPageMain.classList.add('inactive');

    const [_, query] = location.hash.split('=');
    getMoviesBySearch(query);
}

function trendsPage() {
    console.log('TRENDS!');

    allTrendingPageHeader.classList.remove('inactive');
    allTrendingPageMain.classList.remove('inactive');

    homePageHeader.classList.add('inactive');
    homePageMain.classList.add('inactive');
    detailPageHeader.classList.add('inactive');
    detailPageMain.classList.add('inactive');
    categoryPageHeader.classList.add('inactive');
    categoryPageMain.classList.add('inactive');
    searchPageHeader.classList.add('inactive');
    searchPageMain.classList.add('inactive');

    getTrendingMovies();
    window.scrollTo(0, 0);
>>>>>>> platzi-fetch
}