import { API_KEY } from "./sec.js";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
    }
}

async function getTrendingMoviesPreview() {
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day', options);
    const data = await res.json();
    
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
    const res = await fetch('https://api.themoviedb.org/3/genre/movie/list', options);
    const data = await res.json();
    
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