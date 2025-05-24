if (localStorage.getItem("theme") === null) {
    localStorage.setItem("theme", "dark");
}
else if (localStorage.getItem("theme") == "light") {
    document.documentElement.classList.add("lightTheme");
    window.addEventListener("DOMContentLoaded", event => {
        themeToggle.children[0].classList.add("hidden");
        themeToggle.children[1].classList.remove("hidden");
    });
    
    
}

function toggleTheme() {
    const themeToggle = document.getElementById("themeToggle");
    switch (localStorage.getItem("theme")) {
        case "dark":
            localStorage.setItem("theme", "light");
            document.documentElement.classList.add("lightTheme");
            themeToggle.children[0].classList.add("hidden");
            themeToggle.children[1].classList.remove("hidden");
            break;
        case "light":
            localStorage.setItem("theme", "dark");
            document.documentElement.classList.remove("lightTheme");
            themeToggle.children[0].classList.remove("hidden");
            themeToggle.children[1].classList.add("hidden");
            break;
    }
}

function updateDynamicPage() {
    switch (window.location.pathname.slice(1)) {
        case "index.html":
            jsjs.load({
                html: "/pages/home/home.html",
                css: "/pages/home/home.css"
            });
            break;
        case "about":
            jsjs.load({
                html: "/pages/about/about.html",
                css: "/pages/about/about.html"
            });
            break;
        default:
            jsjs.load({
                html: "/pages/404/404.html",
                css: "/pages/404/404.css"
            });
    }
}

window.onpopstate = updateDynamicPage;

window.addEventListener("DOMContentLoaded", event => {
    const navLinks = document.querySelectorAll("a");
    jsjs.dynamicElement = document.querySelector("main");
    updateDynamicPage();
    for (let link of navLinks) {
        link.addEventListener("click", event => {
            event.preventDefault();
            updateDynamicPage();
            history.pushState(null, "",  link.getAttribute("href"));
        });
    }
});