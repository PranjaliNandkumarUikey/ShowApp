const input = document.getElementById("name");
const button = document.getElementById("btn");
const show = document.getElementById("output");

button.addEventListener("click", () => {
    fetch(`https://api.tvmaze.com/search/shows?q=${input.value}`)
    // fetch(`https://api.tvmaze.com/singlesearch/shows?q=${input.value}`)
    .then(response => response.json())
    .then(result => {
        display(result);
    })
});

function display(shows) {
    show.innerHTML = '';
    if (shows.length === 0) {
        return;
    }
    shows.forEach(item => {
        const showDiv = document.createElement('div');
        let title = item.show.name;
        let year;
        if (item.show.premiered) {
          year = new Date(item.show.premiered).getFullYear();
        }
        fetch(`https://api.tvmaze.com/shows/${item.show.id}/cast`)
        .then(response => response.json())
        .then(cast => {
            const castNames = cast.map(actor => actor.person.name).join(', ');
            const description = item.show.summary;
            showDiv.innerHTML = `
                <h3>${title} (${year})</h3>
                <img src="${item.show.image?.medium}" alt="${title}">
                <p>Actors: ${castNames}</p>
                <button class="show-description">Show Description</button>
                <div class="description" style="display:none">${description}</div>
            `;
            show.appendChild(showDiv);
            const descriptionButton = showDiv.querySelector('.show-description');
            const descriptionDiv = showDiv.querySelector('.description');
            descriptionButton.addEventListener('click', () => {
                if (descriptionDiv.style.display === 'none') 
                     {
                    descriptionDiv.style.display = 'block';
                    descriptionButton.textContent = 'Hide Description';
                } else {
                    descriptionDiv.style.display = 'none';
                    descriptionButton.textContent = 'Show Description';
                }
            });
        })
    });
}
