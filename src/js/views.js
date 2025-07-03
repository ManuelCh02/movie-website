<<<<<<< HEAD
// Here's where we'll render all views dynamically
import { getMostTrending } from "./main.js";
import { createTrendingList } from "./main.js";
import { getMovieDetailContent } from "./main.js";

let detailData = async () => {
    return await getMovieDetailContent();
};

export async function homePage() {
    const posterPath = await getMostTrending();
    createTrendingList()
    const homePage = document.createElement('div');
    homePage.innerHTML = 
    `
        <header id="header" class="header-container">
            <h1>Movie Static</h1>

            <form id="search-form">
                <input type="text" class="search-form--inactive" placeholder="Deadpool">
                <button class="search-form__button">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
        </header>
    
        <main>
            <section id="ultimate-trending-hero" class="trending-top">
                <div class="trending-top__container-top">
                    <img src="https://image.tmdb.org/t/p/w440_and_h660_face${posterPath}" class="img-top-trend">
                    <button class="container-top__details-btn">Details</button>
                </div>
            </section>

            <div id="movies-ultra-section" class="main-movies-gallery">
                <section id="trending-now" class="trending-now">
                    <div class="trending-now__title-container">
                        <h2>Trending Now</h2>
                        <a href="#" class="trending-now-see-all">See all</a>
                    </div>

                    <article class="trending-now__movies-container">
                        <div class="movies-container__gallery trending-img-container">
                            
                        </div>    
                    </article>
                </section>

                <section id="latest" class="latest-movies">
                    <div class="latest-movies__title-container">
                        <h2>Now Playing</h2>
                        <a href="#" class="latest-see-all">See all</a>
                    </div>

                    <article class="latest-movies__movies-container">
                        <div class="movies-container__gallery nowPlaying-img-container">
                            
                        </div>
                    </article>
                </section>

                <section id="upcoming" class="upcoming-movies">
                    <div class="upcoming-moves__title-container">
                        <h2>Upcoming</h2>
                        <a href="#" class="upcoming-see-all">See all</a>
                    </div>

                    <article class="upcoming-movies__container">
                        <div class="movies-container__gallery upcoming-img-container">
                            
                        </div>
                    </article>
                </section>
            </div>
        </main>
    `;
    
    return homePage
}

export async function movieDetails(data) {
    const movieDetail = document.createElement('div');
    movieDetail.innerHTML = 
    `
    <header class="header-details">
        <div class="header-details__container">
            <button class="container__return-button"><i class="fa-solid fa-less-than"></i></button>
            <h3>Detail</h3>
            <div></div>
        </div>
    </header>

    <main>
        <section class="detail-container">
            <img src="https://www.themoviedb.org/t/p/w1280${data.img}" class="detail-container__main-img">
            <div class="detail-container__titles">
                <span class="titles__type">SERIES</span>
                <h1>${data.title}</h1>
                <ul class="titles__categories">
                    <li>Action</li>
                    <li>Romance</li>
                    <li>Adventure</li>
                    <li>Horror</li>
                </ul>
            </div>
            <p class="detail-container__synopsis">
                ${data.overview}
            </p>
            <div class="detail-container__movie-data">
                <ul class="movie-data__list">
                    <li>⭐ 8.8</li>
                    <li>2025</li>
                    <li>50min</li>
                </ul>
            </div>
        </section>
    </main>
    `;

    return movieDetail
}

export function seeAllTrending() {
    const movieTrending = document.createElement('div');
    movieTrending.classList.add('see-all-trending');
    movieTrending.innerHTML = 
    `
    <header class="header-details">
        <div class="header-details__container">
            <button class="container__return-button"><i class="fa-solid fa-less-than"></i></button>
            <h3>Trending Now</h3>
            <div></div>
        </div>
    </header>

    <main>
        <section class="gallery trending-see-all-gallery">
            
        </section>
    </main>
    `;

    return movieTrending
}

export function seeAllPlaying() {
    const movieLatest = document.createElement('div');
    movieLatest.innerHTML = 
    `
    <header class="header-details">
        <div class="header-details__container">
            <button class="container__return-button"><i class="fa-solid fa-less-than"></i></button>
            <h3>Now Playing</h3>
            <div></div>
        </div>
    </header>
    
    <main>
        <section class="gallery now-playing-gallery">
           
        </section>
    </main>
    `;

    return movieLatest
}

export function seeAllUpcoming() {
    const movieUpcoming = document.createElement('div');
    movieUpcoming.innerHTML = 
    `
    <header class="header-details">
        <div class="header-details__container">
            <button class="container__return-button"><i class="fa-solid fa-less-than"></i></button>
            <h3>Upcoming Movies</h3>
            <div></div>
        </div>
    </header>

    <main>
        <section class="gallery upcoming-gallery">
            
        </section>
    </main>
    `;

    return movieUpcoming
}

=======
export const sections = {
    allHeaders: document.querySelectorAll('header'),
    allMainElements: document.querySelectorAll('#main-element'),
    homePageDetails: document.querySelector('.header-details'),
}
>>>>>>> platzi-fetch
