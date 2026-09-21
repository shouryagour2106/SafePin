function loadSystemData() {

    const caseId = localStorage.getItem("caseId");

    const requestStatus =
        localStorage.getItem("requestStatus");

    const requestElement =
        document.getElementById("requestsToday");


    /*
        Update demo request count
        when a request exists.
    */

    if (caseId && requestElement) {

        requestElement.textContent = "19";

    }


    /*
        Update active cases
        when a request exists.
    */

    const activeCases =
        document.getElementById("activeCases");

    if (activeCases && caseId) {

        activeCases.textContent = "25";

    }


    /*
        Update system activity.
    */

    updateSystemTime();


    /*
        Update system status
        according to request state.
    */

    updateRequestStatus(requestStatus);

}


/* =========================
   REQUEST STATUS
========================= */

function updateRequestStatus(status) {

    const message =
        document.querySelector(".system-message p");

    if (!message) {
        return;
    }


    if (status) {

        message.textContent =
            "SafePin services are operational and your latest request is currently being processed.";

    } else {

        message.textContent =
            "SafePin platform services and connected systems are currently running normally.";

    }

}


/* =========================
   ACTIVITY TIME
========================= */

function updateSystemTime() {

    const activities =
        document.querySelectorAll(".activity-time");


    if (!activities.length) {
        return;
    }


    activities[0].textContent =
        "Just now";

}


/* =========================
   SYSTEM REFRESH
========================= */

function simulateSystemRefresh() {

    const banner =
        document.querySelector(".system-message p");

    if (!banner) {
        return;
    }


    const caseId =
        localStorage.getItem("caseId");


    if (caseId) {

        banner.textContent =
            "System status refreshed successfully. Your request is being monitored through the SafePin workflow.";

    } else {

        banner.textContent =
            "System status refreshed successfully. All connected services are operational.";

    }


    updateSystemTime();

}


/* =========================
   LOGOUT
========================= */

function logout(event) {

    if (event) {
        event.preventDefault();
    }


    const confirmLogout =
        confirm("Are you sure you want to logout?");


    if (!confirmLogout) {
        return false;
    }


    localStorage.removeItem("loggedIn");

    localStorage.removeItem("selectedDocument");

    localStorage.removeItem("selectedAction");


    window.location.href =
        "../Login/Login.html";


    return false;

}


/* =========================
   INITIALIZATION
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadSystemData();

        setTimeout(function () {

            updateSystemTime();

        }, 500);

    }
);


/*
    Refresh system status
    every 30 seconds.
*/

setInterval(
    simulateSystemRefresh,
    30000
);