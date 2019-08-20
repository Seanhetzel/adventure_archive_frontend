document.addEventListener("DOMContentLoaded", () => {
    console.log("%c DOM Content Loaded and Parsed!", "color: magenta");

// const endpoint = "https://commons.wikimedia.org/w/api.php?"
const endpoint = "https://en.wikipedia.org/w/api.php?"
// const endpoint = "https://en.wikipedia.org/wiki/"
// const params = "action=query&list=allimages&ailimit=3&format=json"
// const params = "action=parse&prop=text&titles=egypt&format=json"
// const params = "action=parse&text={{egypt}}&title=egypt&format=json"
// const params = "action=parse&page=Project:Sandbox"
// const params = "action=query&prop=extracts&exchars=12&titles=egypt&format=json"
// const params = "action=query&prop=revisions&rvlimit=1&rvprop=content&format=json&titles=egypt"
// const params = "El_Mirador&format=json"
// const params = "action=parse&page=El_Mirador&format=json"
const topic = "el Mirador"
const params = `action=parse&page=${topic}&format=json`
URL = endpoint + params + "&origin=*"

// URL = "https://commons.wikimedia.org/w/api.php?action=query&list=allimages&ailimit=3&format=json&origin=*"


    fetch(URL)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            renderSites(json);
        });

    function renderSites(json){
        document.getElementById("site").textContent = json.parse.text["*"]
        console.log(json)
    }
});
