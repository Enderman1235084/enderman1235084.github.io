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

async function updateDynamicPage() {
    const response = await fetch("/pages/pagemaps.json");
    if (!response.ok) {
        console.error("Error with fetch, status text: " + response.statusText);
        return;
    }
    const pagemaps = await response.json();
    if (window.location.pathname.slice(1) in pagemaps) {
        jsjs.load(pagemaps[window.location.pathname.slice(1)]);
    }
    else {
        jsjs.load({
            html: "/pages/404/404.html",
            css: "/pages/404/404.css",
            js: "/pages/404/404.js"
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