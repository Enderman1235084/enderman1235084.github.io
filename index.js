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
        case "":
            jsjs.load({ html: "/pages/home/home.html" })
            break;
        
        default:
            document.write("<p style='text-align: center;'>404: Page not found</p>");
    }
}