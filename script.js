/* =========================================================
   CONFIGURACIÓN
========================================================= */

const EVENT_DATE = new Date(
    "2026-12-12T16:00:00-06:00"
);

const WHATSAPP_NUMBER = "528445550198";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initWelcome();
    initHeader();
    initMobileMenu();
    initCountdown();
    initRevealAnimations();
    initGallery();
    initMusic();
    initBackToTop();
    initProtection();
    initBabyRoomGame();
    initImageFallbacks();

});


/* =========================================================
   PRELOADER
========================================================= */

window.addEventListener("load", () => {

    const preloader =
        document.getElementById("preloader");

    setTimeout(() => {

        if (preloader) {
            preloader.classList.add("hidden");
        }

    }, 500);

});


/* =========================================================
   PANTALLA DE BIENVENIDA
========================================================= */

function initWelcome() {

    const welcomeScreen =
        document.getElementById("welcomeScreen");

    const openButton =
        document.getElementById("openInvitation");

    if (!welcomeScreen || !openButton) {
        return;
    }

    document.body.classList.add("no-scroll");

    const openInvitation = () => {

        if (
            welcomeScreen.classList.contains("is-open")
        ) {
            return;
        }

        welcomeScreen.classList.add("is-open");

        document.body.classList.remove("no-scroll");

        setTimeout(() => {

            const music =
                document.getElementById("backgroundMusic");

            const musicButton =
                document.getElementById("musicButton");

            if (music) {

                music.volume = 0.35;

                music.play()
                    .then(() => {

                        if (musicButton) {
                            musicButton.classList.add("playing");
                            musicButton.innerHTML =
                                '<i class="fa-solid fa-volume-high"></i>';
                        }

                    })
                    .catch(() => {
                        // El navegador puede bloquear autoplay.
                    });

            }

        }, 800);

    };

    openButton.addEventListener(
        "click",
        openInvitation
    );

    /*
       También permitimos abrir tocando
       directamente la pantalla.
    */

    welcomeScreen.addEventListener(
        "click",
        (event) => {

            if (
                event.target === welcomeScreen ||
                event.target.classList.contains("welcome-bg")
            ) {
                openInvitation();
            }

        }
    );

}


/* =========================================================
   HEADER
========================================================= */

function initHeader() {

    const header =
        document.getElementById("siteHeader");

    if (!header) {
        return;
    }

    function updateHeader() {

        if (window.scrollY > 100) {

            header.classList.add("visible");

        } else {

            header.classList.remove("visible");

        }

    }

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();

}


/* =========================================================
   MENÚ MÓVIL
========================================================= */

function initMobileMenu() {

    const menuToggle =
        document.getElementById("menuToggle");

    const nav =
        document.getElementById("mainNav");

    if (!menuToggle || !nav) {
        return;
    }

    menuToggle.addEventListener(
        "click",
        () => {

            nav.classList.toggle("open");

            const icon =
                menuToggle.querySelector("i");

            if (!icon) {
                return;
            }

            if (nav.classList.contains("open")) {

                icon.className =
                    "fa-solid fa-xmark";

            } else {

                icon.className =
                    "fa-solid fa-bars";

            }

        }
    );


    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener(
            "click",
            () => {

                nav.classList.remove("open");

                const icon =
                    menuToggle.querySelector("i");

                if (icon) {
                    icon.className =
                        "fa-solid fa-bars";
                }

            }
        );

    });

}


/* =========================================================
   COUNTDOWN
========================================================= */

function initCountdown() {

    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");

    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {
        return;
    }


    function updateCountdown() {

        const now =
            new Date().getTime();

        const target =
            EVENT_DATE.getTime();

        const difference =
            target - now;


        if (difference <= 0) {

            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";

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
                    (1000 * 60 * 60)) % 24
            );

        const minutes =
            Math.floor(
                (difference /
                    (1000 * 60)) % 60
            );

        const seconds =
            Math.floor(
                (difference / 1000) % 60
            );


        daysElement.textContent =
            String(days).padStart(2, "0");

        hoursElement.textContent =
            String(hours).padStart(2, "0");

        minutesElement.textContent =
            String(minutes).padStart(2, "0");

        secondsElement.textContent =
            String(seconds).padStart(2, "0");

    }


    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );

}


/* =========================================================
   ANIMACIONES REVEAL
========================================================= */

function initRevealAnimations() {

    const elements =
        document.querySelectorAll(".reveal");

    if (!elements.length) {
        return;
    }


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(element => {
            element.classList.add("active");
        });

        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "active"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   GALERÍA
========================================================= */

function initGallery() {

    const galleryItems =
        document.querySelectorAll(
            ".gallery-item"
        );

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxClose =
        document.getElementById("lightboxClose");


    if (
        !galleryItems.length ||
        !lightbox ||
        !lightboxImage ||
        !lightboxClose
    ) {
        return;
    }


    galleryItems.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                const image =
                    item.dataset.image;

                if (!image) {
                    return;
                }

                lightboxImage.src =
                    image;

                lightbox.classList.add(
                    "active"
                );

                lightbox.setAttribute(
                    "aria-hidden",
                    "false"
                );

                document.body.classList.add(
                    "no-scroll"
                );

            }
        );

    });


    function closeLightbox() {

        lightbox.classList.remove(
            "active"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "no-scroll"
        );

        setTimeout(() => {

            lightboxImage.src = "";

        }, 300);

    }


    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );


    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                lightbox.classList.contains("active")
            ) {

                closeLightbox();

            }

        }
    );

}


