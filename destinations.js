  
console.log(window.location);

let params = new URLSearchParams(window.location.search);
let id = params.get("id");
console.log(id);


let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

fetch("/data/destinations.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        
        let destiSection = document.querySelector(".destination__choice");
        destiSection.classList.add("destination__choice--details");
        destiSection.innerHTML = `<h1>Apartments</h1>`;
        
        let divElm = document.createElement("div");
        divElm.classList.add("destination__details");

        data.destinations.forEach(destination => {
            if (id && destination.id !== id) return;

            let divItem = document.createElement("div");
            divItem.classList.add("destination__details--item");
            divItem.innerHTML = `
                <img width="200" class="main__img" src="${destination.image}">
                <div class="destination__details--text">
                    <button class="heart" data-id="${destination.id}">
                        <i class="bi bi-bookmark-heart"></i>
                    </button>
                    <a href="details.html?id=${destination.id}">MORE</a>
                </div>
            `;

            divElm.append(divItem);
        });

        destiSection.append(divElm);

        document.querySelectorAll(".heart").forEach((heart) => {
            let heartId = heart.dataset.id;
            if (favorites.includes(heartId)) {
                heart.classList.add("favorite");
            }
        });
    });

document.querySelector(".destination__choice").addEventListener("click", (event) => {
    if (event.target.closest(".heart")) {
        let heart = event.target.closest(".heart");
        let heartId = heart.dataset.id;

        heart.classList.toggle("favorite");

        if (favorites.includes(heartId)) {
            favorites = favorites.filter((id) => id !== heartId);
        } else {
            favorites.push(heartId);
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));

        console.log("Updated favorites:", favorites);
    }
});
