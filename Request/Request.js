let selectedAction = "";

let selectedFile = null;



/* =========================================
   LOAD SELECTED DOCUMENT / ACTION
========================================= */

window.onload = function () {

    const savedDocument =
        localStorage.getItem("selectedDocument");

    const savedAction =
        localStorage.getItem("selectedAction");


    if (savedDocument) {

        const documentSelect =
            document.getElementById("documentSelect");

        documentSelect.value =
            savedDocument;

        updateSummary();

    }


    if (savedAction) {

        if (
            savedAction === "Update Details"
        ) {

            selectActionByName("Update");

        }

        else if (
            savedAction === "Raise Query"
        ) {

            selectActionByName("Other");

        }

        else if (
            savedAction === "Request Protection Action"
        ) {

            selectActionByName("Deactivate");

        }

    }

};



/* =========================================
   DOCUMENT CHANGE
========================================= */

document
    .getElementById("documentSelect")
    .addEventListener(
        "change",
        updateSummary
    );



/* =========================================
   SELECT ACTION
========================================= */

function selectAction(element, action) {

    const options =
        document.querySelectorAll(
            ".action-option"
        );


    options.forEach(function (option) {

        option.classList.remove(
            "selected"
        );

    });


    element.classList.add(
        "selected"
    );


    selectedAction =
        action;


    document.getElementById(
        "selectedAction"
    ).value =
        action;


    document.getElementById(
        "summaryAction"
    ).innerText =
        getActionDisplayName(action);

}



/* =========================================
   ACTION DISPLAY NAME
========================================= */

function getActionDisplayName(action) {

    if (action === "Deactivate") {

        return "Protection / Deactivation";

    }

    if (action === "Freeze") {

        return "Freeze / Hold";

    }

    if (action === "Update") {

        return "Update Details";

    }

    if (action === "Other") {

        return "Other / Query";

    }

    return action;

}



/* =========================================
   SELECT ACTION BY NAME
========================================= */

function selectActionByName(action) {

    const options =
        document.querySelectorAll(
            ".action-option"
        );


    options.forEach(function (option) {

        const text =
            option.innerText
                .toLowerCase();


        if (

            (action === "Update" &&
             text.includes("update"))

            ||

            (action === "Other" &&
             text.includes("other"))

            ||

            (action === "Deactivate" &&
             text.includes("protection"))

        ) {

            selectAction(
                option,
                action
            );

        }

    });

}



/* =========================================
   UPDATE SUMMARY
========================================= */

function updateSummary() {

    const documentSelect =
        document.getElementById(
            "documentSelect"
        );


    const selected =
        documentSelect.value;


    document.getElementById(
        "summaryDocument"
    ).innerText =
        selected ||
        "Not selected";

}



/* =========================================
   CHARACTER COUNT
========================================= */

document
    .getElementById("reason")
    .addEventListener(
        "input",
        function () {

            document.getElementById(
                "characterCount"
            ).innerText =
                this.value.length;

        }
    );



/* =========================================
   FILE UPLOAD
========================================= */

function showFile() {

    const input =
        document.getElementById(
            "supportingFile"
        );


    if (
        input.files.length === 0
    ) {

        return;

    }


    selectedFile =
        input.files[0];


    if (
        selectedFile.size >
        5 * 1024 * 1024
    ) {

        alert(
            "File size must be less than 5 MB."
        );


        input.value = "";

        selectedFile = null;

        return;

    }


    const fileName =
        document.getElementById(
            "fileName"
        );


    fileName.innerText =
        "✓ " +
        selectedFile.name;


    fileName.classList.remove(
        "hidden"
    );

}



/* =========================================
   SUBMIT REQUEST
========================================= */

function submitRequest() {

    const documentName =
        document.getElementById(
            "documentSelect"
        ).value;


    const reason =
        document.getElementById(
            "reason"
        ).value.trim();


    if (!documentName) {

        alert(
            "Please select a document or service."
        );

        return;

    }


    if (!selectedAction) {

        alert(
            "Please select an action."
        );

        return;

    }


    if (!reason) {

        alert(
            "Please enter the reason for your request."
        );

        return;

    }


    /*
        Generate demo Case ID
    */

    const randomNumber =
        Math.floor(
            100000 +
            Math.random() * 900000
        );


    const caseId =
        "2026-" +
        randomNumber;



    /* STORE REQUEST */

    localStorage.setItem(
        "caseId",
        caseId
    );


    localStorage.setItem(
        "requestDocument",
        documentName
    );


    localStorage.setItem(
        "requestAction",
        getActionDisplayName(
            selectedAction
        )
    );


    localStorage.setItem(
        "requestReason",
        reason
    );


    localStorage.setItem(
        "requestStatus",
        "Under Verification"
    );



    /* UPDATE SUCCESS SCREEN */

    document.getElementById(
        "generatedCaseId"
    ).innerText =
        caseId;


    document.getElementById(
        "successDocument"
    ).innerText =
        documentName;


    document.getElementById(
        "successAction"
    ).innerText =
        getActionDisplayName(
            selectedAction
        );



    /* CHANGE PROGRESS */

    updateProgressToSuccess();



    /* HIDE FORM */

    document.getElementById(
        "requestForm"
    ).classList.add(
        "hidden"
    );


    /* SHOW SUCCESS */

    document.getElementById(
        "successSection"
    ).classList.remove(
        "hidden"
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



/* =========================================
   SUCCESS PROGRESS
========================================= */

function updateProgressToSuccess() {

    const steps =
        document.querySelectorAll(
            ".progress-step"
        );


    steps.forEach(function (step) {

        step.classList.remove(
            "active"
        );

    });


    if (steps.length >= 3) {

        steps[0].classList.add(
            "active"
        );

        steps[1].classList.add(
            "active"
        );

        steps[2].classList.add(
            "active"
        );

    }

}



/* =========================================
   COPY CASE ID
========================================= */

function copyCaseId() {

    const caseId =
        document.getElementById(
            "generatedCaseId"
        ).innerText;


    if (
        navigator.clipboard &&
        navigator.clipboard.writeText
    ) {

        navigator.clipboard.writeText(
            caseId
        );

    }


    alert(
        "Case ID copied: " +
        caseId
    );

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
   NAVIGATION
========================================= */

function goDashboard() {

    window.location.href =
        "../Dashboard/Dashboard.html";

}



function goDocuments() {

    window.location.href =
        "../Documents/Documents.html";

}



function goTracking() {

    window.location.href =
        "../Tracking/Tracking.html";

}



function goProfile() {

    window.location.href =
        "../Dashboard/Dashboard.html";

}



function goSystem() {

    window.location.href =
        "../System/System.html";

}



/* =========================================
   LOGOUT
========================================= */

function logout() {

    if (
        confirm(
            "Are you sure you want to logout from SafePin?"
        )
    ) {

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