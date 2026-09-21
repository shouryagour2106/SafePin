let caseId = "";
let documentName = "";
let actionName = "";
let reason = "";
let status = "";


/* LOAD REQUEST */

window.onload = function () {

    caseId =
        localStorage.getItem("caseId");

    documentName =
        localStorage.getItem("requestDocument");

    actionName =
        localStorage.getItem("requestAction");

    reason =
        localStorage.getItem("requestReason");

    status =
        localStorage.getItem("requestStatus");


    /*
       If no request exists,
       show demo information.
    */

    if (!caseId) {

        caseId = "2026-000001";

        documentName = "Bank Account";

        actionName = "Deactivation";

        reason =
            "Request submitted for processing.";

        status =
            "Under Verification";

    }


    updatePage();

};


/* UPDATE PAGE */

function updatePage() {

    document.getElementById("caseId")
        .innerText = caseId;


    document.getElementById("caseSearch")
        .value = caseId;


    document.getElementById("documentName")
        .innerText = documentName;


    document.getElementById("actionName")
        .innerText = actionName;


    document.getElementById("detailDocument")
        .innerText = documentName;


    document.getElementById("detailAction")
        .innerText = actionName;


    document.getElementById("detailReason")
        .innerText =
        reason || "No reason provided.";


    document.getElementById("currentStatus")
        .innerText = status;


    document.getElementById("referenceNumber")
        .innerText =
        "TRX-" +
        caseId.replace("-", "");


    document.getElementById("caseDescription")
        .innerText =
        actionName +
        " request for " +
        documentName;

}


/* SEARCH CASE */

function searchCase() {

    const searchValue =
        document.getElementById("caseSearch")
            .value
            .trim();


    if (!searchValue) {

        alert(
            "Please enter a Case ID."
        );

        return;

    }


    const savedCase =
        localStorage.getItem("caseId");


    if (
        savedCase &&
        searchValue !== savedCase
    ) {

        alert(
            "No request found for this Case ID."
        );

        return;

    }


    caseId = searchValue;

    updatePage();

}


/* NAVIGATION */

function goDashboard() {

    window.location.href =
        "../Dashboard/Dashboard.html";

}


function goDocuments() {

    window.location.href =
        "../Documents/Documents.html";

}


function goRequest() {

    window.location.href =
        "../Request/Request.html";

}


/* QUERY */

function raiseQuery() {

    localStorage.setItem(
        "selectedDocument",
        documentName
    );

    localStorage.setItem(
        "selectedAction",
        "Raise Query"
    );


    window.location.href =
        "../Request/Request.html";

}


/* NOTIFICATIONS */

function showNotifications() {

    alert(
        "You have 2 new notifications."
    );

}


/* LOGOUT */

function logout() {

    if (
        confirm(
            "Are you sure you want to logout?"
        )
    ) {

        window.location.href =
            "../Login/Login.html";

    }

}