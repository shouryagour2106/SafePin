/* =========================================================
   SAFE PIN - NOTIFICATION SYSTEM
   ========================================================= */


/* ================= DEFAULT NOTIFICATIONS ================= */

const defaultNotifications = [

    {
        id: 1,

        type: "request",

        icon: "📋",

        title: "Protection Request Submitted",

        message:
            "Your document protection request has been successfully submitted and is now under verification.",

        time: "10 minutes ago",

        date: "Today",

        caseId: "2026-754449",

        priority: "normal",

        read: false
    },


    {
        id: 2,

        type: "success",

        icon: "✓",

        title: "Identity Verification Completed",

        message:
            "The identity information associated with your request has been successfully verified.",

        time: "25 minutes ago",

        date: "Today",

        caseId: "2026-754449",

        priority: "normal",

        read: false
    },


    {
        id: 3,

        type: "request",

        icon: "🏢",

        title: "Request Sent for Processing",

        message:
            "Your request has been securely forwarded to the concerned department for further processing.",

        time: "42 minutes ago",

        date: "Today",

        caseId: "2026-754449",

        priority: "medium",

        read: false
    },


    {
        id: 4,

        type: "security",

        icon: "🔐",

        title: "Security Check Completed",

        message:
            "SafePin security monitoring completed successfully. No suspicious activity was detected.",

        time: "1 hour ago",

        date: "Today",

        caseId: "",

        priority: "normal",

        read: true
    },


    {
        id: 5,

        type: "system",

        icon: "⚙",

        title: "System Status Updated",

        message:
            "SafePin system services are operating normally and all core services are currently available.",

        time: "3 hours ago",

        date: "Today",

        caseId: "",

        priority: "normal",

        read: true
    },


    {
        id: 6,

        type: "security",

        icon: "⚠",

        title: "New Login Detected",

        message:
            "A new login session was detected on your SafePin account. Review your security settings if you do not recognize this activity.",

        time: "Yesterday",

        date: "Yesterday",

        caseId: "",

        priority: "high",

        read: true
    },


    {
        id: 7,

        type: "request",

        icon: "📄",

        title: "Document Processing Completed",

        message:
            "Your submitted document has successfully passed validation and document processing.",

        time: "Yesterday",

        date: "Yesterday",

        caseId: "2026-754102",

        priority: "normal",

        read: true
    }

];



/* ================= STORAGE ================= */

const STORAGE_KEY =
    "safepinNotifications";


let notifications =
    JSON.parse(
        localStorage.getItem(
            STORAGE_KEY
        )
    );



/*
   If this is the first time the
   SafePin notification system is
   opened, use the new SafePin data.
*/

if (!Array.isArray(notifications)) {

    notifications =
        defaultNotifications;

    saveNotifications();

}



/* ================= SAVE ================= */

function saveNotifications() {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(
            notifications
        )

    );

}



/* ================= RENDER ================= */

function renderNotifications(
    filter = "all"
) {

    const list =
        document.getElementById(
            "notificationList"
        );


    const empty =
        document.getElementById(
            "emptyState"
        );


    let filtered =
        [...notifications];



    /* FILTER */

    if (filter === "unread") {

        filtered =
            notifications.filter(
                item =>
                    !item.read
            );

    }



    if (
        filter === "request" ||
        filter === "security" ||
        filter === "system"
    ) {

        filtered =
            notifications.filter(
                item =>
                    item.type === filter
            );

    }



    /* EMPTY STATE */

    if (filtered.length === 0) {

        list.innerHTML = "";

        empty.style.display =
            "block";

        updateStatistics();

        return;

    }


    empty.style.display =
        "none";



    /* SORT */

    filtered.sort(

        (a, b) => {

            if (
                a.read !== b.read
            ) {

                return a.read
                    ? 1
                    : -1;

            }


            return b.id - a.id;

        }

    );



    list.innerHTML =
        filtered
            .map(
                notification =>
                    createNotificationHTML(
                        notification
                    )
            )
            .join("");


    updateStatistics();

}



/* ================= CREATE CARD ================= */

