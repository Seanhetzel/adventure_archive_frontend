// Wiki thing:
// const endpoint = "https://en.wikipedia.org/w/api.php?"
// const topic = "el Mirador"
// const params = `action=parse&page=${topic}&format=json`
// BASE_URL = endpoint + params + "&origin=*"
// document.getElementById("site").textContent = json.parse.text["*"]

document.addEventListener("DOMContentLoaded", () => {
    console.log("%c Adventure Archive made by Sean Hetzel", "color: cyan");

    // URLs
    BASE_URL = "https://dry-sands-78217.herokuapp.com/api/v1";
    SITES = "/sites"; // sites resource
    USERS = "/users"; // users resource
    COMMENTS = "/comments"; // comments resource
    sessionStorage.setItem("UserName", ""); // store username in session

    //////////////////// Ranom Background Image Start /////////////////////////
    const prettyStuff = {
        1: {
            location: "Lost city of Petra, Jordan",
            summary: "Discover Lost Worlds",
            image: "src/background-images/photo-1554322662-abedea4ed292.jpg"
        },
        2: {
            location: "Tucson, Arizona",
            summary: "Get Out There",
            image: "src/background-images/photo-1533258447399-fb8d1f081ec8.jpg"
        },
        3: {
            location: "Machu Picchu, Peru",
            summary: "Lost In Time",
            image: "src/background-images/photo-1497106636505-e4fd6e16d74c.jpg"
        },
        4: {
            location: "Chiang Mai, Thailand",
            summary: "Wonder",
            image: "src/background-images/photo-1510074232337-05d50fa189ba.jpg"
        },
        5: {
            location: "Lost Mayan City of El Mirador, Guatemala",
            summary: "Undiscovered Worlds",
            image: "src/background-images/02-lidar-maya.jpg"
        },
        6: {
            location: "Cenote Near Tulum, Mexico",
            summary: "Where Few Have Gone Before",
            image: "src/background-images/7iEkH2.jpg"
        },
        7: {
            location: "Skógafoss, Iceland",
            summary: "Solitude",
            image: "src/background-images/photo-1520637102912-2df6bb2aec6d.jpg"
        },
        8: {
            location: "Jellyfish, Ocean Deep",
            summary: "Alien Worlds",
            image: "src/background-images/photo-1526590776442-5541f7dcf2c8.jpg"
        },
        9: {
            location: "Lost Mayan City of Tikal, Guatemala",
            summary: "The Thrill Of Adventure",
            image:
                "src/background-images/actividades-principales_campeche_campeche_una-aventura-por-la-selva-de-calakmul_01.jpg"
        },
        10: {
            location: "Giza, Egypt",
            summary: "Forgotten Monoliths",
            image: "src/background-images/photo-1544815521-80841127c00f.jpg"
        },
        11: {
            location: "Dahab, Egypt",
            summary: "Calm Beneath The Waves",
            image: "src/background-images/photo-1552134792-39312eb5887b.jpg"
        },
        12: {
            location: "A Jungle, Somewhere",
            summary: "Adventure Awaits",
            image: "src/background-images/photo-1521706862577-47b053587f91.jpg"
        },
        13: {
            location: "Monument Valley, United States",
            summary: "Endless Expanse",
            image: "src/background-images/photo-1510922923694-5a9fca94dc4a.jpg"
        },
        14: {
            location: "Cave of Swallows, Mexico",
            summary: "Explore The Unknown",
            image:
                "src/background-images/568420d667dc82253d9f5ac6_CaveofSwallows-CourtesyVisitMexico.jpg"
        },
        15: {
            location: "Bali, Indonesia",
            summary: "Forgotten Cultures",
            image: "src/background-images/photo-1544642058-c5d172ab955c.jpg"
        }
    };

    // sets the background image and pretty stuff
    function setBackgroundImage(i){
        document.body.style.backgroundImage = `url(${prettyStuff[i].image})`;
    document.getElementById("summary").textContent =
        prettyStuff[i].summary;
    document.getElementById("image_location").textContent =
        prettyStuff[i].location;
    }

    // set variable to choose starting backround image randomly
    let min = 1;
    let max = 15;
    let random = Math.floor(Math.random() * (+max - +min)) + +min;
    // set starting background image, summary and location to random
    setBackgroundImage(random)

    // cycle through backround images when explore button is clicked
    let index = random + 1;
    document.getElementById("explore_button").addEventListener("click", () => {
    setBackgroundImage(index)
        // increment through images and reset it when it reaches the end
        index++;
        if (index === 16) {
            index = 1;
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
        siteName.required = true;
        addSiteForm.appendChild(siteName);

        // create site description input
        const siteDescription = document.createElement("textarea");
        siteDescription.placeholder = "Enter Site Description";
        siteDescription.required = true;
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
    });

    function renderLogin() {
        const loginForm = document.createElement("form");
        loginForm.id = "login_form";

        // create user name input
        const userName = document.createElement("input");
        userName.id = "user_name_input";
        userName.placeholder = "Enter You're Name";
        userName.required = true;
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

    // create logout button
    function renderLogoutButton() {
        const logoutButton = document.createElement("button");
        logoutButton.classList.add("button");
        logoutButton.id = "logout_button";
        logoutButton.textContent = "Logout";
        logoutButton.addEventListener("click", () => {
            fetchSites();
            sessionStorage.setItem("UserName", "");
            document.getElementById("login_button").style.display = "inline";
            document.getElementById("user_name").textContent = "";
            logoutButton.style.display = "none";
        });
        document.getElementById("buttons_div").appendChild(logoutButton);
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
                    "12em";
                document.getElementById("buttons_div").style.display = "inline";
                document.getElementById("user_name").textContent = user.name;
                sessionStorage.setItem("UserName", user.name);
                fetchSites();
                renderLogoutButton();
            });

        // get user id from database
        fetch(BASE_URL + USERS)
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                console.log(json);
                json.forEach(user => {
                    sessionStorage.setItem("UserId", user.id); // store user id in session
                });
            });
    }

    ///////////////////////////// LOGIN END ///////////////////////////////////////
    ///////////////////////////// RENDER SITE(S) START ////////////////////////////

    // fetches all sites from database
    function fetchSites() {
        fetch(BASE_URL + SITES)
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                json.forEach(site => {
                    document.getElementById("loading").style.display = "none";
                    document
                        .getElementById("sites_div")
                        .prepend(renderSite(site));
                });
            });
    }

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

        // render comments
        let siteComments = document.createElement("p");
        siteComments.classList.add("collapsible");
        siteComments.style.cursor = "pointer";

        // create div for site comments
        const commentList = document.createElement("div");
        commentList.classList.add("content");

        // KEEP INCASE TOGGLE TRANSITION ANIMATIONS FAIL:
        // siteComments.addEventListener("click", () => {
        //     commentList.style.display = "block";
        // });

        // get all comments for site
        fetch(BASE_URL + COMMENTS)
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                // console.log(json.length);

                let comment_count = 0;
                json.forEach(comment => {
                    if (comment.site_id === site.id) {
                        comment_count++;
                        // console.log(comment);

                        renderComment(comment, commentList);
                    }
                    if (comment_count > 0) {
                        siteComments.textContent = `View All ${comment_count} Comments`;
                    } else {
                        siteComments.textContent = "Be the first to comment:";
                    }
                });
            });

        // KEEP INCASE TOGGLE TRANSITION ANIMATIONS FAIL:
        // commentList.style.display = "none";

        siteCard.appendChild(siteComments);
        siteCard.appendChild(commentList);

        if (sessionStorage.getItem("UserName") != "") {
            // create comment form to add a comment
            const commentForm = document.createElement("form");

            // create input for comment
            const commentInput = document.createElement("input");
            commentInput.id = "comment_input";
            commentInput.placeholder = "Add a comment...";
            commentInput.required = true;
            commentForm.appendChild(commentInput);

            // create submit button for comment
            const submitCommentButton = document.createElement("button");
            submitCommentButton.classList.add("button");
            submitCommentButton.id = "comment_submit_button";
            submitCommentButton.textContent = "Enter ↵";
            commentForm.appendChild(submitCommentButton);

            commentForm.addEventListener("submit", event => {
                event.preventDefault();
                addCommentFetch(event, site);
                commentForm.reset();
            });
            siteCard.appendChild(commentForm);
        } else {
            const pleaseLogIn = document.createElement("p");
            pleaseLogIn.textContent = "Please login to comment.";
            siteCard.appendChild(pleaseLogIn);
        }

        // add toggle animation for showing/hiding comments list
        siteComments.addEventListener("click", function() {
            this.classList.toggle("active");
            let content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });

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
        return siteCard;
    }
    ///////////////////////////// RENDER SITE(S) END //////////////////////////////
    //////////////////////// RENDER COMMENT(S) START //////////////////////////////
    function renderComment(comment, commentList) {
        let commentContent = document.createElement("ul");
        commentContent.innerHTML = `<p><b>${comment.username}</b><br> ${comment.content}</p>`;
        commentList.appendChild(commentContent);
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
                user_id: sessionStorage.getItem("UserId"),
                site_id: site.id, // site_id
                content: event.target[0].value, // comments content
                username: sessionStorage.getItem("UserName") // username string
            })
        })
            .then(response => response.json())
            .then(comment => {
                document.getElementById(site.id).replaceWith(renderSite(site));
            });
    }
    ///////////////////////////// ADD COMMENT END /////////////////////////////
    fetchSites(); // fetch all sites which then calles renderSite().

    // parallax scrolling
    let rellax = new Rellax('.rellax', {
        speed: -2,
        center: false,
        wrapper: null,
        round: true,
        vertical: true,
        horizontal: false
      });
});
