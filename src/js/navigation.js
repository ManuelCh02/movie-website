import { getTrendingMoviesPreview } from "./main.js";
import { getCategoriesPreview } from "./main.js";
import { getMoviesByCategory } from "./main.js";
import { getMoviesBySearch } from "./main.js";
import { getTrendingMovies } from "./main.js";
import { getMovieById } from "./main.js";
import { sections } from './views.js';

// Nodes

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

    sections.allHeaders.forEach((header) => {
        if(!header.classList.contains('header-container')) {
            header.classList.add('inactive');
        }
    })

    sections.allMainElements.forEach((main) => {
        if(!main.classList.contains('main-homePage')) {
            main.classList.add('inactive');
        }
    })

    getTrendingMoviesPreview();
    getCategoriesPreview();
}

function categoriesPage() {
    console.log('CATEGORIES!')

    sections.allHeaders.forEach((header) => {
        if(!header.classList.contains('header-category')) {
            header.classList.add('inactive');
        } 
    })

    sections.allMainElements.forEach((main) => {
        if(!main.classList.contains('main-category')) {
            main.classList.add('inactive');
        } 
    })

    const categoryTitle = document.querySelector('.category-title');

    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');

    categoryTitle.innerHTML = categoryName;

    getMoviesByCategory(categoryId);
}

function movieDetailsPage() {
    console.log('MOVIE!')

    sections.allHeaders.forEach((header) => {
        if(!header.classList.contains('header-details')) {
            header.classList.add('inactive');
        }
    })

    sections.allMainElements.forEach((main) => {
        if(!main.classList.contains('main-movieDetails')) {
            main.classList.add('inactive');
        }
    })

    const [_, movieId] = location.hash.split('=');

    getMovieById(movieId);
}

function searchPage() {
    console.log('SEARCH!')

    sections.allHeaders.forEach((header) => {
        if(!header.classList.contains('header-search')) {
            header.classList.add('inactive');
        } 
    })

    sections.allMainElements.forEach((main) => {
        if(!main.classList.contains('main-search')) {
            main.classList.add('inactive');
        }
    })

    const [_, query] = location.hash.split('=');
    
    getMoviesBySearch(query);
}

function trendsPage() {
    console.log('TRENDS!')

    sections.allHeaders.forEach((header) => {
        if(!header.classList.contains('header-trends')) {
            header.classList.add('inactive');
        }
    })

    sections.allMainElements.forEach((main) => {
        if(!main.classList.contains('main-trends')) {
            main.classList.add('inactive');
        }
    })

    getTrendingMovies()

    window.scrollTo(0, 0);
}