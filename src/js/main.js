import { API_KEY } from "./sec.js";

let page = 1;
let maxPage;

// Data

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

function favoriteMovieList() {
    const item = JSON.parse(localStorage.getItem('favorite_movies'));
    let movies;

    if(item) {
        movies = item;
    } else {
        movies = {}
    }

    return movies;
}

function favoriteMovie(movie) {
    const favoriteMovies = favoriteMovieList();

    if(favoriteMovies[movie.id]) {
        favoriteMovies[movie.id] = undefined;

        //remove
    } else {
        favoriteMovies[movie.id] = movie;
    }

    localStorage.setItem('favorite_movies', JSON.stringify(favoriteMovies));
}

// Utils
// Responsive image utility
function getResponsiveImageUrl(posterPath, type = 'poster') {
    const baseUrl = 'https://media.themoviedb.org/t/p/';
    
    if (type === 'backdrop') {
        // For hero images (backdrops), we'll use different sizes based on breakpoints
        return {
            mobile: `${baseUrl}w780${posterPath}`,
            tablet: `${baseUrl}w1280${posterPath}`,
            desktop: `${baseUrl}w1920${posterPath}`,
            original: `${baseUrl}original${posterPath}`
        };
    } else if (type === 'detail') {
        // For movie detail images, use high quality poster sizes
        return {
            mobile: `${baseUrl}w500${posterPath}`,
            tablet: `${baseUrl}w780${posterPath}`,
            desktop: `${baseUrl}w1280${posterPath}`,
            original: `${baseUrl}original${posterPath}`
        };
    } else {
        // For regular movie posters in galleries
        return {
            small: `${baseUrl}w185${posterPath}`,
            medium: `${baseUrl}w342${posterPath}`,
            large: `${baseUrl}w500${posterPath}`,
            xlarge: `${baseUrl}w780${posterPath}`
        };
    }
}

function createResponsivePictureElement(imageUrls, altText, className = '') {
    const picture = document.createElement('picture');
    const img = document.createElement('img');
    
    // Add sources for different breakpoints
    const sources = [
        { media: '(min-width: 1440px)', srcset: imageUrls.desktop || imageUrls.original },
        { media: '(min-width: 1024px)', srcset: imageUrls.tablet || imageUrls.desktop },
        { media: '(min-width: 768px)', srcset: imageUrls.tablet || imageUrls.mobile },
        { media: '(min-width: 480px)', srcset: imageUrls.mobile }
    ];
    
    sources.forEach(source => {
        if (source.srcset) {
            const sourceElement = document.createElement('source');
            sourceElement.media = source.media;
            sourceElement.srcset = source.srcset;
            picture.appendChild(sourceElement);
        }
    });
    
    // Fallback image
    img.src = imageUrls.mobile || imageUrls.small;
    img.alt = altText;
    if (className) img.classList.add(className);
    
    // Error handling
    img.addEventListener('error', () => {
        img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/640px-No-Image-Placeholder.svg.png';
    });
    
    picture.appendChild(img);
    return picture;
}

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
        rootMargin: "50px",
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

