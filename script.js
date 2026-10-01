/* =========================================================
   LOLLI SOCIALS — FRONTEND CONTROLLER
   Frontend only — PHP/API integration comes later.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       MOBILE SIDEBAR
    ===================================================== */

    const sidebar = document.querySelector(".sidebar");
    const dashboardMain = document.querySelector(".dashboard-main");

    let menuButton = document.querySelector(".dashboard-menu");

    if (!menuButton && sidebar) {

        const headerTitle = document.querySelector(".dashboard-title");

        if (headerTitle) {

            menuButton = document.createElement("button");

            menuButton.className = "dashboard-menu";
            menuButton.innerHTML = "☰";

            headerTitle.parentElement.prepend(menuButton);

        }

    }


    if (menuButton && sidebar) {

        menuButton.addEventListener("click", () => {

            sidebar.classList.toggle("mobile-open");

        });

    }


    /* =====================================================
       CLOSE SIDEBAR
    ===================================================== */

    document.addEventListener("click", (event) => {

        if (!sidebar || !sidebar.classList.contains("mobile-open")) {
            return;
        }

        const clickedInsideSidebar =
            sidebar.contains(event.target);

        const clickedMenu =
            menuButton && menuButton.contains(event.target);

        if (!clickedInsideSidebar && !clickedMenu) {

            sidebar.classList.remove("mobile-open");

        }

    });


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    const header =
        document.querySelector(".header");

    if (header) {

        window.addEventListener("scroll", () => {

            header.classList.toggle(
                "scrolled",
                window.scrollY > 50
            );

        });

    }


    /* =====================================================
       LANDING PAGE MOBILE MENU
    ===================================================== */

    const menuBtn =
        document.querySelector(".menu-btn");

    const nav =
        document.querySelector(".nav");

    if (menuBtn && nav) {

        menuBtn.addEventListener("click", () => {

            nav.classList.toggle("mobile-nav");

        });

        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("mobile-nav");

            });

        });

    }


    /* =====================================================
       SERVICE CATEGORY FILTER
    ===================================================== */

    const categoryButtons =
        document.querySelectorAll(".category-btn");

    const marketCards =
        document.querySelectorAll(".market-card");

    categoryButtons.forEach(button => {

        button.addEventListener("click", () => {

            categoryButtons.forEach(btn => {

                btn.classList.remove("active");

            });

            button.classList.add("active");

            const category =
                button.dataset.category;

            marketCards.forEach(card => {

                const matches =
                    category === "all" ||
                    card.dataset.category === category;

                card.style.display =
                    matches ? "flex" : "none";

            });

        });

    });


    /* =====================================================
       SERVICE SEARCH
    ===================================================== */

    const serviceSearch =
        document.querySelector("#serviceSearch");

    const serviceEmpty =
        document.querySelector("#serviceEmpty");

    if (serviceSearch) {

        serviceSearch.addEventListener("input", () => {

            const search =
                serviceSearch.value
                    .toLowerCase()
                    .trim();

            let visible = 0;

            marketCards.forEach(card => {

                const name =
                    (card.dataset.name || "")
                    .toLowerCase();

                const match =
                    name.includes(search);

                card.style.display =
                    match ? "flex" : "none";

                if (match) {
                    visible++;
                }

            });

            if (serviceEmpty) {

                serviceEmpty.classList.toggle(
                    "show",
                    visible === 0
                );

            }

        });

    }


    /* =====================================================
       SERVICE PURCHASE MODAL
    ===================================================== */

    const serviceModal =
        document.querySelector("#serviceModal");

    const modalClose =
        document.querySelector("#modalClose");

    const modalServiceName =
        document.querySelector("#modalServiceName");

    const buyButtons =
        document.querySelectorAll(".buy-service");


    buyButtons.forEach(button => {

        button.addEventListener("click", () => {

            const service =
                button.dataset.service;

            if (modalServiceName) {

                modalServiceName.textContent =
                    service;

            }

            if (serviceModal) {

                serviceModal.classList.add("show");

            }

        });

    });


    if (modalClose && serviceModal) {

        modalClose.addEventListener("click", () => {

            serviceModal.classList.remove("show");

        });

    }


    if (serviceModal) {

        serviceModal.addEventListener(
            "click",
            event => {

                if (
                    event.target === serviceModal
                ) {

                    serviceModal.classList.remove(
                        "show"
                    );

                }

            }
        );

    }


    /* =====================================================
       ORDER SEARCH
    ===================================================== */

    const orderSearch =
        document.querySelector("#orderSearch");

    const orderFilter =
        document.querySelector("#orderFilter");

    const orderItems =
        document.querySelectorAll(".order-item");


    function filterOrders() {

        const search =
            orderSearch
                ? orderSearch.value
                    .toLowerCase()
                    .trim()
                : "";

        const filter =
            orderFilter
                ? orderFilter.value
                : "all";


        orderItems.forEach(order => {

            const text =
                order.textContent.toLowerCase();

            const status =
                order.dataset.status;

            const searchMatch =
                text.includes(search);

            const statusMatch =
                filter === "all" ||
                status === filter;

            order.style.display =
                searchMatch && statusMatch
                    ? "grid"
                    : "none";

        });

    }


    if (orderSearch) {

        orderSearch.addEventListener(
            "input",
            filterOrders
        );

    }


    if (orderFilter) {

        orderFilter.addEventListener(
            "change",
            filterOrders
        );

    }


    /* =====================================================
       WALLET FUNDING
    ===================================================== */

    const fundButtons =
        document.querySelectorAll(
            ".wallet-primary, .fund-method"
        );


    fundButtons.forEach(button => {

        button.addEventListener("click", () => {

            showToast(
                "Wallet funding will be connected to PHP/API."
            );

        });

    });


    /* =====================================================
       PROFILE / SECURITY BUTTONS
    ===================================================== */

    const profileButtons =
        document.querySelectorAll(
            ".profile-edit, .security-row"
        );


    profileButtons.forEach(button => {

        button.addEventListener("click", () => {

            showToast(
                "This feature will be connected to the backend."
            );

        });

    });


    /* =====================================================
       SUPPORT BUTTONS
    ===================================================== */

    const supportButtons =
        document.querySelectorAll(
            ".support-card button"
        );


    supportButtons.forEach(button => {

        button.addEventListener("click", () => {

            showToast(
                "Support system will be connected to PHP later."
            );

        });

    });


    /* =====================================================
       DEMO AUTHENTICATION
    ===================================================== */

    const authForms =
        document.querySelectorAll(".auth-form");


    authForms.forEach(form => {

        form.addEventListener("submit", event => {

            event.preventDefault();

            const isLogin =
                window.location.pathname
                    .toLowerCase()
                    .includes("login");

            if (isLogin) {

                showToast(
                    "Demo login successful."
                );

                setTimeout(() => {

                    window.location.href =
                        "dashboard.html";

                }, 700);

            } else {

                showToast(
                    "Demo account created."
                );

                setTimeout(() => {

                    window.location.href =
                        "dashboard.html";

                }, 700);

            }

        });

    });


    /* =====================================================
       LOGOUT
    ===================================================== */

    const logoutLinks =
        document.querySelectorAll(
            'a[href="../index.html"]'
        );


    logoutLinks.forEach(link => {

        if (
            link.textContent
                .toLowerCase()
                .includes("logout")
        ) {

            link.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    showToast(
                        "You have been logged out."
                    );

                    setTimeout(() => {

                        window.location.href =
                            "../index.html";

                    }, 700);

                }
            );

        }

    });


    /* =====================================================
       BUTTON PRESS EFFECT
    ===================================================== */

    document
        .querySelectorAll("button")
        .forEach(button => {

            button.addEventListener("mousedown", () => {

                button.style.transform =
                    "scale(.97)";

            });

            button.addEventListener("mouseup", () => {

                button.style.transform = "";

            });

            button.addEventListener("mouseleave", () => {

                button.style.transform = "";

            });

        });


    /* =====================================================
       SCROLL ANIMATIONS
    ===================================================== */

    const animatedElements =
        document.querySelectorAll(
            ".service-card, .benefit, .step, .market-card"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        animatedElements.forEach(element => {

            observer.observe(element);

        });

    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key !== "Escape") {
            return;
        }

        if (serviceModal) {

            serviceModal.classList.remove(
                "show"
            );

        }

        if (sidebar) {

            sidebar.classList.remove(
                "mobile-open"
            );

        }

    });


});


/* =========================================================
   TOAST SYSTEM
========================================================= */

function showToast(message) {

    let container =
        document.querySelector(".toast-container");


    if (!container) {

        container =
            document.createElement("div");

        container.className =
            "toast-container";

        document.body.appendChild(container);

    }


    const toast =
        document.createElement("div");

    toast.className = "toast";

    toast.innerHTML = `
        <span class="toast-check">✓</span>
        <span>${message}</span>
    `;


    container.appendChild(toast);


    setTimeout(() => {

        toast.classList.add("hide");

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 2800);

}


