const themeToggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === null) {
    localStorage.setItem("theme", "dark");
}
else if (localStorage.getItem("theme") == "light") {
    document.documentElement.classList.add("lightTheme");
    themeToggle.children[0].classList.add("hidden");
    themeToggle.children[1].classList.remove("hidden");
}

themeToggle.onclick = function () {
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