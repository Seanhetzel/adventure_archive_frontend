document.addEventListener("DOMContentLoaded", () => {
    console.log("%c DOM Content Loaded and Parsed!", "color: magenta");

// Wiki thing:
// const endpoint = "https://en.wikipedia.org/w/api.php?"
// const topic = "el Mirador"
// const params = `action=parse&page=${topic}&format=json`
// URL = endpoint + params + "&origin=*"

// document.getElementById("site").textContent = json.parse.text["*"]


URL = "http://localhost:3000/api/v1/sites"

    fetch(URL)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            console.log(json)
            renderSites(json);
        });

    function renderSites(json){
        document.getElementById("site").textContent = json[0].name
        document.getElementById("site").textContent = json[0].description

        console.log(json)
    }
});
