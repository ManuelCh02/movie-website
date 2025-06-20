// Here's where the logic of singly linked list data structure will work
// import { homePage } from "./views.js"
// import { movieDetails } from "./views.js"
// import { seeAllTrending } from "./views.js"
// import { seAllLatest } from "./views.js"
// import { seeAllUpcoming } from "./views.js"

// const appParent = document.getElementById('app');

// class Node {
//     constructor(value) {
//         this.value = value
//         this.next = null
//     }
// }

// class Stack {
//     constructor() {
//         this.top = null
//         this.bottom = null
//         this.length = 0
//     }

//     peek() {
//         return this.top
//     }

//     push(value) {
//         const newNode = new Node(value)
//         if(this.length === 0) {
//             this.top = newNode
//             this.bottom = newNode
//         } else {
//             const holdingPointer = this.top
//             this.top = newNode
//             this.top.next = holdingPointer
//         }

//         this.length++
//         return this
//     }

//     pop() {
//         const pointer = this.top
//         this.top = pointer.next
//         this.length--
//         return this
//     }
// }

// const myStack = new Stack();

// if(!myStack.length) {
//     myStack.push(homePage());
//     appParent.appendChild(myStack.peek().value);
// }

// document.body.addEventListener('click', (e) => {
//     if(e.target.matches('.container-top__details-btn')) {
//         updateAppContent(movieDetails());
//     }

//     if(e.target.matches('.container__return-button') || e.target.matches('.fa-less-than')) {
//         returnAppContent();
//     }

//     if(e.target.matches('.trending-now-see-all')) {
//         updateAppContent(seeAllTrending());
//     }

//     if(e.target.matches('.latest-see-all')) {
//         updateAppContent(seAllLatest());
//     }

//     if(e.target.matches('.upcoming-see-all')) {
//         updateAppContent(seeAllUpcoming());
//     }

//     if(e.target.matches('.movie-img')) {
//         updateAppContent(movieDetails())
//     }
// })

// function updateAppContent(nodeContent) {
//     myStack.push(nodeContent);
//     appParent.innerHTML = ''
//     appParent.appendChild(myStack.peek().value);
// }

// function returnAppContent() {
//     myStack.pop();
//     appParent.innerHTML = '';
//     appParent.appendChild(myStack.peek().value);
// }

import { getTrendingMoviesPreview } from "./main.js";
import { getCategoriesPreview } from "./main.js";
import { sections } from './views.js'

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('haschange', navigator, false);

function navigator() {
    console.log({ location });

    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage();
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
        homePage();
    }
    location.hash
}

function homePage() {
    console.log('HOME!');

    // sections.homePageHeader.classList.add('header-container');
    // sections.mainHomePage.classList.add('main-homePage');

    sections.allHeaders.forEach((header) => {
        if(!header.classList.contains('header-container')) {
            header.classList.add('inactive');
        }
    })

    sections.allMainElements.forEach((main) => {
        if(!main.classList.contains('main-homePage')) {
            main.classList.add('inactive');
        }
    })

    getTrendingMoviesPreview();
    getCategoriesPreview();
}

function categoriesPage() {
    console.log('CATEGORIES!')

    sections.allHeaders.forEach((header) => {
        if(!header.classList.contains('header-category')) {
            header.classList.add('inactive');
        }
    })

    sections.allMainElements.forEach((main) => {
        if(!main.classList.contains('main-category')) {
            main.classList.add('inactive');
        }
    })
}

function movieDetailsPage() {
    console.log('MOVIE!')

    sections.allHeaders.forEach((header) => {
        if(!header.classList.contains('header-details')) {
            header.classList.add('inactive');
        }
    })

    sections.allMainElements.forEach((main) => {
        if(!main.classList.contains('main-movieDetails')) {
            main.classList.add('inactive');
        }
    })
}

function searchPage() {
    console.log('SEARCH!')
}

function trendsPage() {
    console.log('TRENDS!')

    sections.allHeaders.forEach((header) => {
        if(!header.classList.contains('header-trends')) {
            header.classList.add('inactive');
        }
    })

    sections.allMainElements.forEach((main) => {
        if(!main.classList.contains('main-trends')) {
            main.classList.add('inactive');
        }
    })
}