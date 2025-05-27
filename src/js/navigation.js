// Here's where the logic of singly linked list data structure will work
import { homePage } from "./views.js"
import { movieDetails } from "./views.js"
import { seeAllTrending } from "./views.js"
import { seAllLatest } from "./views.js"
import { seeAllUpcoming } from "./views.js"
import { searchMovieById } from "./main.js"

const appParent = document.getElementById('app');

class Node {
    constructor(value) {
        this.value = value
        this.next = null
    }
}

class Stack {
    constructor() {
        this.top = null
        this.bottom = null
        this.length = 0
    }

    peek() {
        return this.top
    }

    push(value) {
        const newNode = new Node(value)
        if(this.length === 0) {
            this.top = newNode
            this.bottom = newNode
        } else {
            const holdingPointer = this.top
            this.top = newNode
            this.top.next = holdingPointer
        }

        this.length++
        return this
    }

    pop() {
        const pointer = this.top
        this.top = pointer.next
        this.length--
        return this
    }
}

const myStack = new Stack();

async function loadHomePage() {
    const initialLoadingPage = await homePage()

    if(!myStack.length) {
    myStack.push(initialLoadingPage);
    appParent.appendChild(myStack.peek().value);
    }
}

loadHomePage()

document.body.addEventListener('click', (e) => {
    if(e.target.matches('.container-top__details-btn')) {
        updateAppContent(movieDetails());
    }

    if(e.target.matches('.container__return-button') || e.target.matches('.fa-less-than')) {
        returnAppContent();
    }

    if(e.target.matches('.trending-now-see-all')) {
        updateAppContent(seeAllTrending());
    }

    if(e.target.matches('.latest-see-all')) {
        updateAppContent(seAllLatest());
    }

    if(e.target.matches('.upcoming-see-all')) {
        updateAppContent(seeAllUpcoming());
    }

    if(e.target.matches('.movie-img')) {
        updateAppContent(movieDetails())
        const movieImg = e.target;
        const getMovieId = movieImg.id;
        searchMovieById(getMovieId);
    }
})

function updateAppContent(nodeContent) {
    myStack.push(nodeContent);
    appParent.innerHTML = ''
    appParent.appendChild(myStack.peek().value);
}

function returnAppContent() {
    myStack.pop();
    appParent.innerHTML = '';
    appParent.appendChild(myStack.peek().value);
}
