// Here's where we'll render all views dynamically
export function homePage() {
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
                    <img src="https://www.themoviedb.org/t/p/w1280/dmo6TYuuJgaYinXBPjrgG9mB5od.jpg" alt="The last of us season 2" class="img-top-trend">
                    <button class="container-top__details-btn">Details</button>
                </div>
            </section>

            <div id="trending-preview" class="main-movies-gallery">
                <section id="trending-now" class="trending-now">
                    <div class="trending-now__title-container">
                        <h2>Trending Now</h2>
                        <a href="#" class="trending-now-see-all">See all</a>
                    </div>

                    <article class="trending-now__movies-container">
                        <div class="movies-container__gallery trending-now__gallery">
                            
                        </div>    
                    </article>
                </section>

                <section id="latest" class="latest-movies">
                    <div class="latest-movies__title-container">
                        <h2>Latest</h2>
                        <a href="#" class="latest-see-all">See all</a>
                    </div>

                    <article class="latest-movies__movies-container">
                        <div class="movies-container__gallery">
                            <div class="movie-container">
                                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/yFHHfHcUgGAxziP1C3lLt0q2T4s.jpg" alt="A minecraft movie" class="movie-img">
                            </div>

                            <div class="movie-container">
                                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg" alt="Mission:Impossible the final reckoning" class="movie-img">
                            </div>

                            <div class="movie-container">
                                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/khZqmwHQicTYoS7Flreb9EddFZC.jpg" alt="Andor" class="movie-img">
                            </div>

                            <div class="movie-container">
                                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/khZqmwHQicTYoS7Flreb9EddFZC.jpg" alt="Andor" class="movie-img">
                            </div>
                        </div>
                    </article>
                </section>

                <section id="upcoming" class="upcoming-movies">
                    <div class="upcoming-moves__title-container">
                        <h2>Upcoming</h2>
                        <a href="#" class="upcoming-see-all">See all</a>
                    </div>

                    <article class="upcoming-movies__container">
                        <div class="movies-container__gallery">
                            <div class="movie-container">
                                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/mIKfKo2uDk3itzAPYIcSeYr4KtF.jpg" alt="Lilo & Stitch" class="movie-img">
                            </div>

                            <div class="movie-container">
                                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/jYfMTSiFFK7ffbY2lay4zyvTkEk.jpg" alt="Sinners" class="movie-img">
                            </div>

                            <div class="movie-container">
                                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/asDqvkE66EegtKJJXIRhBJPxscr.jpg" alt="Love, Death & Robots" class="movie-img">
                            </div>

                            <div class="movie-container">
                                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/asDqvkE66EegtKJJXIRhBJPxscr.jpg" alt="Love, Death & Robots" class="movie-img">
                            </div>
                        </div>
                    </article>
                </section>
            </div>
        </main>
    `;
    
    return homePage
}

export function movieDetails() {
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
            <img src="https://www.themoviedb.org/t/p/w1280/dmo6TYuuJgaYinXBPjrgG9mB5od.jpg" class="detail-container__main-img">
            <div class="detail-container__titles">
                <span class="titles__type">SERIES</span>
                <h1>The Last Of Us 2</h1>
                <ul class="titles__categories">
                    <li>Action</li>
                    <li>Romance</li>
                    <li>Adventure</li>
                    <li>Horror</li>
                </ul>
            </div>
            <p class="detail-container__synopsis">
                After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope.
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
        <section class="gallery">
            <div class="gallery-container">
                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/mIKfKo2uDk3itzAPYIcSeYr4KtF.jpg" class="movie-img">
            </div>

            <div class="gallery-container">
                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/mIKfKo2uDk3itzAPYIcSeYr4KtF.jpg" class="movie-img">
            </div>

            <div class="gallery-container">
                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/mIKfKo2uDk3itzAPYIcSeYr4KtF.jpg" class="movie-img">
            </div>

            <div class="gallery-container">
                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/mIKfKo2uDk3itzAPYIcSeYr4KtF.jpg" class="movie-img">
            </div>

            <div class="gallery-container">
                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/mIKfKo2uDk3itzAPYIcSeYr4KtF.jpg" class="movie-img">
            </div>

            <div class="gallery-container">
                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/mIKfKo2uDk3itzAPYIcSeYr4KtF.jpg" class="movie-img">
            </div>

            <div class="gallery-container">
                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/mIKfKo2uDk3itzAPYIcSeYr4KtF.jpg" class="movie-img">
            </div>

            <div class="gallery-container">
                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/mIKfKo2uDk3itzAPYIcSeYr4KtF.jpg" class="movie-img">
            </div>

            <div class="gallery-container">
                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/mIKfKo2uDk3itzAPYIcSeYr4KtF.jpg" class="movie-img">
            </div>
        </section>
    </main>
    `;

    return movieTrending
}

