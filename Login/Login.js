
// =========================================================
// SAFE PIN LANDING PAGE → LOGIN PORTAL
// =========================================================

function openSafePinPortal() {

    const intro = document.getElementById("safepinIntro");
    const portal = document.getElementById("portalBackground");

    if (!intro || !portal) {
        return;
    }

    // Hide introduction
    intro.style.opacity = "0";
    intro.style.transform = "scale(0.98)";

    setTimeout(function () {

        intro.style.display = "none";

        // Show login portal
        portal.style.display = "flex";

        // Start existing vault animation
        startVaultAnimation();

    }, 350);
}


// =========================================================
// VAULT CORE ALIGNMENT ANIMATION
// =========================================================

function startVaultAnimation() {

    const splash =
        document.getElementById("vaultSplash");

    const statusText =
        document.getElementById("vaultStatus");

    const lockIcon =
        document.querySelector(".lock-icon");

    const mainContainer =
        document.getElementById("mainContainer");


    // Reset everything

    splash.style.display = "flex";
    splash.style.opacity = "1";
    splash.style.transform = "scale(1)";

    mainContainer.classList.remove("visible-container");
    mainContainer.classList.add("hidden-container");

    splash.classList.remove("vault-unlocked");

    lockIcon.innerText = "🔒";

    statusText.innerText =
        "DECRYPTING SECURITY VAULT...";

    statusText.style.color = "#aab8ca";


    // Phase 1

    setTimeout(function () {

        statusText.innerText =
            "ALIGNING ENCRYPTION KEYS...";

        statusText.style.color =
            "#00f2fe";

    }, 1000);


    // Phase 2

    setTimeout(function () {

        statusText.innerText =
            "ACCESS GRANTED";

        statusText.style.color =
            "#00ff88";

        lockIcon.innerText =
            "🔓";

        splash.classList.add(
            "vault-unlocked"
        );

    }, 2200);


    // Phase 3

    setTimeout(function () {

        splash.style.opacity = "0";

        splash.style.transform =
            "scale(1.3)";


        setTimeout(function () {

            splash.style.display = "none";

            mainContainer.classList.remove(
                "hidden-container"
            );

            mainContainer.classList.add(
                "visible-container"
            );

        }, 500);

    }, 2800);

}


// =========================================================
// EXISTING VERIFICATION LOGIC
// =========================================================

function startVerification() {

    const aadhaar =
        document.getElementById("aadhaar").value;

    const deathCertificate =
        document.getElementById(
            "deathCertificate"
        ).value;


    if (aadhaar.length !== 12) {

        alert(
            "Please enter a valid 12-digit Aadhaar number."
        );

        return;
    }


    if (deathCertificate.trim() === "") {

        alert(
            "Please enter the Death Certificate number."
        );

        return;
    }


    document
        .getElementById("loginSection")
        .classList.add("hidden");


    document
        .getElementById("aadhaarSection")
        .classList.remove("hidden");


    setTimeout(function () {

        document
            .getElementById("aadhaarSection")
            .classList.add("hidden");

        document
            .getElementById("deathSection")
            .classList.remove("hidden");

    }, 2500);


    setTimeout(function () {

        document
            .getElementById("deathSection")
            .classList.add("hidden");

        document
            .getElementById("otpSection")
            .classList.remove("hidden");

    }, 5000);

}


// =========================================================
// OTP VERIFICATION
// =========================================================

function verifyOTP() {

    const otp =
        document.getElementById("otp").value;


    if (otp !== "123456") {

        alert(
            "Invalid OTP. Please use the demo OTP 123456."
        );

        return;
    }


    document
        .getElementById("otpSection")
        .classList.add("hidden");


    document
        .getElementById("successSection")
        .classList.remove("hidden");

}


// =========================================================
// DASHBOARD
// =========================================================

function openDashboard() {

    window.location.href =
        "../Dashboard/Dashboard.html";

}

