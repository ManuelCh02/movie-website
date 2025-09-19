# Movie Website

A responsive web application that allows users to browse, search, and favorite movies using [The Movie Database (TMDb) API](https://www.themoviedb.org/documentation/api). The project features UI patterns, skeleton loading, view transitions, and persistent favorites using `localStorage`.

## Features

- **Trending Movies:** View the latest trending movies.
- **Categories:** Browse movies by category.
- **Search:** Find movies by title.
- **Movie Details:** See detailed information for each movie.
- **Favorites:** Mark movies as favorites and view your liked movies.
- **Skeleton Loading:** Smooth loading experience with animated skeletons.
- **View Transitions:** Animated transitions between movie images.
- **Responsive Design:** Works on desktop and mobile devices.
- **Infinite Scroll:** Load more movies as you scroll.
- **Persistent Favorites:** Favorites are saved in `localStorage`.

## Technologies

- **HTML5 & CSS3:** Semantic markup and modern styles.
- **JavaScript (ES6+):** Modular code with event-driven navigation.
- **TMDb API:** Fetches movie data.
- **Intersection Observer:** Lazy loads images for performance.
- **LocalStorage:** Persists user favorites.
- **Font Awesome:** Icons for UI elements.

## Project Structure

```
movie-website/
├── index.html
├── styles/
│   └── main.css
├── src/
│   └── js/
│       ├── main.js
│       ├── navigation.js
│       └── views.js
└── README.md
```

## Setup & Usage

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/movie-website.git
   cd movie-website
   ```

2. **Add your TMDb API Key:**
   - In `main.js`, replace `API_KEY` with your TMDb API key.

3. **Run locally:**
   - Use [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code or any static server.
   - Open `index.html` in your browser.

## Customization

- **Change Theme:** Edit CSS variables in `main.css`.
- **Add More Features:** Extend JS modules for new API endpoints or UI components.

## Contributing

Pull requests and issues are welcome! Please open an issue for bugs or feature requests.

## License

MIT License

---