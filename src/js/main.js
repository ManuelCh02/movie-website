// import { API_KEY } from "../sec";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer' + API_KEY,
    }
}

async function getTrendingMoviesPreview() {
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day', options);
    const data = await res.json();
    
    // const movies = data.results;
    console.log({ data })
}

getTrendingMoviesPreview();