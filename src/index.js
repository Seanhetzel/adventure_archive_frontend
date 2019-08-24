// Wiki thing:
// const endpoint = "https://en.wikipedia.org/w/api.php?"
// const topic = "el Mirador"
// const params = `action=parse&page=${topic}&format=json`
// BASE_URL = endpoint + params + "&origin=*"

// document.getElementById("site").textContent = json.parse.text["*"]
document.addEventListener("DOMContentLoaded", () => {
    console.log("%c DOM Content Loaded and Parsed!", "color: magenta");

    // URLs
    BASE_URL = "http://localhost:3000/api/v1/"; // base URL
    SITES = "/sites"; // sites resource
    USERS = "/users"; // users resource

    // set starting background image
    document.body.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1554322662-abedea4ed292?ixlib=rb-1.2.1&auto=format&fit=crop&w=2890&q=80')";

    // set starting summary
    document.getElementById("summary").textContent = "Discover Lost Worlds";

    // set starting image location
    document.getElementById("image_location").textContent = "Lost city of Petra, Jordan";

    // Explore button for backround image and summary
    const background_url = [
        "https://images.unsplash.com/photo-1544642058-c5d172ab955c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80", // Bali, Indonesia
        "https://images.unsplash.com/photo-1562679299-266edbefd6d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80", // giza pyramids
        "https://images.unsplash.com/photo-1510074232337-05d50fa189ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", // chiang mai thailand
        "https://www.nationalgeographic.com/content/dam/news/2018/02/01/lidar-maya/02-lidar-maya.jpg", // lost mayan city of el mirador
        "https://www.visitmexico.com/viajemospormexico/assets/uploads/actividades/actividades-principales_campeche_campeche_una-aventura-por-la-selva-de-calakmul_01.jpg", // Maya city of Tikal in Guatemala.
        "https://mydivepro.com/wp-content/uploads/2019/07/7iEkH2.jpg", // cenote near Tulum - the ancient Mayan city in the Yucatan Peninsula , Mexico.
        "http://www.planetcustodian.com/wp-content/uploads/2017/03/photographer-ira-meyer-antarctica-photo-collection-3.jpg", // antarctica
        "https://images.unsplash.com/photo-1526590776442-5541f7dcf2c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjI0MX0&auto=format&fit=crop&w=1948&q=80", // Underwater River Flows Through Cenote Along Mexico's Ocean Floor
        "https://www.tah-heetch.com/wp-content/uploads/get130/98/60-best-free-arizona-desert-wallpapers-wallpaperaccess.jpg", // tucson
        "http://s1.1zoom.me/b5050/792/Grand_Canyon_Park_USA_Parks_Crag_514944_2560x1440.jpg", // monument vally
        "https://us-east.manta.joyent.com/condenast/public/cnt-services/production/2015/12/30/568420d667dc82253d9f5ac6_CaveofSwallows-CourtesyVisitMexico.jpg" // Cave of Swallows, Mexico
    ];

    const summary = [
        "Explore The Unknown",
        "Lost In Time",
        "Go Where Few Have Gone Before",
        "Adventure Awaits",
        "placeholder",
        "placeholder",
        "placeholder",
        "placeholder",
        "placeholder",
        "placeholder",
        "placeholder"
    ];

    const location = [
        "Bali, Indonesia",
        "Great Sphinx of Giza, Egypt",
        "Chiang Mai, Thailand",
        "Lost Mayan City of El Mirador, Guatemala",
        "Lost Mayan City of Tikal, Guatemala",
        "Cenote Near Tulum, Mexico",
        "Antarctica",
        "Jellyfish, Ocean Deep",
        "Tucson, Arizona",
        "Monument Valley, USA",
        "Cave of Swallows, Mexico"
    ];

    let index = 0;
    document.getElementById("explore_button").addEventListener("click", () => {
        document.body.style.backgroundImage = `url(${background_url[index]})`;
        document.getElementById("summary").textContent = summary[index];
        document.getElementById("image_location").textContent = location[index];
        index++;
        if (index === 12) {
            index = 0;
            document.body.style.backgroundImage =
                "url('https://images.unsplash.com/photo-1554322662-abedea4ed292?ixlib=rb-1.2.1&auto=format&fit=crop&w=2890&q=80')";
            document.getElementById("summary").textContent =
                "Discover Lost Worlds";
                document.getElementById("image_location").textContent = "Lost city of Petra, Jordan";

        }
    });

    // hide add site form by default until add site button is clicked
    document.getElementById("add_site_div").style.display = "none";
    document.getElementById("divider").style.display = "none";

    ///////////////////////////// ADD SITE START //////////////////////////////////
    // add event listener for add site button
    document.getElementById("add_site_button").addEventListener("click", () => {
        renderAddSiteForm();
        document.getElementById("add_site_div").style.display = "block";
        document.getElementById("divider").style.display = "block";
        // document.getElementById("add_site_button").style.display = "none";
        // document.getElementById("explore_button").style.display = "none";
        // document.getElementById("login_button").style.display = "none";
        document.getElementById("buttons_div").style.display = "none";

        document.getElementById("divider_top").style.marginTop = "14.4em";
    });

    // render form to add new site
    function renderAddSiteForm() {
        const addSiteForm = document.createElement("form");

        addSiteForm.id = "add_site_form";

        // create site name input
        const siteName = document.createElement("input");
        siteName.placeholder = "Enter Site Name";
        addSiteForm.appendChild(siteName);

        // create site description input
        const siteDescription = document.createElement("textarea");
        siteDescription.placeholder = "Enter Site Description";
        addSiteForm.appendChild(siteDescription);

        // create submit button
        const submitButton = document.createElement("button");
        submitButton.classList.add("button");
        submitButton.textContent = "Submit";
        addSiteForm.appendChild(submitButton);

        document.getElementById("add_site_div").appendChild(addSiteForm);

        // add event listener to form and give form data to addSite
        addSiteForm.addEventListener("submit", event => {
            event.preventDefault();
            addSite(event);
            addSiteForm.reset();
        });
    }

    // fetch POST to send form data from add_site_form to database
    function addSite(event) {
        fetch(BASE_URL + SITES, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                name: event.target[0].value, // save name to database
                description: event.target[1].value // save description to db
            })
        })
            .then(response => response.json())
            .then(site => {
                document.getElementById("add_site_div").style.display = "none";
                document.getElementById("buttons_div").style.display = "block";
                // document.getElementById("divider_top").style.marginTop = "0em";
                document.getElementById("divider_top").style.display = "none";

                document.getElementById("sites_div").prepend(renderSite(site));

                console.log(site);
            });
    }
    ///////////////////////////// ADD SITE END ////////////////////////////////////
    ///////////////////////////// LOGIN START /////////////////////////////////////

    // add event listener for login button
    document.getElementById("login_button").addEventListener("click", () => {
        renderLogin();
        document.getElementById("add_site_button").style.display = "none";
        document.getElementById("explore_button").style.display = "none";
        document.getElementById("login_button").style.display = "none";
        document.getElementById("header_div").style.marginBottom = ".5em";
    });

    function renderLogin() {
        const loginForm = document.createElement("form");

        loginForm.id = "login_form";

        // create user name input
        const userName = document.createElement("input");
        userName.id = "user_name_input";
        userName.placeholder = "Enter You're Name";
        loginForm.appendChild(userName);

        // create submit button
        const submitButton = document.createElement("button");
        submitButton.classList.add("button");
        submitButton.id = "login_submit_button";
        submitButton.textContent = "Enter ↵";
        loginForm.appendChild(submitButton);

        document.getElementById("buttons_div").appendChild(loginForm);

        // add event listener to form and give form data to addUser
        loginForm.addEventListener("submit", event => {
            event.preventDefault();
            addUser(event);
            loginForm.reset();
        });
    }

    // fetch POST to send form data from login_form to database
    function addUser(event) {
        fetch(BASE_URL + USERS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                name: event.target[0].value // save user name to database
            })
        })
            .then(response => response.json())
            .then(user => {
                document.getElementById("add_site_button").style.display =
                    "inline";
                document.getElementById("explore_button").style.display =
                    "inline";

                document.getElementById("login_form").style.display = "none";
                document.getElementById("header_div").style.marginBottom =
                    "10em";

                document.getElementById("buttons_div").style.display = "inline";

                document.getElementById("user_name").textContent = user.name;

                console.log(user);
            });
    }

    ///////////////////////////// LOGIN END ///////////////////////////////////////
    ///////////////////////////// RENDER SITE(S) START ////////////////////////////

    // fetches all sites from database on page load
    fetch(BASE_URL + SITES)
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

        siteCard.id = site.id;

        // create site name
        const siteName = document.createElement("h1");
        siteName.textContent = site.name;
        siteCard.appendChild(siteName);

        // create site description
        const siteDescription = document.createElement("p");
        siteDescription.textContent = site.description;
        siteCard.appendChild(siteDescription);

        // create edit button for site
        const editButton = document.createElement("button");
        editButton.classList.add("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
            renderEditForm(site, siteCard);
            editButton.style.display = "none";
            deleteButton.style.display = "block";
            siteCard.appendChild(deleteButton);
            siteName.style.display = "none";
            siteDescription.style.display = "none";
        });
        siteCard.appendChild(editButton);

        // create comments link
        let siteComments = document.createElement("a");
        siteComments.id = "site_comments";
        siteComments.textContent = `View All ${1} Comments`;

        let comment = document.createElement("ul");
        comment.textContent = "test comment 1";
        siteComments.appendChild(comment);

        siteComments.style.display = "block";
        siteCard.appendChild(siteComments);

        // create delete button for site
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("button");
        deleteButton.id = "delete_button";
        deleteButton.textContent = "Delete Site";
        deleteButton.addEventListener("click", () => {
            fetch(`${BASE_URL + SITES}/${site.id}`, { method: "DELETE" });
            siteCard.remove();
        });
        deleteButton.style.display = "none";

        // append all site nodes to site card
        console.log(siteCard);
        return siteCard;
    }
    ///////////////////////////// RENDER SITE(S) END //////////////////////////////
    ///////////////////////////// EDIT SITE START /////////////////////////////////

    // create edit form for site when user hits edit button
    function renderEditForm(site, siteCard) {
        const editForm = document.createElement("form");

        // create site name input
        const siteName = document.createElement("input");
        siteName.value = site.name;
        editForm.appendChild(siteName);

        // create side description input
        const siteDescription = document.createElement("textarea");
        siteDescription.value = site.description;
        editForm.appendChild(siteDescription);

        // create submit button input
        const submitButton = document.createElement("button");
        submitButton.classList.add("button");
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
        fetch(`${BASE_URL + SITES}/${site.id}`, {
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
            .then(site => {
                console.log(site);
                document.getElementById(site.id).replaceWith(renderSite(site));
            });
    }
    ///////////////////////////// EDIT SITE END ///////////////////////////////////
});