function createNotificationHTML(
    notification
) {


    const unreadClass =
        notification.read
            ? "read"
            : "unread";


    const priorityClass =
        notification.priority;


    const priorityText =
        notification.priority
            .toUpperCase();



    const caseHTML =
        notification.caseId

            ? `
                <span class="case">
                    ${notification.caseId}
                </span>
              `

            : "";



    return `

        <div
            class="notification-card ${unreadClass}"
            data-id="${notification.id}">


            <div
                class="notification-icon ${notification.type}">

                ${notification.icon}

            </div>



            <div class="notification-body">


                <div class="notification-top">

                    <h3>
                        ${notification.title}
                    </h3>


                    <span
                        class="priority ${priorityClass}">

                        ${priorityText}

                    </span>

                </div>



                <p>
                    ${notification.message}
                </p>



                <div class="notification-meta">

                    <span>
                        ${notification.time}
                    </span>

                    ${caseHTML}

                </div>


            </div>



            <div
                class="notification-card-actions">


                ${
                    !notification.read

                        ? `<span class="unread-dot"></span>`

                        : ""
                }


                <button
                    class="read-btn"
                    onclick="toggleRead(${notification.id})">

                    ${
                        notification.read
                            ? "Mark unread"
                            : "Mark as read"
                    }

                </button>


            </div>


        </div>

    `;

}



/* ================= READ / UNREAD ================= */

function toggleRead(id) {

    const notification =
        notifications.find(
            item =>
                item.id === id
        );


    if (!notification) {

        return;

    }


    notification.read =
        !notification.read;


    saveNotifications();


    renderNotifications(
        currentFilter
    );

}



/* ================= MARK ALL ================= */

function markAllRead() {

    notifications.forEach(

        notification => {

            notification.read =
                true;

        }

    );


    saveNotifications();


    renderNotifications(
        currentFilter
    );

}



/* ================= CLEAR READ ================= */

function clearReadNotifications() {

    notifications =
        notifications.filter(

            notification =>
                !notification.read

        );


    saveNotifications();


    renderNotifications(
        currentFilter
    );

}



/* ================= FILTER ================= */

let currentFilter = "all";


function filterNotifications(
    filter,
    button
) {

    currentFilter =
        filter;


    document
        .querySelectorAll(
            ".filter"
        )
        .forEach(
            item =>
                item.classList.remove(
                    "active"
                )
        );


    button.classList.add(
        "active"
    );


    renderNotifications(
        filter
    );

}



/* ================= STATISTICS ================= */

function updateStatistics() {


    const total =
        notifications.length;


    const unread =
        notifications.filter(
            item =>
                !item.read
        ).length;


    const security =
        notifications.filter(
            item =>
                item.type ===
                "security"
        ).length;


    const requests =
        notifications.filter(
            item =>
                item.type ===
                "request"
        ).length;



    document.getElementById(
        "totalCount"
    ).textContent =
        total;



    document.getElementById(
        "unreadCount"
    ).textContent =
        unread;



    document.getElementById(
        "pendingCount"
    ).textContent =
        unread;



    document.getElementById(
        "securityCount"
    ).textContent =
        security;



    document.getElementById(
        "requestCount"
    ).textContent =
        requests;



    document.getElementById(
        "allBadge"
    ).textContent =
        total;



    document.getElementById(
        "unreadBadge"
    ).textContent =
        unread;



    const sideCount =
        document.getElementById(
            "sideCount"
        );


    if (unread === 0) {

        sideCount.textContent =
            "";

        sideCount.style.display =
            "none";

    }

    else {

        sideCount.textContent =
            unread;

        sideCount.style.display =
            "flex";

    }

}



/* ================= REFRESH ================= */

function refreshNotifications(
    button
) {

    if (!button) {

        return;

    }


    const oldText =
        button.textContent;


    button.textContent =
        "↻ Refreshing...";


    button.disabled =
        true;


    setTimeout(

        () => {

            renderNotifications(
                currentFilter
            );


            button.textContent =
                oldText;


            button.disabled =
                false;

        },

        600

    );

}



/* ================= REQUEST INTEGRATION ================= */

function syncRequestNotification() {


    const caseId =
        localStorage.getItem(
            "caseId"
        );


    const documentName =
        localStorage.getItem(
            "requestDocument"
        );


    const action =
        localStorage.getItem(
            "requestAction"
        );


    if (!caseId) {

        return;

    }



    const exists =
        notifications.some(

            item =>
                item.caseId === caseId &&
                item.title ===
                "Protection Request Submitted"

        );


    if (exists) {

        return;

    }



    notifications.unshift({

        id:
            Date.now(),

        type:
            "request",

        icon:
            "📋",

        title:
            "Protection Request Submitted",

        message:
            `Your ${action || "document"} request for ${documentName || "the selected service"} has been successfully submitted.`,

        time:
            "Just now",

        date:
            "Today",

        caseId:
            caseId,

        priority:
            "normal",

        read:
            false

    });


    saveNotifications();

}



/* ================= LOGOUT ================= */

function logout() {

    localStorage.removeItem(
        "loggedIn"
    );

}



/* ================= INITIALIZE ================= */

syncRequestNotification();

renderNotifications();
