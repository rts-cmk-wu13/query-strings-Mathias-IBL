console.log(window.location);

let params = new URLSearchParams(window.location.search);
let id = params.get("id");
console.log(id);

fetch("/data/destinations.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let destiSection = document.querySelector(".destination__choice");
        let listElm = document.createElement("ul");

        data.destinations.forEach(destination => {
            let listItem = document.createElement("li");
            listItem.innerHTML = `
                <img src="${destination.image}">
                <h3>${destination.title}</h3>
                <p>${destination.subtitle}</p>
                ${`<a href="details.html?id=${destination.id}">MORE</a>`}
            `;
            listElm.appendChild(listItem);
        });

        destiSection.appendChild(listElm);
    });
