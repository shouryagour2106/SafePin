/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showPage(page) {

    const pages = {

        dashboard:
            document.getElementById("dashboardPage"),

        notifications:
            document.getElementById("notificationsPage"),

        profile:
            document.getElementById("profilePage")

    };


    Object.values(pages).forEach(function(section) {

        if (section) {
            section.classList.add("hidden-page");
        }

    });


    const menuItems =
        document.querySelectorAll(".menu-item");


    menuItems.forEach(function(item) {

        item.classList.remove("active");

    });


    if (page === "dashboard") {

        pages.dashboard.classList.remove("hidden-page");

        document.getElementById("pageTitle").innerText =
            "Dashboard";

        document.getElementById("pageSubtitle").innerText =
            "Secure identity protection overview";

        document.getElementById("breadcrumbPage").innerText =
            "Dashboard";


        activateMenuItem(0);

    }


    if (page === "notifications") {

        pages.notifications.classList.remove("hidden-page");

        document.getElementById("pageTitle").innerText =
            "Notifications";

        document.getElementById("pageSubtitle").innerText =
            "Updates about your records and protection requests";

        document.getElementById("breadcrumbPage").innerText =
            "Notifications";


        activateMenuItem(3);

    }


    if (page === "profile") {

        pages.profile.classList.remove("hidden-page");

        document.getElementById("pageTitle").innerText =
            "Profile";

        document.getElementById("pageSubtitle").innerText =
            "Your verified profile information";

        document.getElementById("breadcrumbPage").innerText =
            "Profile";


        activateMenuItem(4);

    }

}


/* =====================================================
   MENU ACTIVE STATE
===================================================== */

function activateMenuItem(index) {

    const items =
        document.querySelectorAll(".menu-item");

    if (items[index]) {

        items[index].classList.add("active");

    }

}


/* =====================================================
   DOCUMENTS
===================================================== */

function openDocuments() {

    window.location.href =
        "../Documents/Documents.html";

}


/* =====================================================
   REQUESTS
===================================================== */

function openRequests() {

    window.location.href =
        "../Tracking/Tracking.html";

}


/* =====================================================
   SYSTEM OVERVIEW
===================================================== */

function openSystemOverview() {

    window.location.href =
        "../System/System.html";

}


/* =====================================================
   REQUEST DOCUMENT
===================================================== */

function requestDocument(documentName) {

    localStorage.setItem(
        "selectedDocument",
        documentName
    );


    window.location.href =
        "../Request/Request.html";

}


/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    const confirmLogout =
        confirm(
            "Are you sure you want to logout?"
        );


    if (confirmLogout) {

        window.location.href =
            "../Login/Login.html";

    }

}


/* =====================================================
   DASHBOARD INITIALIZATION
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        showPage("dashboard");

    }
);