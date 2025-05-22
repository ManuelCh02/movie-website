// Here's where we'll render all views dynamically
export function movieDetails() {
    const body = document.createElement('section');
    body.innerHTML = 
    `
    <header>
        <div>
            <button>&lt;</button>
            <span>Detail</span>
        </div>
    </header>

    <main>
        <section>
            <img src="https://media.themoviedb.org/t/p/w440_and_h660_face/6WxhEvFsauuACfv8HyoVX6mZKFj.jpg">
            <div>
                <span>SERIES</span>
                <h1>The Last Of Us 2</h1>
                <ul>
                    <li>Action</li>
                    <li>Romance</li>
                    <li>Adventure</li>
                    <li>Horror</li>
                </ul>
            </div>
            <p>
                After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope.
            </p>
            <div>
                <ul>
                    <li>⭐ 8.8</li>
                    <li>2025</li>
                    <li>50min</li>
                </ul>
            </div>
        </section>
    </main>
    `;

    return body
}