/* =========================================================
   MÚSICA
========================================================= */

function initMusic() {

    const music =
        document.getElementById(
            "backgroundMusic"
        );

    const button =
        document.getElementById(
            "musicButton"
        );


    if (!music || !button) {
        return;
    }


    music.volume = 0.35;


    button.addEventListener(
        "click",
        async () => {

            try {

                if (
                    music.paused
                ) {

                    await music.play();

                    button.classList.add(
                        "playing"
                    );

                    button.innerHTML =
                        '<i class="fa-solid fa-volume-high"></i>';

                } else {

                    music.pause();

                    button.classList.remove(
                        "playing"
                    );

                    button.innerHTML =
                        '<i class="fa-solid fa-volume-xmark"></i>';

                }

            } catch (error) {

                console.log(
                    "No se pudo reproducir el audio.",
                    error
                );

            }

        }
    );

}


/* =========================================================
   BACK TO TOP
========================================================= */

function initBackToTop() {

    const button =
        document.getElementById(
            "backToTop"
        );

    if (!button) {
        return;
    }


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 600) {

                button.classList.add(
                    "visible"
                );

            } else {

                button.classList.remove(
                    "visible"
                );

            }

        },
        { passive: true }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   NUEVO JUEGO
   "LA HABITACIÓN DEL PEQUEÑO OSITO"
========================================================= */

