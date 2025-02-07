console.log(window.location);

let params = new URLSearchParams(window.location.search);
let id = params.get("id");
console.log(id);

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
            let divItem = document.createElement("div");
            divItem.classList.add("destination__details--item");
            divItem.innerHTML = `
                    <img class="main__img" src="${destination.image}">
                <div class="destination__details--text">
                    <img class="heart__img" src="${'img/heart.png'}" alt="">
                    ${`<a href="details.html?id=${destination.id}">MORE</a>`}
                </div>
            `;
            divElm.append(divItem);
        });

        destiSection.append(divElm);
    });
