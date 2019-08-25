// Wiki thing:
// const endpoint = "https://en.wikipedia.org/w/api.php?"
// const topic = "el Mirador"
// const params = `action=parse&page=${topic}&format=json`
// BASE_URL = endpoint + params + "&origin=*"

// stretch goals:
// google maps inbed
// expland list html for comments
// transition between images

// bugs:
// hide comments when edit

// document.getElementById("site").textContent = json.parse.text["*"]
document.addEventListener("DOMContentLoaded", () => {
    console.log("%c DOM Content Loaded and Parsed!", "color: magenta");

    // URLs
    BASE_URL = "http://localhost:3000/api/v1/"; // base URL
    SITES = "/sites"; // sites resource
    USERS = "/users"; // users resource
    COMMENTS = "/comments"; // comments resource

    //////////////////// Ranom Background Image Start /////////////////////////
    // COULD BE REFRACTORED HEAVILY:

    // background images
    const background_url = [
        "https://images.unsplash.com/photo-1554322662-abedea4ed292?ixlib=rb-1.2.1&auto=format&fit=crop&w=2890&q=80", // Lost city of Petra, Jordan
        "https://images.unsplash.com/photo-1533258447399-fb8d1f081ec8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1875&q=80", // Tucson, Arizona
        // "https://images.unsplash.com/photo-1562679299-266edbefd6d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80", // Great Sphinx of Giza, Egypt
        "https://images.unsplash.com/photo-1510074232337-05d50fa189ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", // Chiang Mai, Thailand
        "https://www.nationalgeographic.com/content/dam/news/2018/02/01/lidar-maya/02-lidar-maya.jpg", // Lost Mayan City of El Mirador, Guatemala
        "https://mydivepro.com/wp-content/uploads/2019/07/7iEkH2.jpg", // Cenote Near Tulum, Mexico
        // "http://www.planetcustodian.com/wp-content/uploads/2017/03/photographer-ira-meyer-antarctica-photo-collection-3.jpg", // Antarctica
        "https://images.unsplash.com/photo-1526590776442-5541f7dcf2c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjI0MX0&auto=format&fit=crop&w=1948&q=80", // Jellyfish, Ocean Deep
        // "https://www.visitmexico.com/viajemospormexico/assets/uploads/actividades/actividades-principales_campeche_campeche_una-aventura-por-la-selva-de-calakmul_01.jpg", // Lost Mayan City of Tikal, Guatemala
        "https://images.unsplash.com/photo-1521706862577-47b053587f91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80", // jungle
        "http://s1.1zoom.me/b5050/792/Grand_Canyon_Park_USA_Parks_Crag_514944_2560x1440.jpg", // Monument Valley, USA
        "https://us-east.manta.joyent.com/condenast/public/cnt-services/production/2015/12/30/568420d667dc82253d9f5ac6_CaveofSwallows-CourtesyVisitMexico.jpg", // Cave of Swallows, Mexico
        "https://images.unsplash.com/photo-1544642058-c5d172ab955c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80" // Bali, Indonesia
    ];

    // summaries
    const summary = [
        "Discover Lost Worlds", // Lost city of Petra, Jordan
        "Get Out There", // Tucson, Arizona
        // "Lost In Time", // Great Sphinx of Giza, Egypt
        "Wonder", // Chiang Mai, Thailand
        "Undiscovered Worlds", // Lost Mayan City of El Mirador, Guatemala
        "Where Few Have Gone Before", // Cenote Near Tulum, Mexico
        // "Adventure Awaits", // Antarctica
        "Alien Worlds", // Jellyfish, Ocean Deep
        // "There's Still So Much Out There", // Lost Mayan City of Tikal, Guatemala
        "Adventure Awaits", // jungle
        "The Wild West", // Monument Valley, USA
        "Explore The Unknown", // Cave of Swallows, Mexico
        "Experience Forgotten Cultures" // Bali, Indonesia
    ];

    // image locations
    const location = [
        "Lost city of Petra, Jordan", // Lost city of Petra, Jordan [0]
        "Tucson, Arizona", // Tucson, Arizona [1]
        // "Great Sphinx of Giza, Egypt", // Great Sphinx of Giza, Egypt [2]
        "Chiang Mai, Thailand", // Chiang Mai, Thailand [3]
        "Lost Mayan City of El Mirador, Guatemala", // Lost Mayan City of El Mirador, Guatemala [4]
        "Cenote Near Tulum, Mexico", // Cenote Near Tulum, Mexico [5]
        // "Antarctica", // Antarctica [6]
        "Jellyfish, Ocean Deep", // Jellyfish, Ocean Deep [7]
        // "Lost Mayan City of Tikal, Guatemala", // Lost Mayan City of Tikal, Guatemala [8]
        "A Jungle, Somewhere", // jungle
        "Monument Valley, USA", // Monument Valley, USA [9]
        "Cave of Swallows, Mexico", // Cave of Swallows, Mexico [10]
        "Bali, Indonesia" // Bali, Indonesia [11]
    ];

    // set variable to choose starting backround image randomly
    let min = 0;
    let max = 9;
    let random = Math.floor(Math.random() * (+max - +min)) + +min;

    // set starting background image, summary and location to random
    document.body.style.backgroundImage = `url(${background_url[random]})`;
    document.getElementById("summary").textContent = summary[random];
    document.getElementById("image_location").textContent = location[random];

    // cycle through backround images when explore button is clicked
    let index = random + 1;
    document.getElementById("explore_button").addEventListener("click", () => {
        document.body.style.backgroundImage = `url(${background_url[index]})`;
        document.getElementById("summary").textContent = summary[index];
        document.getElementById("image_location").textContent = location[index];

        // BUG: NEED TO SELECT ALL ELEMENTS
        // if (index === 2 || index === 7) {
        //     document.getElementById("title").style.color = "#302e2e";
        //     document.getElementById("summary").style.color = "#302e2e";
        //     document.getElementById("image_location").style.color = "#302e2e";
        //     document.getElementById("app_purpose").style.color = "#302e2e";
        // } else {
        //     document.getElementById("title").style.color = "rgb(204, 204, 204)";
        //     document.getElementById("summary").style.color =
        //         "rgb(204, 204, 204)";
        //     document.getElementById("image_location").style.color =
        //         "rgb(204, 204, 204)";

        //     document.getElementById("app_purpose").style.color =
        //         "rgb(204, 204, 204)";
        // }

        index++;
        if (index === 10) {
            index = 0;
        }
    });
    /////////////////////// Ranom Background Image End ////////////////////////

    // hide add site form by default until add site button is clicked
    document.getElementById("add_site_div").style.display = "none";
    document.getElementById("divider").style.display = "none";

    ///////////////////////////// ADD SITE START //////////////////////////////
    // add event listener for add site button
    document.getElementById("add_site_button").addEventListener("click", () => {
        document.getElementById("add_site_div").style.display = "block";
        document.getElementById("divider").style.display = "block";
        document.getElementById("buttons_div").style.display = "none";
        document.getElementById("divider_top").style.display = "block";
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

        // BUG: NEED TO CLICK ESC WITHOUT SUBMITTING AN EMPTY FORM
        // create escape button
        // const escapeButton = document.createElement("button");
        // escapeButton.classList.add("button");
        // escapeButton.id = "escape_button";
        // escapeButton.textContent = "Esc";
        // escapeButton.addEventListener("click", () => {
        //     document.getElementById("add_site_div").style.display = "none";
        // });
        // addSiteForm.prepend(escapeButton);

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
    renderAddSiteForm();

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

                window.USERNAME = user.name; // global variable to hold user name

                console.log(user);
            });

        // get user id from database
        fetch(BASE_URL + USERS)
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                console.log(json);
                json.forEach(user => {
                    window.USER_ID = user.id; // global variable to hold user id
                    // console.log(user.id)
                });
            });
        // fetch(BASE_URL + COMMENTS)
        // .then(function(response) {
        //     return response.json();
        // })
        // .then(function(json) {
        //     console.log(json);
        //     json.forEach(comment => {
        //         console.log(comment.user_id)
        //     });
        // });
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
        siteName.id = "site_name";
        siteName.textContent = site.name;
        siteCard.appendChild(siteName);

        // create site description
        const siteDescription = document.createElement("p");
        siteDescription.id = "site_description";
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
            siteComments.style.display = "none";
            commentList.style.display = "none";
            commentForm.style.display = "none";
        });
        siteCard.appendChild(editButton);

        // create comments link
        let siteComments = document.createElement("p");
        siteComments.style.cursor = "pointer";
        siteComments.textContent = `View All ${1} Comments`;
        siteComments.addEventListener("click", () => {
            commentList.style.display = "block";
        });

        const commentList = document.createElement("ul");

        // get all comments for site
        fetch(BASE_URL + COMMENTS)
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                console.log(json);
                json.forEach(comment => {
                    if (comment.site_id === site.id) {
                        console.log(`${comment.content}: ${comment.username}`);
                        renderComment(comment, commentList);
                    }
                });
            });
        // const comment1 = document.createElement("ul");
        // comment1.textContent = "Sean test comment 1";
        // commentList.appendChild(comment1);

        // const comment2 = document.createElement("ul");
        // comment2.textContent = "Jackoline test comment 2";
        // commentList.appendChild(comment2);

        commentList.style.display = "none";

        siteCard.appendChild(siteComments);

        siteCard.appendChild(commentList);

        // create comment form to add a comment
        const commentForm = document.createElement("form");

        // create input for comment
        const commentInput = document.createElement("input");
        commentInput.id = "comment_input";
        commentInput.placeholder = "Add a comment...";
        commentForm.appendChild(commentInput);

        // create submit button for comment
        const submitCommentButton = document.createElement("button");
        submitCommentButton.classList.add("button");
        submitCommentButton.id = "comment_submit_button";
        submitCommentButton.textContent = "Enter ↵";
        commentForm.appendChild(submitCommentButton);

        commentForm.addEventListener("submit", event => {
            event.preventDefault();
            console.log(event);
            addCommentFetch(event, site);
            commentForm.reset();
        });

        siteCard.appendChild(commentForm);

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
    //////////////////////// RENDER COMMENT(S) START //////////////////////////////
    function renderComment(comment, commentList) {
        let commentContent = document.createElement("ul")
        commentContent.textContent = `${comment.username} - ${comment.content}`
        commentList.appendChild(commentContent)
    }

    ////////////////////////// RENDER COMMENT(S) END //////////////////////////////

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
    ///////////////////////////// EDIT SITE END ///////////////////////////////
    ///////////////////////////// ADD COMMENT START ///////////////////////////

    function addCommentFetch(event, site) {
        fetch(`${BASE_URL + COMMENTS}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                user_id: window.USER_ID, // user_id
                site_id: site.id, // site_id
                content: event.target[0].value, // comments content
                username: window.USERNAME // username string
            })
        })
            .then(response => response.json())
            .then(comment => {
                console.log(comment);
                document.getElementById(site.id).replaceWith(renderSite(site));
            });
    }
    ///////////////////////////// ADD COMMENT END /////////////////////////////
});
