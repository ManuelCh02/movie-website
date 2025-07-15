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
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            const img = entry.target;

            img.src = img.dataset.src;
            img.removeAttribute('data-src');

            observer.unobserve(img);
        }
    })
    }, {
        rootMargin: "30px",
})

const observerVertical = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            const img = entry.target;

            img.src = img.dataset.img;
            img.removeAttribute('data-img');

            observer.unobserve(img);
        }
    })
})

function createMovies(movies, container, lazy = false) {
    container.innerHTML = '';

    movies.forEach(movie => {
        if(!container.classList.contains('categories-gallery')) {
            const movieContainer = document.createElement('div');
            const movieImg = document.createElement('img');
            movieContainer.classList.add('gallery-container');

            movieContainer.addEventListener('click', () => {
                location.hash = `#movie=${movie.id}`;
            })

            movieImg.classList.add('movie-img');
            movieImg.alt = `${movie.title}`;
            movieImg.width = 135;
            movieImg.height = 225;
            movieImg.src = '';

            lazy ? movieImg.dataset.src = `https://media.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}` : movieImg.src = `https://media.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`;
            
            movieImg.addEventListener('error', () => {
                movieImg.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/640px-No-Image-Placeholder.svg.png`;
            })
            
            movieContainer.appendChild(movieImg);

            if (container.classList.contains('trending-now__gallery')) {
                movieContainer.classList.add('movie-container');
            } else if (
                container.classList.contains('category__gallery') ||
                container.classList.contains('trends__gallery')
            ) {
                movieContainer.classList.add('gallery-container');
            }

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
    })
    
    if(lazy) {
        const $images = document.querySelectorAll('[data-src]');
        $images.forEach((image) => {
            observer.observe(image);
        })
    }
}

function createCategories(categories, container, lazy = false) {
    container.innerHTML = '';

    categories.forEach(category => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('gallery-container');

        movieContainer.addEventListener('click', () => {
            location.hash = `#movie=${category.id}`;
        })

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.alt = `${category.title}`;
        movieImg.width = 150;
        movieImg.height = 225;
        movieImg.src = ''

        lazy ? movieImg.dataset.img = `https://media.themoviedb.org/t/p/w440_and_h660_face${category.poster_path}` : movieImg.src = `https://media.themoviedb.org/t/p/w440_and_h660_face${category.poster_path}`;

        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    })

    const $images = document.querySelectorAll('[data-img]');
    $images.forEach((image) => {
        observerVertical.observe(image);
    })
}

function createMovieDetail(data, container) {
    container.innerHTML = '';

    const movieDetailImg = document.createElement('img');
    movieDetailImg.classList.add('detail-container__main-img');
    movieDetailImg.src = `https://media.themoviedb.org/t/p/w440_and_h660_face${data.poster_path}`;
    movieDetailImg.alt = `${data.title}`;

    const detailContainer = document.createElement('div');
    detailContainer.classList.add('detail-container__titles');

    const detailType = document.createElement('span');
    detailType.classList.add('titles__type');
    detailType.textContent = 'MOVIE';

    const movieDetailTitle = document.createElement('h2');
    movieDetailTitle.classList.add('detail-movie-title');
    movieDetailTitle.textContent = data.title;

    const movieDetailGenres = document.createElement('ul');
    movieDetailGenres.classList.add('titles__categories');

    data.genres.forEach((genre) => { 
        const li = document.createElement('li');
        li.textContent = `${genre.name}`;
        movieDetailGenres.appendChild(li);
    })

    detailContainer.appendChild(detailType);
    detailContainer.appendChild(movieDetailTitle);
    detailContainer.appendChild(movieDetailGenres);

    const movieDetailSynopsis = document.createElement('p');
    movieDetailSynopsis.classList.add('detail-container__synopsis');
    movieDetailSynopsis.textContent = data.overview;

    const detailContainerData = document.createElement('div');
    detailContainerData.classList.add('detail-container__movie-data');

    const movieDetailData = document.createElement('ul');
    movieDetailData.classList.add('movie-data__list');

    for(let i = 0; i < 3; i++) {
        const li = document.createElement('li');
        if(i === 0) {
            li.textContent = `⭐ ${data.vote_average.toFixed(1)}`;
            movieDetailData.appendChild(li);
        } else if(i === 1) {
            const releaseDate = data.release_date.split('-');
            li.textContent = `${releaseDate[0]}`;
            movieDetailData.appendChild(li);
        } else {
            li.textContent = `${data.runtime}min`;
            movieDetailData.appendChild(li);
        }
    }

    detailContainerData.appendChild(movieDetailData);

    container.appendChild(movieDetailImg);
    container.appendChild(detailContainer);
    container.appendChild(movieDetailSynopsis);
    container.appendChild(detailContainerData);
}

// API Calls
export async function getMostTrendingImg() {
    const { data } = await api('trending/movie/week', options);
    
    const movies = data.results;
    const mostTrendingContainer = document.querySelector('.trending-top__container-top');

    mostTrendingContainer.innerHTML = '';

    const img = document.createElement('img');
    img.src = `https://media.themoviedb.org/t/p/w440_and_h660_face${movies[0].poster_path}`;
    img.alt = movies[0].title;
    img.classList.add('img-top-trend');

    const btn = document.createElement('button');
    btn.classList.add('container-top__details-btn');
    btn.textContent = 'Details';

    btn.addEventListener('click', () => {
        location.hash = `#movie=${movies[0].id}`;
        getMovieById(movies[0].id);
    })

    mostTrendingContainer.appendChild(img);
    mostTrendingContainer.appendChild(btn);
}

export async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day', options);
    
    const movies = data.results;
    const trendingPreviewMoviesContainer = document.querySelector('#trending-preview .trending-now__gallery');
    
    createMovies(movies, trendingPreviewMoviesContainer, true);
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
    
    createCategories(categories, categoryPreviewMoviesContainer, true); 
}

export async function getMoviesBySearch(query) {
    const { data } = await api(`search/movie?query=${query}`, options);
    
    const categories = data.results;
    const categoryPreviewMoviesContainer = document.querySelector('#query-preview .query__gallery');
    const searchPageTitle = document.querySelector('.header-search .searchPage-title');

    searchPageTitle.textContent = decodeURIComponent(query);

    createMovies(categories, categoryPreviewMoviesContainer, true); 
}

export async function getTrendingMovies() {
    const { data } = await api('trending/movie/day', options);
    
    const movies = data.results;
    const trendsMovieContainer = document.querySelector('#trends-preview .trends__gallery');
    
    createMovies(movies, trendsMovieContainer, true);
}

export async function getMovieById(id) {
    const { data } = await api(`movie/${id}`, options);

    const movieDetail = document.querySelector('#detail-preview .detail-container');

    createMovieDetail(data, movieDetail);
    getRelatedMoviesById(id);
}

async function getRelatedMoviesById(id) {
    const { data } = await api(`movie/${id}/similar`, options);

    const movies = data.results;
    const detailRelatedContainer = document.querySelector('.detail-related-movies .movies-container__gallery');
    
    createMovies(movies, detailRelatedContainer, true);
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
        window.history.back();
    })
})