function initBabyRoomGame() {

    const startButton =
        document.getElementById(
            "startGame"
        );

    const retryButton =
        document.getElementById(
            "retryGame"
        );

    const continueButton =
        document.getElementById(
            "continueGame"
        );

    const intro =
        document.getElementById(
            "gameIntro"
        );

    const gameArea =
        document.getElementById(
            "gameArea"
        );

    const success =
        document.getElementById(
            "gameSuccess"
        );

    const gameOver =
        document.getElementById(
            "gameOver"
        );

    const nursery =
        document.getElementById(
            "nursery"
        );

    const foundObjects =
        document.getElementById(
            "foundObjects"
        );

    const gameTime =
        document.getElementById(
            "gameTime"
        );

    const gameScore =
        document.getElementById(
            "gameScore"
        );

    const finalScore =
        document.getElementById(
            "finalScore"
        );

    const gameMessage =
        document.getElementById(
            "gameMessage"
        );


    if (
        !startButton ||
        !retryButton ||
        !continueButton ||
        !intro ||
        !gameArea ||
        !success ||
        !gameOver ||
        !nursery
    ) {
        return;
    }


    /*
       Objetos que el invitado debe encontrar.
    */

    const objects = [

        {
            id: "teddy",
            icon: "🧸",
            name: "Osito",
            points: 10
        },

        {
            id: "bottle",
            icon: "🍼",
            name: "Biberón",
            points: 10
        },

        {
            id: "socks",
            icon: "🧦",
            name: "Calcetines",
            points: 10
        },

        {
            id: "pacifier",
            icon: "🍼",
            name: "Chupón",
            points: 10
        },

        {
            id: "blanket",
            icon: "🧺",
            name: "Mantita",
            points: 10
        }

    ];


    let found = 0;

    let score = 0;

    let timeLeft = 20;

    let timer = null;

    let gameRunning = false;


    /* =====================================================
       POSICIONES SEGURAS
    ====================================================== */

    function getRandomPosition() {

        const minX = 10;
        const maxX = 88;

        const minY = 20;
        const maxY = 75;

        return {

            x:
                Math.random() *
                (maxX - minX) +
                minX,

            y:
                Math.random() *
                (maxY - minY) +
                minY

        };

    }


    /* =====================================================
       CREAR OBJETOS
    ====================================================== */

    function createObjects() {

        nursery
            .querySelectorAll(".game-object")
            .forEach(
                object => object.remove()
            );


        objects.forEach(
            objectData => {

                const button =
                    document.createElement(
                        "button"
                    );

                button.type = "button";

                button.className =
                    "game-object";

                button.dataset.id =
                    objectData.id;

                button.dataset.points =
                    objectData.points;

                button.textContent =
                    objectData.icon;

                button.setAttribute(
                    "aria-label",
                    `Encontrar ${objectData.name}`
                );


                const position =
                    getRandomPosition();


                button.style.left =
                    `${position.x}%`;

                button.style.top =
                    `${position.y}%`;


                /*
                   Evitamos que un objeto
                   aparezca directamente encima
                   del osito central.
                */

                const centerDistance =
                    Math.sqrt(
                        Math.pow(
                            position.x - 50,
                            2
                        ) +
                        Math.pow(
                            position.y - 60,
                            2
                        )
                    );


                if (
                    centerDistance < 18
                ) {

                    const newPosition =
                        getRandomPosition();

                    button.style.left =
                        `${newPosition.x}%`;

                    button.style.top =
                        `${newPosition.y}%`;

                }


                button.addEventListener(
                    "click",
                    () => {

                        collectObject(
                            button,
                            objectData
                        );

                    }
                );


                nursery.appendChild(
                    button
                );

            }
        );

    }


    /* =====================================================
       RECOGER OBJETO
    ====================================================== */

    function collectObject(
        button,
        objectData
    ) {

        if (!gameRunning) {
            return;
        }

        if (
            button.classList.contains(
                "found"
            )
        ) {
            return;
        }


        button.classList.add(
            "found"
        );


        found++;

        score +=
            Number(
                objectData.points
            );


        foundObjects.textContent =
            found;

        gameScore.textContent =
            score;


        gameMessage.textContent =
            `¡Encontraste ${objectData.name}! +${objectData.points} puntos`;


        setTimeout(() => {

            button.remove();

        }, 450);


        if (found >= objects.length) {

            finishGame();

        }

    }


    /* =====================================================
       INICIAR
    ====================================================== */

    function startGame() {

        clearInterval(timer);

        found = 0;

        score = 0;

        timeLeft = 20;

        gameRunning = true;


        foundObjects.textContent =
            "0";

        gameScore.textContent =
            "0";

        gameTime.textContent =
            "20";


        intro.style.display =
            "none";

        success.classList.remove(
            "active"
        );

        gameOver.classList.remove(
            "active"
        );

        gameArea.classList.add(
            "active"
        );


        gameMessage.textContent =
            "¡Encuentra los 5 objetos!";


        createObjects();


        timer =
            setInterval(
                () => {

                    timeLeft--;

                    gameTime.textContent =
                        timeLeft;


                    if (
                        timeLeft <= 0
                    ) {

                        clearInterval(timer);

                        if (
                            found <
                            objects.length
                        ) {

                            endGame();

                        }

                    }

                },
                1000
            );

    }


    /* =====================================================
       TERMINAR CON ÉXITO
    ====================================================== */

    function finishGame() {

        if (!gameRunning) {
            return;
        }

        gameRunning = false;

        clearInterval(timer);


        setTimeout(() => {

            gameArea.classList.remove(
                "active"
            );

            finalScore.textContent =
                score;

            success.classList.add(
                "active"
            );

        }, 500);

    }


    /* =====================================================
       TIEMPO TERMINADO
    ====================================================== */

    function endGame() {

        gameRunning = false;

        clearInterval(timer);

        gameArea.classList.remove(
            "active"
        );

        gameOver.classList.add(
            "active"
        );

    }


    /* =====================================================
       BOTONES
    ====================================================== */

    startButton.addEventListener(
        "click",
        startGame
    );


    retryButton.addEventListener(
        "click",
        startGame
    );


    continueButton.addEventListener(
        "click",
        () => {

            success.classList.remove(
                "active"
            );

            document
                .getElementById("galeria")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        }
    );

}


/* =========================================================
   FALLBACK DE IMÁGENES
========================================================= */

function initImageFallbacks() {

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.display =
                    "none";

            }
        );

    });

}


/* =========================================================
   PROTECCIÓN CONTRA COPIADO CASUAL
========================================================= */

function initProtection() {


    /*
       Menú contextual
    */

    document.addEventListener(
        "contextmenu",
        event => {

            event.preventDefault();

        }
    );


    /*
       Selección
    */

    document.addEventListener(
        "selectstart",
        event => {

            event.preventDefault();

        }
    );


    /*
       Arrastrar imágenes
    */

    document.addEventListener(
        "dragstart",
        event => {

            if (
                event.target.tagName === "IMG"
            ) {

                event.preventDefault();

            }

        }
    );


    /*
       Copiar
    */

    document.addEventListener(
        "copy",
        event => {

            event.preventDefault();

        }
    );


    /*
       Cortar
    */

    document.addEventListener(
        "cut",
        event => {

            event.preventDefault();

        }
    );


    /*
       Pegar
    */

    document.addEventListener(
        "paste",
        event => {

            event.preventDefault();

        }
    );


    /*
       Atajos de teclado comunes
    */

    document.addEventListener(
        "keydown",
        event => {

            const key =
                event.key.toLowerCase();

            const modifier =
                event.ctrlKey ||
                event.metaKey;


            if (
                modifier &&
                [
                    "c",
                    "x",
                    "v",
                    "a",
                    "s",
                    "u",
                    "p"
                ].includes(key)
            ) {

                event.preventDefault();

            }

        }
    );

}