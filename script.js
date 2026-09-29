/* =====================================================
   ALIZE & DONOVAN WEDDING WEBSITE
===================================================== */


/* =====================================================
   WEDDING SETTINGS
   CHANGE THESE VALUES
===================================================== */

const WEDDING_SETTINGS = {

    /*
       IMPORTANT:
       Replace this with your actual wedding date.

       Example:
       "June 20, 2027 13:30:00"
    */

    weddingDate: "January 1, 2027 13:30:00",

    couple: "Alize & Donovan",

    venue:
        "Peace Lutheran Church",

    address:
        "4672 N Cedar Ave, Fresno, CA 93726"

};


/* =====================================================
   PAGE LOADER
===================================================== */

window.addEventListener("load", () => {

    const loader =
        document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("hidden");

    }, 1000);

});


/* =====================================================
   DATE DISPLAY
===================================================== */

function formatWeddingDate() {

    const date =
        new Date(WEDDING_SETTINGS.weddingDate);

    if (isNaN(date.getTime())) {

        return "YOUR WEDDING DATE";

    }

    return date.toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        }
    );
}


const formattedDate =
    formatWeddingDate();


document.getElementById("heroDate")
    .textContent = formattedDate;


document.getElementById("closingDate")
    .textContent = formattedDate;


/* =====================================================
   ENVELOPE OPENING
===================================================== */

const openInvitation =
    document.getElementById("openInvitation");

const envelopeSection =
    document.getElementById("envelopeSection");

const envelope =
    document.querySelector(".envelope");

const continueButton =
    document.getElementById("continueButton");


openInvitation.addEventListener(
    "click",
    () => {

        envelopeSection.scrollIntoView({
            behavior: "smooth"
        });

        setTimeout(() => {

            envelope.classList.add("open");

        }, 650);

    }
);


continueButton.addEventListener(
    "click",
    () => {

        envelope.classList.add("open");

        const story =
            document.querySelector(".story");

        setTimeout(() => {

            story.scrollIntoView({
                behavior: "smooth"
            });

        }, 500);

    }
);


/* =====================================================
   REVEAL ON SCROLL
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =====================================================
   COUNTDOWN
===================================================== */

function updateCountdown() {

    const target =
        new Date(
            WEDDING_SETTINGS.weddingDate
        ).getTime();

    const now =
        new Date().getTime();

    const difference =
        target - now;


    if (difference <= 0) {

        document.getElementById("days")
            .textContent = "00";

        document.getElementById("hours")
            .textContent = "00";

        document.getElementById("minutes")
            .textContent = "00";

        document.getElementById("seconds")
            .textContent = "00";

        return;

    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference /
                (1000 * 60 * 60))
            % 24
        );


    const minutes =
        Math.floor(
            (difference /
                (1000 * 60))
            % 60
        );


    const seconds =
        Math.floor(
            (difference / 1000)
            % 60
        );


    document.getElementById("days")
        .textContent =
        String(days).padStart(2, "0");


    document.getElementById("hours")
        .textContent =
        String(hours).padStart(2, "0");


    document.getElementById("minutes")
        .textContent =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds")
        .textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* =====================================================
   MUSIC
===================================================== */

const music =
    document.getElementById("weddingMusic");

const musicButton =
    document.getElementById("musicButton");


musicButton.addEventListener(
    "click",
    async () => {

        try {

            if (music.paused) {

                await music.play();

                musicButton.classList.remove(
                    "paused"
                );

            } else {

                music.pause();

                musicButton.classList.add(
                    "paused"
                );

            }

        } catch (error) {

            console.log(
                "Music could not be played:",
                error
            );

        }

    }
);


/* =====================================================
   RSVP
===================================================== */

const rsvpForm =
    document.getElementById("rsvpForm");

const rsvpSuccess =
    document.getElementById("rsvpSuccess");


rsvpForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        const name =
            document.getElementById(
                "guestName"
            ).value;


        const email =
            document.getElementById(
                "guestEmail"
            ).value;


        const attendance =
            document.querySelector(
                'input[name="attendance"]:checked'
            );


        const guests =
            document.getElementById(
                "guestCount"
            ).value;


        const message =
            document.getElementById(
                "message"
            ).value;


        if (!attendance) {

            alert(
                "Please select whether you will attend."
            );

            return;

        }


        /*
           ==================================================
           RSVP EMAIL

           CHANGE THIS EMAIL ADDRESS TO YOUR RSVP EMAIL.
           Example:

           const rsvpEmail =
               "alizeanddonovan@gmail.com";
           ==================================================
        */

        const rsvpEmail =
            "YOUR-RSVP-EMAIL@example.com";


        const subject =
            encodeURIComponent(
                "Wedding RSVP - " + name
            );


        const body =
            encodeURIComponent(
`
Alize & Donovan Wedding RSVP

Name:
${name}

Email:
${email}

Attendance:
${attendance.value}

Number of Guests:
${guests}

Message:
${message || "No message provided."}

Wedding Date:
${formattedDate}

Venue:
${WEDDING_SETTINGS.venue}

Address:
${WEDDING_SETTINGS.address}
`
            );


        /*
           Opens the visitor's email application.
        */

        window.location.href =
            `mailto:${rsvpEmail}?subject=${subject}&body=${body}`;


        /*
           Shows confirmation UI.
        */

        setTimeout(() => {

            rsvpForm.style.display = "none";

            rsvpSuccess.classList.add("show");

        }, 700);

    }
);


/* =====================================================
   QR CODE
===================================================== */

function generateQRCode() {

    const qrContainer =
        document.getElementById("qrcode");


    qrContainer.innerHTML = "";


    /*
       The QR automatically uses the current website URL.

       That means once you upload this website,
       the QR code points to the invitation.
    */

    const invitationURL =
        window.location.href;


    if (
        typeof QRCode !== "undefined"
    ) {

        new QRCode(
            qrContainer,
            {
                text: invitationURL,

                width: 180,

                height: 180,

                colorDark: "#3b245c",

                colorLight: "#ffffff",

                correctLevel:
                    QRCode.CorrectLevel.H
            }
        );

    }

}


generateQRCode();


/* =====================================================
   DOWNLOAD QR CODE
===================================================== */

const downloadQR =
    document.getElementById(
        "downloadQR"
    );


downloadQR.addEventListener(
    "click",
    () => {

        const qrImage =
            document.querySelector(
                "#qrcode img"
            );


        if (!qrImage) {

            alert(
                "The QR code is still loading."
            );

            return;

        }


        const link =
            document.createElement("a");


        link.href =
            qrImage.src;


        link.download =
            "Alize-Donovan-Wedding-QR.png";


        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

    }
);


/* =====================================================
   BACK TO TOP
===================================================== */

const backToTop =
    document.getElementById(
        "backToTop"
    );


backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =====================================================
   PARALLAX EFFECT
   DESKTOP ONLY
===================================================== */

if (window.innerWidth > 700) {

    window.addEventListener(
        "scroll",
        () => {

            const hero =
                document.querySelector(
                    ".invitation-card"
                );

            const scroll =
                window.scrollY;


            if (scroll < window.innerHeight) {

                hero.style.transform =
                    `translateY(${scroll * 0.12}px)`;

            }

        },
        {
            passive: true
        }
    );

}


/* =====================================================
   TOUCH FEEDBACK
===================================================== */

document.querySelectorAll(
    "button, .map-button"
).forEach(element => {

    element.addEventListener(
        "touchstart",
        () => {

            element.style.transform =
                "scale(.97)";

        },
        {
            passive: true
        }
    );


    element.addEventListener(
        "touchend",
        () => {

            element.style.transform =
                "";

        },
        {
            passive: true
        }
    );

});