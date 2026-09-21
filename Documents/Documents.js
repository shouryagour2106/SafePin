let selectedDocument = "";



/* =========================================
   NAVIGATION
========================================= */

function goDashboard() {

    window.location.href =
        "../Dashboard/Dashboard.html";

}


function goTracking() {

    window.location.href =
        "../Tracking/Tracking.html";

}


function goProfile() {

    /*
        Profile is currently handled from
        the Dashboard section.
    */

    window.location.href =
        "../Dashboard/Dashboard.html";

}


function goSystem() {

    window.location.href =
        "../System/System.html";

}



/* =========================================
   DOCUMENT DETAILS
========================================= */

function viewDetails(documentName) {

    selectedDocument = documentName;


    document.getElementById("modalTitle").innerText =
        documentName;


    document.getElementById("modalService").innerText =
        documentName;


    document.getElementById("modalDescription").innerText =
        "Verified information associated with this protected service.";


    const modalStatus =
        document.getElementById("modalStatus");

    if (modalStatus) {

        if (documentName === "Insurance Policy") {

            modalStatus.innerText =
                "Verified / Review Required";

            modalStatus.className =
                "warning-text";

        } else {

            modalStatus.innerText =
                "Verified / Active";

            modalStatus.className =
                "success-text";

        }

    }


    document.getElementById("detailsModal")
        .classList.add("show");


}



/* =========================================
   CLOSE MODAL
========================================= */

function closeModal() {

    document.getElementById("detailsModal")
        .classList.remove("show");

}



/* =========================================
   REQUEST ACTION
========================================= */

function requestAction(documentName) {

    selectedDocument = documentName;


    localStorage.setItem(
        "selectedDocument",
        documentName
    );


    localStorage.setItem(
        "selectedAction",
        "Request Protection Action"
    );


    window.location.href =
        "../Request/Request.html";

}



/* =========================================
   REQUEST FROM MODAL
========================================= */

function requestFromModal() {

    if (selectedDocument === "") {

        return;

    }


    localStorage.setItem(
        "selectedDocument",
        selectedDocument
    );


    localStorage.setItem(
        "selectedAction",
        "Request Protection Action"
    );


    window.location.href =
        "../Request/Request.html";

}



/* =========================================
   SEARCH + FILTER
========================================= */

function filterDocuments() {

    const searchInput =
        document.getElementById("documentSearch");

    const categoryFilter =
        document.getElementById("categoryFilter");

    const statusFilter =
        document.getElementById("statusFilter");


    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    const category =
        categoryFilter.value;


    const status =
        statusFilter.value;


    const cards =
        document.querySelectorAll(".document-card");


    let visibleCount = 0;


    cards.forEach(card => {

        const name =
            card.dataset.name.toLowerCase();


        const cardCategory =
            card.dataset.category;


        const cardStatus =
            card.dataset.status;


        const matchesSearch =
            name.includes(search);


        const matchesCategory =
            category === "all" ||
            cardCategory === category;


        const matchesStatus =
            status === "all" ||
            cardStatus === status;


        if (
            matchesSearch &&
            matchesCategory &&
            matchesStatus
        ) {

            card.style.display = "";

            visibleCount++;

        } else {

            card.style.display = "none";

        }

    });


    const noResults =
        document.getElementById("noResults");


    if (visibleCount === 0) {

        noResults.style.display =
            "block";

    } else {

        noResults.style.display =
            "none";

    }

}



/* =========================================
   UPDATE DETAILS
========================================= */

function updateDetails() {

    localStorage.setItem(
        "selectedDocument",
        "General Document Update"
    );


    localStorage.setItem(
        "selectedAction",
        "Update Details"
    );


    window.location.href =
        "../Request/Request.html";

}



/* =========================================
   RAISE QUERY
========================================= */

function raiseQuery() {

    localStorage.setItem(
        "selectedDocument",
        "General Query"
    );


    localStorage.setItem(
        "selectedAction",
        "Raise Query"
    );


    window.location.href =
        "../Request/Request.html";

}



/* =========================================
   DOWNLOAD REPORT
========================================= */

function downloadReport() {

    alert(
        "Demo: The SafePin verification report will be generated here."
    );

}



/* =========================================
   NOTIFICATIONS
========================================= */

function showNotifications() {

    alert(
        "You have 2 new SafePin notifications."
    );

}



/* =========================================
   LOGOUT
========================================= */

function logout() {

    const confirmLogout =
        confirm(
            "Are you sure you want to logout from SafePin?"
        );


    if (confirmLogout) {

        localStorage.removeItem(
            "selectedDocument"
        );


        localStorage.removeItem(
            "selectedAction"
        );


        window.location.href =
            "../Login/Login.html";

    }

}



/* =========================================
   CLOSE MODAL ON OUTSIDE CLICK
========================================= */

window.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById("detailsModal");


        if (event.target === modal) {

            closeModal();

        }

    }
);



/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeModal();

        }

    }
);



/* =========================================
   INITIALIZATION
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        filterDocuments();

    }
);