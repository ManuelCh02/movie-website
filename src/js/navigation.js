// Here's where the logic of singly linked list data structure will work
import { homePage } from "./views.js"
import { movieDetails } from "./views.js"

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
}

const myStack = new Stack();
myStack.push(homePage());

console.log(myStack.peek())
console.log(typeof myStack.peek())

appParent.appendChild(myStack.peek().value);


const detailBtn = document.querySelector('.container-top__details-btn');
const body = document.querySelector('body');

detailBtn.addEventListener('click', () => {
    const movieDetail = movieDetails();
    appParent.innerHTML = ``;
    appParent.appendChild(movieDetail);
})