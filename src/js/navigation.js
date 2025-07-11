import { getTrendingMoviesPreview } from "./main.js";
import { getCategoriesPreview } from "./main.js";
import { getMoviesByCategory } from "./main.js";
import { getMoviesBySearch } from "./main.js";
import { getTrendingMovies } from "./main.js";
import { getMovieById } from "./main.js";
import { getMostTrendingImg } from "./main.js";
import { sections } from './views.js';

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

    getMostTrendingImg();
    getTrendingMoviesPreview();
    getCategoriesPreview();
    window.scrollTo(0, 0);
}

function categoriesPage() {
    console.log('CATEGORIES!');

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
    window.scrollTo(0, 0);
}

function movieDetailsPage() {
    console.log('MOVIE!');

    detailPageHeader.classList.remove('inactive');
    detailPageMain.classList.remove('inactive');

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
    window.scrollTo(0, 0);
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
    window.scrollTo(0, 0);
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
}