export function seAllLatest() {
    const movieLatest = document.createElement('div');
    movieLatest.innerHTML = 
    `
    <header class="header-details">
        <div class="header-details__container">
            <button class="container__return-button"><i class="fa-solid fa-less-than"></i></button>
            <h3>Latests Movies</h3>
            <div></div>
        </div>
    </header>
    
    <main>
        <section class="gallery">
            <div class="gallery-container">
                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/mIKfKo2uDk3itzAPYIcSeYr4KtF.jpg" class="movie-img">
            </div>

            <div class="gallery-container">
                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/mIKfKo2uDk3itzAPYIcSeYr4KtF.jpg" class="movie-img">
            </div>

            <div class="gallery-container">
                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/mIKfKo2uDk3itzAPYIcSeYr4KtF.jpg" class="movie-img">
            </div>

            <div class="gallery-container">
                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/mIKfKo2uDk3itzAPYIcSeYr4KtF.jpg" class="movie-img">
            </div>

            <div class="gallery-container">
                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/mIKfKo2uDk3itzAPYIcSeYr4KtF.jpg" class="movie-img">
            </div>

            <div class="gallery-container">
                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/mIKfKo2uDk3itzAPYIcSeYr4KtF.jpg" class="movie-img">
            </div>

            <div class="gallery-container">
                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/mIKfKo2uDk3itzAPYIcSeYr4KtF.jpg" class="movie-img">
            </div>

            <div class="gallery-container">
                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/mIKfKo2uDk3itzAPYIcSeYr4KtF.jpg" class="movie-img">
            </div>

            <div class="gallery-container">
                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/mIKfKo2uDk3itzAPYIcSeYr4KtF.jpg" class="movie-img">
            </div>
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
        <section class="gallery">
            <div class="gallery-container">
                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/mIKfKo2uDk3itzAPYIcSeYr4KtF.jpg" class="movie-img">
            </div>

            <div class="gallery-container">
                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/mIKfKo2uDk3itzAPYIcSeYr4KtF.jpg" class="movie-img">
            </div>

            <div class="gallery-container">
                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/mIKfKo2uDk3itzAPYIcSeYr4KtF.jpg" class="movie-img">
            </div>

            <div class="gallery-container">
                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/mIKfKo2uDk3itzAPYIcSeYr4KtF.jpg" class="movie-img">
            </div>

            <div class="gallery-container">
                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/mIKfKo2uDk3itzAPYIcSeYr4KtF.jpg" class="movie-img">
            </div>

            <div class="gallery-container">
                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/mIKfKo2uDk3itzAPYIcSeYr4KtF.jpg" class="movie-img">
            </div>

            <div class="gallery-container">
                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/mIKfKo2uDk3itzAPYIcSeYr4KtF.jpg" class="movie-img">
            </div>

            <div class="gallery-container">
                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/mIKfKo2uDk3itzAPYIcSeYr4KtF.jpg" class="movie-img">
            </div>

            <div class="gallery-container">
                <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/mIKfKo2uDk3itzAPYIcSeYr4KtF.jpg" class="movie-img">
            </div>
        </section>
    </main>
    `;

    return movieUpcoming
}