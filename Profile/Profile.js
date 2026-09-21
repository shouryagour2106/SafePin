/* =========================================================
   SAFE PIN - PROFILE
   ========================================================= */


/* ================= ELEMENTS ================= */

const nameInput =
    document.getElementById("nameInput");

const emailInput =
    document.getElementById("emailInput");

const phoneInput =
    document.getElementById("phoneInput");

const profileName =
    document.getElementById("profileName");

const editActions =
    document.getElementById("editActions");


/* ================= STORAGE ================= */

const PROFILE_KEY =
    "safepinProfile";

const PREFERENCES_KEY =
    "safepinPreferences";


/* ================= DEFAULT PROFILE ================= */

const defaultProfile = {

    name: "Aditya Kapoor",

    email: "aditya@example.com",

    phone: "+91 XXXXX XXXXX"

};


/* ================= LOAD PROFILE ================= */

function loadProfile() {

    const savedProfile =
        JSON.parse(
            localStorage.getItem(
                PROFILE_KEY
            )
        );


    const profile =
        savedProfile || defaultProfile;


    nameInput.value =
        profile.name ||
        defaultProfile.name;


    emailInput.value =
        profile.email ||
        defaultProfile.email;


    phoneInput.value =
        profile.phone ||
        defaultProfile.phone;


    profileName.textContent =
        profile.name ||
        defaultProfile.name;


    loadPreferences();

    calculateStatistics();

    disableEditing();

}



/* ================= EDIT PROFILE ================= */

function toggleEdit() {

    nameInput.disabled =
        false;

    emailInput.disabled =
        false;

    phoneInput.disabled =
        false;


    editActions.style.display =
        "flex";


    nameInput.focus();

}



/* ================= SAVE ================= */

function saveProfile() {

    const profile = {

        name:
            nameInput.value.trim(),

        email:
            emailInput.value.trim(),

        phone:
            phoneInput.value.trim()

    };


    if (!profile.name) {

        alert(
            "Please enter your name."
        );

        return;

    }


    if (!profile.email) {

        alert(
            "Please enter your email address."
        );

        return;

    }


    localStorage.setItem(

        PROFILE_KEY,

        JSON.stringify(profile)

    );


    profileName.textContent =
        profile.name;


    updateUserNameEverywhere(
        profile.name
    );


    disableEditing();


    alert(
        "Profile updated successfully."
    );

}



/* ================= CANCEL ================= */

function cancelEdit() {

    const savedProfile =
        JSON.parse(
            localStorage.getItem(
                PROFILE_KEY
            )
        );


    const profile =
        savedProfile || defaultProfile;


    nameInput.value =
        profile.name;


    emailInput.value =
        profile.email;


    phoneInput.value =
        profile.phone;


    profileName.textContent =
        profile.name;


    disableEditing();

}



/* ================= DISABLE EDIT ================= */

function disableEditing() {

    nameInput.disabled =
        true;

    emailInput.disabled =
        true;

    phoneInput.disabled =
        true;

    editActions.style.display =
        "none";

}



/* ================= UPDATE USERNAME ================= */

function updateUserNameEverywhere(
    name
) {

    document
        .querySelectorAll(
            ".user-box strong, .top-profile strong"
        )
        .forEach(
            element => {

                element.textContent =
                    name;

            }
        );

}



/* ================= STATISTICS ================= */

function calculateStatistics() {

    /*
       SafePin demo statistics.
       These are prototype values.
    */

    let documents = 6;

    let requests = 0;


    const caseId =
        localStorage.getItem(
            "caseId"
        );


    if (caseId) {

        requests = 1;

    }


    const documentCount =
        localStorage.getItem(
            "documentCount"
        );


    if (documentCount) {

        documents =
            parseInt(
                documentCount
            ) || 6;

    }


    document.getElementById(
        "profileDocuments"
    ).textContent =
        documents;


    document.getElementById(
        "profileRequests"
    ).textContent =
        requests;

}



/* ================= PHONE VERIFICATION ================= */

function verifyPhone() {

    alert(
        "A verification code would be sent to your registered mobile number."
    );

}



/* ================= SAVE PREFERENCES ================= */

function savePreferences() {

    const preferences = {

        security:
            document.getElementById(
                "securityToggle"
            ).checked,

        requests:
            document.getElementById(
                "requestToggle"
            ).checked,

        system:
            document.getElementById(
                "systemToggle"
            ).checked

    };


    localStorage.setItem(

        PREFERENCES_KEY,

        JSON.stringify(
            preferences
        )

    );

}



/* ================= LOAD PREFERENCES ================= */

function loadPreferences() {

    const preferences =
        JSON.parse(
            localStorage.getItem(
                PREFERENCES_KEY
            )
        );


    if (!preferences) {

        return;

    }


    document.getElementById(
        "securityToggle"
    ).checked =
        preferences.security;


    document.getElementById(
        "requestToggle"
    ).checked =
        preferences.requests;


    document.getElementById(
        "systemToggle"
    ).checked =
        preferences.system;

}



/* ================= LOGOUT ================= */

function logout() {

    /*
       Keep profile data saved.
       Only clear the temporary login flag.
    */

    localStorage.removeItem(
        "loggedIn"
    );

}



/* ================= INITIALIZE ================= */

loadProfile();