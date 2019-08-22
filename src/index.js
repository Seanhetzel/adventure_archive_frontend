// Wiki thing:
// const endpoint = "https://en.wikipedia.org/w/api.php?"
// const topic = "el Mirador"
// const params = `action=parse&page=${topic}&format=json`
// URL = endpoint + params + "&origin=*"

// document.getElementById("site").textContent = json.parse.text["*"]
document.addEventListener("DOMContentLoaded", () => {
    console.log("%c DOM Content Loaded and Parsed!", "color: magenta");

    URL = "http://localhost:3000/api/v1/sites";

    fetch(URL)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            console.log(json);
            json.forEach(site => {
                renderSites(site);
            });
        });

    function renderSites(site) {
        // create site card
        const siteCard = document.createElement("div");
        siteCard.classList.add("site_card_div");

        // create site name
        const siteName = document.createElement("h2");
        siteName.textContent = site.name;
        siteCard.appendChild(siteName);

        // create site description
        const siteDescription = document.createElement("p");
        siteDescription.textContent = site.description;
        siteCard.appendChild(siteDescription);

        // create edit button for site
        const editButton = document.createElement("button");
        editButton.classList.add("site_card_button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
            renderEditForm(site, siteCard);
        });
        siteCard.appendChild(editButton);

        // create delete button for site
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("site_card_button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            fetch(`${URL}/${site.id}`, { method: "DELETE" });
            siteCard.remove();
        });
        siteCard.appendChild(deleteButton);

        // append all site nodes to site card
        document.getElementById("sites_div").appendChild(siteCard);
    }

    // create edit form for site
    function renderEditForm(site, siteCard) {
        const editForm = document.createElement("form");

        const siteName = document.createElement("input");
        siteName.textContent = site.name;
        editForm.appendChild(siteName);

        const siteDescription = document.createElement("input");
        siteDescription.textContent = site.description;
        editForm.appendChild(siteDescription);

        const submitButton = document.createElement("button");
        submitButton.classList.add("edit_site_submit_button");
        submitButton.textContent = "Done";
        editForm.appendChild(submitButton);

        document.getElementById("sites_div").appendChild(editForm);
        siteCard.appendChild(editForm);

        editForm.addEventListener("submit", event => {
            event.preventDefault();
            fetch(`${URL}/${site.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    name: event.target[0].value, // update name do database
                    description: event.target[1].value // update description do database
                })
            })
                .then(response => response.json())
                .then(siteObj => {
                    renderSites(siteObj);
                });

            editForm.reset();
        });
    }

    // add_site_form event listener to addSite
    document
        .getElementById("add_site_div")
        .addEventListener("submit", event => {
            event.preventDefault();
            formData = {
                name: event.target[0].value, // name
                description: event.target[1].value // description
            };
            addSite(formData);
            document.getElementById("add_site_form").reset(); // reset form
        });

    // fetch POST to send form data from add_site_form to database
    function addSite(SiteData) {
        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                name: SiteData.name, // save name do database
                description: SiteData.description // save description do database
            })
        })
            .then(response => response.json())
            .then(siteObj => {
                renderSites(siteObj);
                console.log(siteObj);
            });
    }
});
