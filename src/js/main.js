import { API_KEY } from "./sec.js";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-type': 'application/json;charset=utf-8',
        'Authorization': API_KEY,
    },
});

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
    }
}

async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day', options);
    
    const movies = data.results;
    movies.forEach(movie => {
        const trendingPreviewMoviesContainer = document.querySelector('#trending-preview .trending-now__gallery');

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

async function getCategoriesPreview() {
    const { data } = await api('genre/movie/list');
    
    const categories = data.genres;
    categories.forEach(category => {
        const previewCategoriesContainer = document.querySelector('#categories-preview .categories-gallery');

        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('movie-container--category');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.id = category.id;
        categoryTitle.textContent = category.name;

        categoryContainer.appendChild(categoryTitle);
        previewCategoriesContainer.appendChild(categoryContainer);
    })
}

getTrendingMoviesPreview();
getCategoriesPreview();