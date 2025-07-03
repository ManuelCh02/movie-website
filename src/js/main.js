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
        if(!container.classList.contains('categories-gallery')) {
            const movieContainer = document.createElement('div');
            const movieImg = document.createElement('img');
            movieContainer.classList.add('gallery-container');

            movieContainer.addEventListener('click', () => {
                location.hash = `#movie=${movie.id}`;
            })

            movieImg.classList.add('movie-img');
            movieImg.alt = `${movie.title}`;
            movieImg.src= `https://media.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`;

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
}

function createCategories(categories, container) {
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
        movieImg.src= `https://media.themoviedb.org/t/p/w440_and_h660_face${category.poster_path}`;

        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
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

    createMovies(categories, categoryPreviewMoviesContainer); 
}

export async function getTrendingMovies() {
    const { data } = await api('trending/movie/day', options);
    
    const movies = data.results;
    const trendsMovieContainer = document.querySelector('#trends-preview .trends__gallery');
    
    createMovies(movies, trendsMovieContainer);
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
    
    createMovies(movies, detailRelatedContainer);
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

const API_CALL = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}

export async function getMostTrending() {
    let posterPath;

    try {
        const response = await fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', API_CALL);
        const data = await response.json();

        if(response.ok) {
            posterPath = data.results[0].poster_path
        }
    } catch(error) {
        console.error(error)
    }

    return posterPath
};

export async function trendingNowList() {
    let postersPath;

    try {
        const response = await fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', API_CALL);
        const data = await response.json();

        if(response.ok) {
            postersPath = data.results
        }
    } catch(error) {
        console.error(error)
    }

    return postersPath
}

export async function nowPlayingList() {
    let posterPath;

    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', API_CALL);
        const data = await response.json();

        if(response.ok) {
            posterPath = data.results
        }
    } catch(error) {
        console.error(error)
    }

    return posterPath
}

export async function upcomingList() {
    let posterPath;

    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', API_CALL);
        const data = await response.json();

        if(response.ok) {
            posterPath = data.results
            console.log(posterPath[0].original_title)
        }
    } catch(error) {
        console.error(error)
    }

    return posterPath
}

export async function searchMovieById({ title, id }) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(title)}&include_adult=false&language=en-US&page=1`, API_CALL);
        const data = await response.json();

        if(response.ok) {
            const searchResult = data.results
            const match = searchResult.filter((element) => {
                return element.id === parseInt(id)
            });
            return match
        }
    }catch(error) {
        console.error(error)
    }
}

export async function createTrendingList() {
    const trendingImgPath = await trendingNowList();
    const nowPlayingImgPath = await nowPlayingList();
    const upcomingImgPath = await upcomingList();
    const trendingImgContainer = document.querySelector('.trending-img-container');
    const nowPlayingImgContainer = document.querySelector('.nowPlaying-img-container');
    const upcomingImgContainer = document.querySelector('.upcoming-img-container');
    
    try {
        for(let i = 0; i < 10; i++) {
            const divTrending = document.createElement('div');
            const divNowPlaying = document.createElement('div');
            const divUpcoming = document.createElement('div');

            divTrending.classList.add('movie-container');

            divTrending.innerHTML = 
            `
            <img src="https://media.themoviedb.org/t/p/w440_and_h660_face${trendingImgPath[i].poster_path}" alt="${trendingImgPath[i].original_title}" class="movie-img" id="${trendingImgPath[i].id}">
            `;

            divNowPlaying.classList.add('movie-container');
            divNowPlaying.innerHTML = 
            `
            <img src="https://media.themoviedb.org/t/p/w440_and_h660_face${nowPlayingImgPath[i].poster_path}" alt="${nowPlayingImgPath[i].original_title}" class="movie-img" id="${nowPlayingImgPath[i].id}">
            `;

            divUpcoming.classList.add('movie-container');
            divUpcoming.innerHTML = 
            `
            <img src="https://media.themoviedb.org/t/p/w440_and_h660_face${upcomingImgPath[i].poster_path}" alt="${upcomingImgPath[i].original_title}" class="movie-img" id="${upcomingImgPath[i].id}">
            `;

            trendingImgContainer.appendChild(divTrending);
            nowPlayingImgContainer.appendChild(divNowPlaying);
            upcomingImgContainer.appendChild(divUpcoming);
        }
    } catch(error) {
        console.error(error)
    }
}

export async function getMovieDetailContent(match) {
    const matchObj = match[0];
    let detailData = {
        img: matchObj.poster_path,
        title: matchObj.title,
        overview: matchObj.overview
    }

    console.log(detailData)

    return detailData
}

export async function seeAllPage() {
    const trendingImgPath = await trendingNowList();
    const trendingGallery = document.querySelector('.trending-see-all-gallery');

    try {
        for(let i = 0; i < 20; i++) {
            const galleryContainer = document.createElement('div');
            const movieImg = document.createElement('img');
            galleryContainer.classList.add('gallery-container');

            movieImg.src = `https://media.themoviedb.org/t/p/w440_and_h660_face${trendingImgPath[i].poster_path}`;
            movieImg.alt = `${trendingImgPath[i].original_title}`;
            movieImg.id = `${trendingImgPath[i].id}`;
            movieImg.classList.add('movie-img');
            galleryContainer.appendChild(movieImg);

            trendingGallery.appendChild(galleryContainer);
        }
    } catch(error) {
        console.error(error)
    }
}

export async function seeAllNowPlayingPage() {
    const trendingImgPath = await nowPlayingList();
    const trendingGallery = document.querySelector('.now-playing-gallery');

    try {
        for(let i = 0; i < 20; i++) {
            const galleryContainer = document.createElement('div');
            const movieImg = document.createElement('img');
            galleryContainer.classList.add('gallery-container');

            movieImg.src = `https://media.themoviedb.org/t/p/w440_and_h660_face${trendingImgPath[i].poster_path}`;
            movieImg.alt = `${trendingImgPath[i].original_title}`;
            movieImg.id = `${trendingImgPath[i].id}`;
            movieImg.classList.add('movie-img');
            galleryContainer.appendChild(movieImg);

            trendingGallery.appendChild(galleryContainer);
        }
    } catch(error) {
        console.error(error)
    }
}

export async function seeAllUpcomingPage() {
    const trendingImgPath = await upcomingList();
    const trendingGallery = document.querySelector('.upcoming-gallery');

    try {
        for(let i = 0; i < 20; i++) {
            const galleryContainer = document.createElement('div');
            const movieImg = document.createElement('img');
            galleryContainer.classList.add('gallery-container');

            movieImg.src = `https://media.themoviedb.org/t/p/w440_and_h660_face${trendingImgPath[i].poster_path}`;
            movieImg.alt = `${trendingImgPath[i].original_title}`;
            movieImg.id = `${trendingImgPath[i].id}`;
            movieImg.classList.add('movie-img');
            galleryContainer.appendChild(movieImg);

            trendingGallery.appendChild(galleryContainer);
        }
    } catch(error) {
        console.error(error)
    }
}