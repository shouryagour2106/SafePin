const progress = document.getElementById("securityProgress");


/* LOAD SECURITY DATA */

function loadSecurity() {

    setTimeout(() => {

        if (progress) {
            progress.style.width = "98%";
        }

    }, 300);

}


/* EMERGENCY ACCOUNT PROTECTION */

function protectAccount() {

    const confirmProtection = confirm(
        "Are you sure you want to activate emergency account protection?"
    );

    if (!confirmProtection) {
        return;
    }

    localStorage.setItem(
        "accountProtection",
        "active"
    );

    alert(
        "Emergency account protection has been activated."
    );

    updateProtectionButton();

}


/* UPDATE PROTECTION BUTTON */

function updateProtectionButton() {

    const status =
        localStorage.getItem("accountProtection");

    const button =
        document.querySelector(".protect-btn");

    if (!button) {
        return;
    }

    if (status === "active") {

        button.textContent =
            "Protection Active";

        button.style.background =
            "#198754";

        button.disabled = true;

    } else {

        button.textContent =
            "Protect Account";

        button.style.background =
            "#8d1833";

        button.disabled = false;

    }

}


/* LOGOUT */

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

    window.location.href =
        "../Login/Login.html";

    return false;
}


/* INITIALIZE */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadSecurity();

        updateProtectionButton();

    }
);