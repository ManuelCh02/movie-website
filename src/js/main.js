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

export async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day', options);
    
    const movies = data.results;
    const trendingPreviewMoviesContainer = document.querySelector('#trending-preview .trending-now__gallery');
    
    trendingPreviewMoviesContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.alt = `${movie.title}`;
        movieImg.src= `https://media.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`;

        movieContainer.appendChild(movieImg);
        trendingPreviewMoviesContainer.appendChild(movieContainer);
    })
}

export async function getCategoriesPreview() {
    const { data } = await api('genre/movie/list');
    
    const categories = data.genres;
    const previewCategoriesContainer = document.querySelector('#categories-preview .categories-gallery');

    previewCategoriesContainer.innerHTML = '';

    categories.forEach(category => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('movie-container--category');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.id = category.id;
        categoryTitle.textContent = category.name;

        categoryContainer.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        })

        categoryContainer.appendChild(categoryTitle);
        previewCategoriesContainer.appendChild(categoryContainer);
    })
}

export async function getMoviesByCategory(id) {
    const { data } = await api(`discover/movie?with_genres=${id}`, options);
    
    const categories = data.results;
    const categoryPreviewMoviesContainer = document.querySelector('#category-preview .category__gallery');
    
    categoryPreviewMoviesContainer.innerHTML = '';

    categories.forEach(category => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('gallery-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.alt = `${category.title}`;
        movieImg.src= `https://media.themoviedb.org/t/p/w440_and_h660_face${category.poster_path}`;

        movieContainer.appendChild(movieImg);
        categoryPreviewMoviesContainer.appendChild(movieContainer);
    })
}

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

seeAllTrending.addEventListener('click', (e) => {
    e.preventDefault();
    location.hash = '#trends';
})

arrowButton.forEach(arrow => {
    arrow.addEventListener('click', () => {
        location.hash = '';
    })
})