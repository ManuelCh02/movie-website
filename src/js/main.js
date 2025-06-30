import { API_KEY } from "./sec.js";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${API_KEY}`,
    },
});

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
    }
}

// Utils

function createMovies(movies, container) {
    container.innerHTML = '';

    movies.forEach(movie => {
        const movieContainer = document.createElement('div');

        if(!container.classList.contains('categories-gallery')) {
            const movieImg = document.createElement('img');
            movieImg.classList.add('movie-img');
            movieImg.alt = `${movie.title}`;
            movieImg.src= `https://media.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`;

            movieContainer.appendChild(movieImg);
            container.appendChild(movieContainer);
        } else {
            const categoryContainer = document.createElement('div');
            categoryContainer.classList.add('movie-container--category');

            const categoryTitle = document.createElement('h3');
            categoryTitle.classList.add('category-title');
            categoryTitle.id = movie.id;
            categoryTitle.textContent = movie.name;

            categoryContainer.addEventListener('click', () => {
                location.hash = `#category=${movie.id}-${movie.name}`;
            })

            categoryContainer.appendChild(categoryTitle);
            container.appendChild(categoryContainer);
        }

        switch(container) {
            case container.classList.contains('trending-now__gallery'):
                movieContainer.classList.add('movie-container');
                break;
            case container.classList.contains('categories-gallery'):
                categoryContainer.classList.add('movie-container--category');
                break;
            case container.classList.contains('category__gallery'):
                movieContainer.classList.add('gallery-container');
                break;
            case container.classList.contains('trends__gallery'):
                movieContainer.classList.add('gallery-container');
                break;
        }
    })
}

function createCategories(categories, container) {
    container.innerHTML = '';

    categories.forEach(category => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('gallery-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.alt = `${category.title}`;
        movieImg.src= `https://media.themoviedb.org/t/p/w440_and_h660_face${category.poster_path}`;

        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    })
}

// API Calls
export async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day', options);
    
    const movies = data.results;
    const trendingPreviewMoviesContainer = document.querySelector('#trending-preview .trending-now__gallery');
    
    createMovies(movies, trendingPreviewMoviesContainer);
}

export async function getCategoriesPreview() {
    const { data } = await api('genre/movie/list');
    
    const categories = data.genres;
    const previewCategoriesContainer = document.querySelector('#categories-preview .categories-gallery');

    createMovies(categories, previewCategoriesContainer);
}

export async function getMoviesByCategory(id) {
    const { data } = await api(`discover/movie?with_genres=${id}`, options);
    
    const categories = data.results;
    const categoryPreviewMoviesContainer = document.querySelector('#category-preview .category__gallery');
    
    createCategories(categories, categoryPreviewMoviesContainer); 
}

export async function getMoviesBySearch(query) {
    const { data } = await api(`search/movie?query=${query}`, options);
    
    const categories = data.results;
    const categoryPreviewMoviesContainer = document.querySelector('#query-preview .query__gallery');
    const searchPageTitle = document.querySelector('.header-search .searchPage-title');

    searchPageTitle.textContent = decodeURIComponent(query);

    createCategories(categories, categoryPreviewMoviesContainer); 
}

export async function getTrendingMovies() {
    const { data } = await api('trending/movie/day', options);
    
    const movies = data.results;
    const trendsMovieContainer = document.querySelector('#trends-preview .trends__gallery');
    
    createMovies(movies, trendsMovieContainer);
}

// DOM Events
const formButton = document.querySelector('.search-form__button');
const formInput = document.querySelector('.form-input');

const formButtonSearch = document.querySelector('.search-form__button-searchPage');
const formInputSearch = document.querySelector('.form-input-search');

const seeAllTrending = document.querySelector('.trending-now-see-all');
const arrowButton = document.querySelectorAll('.container__return-button');

formButton.addEventListener('click', () => {
    if(formInput.value.trim !== '') {
        location.hash = `#search=${formInput.value}`;
    }
})

formButtonSearch.addEventListener('click', () => {
    if(formInputSearch.value.trim !== '') {
        location.hash = `#search=${formInputSearch.value}`;
    }
})

seeAllTrending.addEventListener('click', (e) => {
    e.preventDefault();
    location.hash = '#trends';
})

arrowButton.forEach(arrow => {
    arrow.addEventListener('click', () => {
        location.hash = window.history.back();
    })
})

