const loaded = async () => {
    try {
        const api = await fetch("https://images-api.nasa.gov/search?q=sun");
        const data = await api.json();
        console.log(data);

        let searchBar = document.getElementById("searchBar");
        searchBar.addEventListener("input", (e) => {
            const searchTerm = e.target.value;

            const filteredResults = data.collection.items.filter(item =>
                item.data[0].description.includes(searchTerm)
            );

            display(filteredResults);
        });

        display(data.collection.items);

    } catch (err) {
        console.error(err);
    }
};

const display = (results) => {
    const list = document.getElementById("lis");
    list.innerHTML = "";

    const items = results.map(resultItem => {
        const div = document.createElement("div");
        div.className = "divi";
        const img = document.createElement("img");
        img.className = "imgg";
        const par = document.createElement("p");
        par.className = "title";
        const parTwo = document.createElement("p");
        parTwo.className = "part";
        par.innerHTML = resultItem.data[0].title;
        img.src = resultItem.links[0].href;
        parTwo.innerHTML = resultItem.data[0].description;
        div.appendChild(img);
        div.appendChild(par);
        div.appendChild(parTwo);
        return div;
    });

    list.append(...items);

    console.log(results);
};

loaded();
