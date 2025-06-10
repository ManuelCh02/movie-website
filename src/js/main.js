import { API_KEY } from "../sec.js";

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