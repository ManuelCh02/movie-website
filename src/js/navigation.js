// Here's where the logic of singly linked list data structure will work
import { movieDetails } from "./views.js"

class Node {
    constructor(value) {
        this.value = value
        this.next = null
    }
}

class Stack {
    constructor(value) {
        this.top = null
        this.bottom = value
        this.length = 0
    }
}

const detailBtn = document.querySelector('.container-top__details-btn');
const body = document.querySelector('body');

detailBtn.addEventListener('click', () => {
    console.log('button works');
    const movieDetail = movieDetails();
    console.log(movieDetail)
    body.append(movieDetail)
})