function createMovies(movies, container, { lazy = false, clean = true } = {}) {
    if(clean) {
        container.innerHTML = '';
    }

    movies.forEach(movie => {
        if(!container.classList.contains('categories-gallery')) {
            const movieContainer = document.createElement('div');
            const movieImg = document.createElement('img');
            movieContainer.classList.add('gallery-container');

            movieImg.addEventListener('click', () => {
                location.hash = `#movie=${movie.id}`;
            })

            movieImg.classList.add('movie-img');
            movieImg.alt = `${movie.title}`;
            movieImg.width = 135;
            movieImg.height = 225;
            movieImg.src = '';

            // Use responsive image URLs for better performance
            const imageUrls = getResponsiveImageUrl(movie.poster_path, 'poster');
            const imageUrl = imageUrls.large; // Use large size for regular movie posters
            
            lazy ? movieImg.dataset.src = imageUrl : movieImg.src = imageUrl;
            
            movieImg.addEventListener('error', () => {
                movieImg.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/640px-No-Image-Placeholder.svg.png`;
            })

            const favoriteBtn = document.createElement('button');
            favoriteBtn.classList.add('favoriteBtn');
            favoriteBtn.innerHTML = `<i class="fa-regular fa-star"></i>`;
            movieContainer.appendChild(favoriteBtn);

            favoriteMovieList()[movie.id] && favoriteBtn.classList.add('favoriteBtn--active');

            favoriteBtn.addEventListener('click', () => {
                favoriteBtn.classList.toggle('favoriteBtn--active');
                favoriteMovie(movie);
                getFavoriteMovies();
            });
            
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

function createCategories(categories, container, { lazy = false, clean = true } = {}) {
    if(clean) {
        container.innerHTML = '';
    }

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
        movieImg.src = '';

        // Use responsive image URLs for better performance
        const imageUrls = getResponsiveImageUrl(category.poster_path, 'poster');
        const imageUrl = imageUrls.large; // Use large size for category movie posters
        
        lazy ? movieImg.dataset.img = imageUrl : movieImg.src = imageUrl;

        movieImg.addEventListener('error', () => {
            movieImg.src = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/640px-No-Image-Placeholder.svg.png`;
        })

        const favoriteBtn = document.createElement('button');
        favoriteBtn.classList.add('favoriteBtn');
        favoriteBtn.innerHTML = `<i class="fa-regular fa-star"></i>`;
        movieContainer.appendChild(favoriteBtn);

        favoriteMovieList()[category.id] && favoriteBtn.classList.add('favoriteBtn--active');

        favoriteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            favoriteBtn.classList.toggle('favoriteBtn--active');
            favoriteMovie(category);
            getFavoriteMovies();
        });

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

    // Create responsive image for movie detail with high quality
    const imageUrls = getResponsiveImageUrl(data.poster_path, 'detail');
    const pictureElement = createResponsivePictureElement(
        imageUrls, 
        data.title, 
        'detail-container__main-img'
    );

    // Create content wrapper for desktop layout
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('detail-content-wrapper');

    const detailContainer = document.createElement('div');
    detailContainer.classList.add('detail-container__titles');

    const detailType = document.createElement('span');
    detailType.classList.add('titles__type');
    detailType.textContent = 'MOVIE';

    const movieDetailTitle = document.createElement('h1');
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

    // Add content to wrapper
    contentWrapper.appendChild(detailContainer);
    contentWrapper.appendChild(movieDetailSynopsis);
    contentWrapper.appendChild(detailContainerData);

    // Add image and content to container
    container.appendChild(pictureElement);
    container.appendChild(contentWrapper);
}

// API Calls
export async function getMostTrendingImg() {
    const { data } = await api('trending/movie/week', options);
    
    const movies = data.results;
    const mostTrendingContainer = document.querySelector('.trending-top__container-top');

    mostTrendingContainer.innerHTML = '';

    // Get the first trending movie with backdrop image
    const trendingMovie = movies[0];
    
    // Get responsive image URLs for backdrop
    const imageUrls = getResponsiveImageUrl(trendingMovie.backdrop_path, 'backdrop');
    
    // Create responsive picture element
    const pictureElement = createResponsivePictureElement(
        imageUrls, 
        trendingMovie.title, 
        'img-top-trend'
    );

    // Create overlay container
    const overlayContainer = document.createElement('div');
    overlayContainer.classList.add('hero-overlay');

    // Create content wrapper
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('hero-content');

    // Create movie title
    const movieTitle = document.createElement('h1');
    movieTitle.classList.add('hero-title');
    movieTitle.textContent = trendingMovie.title;

    // Create movie description (truncate if too long)
    const movieDescription = document.createElement('p');
    movieDescription.classList.add('hero-description');
    const description = trendingMovie.overview;
    const truncatedDescription = description.length > 200 ? description.substring(0, 200) + '...' : description;
    movieDescription.textContent = truncatedDescription;

    // Create details button
    const btn = document.createElement('button');
    btn.classList.add('hero-details-btn');
    btn.textContent = 'View Details';

    btn.addEventListener('click', () => {
        location.hash = `#movie=${trendingMovie.id}`;
        getMovieById(trendingMovie.id);
    });

    // Assemble the overlay
    contentWrapper.appendChild(movieTitle);
    contentWrapper.appendChild(movieDescription);
    contentWrapper.appendChild(btn);
    overlayContainer.appendChild(contentWrapper);

    // Add image and overlay to container
    mostTrendingContainer.appendChild(pictureElement);
    mostTrendingContainer.appendChild(overlayContainer);
}

export async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day', options);
    
    const movies = data.results;
    const trendingPreviewMoviesContainer = document.querySelector('#trending-preview .trending-now__gallery');
    
    createMovies(movies, trendingPreviewMoviesContainer, { lazy: true, clean: true });
}

