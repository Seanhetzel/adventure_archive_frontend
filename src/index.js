// Wiki thing:
// const endpoint = "https://en.wikipedia.org/w/api.php?"
// const topic = "el Mirador"
// const params = `action=parse&page=${topic}&format=json`
// URL = endpoint + params + "&origin=*"

// document.getElementById("site").textContent = json.parse.text["*"]
document.addEventListener("DOMContentLoaded", () => {
    console.log("%c DOM Content Loaded and Parsed!", "color: magenta");

    // endpoint
    URL = "http://localhost:3000/api/v1/sites";

    // fetches all sites from database on page load
    fetch(URL)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            console.log(json);
            json.forEach(site => {
                document.getElementById("sites_div").prepend(renderSite(site));
            });
        });

    // renders sites
    function renderSite(site) {
        // create site card
        const siteCard = document.createElement("div");
        siteCard.classList.add("site_card_div");

        siteCard.id = site.id

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
            editButton.style.display = "none"
            deleteButton.style.display = "none"
            siteName.style.display = "none"
            siteDescription.style.display = "none"
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
        console.log(siteCard)
        return siteCard
    }

    // create edit form for site when user hits edit button
    function renderEditForm(site, siteCard) {
        const editForm = document.createElement("form");

        // create site name input
        const siteName = document.createElement("input");
        siteName.value = site.name;
        editForm.appendChild(siteName);

        // create side description input
        const siteDescription = document.createElement("input");
        siteDescription.value = site.description;
        editForm.appendChild(siteDescription);

        // create submit button input
        const submitButton = document.createElement("button");
        submitButton.classList.add("edit_site_submit_button");
        submitButton.textContent = "Done";
        editForm.appendChild(submitButton);

        // append edit form to site card
        siteCard.appendChild(editForm);

        // add event listener when form is submitted to update
        editForm.addEventListener("submit", event => {
            event.preventDefault();
            editFormFetch(event, site);
            editForm.reset();
        });
    }

    // fetch PATCH to update site
    function editFormFetch(event, site) {
        fetch(`${URL}/${site.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                name: event.target[0].value, // update name to database
                description: event.target[1].value // update desc to db
            })
        })
            .then(response => response.json())
            .then(siteObj => {
                console.log(siteObj)
                document.getElementById(site.id).replaceWith(renderSite(siteObj))
                
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
                name: SiteData.name, // save name to database
                description: SiteData.description // save description to db
            })
        })
            .then(response => response.json())
            .then(siteObj => {
                renderSite(siteObj);
                console.log(siteObj);
            });
    }
});