export async function getCategoriesPreview() {
    const { data } = await api('genre/movie/list');
    
    const categories = data.genres;
    const previewCategoriesContainer = document.querySelector('#categories-preview .categories-gallery');

    createMovies(categories, previewCategoriesContainer, { lazy: true, clean: true });
}

export async function getMoviesByCategory(id) {
    const { data } = await api(`discover/movie?with_genres=${id}`, options);
    
    const categories = data.results;
    const categoryPreviewMoviesContainer = document.querySelector('#category-preview .category__gallery');
    maxPage = data.total_pages;
    
    createCategories(categories, categoryPreviewMoviesContainer, true); 
}

export async function getMoviesBySearch(query) {
    const { data } = await api(`search/movie?query=${query}`, options);
    
    const categories = data.results;
    const categoryPreviewMoviesContainer = document.querySelector('#query-preview .query__gallery');
    const searchPageTitle = document.querySelector('.header-search .searchPage-title');
    maxPage = data.total_pages;

    searchPageTitle.textContent = decodeURIComponent(query);

    createMovies(categories, categoryPreviewMoviesContainer, { lazy: true, clean: true }); 
}

export async function getTrendingMovies() {
    const { data } = await api('trending/movie/day', options);
    
    const movies = data.results;
    const trendsMovieContainer = document.querySelector('#trends-preview .trends__gallery');
    
    createMovies(movies, trendsMovieContainer, { lazy: true, clean: true });
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
    
    createMovies(movies, detailRelatedContainer, { lazy: true, clean: true });
}

export async function getPaginatedTrendingMovies() {
    // Better scroll detection for mobile devices
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = window.innerHeight || document.documentElement.clientHeight;
    
    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 100); // Increased threshold for mobile

    const pageIsNotMax = page < maxPage;

    if(scrollIsBottom && pageIsNotMax) {
        page++

        const { data } = await api(`trending/movie/day?page=${page}`, options);
        const movies = data.results;
        const trendsMovieContainer = document.querySelector('#trends-preview .trends__gallery');
    
        createMovies(movies, trendsMovieContainer, { lazy: true, clean: false });
    }
}

export function getPaginatedSearchedMovies(query) {
    return async function () {
        // Better scroll detection for mobile devices
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        const clientHeight = window.innerHeight || document.documentElement.clientHeight;
        
        const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 100); // Increased threshold for mobile

        const pageIsNotMax = page < maxPage;

        if(scrollIsBottom && pageIsNotMax) {
            page++

            const { data } = await api(`search/movie?query=${query}&page=${page}`, options);
            const movies = data.results;
            const categoryPreviewMoviesContainer = document.querySelector('#query-preview .query__gallery');
    
            createMovies(movies, categoryPreviewMoviesContainer, { lazy: true, clean: false });
        }
    }
}

export function getPaginatedCategoryMovies(id) {
    return async function () {
        // Better scroll detection for mobile devices
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        const clientHeight = window.innerHeight || document.documentElement.clientHeight;
        
        const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 100); // Increased threshold for mobile

        const pageIsNotMax = page < maxPage;

        if(scrollIsBottom && pageIsNotMax) {
            page++

            const { data } = await api(`discover/movie?with_genres=${id}&page=${page}`, options);
            const movies = data.results;
            const categoryPreviewMoviesContainer = document.querySelector('#category-preview .category__gallery');
    
            createCategories(movies, categoryPreviewMoviesContainer, { lazy: true, clean: false });
        }
    }
}

export function getFavoriteMovies() {
    const localStorageMovies = favoriteMovieList();
    const moviesArray = Object.values(localStorageMovies);
    const favoritePreviewMoviesContainer = document.querySelector('#liked-preview .liked__gallery');

    createMovies(moviesArray, favoritePreviewMoviesContainer, { lazy: true, clean: true });
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